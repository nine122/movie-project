const express = require("express");
const { body } = require("express-validator");
const MovieController = require("../controllers/MovieController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const upload = require("../helpers/upload");

const router = express.Router();

router.get("", MovieController.index);
router.post(
  "",
  [
    body("title").notEmpty(),
    body("genre").notEmpty(),
    body("duration").notEmpty(),
  ],
  handleErrorMessage,
  MovieController.store
);
router.get("/:id", MovieController.show);
router.post(
  "/:id/upload",
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Photo is required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("photo must be image");
      }
      return true;
    }),
  ],
  handleErrorMessage,
  MovieController.upload
);
router.delete("/:id", MovieController.destroy);
router.patch("/:id", MovieController.update);

module.exports = router;
