import express from "express";
import summary from "../utility/summary.js";
import extractEntities from "../utility/entityExtraction.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const text = req.body;
  if (text.length === 0) {
    return res.json({
      errors: [{ msg: "text input required" }],
    });
  }
  try {
    // const result = await summary(text);
    const entities = extractEntities(text);
    res.json(entities);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export default router;
