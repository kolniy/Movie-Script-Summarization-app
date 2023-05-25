import express from "express";
import summaryAndEntityExtraction from "../utility/summarizationAndEntityExtraction.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const text = req.body;
  if (text.length === 0) {
    return res.json({
      errors: [{ msg: "text input required" }],
    });
  }
  try {
    const entities = summaryAndEntityExtraction(text);
    res.json(entities);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export default router;
