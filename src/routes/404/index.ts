import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader("HX-Push", "/404");
		return res.render("pages/404", { ...req.ctx, title: "404 Not Found" });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
});

export default router;