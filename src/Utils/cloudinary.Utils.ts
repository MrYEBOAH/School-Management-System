// Import the entire module
import * as cloudinary from 'cloudinary';

// Define an interface for Cloudinary configuration options
interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

// Configure Cloudinary with environment variables (assuming they exist)
const config: CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
};

cloudinary.config(config);

// Export the v2 instance
export default cloudinary.v2;
