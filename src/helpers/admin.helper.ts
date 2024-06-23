import { ADMIN, Prisma, PrismaClient } from "@prisma/client";
import prisma from "../Utils/prisma.Utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface AdminCreateInput {
    id: string,
    name: string,
    email: string,
    telephone_number: Number,
    admin_Id: string,
    password: string,
    createdAt: any,
    updatedAt: any,
    delflag: Boolean,
    user: any
}

const signUp = async (userSignUp: AdminCreateInput): Promise<any> => {
    try {
        const admin = await prisma.aDMIN.create({

            data: userSignUp as unknown as Prisma.ADMINCreateInput // ... data to create a ADMIN

        });
        return admin;

    } catch (error) {
        // console error message...
        console.error('Failed to create admin:', error);
        //Rethrow the error or handle it according to your application's error handling strategy
        throw error;
    }
};

// Fetch zero or more ADMINS
const getAdminAccount = async (): Promise<any[]> => {
    try {
        const admins = await prisma.aDMIN.findMany({});
        return admins;
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma client errors (e.g., validation errors)
            console.error("Prisma Admin finding error: ", error.message);
        } else {
            // Handle other unexpected errors
            console.error("Unexpected error: ", error);
        }
        throw error;
    }
};

// Get ADMIN BY {id}...
const getAdminById = async (id:string): Promise<any> => {
    try {
        const admin1 = await prisma.aDMIN.findUnique({
            where: { id },
        });
        return admin1;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma client errors (e.g., not found)
            if (error.code === "P2025") {
                // Check for "Record not found" error code
                console.error("Admin with ID ", id , " not found.");
                // Or throw a specific error for "not found"
                return null;
            } else {
                console.error("Prisma Admin finding error: ", error.message);
            }
        } else {
            // Handle other unexpected errors
            console.error("Unexpected error: ", error);
        }
        // Re-throw the error for further handling (optional)
        throw error; 
    }
}

// UPDATING ADMIN Details ...{ Update request }

const updateAdminById = async (id:string, data: Partial<ADMIN>): Promise<any> => {
    try {
        const UpdateAdmin = await prisma.aDMIN.update({
            where: { id },
            data,
        });
        return UpdateAdmin;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma client errors (e.g., not found)
            if (error.code === "P2025") {
                // Check for "Record not found" error code
                console.error("Admin with ID ", id , " not found.");
                // Or throw a specific error for "not found"
                return null;
            } else {
                console.error("Prisma Admin finding error: ", error.message);
            }
        } else {
            // Handle other unexpected errors
            console.error("Unexpected error: ", error);
        }
        // Re-throw the error for further handling (optional)
        throw error; 
    }
}

// Export all functions
export {
    signUp,
    getAdminAccount,
    getAdminById,
    updateAdminById,
}