import { errorUtil } from "@utils/error/error.util";
import { queryUtil } from "@utils/query/query.util";
import { NextFunction, Response, Request } from "express";

const numericParamsValidator = (req: Request, res: Response, next: NextFunction) => {
  Object.values(req.params).forEach(value => {
    if (!value.match(/[0-9]/g)) {
      throw new Error("id params is not a numeric value");
    }
  });
  next();
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  switch (error.message) {
    case 'TokenExpiredError':
      req.session?.destroy(err => {
        if (err) {
          throw new Error(err);
        }
      });
      ["session_user", "session_token", "session_remember"].forEach((sessionItem) => res.clearCookie(sessionItem));
      return res.redirect('/login');
    case 'Invalid credentials':
      res.setHeader("HX-Trigger", "invalid-credentials");
      res.setHeader("HX-Swap", "none");
      return res.status(404).end();
    default:
      res.statusMessage = error.message;
      return res.status(500).render('partials/modal/500');
  }
}

const error404NotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).render('partials/modal/not-found');
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
  if (req.query.limit && !queryUtil.limitQueryArray.includes(Number(req.query.limit))) {
    if (req.ctx?.fromHTMX) {
      throw new Error("There is a problem with limit value");
    }
    if (req.ctx) {
      req.ctx.error = errorUtil.code500;
    }
    res.statusCode = 500;
  }
  next();
}

const sleep = async (req: Request, res: Response, next: NextFunction) => {
  await new Promise<void>((resolve, reject) => {
    setTimeout(resolve, 2000);
  })
  next();
}

export const httpMiddleware = { numericParamsValidator, errorHandler, error404NotFound, limitQueryValidator, popupalteCurrentURLInContext, sleep };