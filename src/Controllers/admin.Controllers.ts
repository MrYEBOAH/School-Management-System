// Import * necesary path and variables...
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "../Utils/bcrypt.Util";
import { signToken } from "../Utils/token.Utils";
import { HttpStatus } from "../Utils/httpStatus.Utils";

interface AdminCreate{
    id: string,
    name: string,
    email: string,
    telephone_number: number,
    admin_Id: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    delflag: boolean,
    user: any
};

interface JwtPayload{
    id: string
}
const signUp = async(data: any): Promise<AdminCreate> =>{
    throw new Error("Function not implemented.");
}
const addAdmin = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const admin = await signUp (req.body as AdminCreate);
        if (admin.password) {
            admin.password = await bcrypt.hash(admin.password);
        }
        
        const payload: JwtPayload = {
            id: admin.admin_Id
        };
        const token = await signToken(payload);
        res.status(HttpStatus.CREATED).json({
            admin,
            token
        });
    } catch (error) {
        console.error("Admin SignIn error: ", error);
        next(error);
    }
};

export {
    addAdmin,
}


