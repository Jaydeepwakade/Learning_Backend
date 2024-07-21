
require("dotenv").config()
const express = require("express")
const path = require("path")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const fs = require("fs")


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = express()
const port = 3000
 const uploaddir=path.join(__dirname,"uploads")
 if(!fs.existsSync(uploaddir)){
    fs.mkdirSync(uploaddir)
 }
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploaddir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

server.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        console.log("no file uploded")
       return res.status(400).json({ message: "No files uploaded" })
    }
    console.log("file uploaded",req.file)
    cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
          return  res.status(500).json({ message: "upload failed", error })
        }

        res.status(200).json({
            message: "Fle uploaded succesfully",
            url: result.secure_url
        })
    })

})

server.listen(port, (req, res) => {
    console.log(`server is running on the port ${port}`)
})