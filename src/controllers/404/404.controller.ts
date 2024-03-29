import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader("HX-Replace-Url", "/404");
		return res.render("pages/404", { ...req.ctx, title: "404 Not Found" });
  } catch (error) {
    console.error(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export const error404Controller = router;