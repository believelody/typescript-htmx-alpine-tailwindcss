import { NextFunction, Response } from "express";
import { Request } from "../interfaces/http.interface";
import utils from "../utils";

const numericParamsValidator = (req: Request, res: Response, next: NextFunction) => {
  Object.values(req.params).forEach(value => {
    if (!value.match(/[0-9]/g)) {
      throw new Error("id params is not a numeric value");
    }
  });
  next();
}

const error500Handler = (error: string, req: Request, res: Response, next: NextFunction) => {
  console.log("error 500 : ", error);
  switch (error) {
    case 'TokenExpiredError':
      req.session?.destroy(err => {
        if (err) {
          throw err;
        }
      });
      ["session_user", "session_token", "session_remember"].forEach((sessionItem) => res.clearCookie(sessionItem));
      return res.redirect('/login');
    default:
      return res.status(500).send({ '500': true });
  }
}

const error404NotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send({ 'not-found': true })
}

const popupalteCurrentURLInContext = (req: Request, res: Response, next: NextFunction) => {
  if (!req.originalUrl.includes("/api")) {
    if (req.session) {
      req.session.currentURLPathname = req.originalUrl
    };
    req.ctx = { ...req.ctx, currentURLPathname: `${req.originalUrl}` };
  }
  next();
}

const limitQueryValidator = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.limit && !utils.http.limitQueryArray.includes(Number(req.query.limit))) {
    if (req?.ctx?.fromHTMX) {
      throw new Error("There is a problem with limit value");
    }
    if (req.ctx) {
      req.ctx.error = utils.error.code500;
    }
    res.statusCode = 500;
  }
  next();
}

export default { numericParamsValidator, error500Handler, error404NotFound, limitQueryValidator, popupalteCurrentURLInContext };