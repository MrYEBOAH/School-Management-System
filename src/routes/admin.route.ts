import * as Admin from "../Controllers/admin.Controllers";
import { Router, Request, Response, NextFunction } from "express";
const router: Router = Router();



interface Admin {
    addAdmin(req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

// Define routes with explicit types
router.post("/signUp", Admin.addAdmin);

export default router;