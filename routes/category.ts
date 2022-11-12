import express from "express";
import { Category, validateCategory } from "models/Category";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  return res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.message);

  const newCategory = new Category({
    name: req.body.name,
  });

  await newCategory.save();
  res.send(newCategory);
});

export default router;
