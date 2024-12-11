
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
});

const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        console.log("File uploaded to Cloudinary:", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log('Failed to upload file - Cloudinary : ', error)
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteFromCloudinary = async (fileUrl: string) => {
    try {
        const publicId = fileUrl.split('/').pop()!.split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        console.log('File deleted from Cloudinary:', fileUrl);
    } catch (error) {
        console.error('Failed to delete file from Cloudinary:', error);
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };