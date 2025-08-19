"use strict";
const multer = require("multer");
const path = require("path");

// Multer: store file temporarily in /tmp folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "tmp/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

exports.upload = multer({ storage });

// ImageKit config
const ImageKit = require("imagekit");
const fs = require("fs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Function to upload file to ImageKit
exports.uploadToImageKit = async (filePath, fileName) => {
    try {
        const uploadResponse = await imagekit.upload({
            file: fs.readFileSync(filePath), // actual file
            fileName: fileName
        });
        // Delete file from tmp after upload
        fs.unlinkSync(filePath);
        return uploadResponse;
    } catch (err) {
        throw err;
    }
};
