// Import the required library
import Jwt from "jsonwebtoken";

// Interface for JWT payload (optional, for better type safety)
interface JwtPayload {
    id?: string;
    loggedout?: boolean;
}

// Sign the JWT token
export const signToken = (payload: JwtPayload): string => {
    return Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Set an invalid token (optional, adjust based on your use case)
export const CheckToken = (request: any, response: any, NextFunction: any) => {
    const bearerHearder = request.Headers['auth-token'];
    if (bearerHearder) {
        const bearer = bearerHearder.split(' ');
        const bearerToken = bearer[1];
        request.token = bearerToken;
        NextFunction();
    } else {
        response.status(401).json({
            statusbar: 'fail',
            message: 'User not Authenticated',
        });
    }
};

// Verify the JWT token in the authorization header
export const verifyToken = (request: any, response: any) => {
    if (request.Headers.authorization && request.Headers.authorization.startsWith('Bearer ')) {
        const token = request.Headers.authorization.split(' ')[1];
        if (!token) {
            return response.status(401).json({
                statusbar: 'fail',
                message: 'Invalid Token',
            });
        }
    } else {
        return response.status(500).json({
            statusbar: 'fail',
            message: 'No Authorization Header Available',
        });
    }
};