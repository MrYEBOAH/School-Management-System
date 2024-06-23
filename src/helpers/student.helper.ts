import { STUDENT, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "src/Utils/prisma.Utils";


interface StudentCreateInput {
    id: string,
    index_number: string
    password: string
    createdAt: Date
    updatedAt: Date
    delflag: boolean
    user: any
}

const signUp = async (userSignUp: StudentCreateInput): Promise<any> => {
    try {
        const student = await prisma.sTUDENT.create({
            // ... data to create a STUDENT...  
            data: userSignUp as unknown as Prisma.STUDENTCreateInput
        });
        return student;

    } catch (error) {
        // console error message...
        console.error('Failed to create student: ', error);
        //Rethrow the error or handle it according to your application's error handling strategy
        throw error;
    }
};

// Fetch zero or more STUDENTS...
const getStudentsAccount = async (): Promise<any[]> => {
    try {
        const students = await prisma.sTUDENT.findMany({});
        return students;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma client errors (e.g., validation errors)
            console.error("Prisma Student Finding error: ", error.message);
        } else {
            // Handle other unexpected errors
            console.error("Unexpected error: ", error);
        }
        throw error;
    }
};
// Get ADMIN BY {id}...
const getStudentById = async (id: string): Promise<any> => {
    try {
        const student1 = await prisma.sTUDENT.findUnique({
            where: { id },
        });
        return student1;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma client errors (e.g., not found)
            if (error.code === "P2025") {

                // Check for "Record not found" error code...
                console.error("Student with ID", id, " not found.");
                // Or throw a specific error for "not found"
                return null;
            } else {
                console.error("Prisma Student finding error: ", error.message);
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
const updateStudent = async (id:string, data: Partial<STUDENT>): Promise<any> => {
    try {
        const UpdateStudent = await prisma.sTUDENT.update({
            where: { id },
            data,
        });
        return UpdateStudent;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma client errors (e.g., not found)
            if (error.code === "P2025") {
                // Check for "Record not found" error code
                console.error("Student with ID ", id , " not found.");
                // Or throw a specific error for "not found"
                return null;
            } else {
                console.error("Prisma Student finding error: ", error.message);
            }
        } else {
            // Handle other unexpected errors
            console.error("Unexpected error: ", error);
        }
        // Re-throw the error for further handling (optional)
        throw error; 
    }
}

// DELETING STUDENT ACCOUNT...
const deleteStudent = async (id:string): Promise<boolean> => {
    try {
        // Attempt to delete the student using prisma.sTUDENT.delete()
        await prisma.sTUDENT.delete({ where: { id } });
        // If deletion succeeds, return true..
        return true;
    } catch (error) {
        if( error instanceof PrismaClientKnownRequestError) {
            // Handle known Prisma errors (e.g., "Record not found")
            if ( error.code === "P2003") {
                // Check for "Record to delete not found" code
                console.error("Student with ID ", id , " not found.");
                // Indicate deletion failure (not found)
                return false;
            } else{
                console.error("Prisma Student deletion error: ", error.message);
                throw error; // Re-throw for further handling
            }
        } else{
            // Handle other unexpected errors
            console.error(" Unexpected error: ", error);
            throw error; // Re-throw for further handling
        }    
    }
}

export {
    signUp,
    getStudentsAccount,
    getStudentById,
    updateStudent,
    deleteStudent
}