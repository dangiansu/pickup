import path from 'path';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';

export const uploadFile = async (
  file: UploadedFile,
  folderName: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure the folder exists
      const uploadPath = path.join(__dirname, '../public/uploads', folderName);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Create the folder if it doesn't exist
      }

      // Validate file type (allow only images)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.mimetype)) {
        return reject(
          new Error('Invalid file type. Only JPG, PNG, and JPEG are allowed.')
        );
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return reject(new Error('File size exceeds the 5MB limit.'));
      }

      // Generate a unique file name
      const uniqueKey = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.name);
      const fileName = `${uniqueKey}${extension}`; // Unique file name
      const fullPath = path.join(uploadPath, fileName);

      // Move the file to the destination folder
      file.mv(fullPath, (err) => {
        if (err) {
          return reject(new Error('Failed to upload the file.'));
        }
        resolve(`${folderName}/${fileName}`); // Return the file path
      });
    } catch (error) {
      reject(error);
    }
  });
};
