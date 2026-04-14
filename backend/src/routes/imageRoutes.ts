import { Router } from "express";
import multer from "multer";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import {
  uploadImage,
  deleteImage,
  reconcileImages
} from "../controllers/imageController";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and WebP are allowed."));
    }
  }
});

// Upload file to R2
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("file"),
  uploadImage
);

// Delete file from R2 and sync with DB
router.delete("/", authenticate, authorize("admin"), deleteImage);

// Reconcile storage (Cleanup orphaned files)
router.post("/cleanup", authenticate, authorize("admin"), reconcileImages);

export default router;
