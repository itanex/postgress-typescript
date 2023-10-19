import { Request, Response } from "express";
import Tutorial from "../models/tutorial.model";
import tutorialRepository from "../repository/tutorial.repository";

export default class TutorialController {
    async create(req: Request, res: Response): Promise<Tutorial> {
        let tutorial: Tutorial = req.body;

        const result = await tutorialRepository.save(tutorial);

        return result;
    }

    async findAll(req: Request, res: Response): Promise<Tutorial[]> {
        try {
            return await tutorialRepository.retrieveAll({});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }

        return new Promise(() => null);
    }

    async findOne(req: Request, res: Response): Promise<Tutorial | null> {
        const id = req.route['id'];

        return tutorialRepository.retrieveById(id);
    }

    async update(req: Request, res: Response): Promise<number> {
        const tutorial: Tutorial = req.body;

        return tutorialRepository.update(tutorial);
    }

    async delete(req: Request, res: Response): Promise<number> {
        const id = req.route['id'];

        return tutorialRepository.delete(id);
    }

    async deleteAll(req: Request, res: Response): Promise<number> {
        return await tutorialRepository.deleteAll();
    }

    async findAllPublished(req: Request, res: Response): Promise<Tutorial[]> {
        return await tutorialRepository.retrieveAll({ published: true });
    }
}
