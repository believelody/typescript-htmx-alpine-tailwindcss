import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post("/add-item", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    return res.render("partials/modal/add-to-cart-success", { ...req.ctx });
  } catch (error) {
    console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
  }
})

export const cartApiController = router;