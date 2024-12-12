import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "./config";

cloudinary.config({ 
  cloud_name: config.cloudinaryCloudName!,
  api_key: config.cloudinaryApiKey!,
  api_secret: config.cloudinarySecret!
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