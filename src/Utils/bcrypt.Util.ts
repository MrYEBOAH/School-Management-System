import * as bcrypt from "bcrypt";

interface HashOptions {
    // Optional property for customizing salt rounds...
    saltRounds?: number;
}

export const hash = async (password:string, options?: HashOptions): Promise<string> => {
    const saltRounds = options?.saltRounds ?? 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassord = await bcrypt.hash(password, salt);
    return hashedPassord;
    };

export const compare = async (password: string, hashedPassord: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hashedPassord);
    return result;
}