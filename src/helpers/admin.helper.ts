import { ADMIN, Prisma } from "@prisma/client";
import prisma from "../Utils/prisma.Utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
interface AdminCreateInput{
    id: String
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

const signUp = async (userSignUp: AdminCreateInput): Promise<any> => {
    try {
        const admin = await prisma.aDMIN.create({
                // ... data to create a ADMIN
            data: userSignUp as unknown as Prisma.ADMINCreateInput

        });
        return admin;

    } catch (error) {
        // console error message...
        console.error('Failed to create admin:', error);
        //Rethrow the error or handle it according to your application's error handling strategy
        throw error;
    }
};

const logIn = async (admin_Id:string): Promise<AdminCreateInput | null> => {
    try {
        const adminLogIn = await prisma.aDMIN.findUnique({
            where: { admin_Id }
        });
        return adminLogIn;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
             // Handle known Prisma client errors (e.g., not found)
             if ( error.code === "P2025") {
                // Check for "Record not found" error code
                console.error(" Loging in with admin_Id ", admin_Id," not found.");
                return null; // Indicate login failure (not found)
             } else {
                console.error(" Prisma Admin finding error: ", error.message);
                throw error; // Re-throw for further handling
             }
        } else {
            // Handle other unexpected errors
            console.error( "Unexpected error: ", error);
            throw error; // Re-throw for further handling...
         }
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

const updateAdmin = async (id:string, data: Partial<ADMIN>): Promise<any> => {
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

const deleteAdmin = async (id:string): Promise<boolean> => {
    try {
        // Attempt to delete the admin using prisma.aDMIN.delete()
        await prisma.aDMIN.delete({ where: { id } });
        // If deletion succeeds, return true..
        return true;
    } catch (error) {
        if( error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma errors (e.g., "Record not found")
            if ( error.code === "P2003") {
                // Check for "Record to delete not found" code
                console.error("Admin with ID ", id , " not found.");
                // Indicate deletion failure (not found)
                return false;
            } else{
                console.error("Prisma Admin deletion error: ", error.message);
                throw error; // Re-throw for further handling
            }
        } else{
            // Handle other unexpected errors
            console.error(" Unexpected error: ", error);
            throw error; // Re-throw for further handling
        }    
    }
}

// Export all functions
export {
    signUp,
    logIn,
    getAdminAccount,
    getAdminById,
    updateAdmin,
    deleteAdmin
}