import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 10,
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowed =
      file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");
    cb(null, allowed);
  },
});
