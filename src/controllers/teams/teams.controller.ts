import { teamService } from "@services/team/team.service";
import express, { Request, NextFunction, Response } from "express";

const router = express.Router();

const teamsTitle = "Our Team";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teams = await teamService.findAll();
		return res.render("pages/team", { ...req.ctx, teams, title: teamsTitle });
	} catch (error) {
		console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
	}
});

export const teamsController = router;
