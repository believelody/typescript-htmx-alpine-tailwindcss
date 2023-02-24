import express, { Request, NextFunction, Response } from "express";
import { Team } from '../../interfaces/team.interface';
import service from '../../services';

const router = express.Router();

const teamsTitle = "Our Team"

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await service.team.fetchAll();
        return res.render("pages/team", { ...req.ctx, teams, title: teamsTitle });        
    } catch (error) {
        console.log(`In ${req.originalUrl} route : ${error}`);
		next(error);
    }
});

export default router;