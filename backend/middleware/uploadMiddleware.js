const multer = require("multer");
const path = require("path");

//Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)){
    cb(null, true);
  }else{
    cb(new Error("Invalid file type. Only JPEG, JPG and PNG are allowed."), false);
  }
};

//Initialize upload
const upload = multer({storage, fileFilter});

module.exports = upload;