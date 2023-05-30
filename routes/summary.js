import fs from "fs";
import path from "path";
import express from "express";
import { readPdfText } from "pdf-text-reader";
import multer from "multer";
import summaryAndEntityExtraction from "../utility/summarizationAndEntityExtraction.js";

const router = express.Router();

/** Multer */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ dest: "uploads/", storage });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.json({ msg: "file not found" });
  }
  let fileContents = "";
  try {
    const filePath = req.file.path;
    const pages = await readPdfText(filePath);
    pages.forEach((page) => {
      fileContents += page.lines;
    });

    // delete uploaded file after reading contents into memory
    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });

    const entities = await summaryAndEntityExtraction(fileContents);
    res.json(entities);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export default router;
