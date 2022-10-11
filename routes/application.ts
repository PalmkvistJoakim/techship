import express from "express";
const router = express.Router();
import { Application, validateApplication } from "models/Application";

router.get("/", async (req, res) => {
  const application = await Application.find();
  return res.status(200).send(application);
});
router.get("/:id", async (req, res) => {
  const application = await Application.findById(req.params.id);
  return res.status(200).send(application);
});

router.post("/", async (req, res) => {
  const { error } = validateApplication(req.body);
  if (error) return res.status(400).send(error.message);

  const application = {
    imgae: req.body.image,
    notis: req.body.notis,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    address: req.body.address,
    phone: req.body.phone,
    stage: req.body.stage,
    description: req.body.description,
  };

  const newapplication = new Application(application);
  await newapplication.save();

  return res
    .status(201)
    .send(`Tack för ansökan ${application.name}, vi återkommer.`);
});

router.put("/:id", async (req, res) => {
  const applicationId = await Application.findById(req.params.id);
  if (!applicationId) return res.status(400).send("Ansökan hittades ej.");

  await Application.findByIdAndUpdate(req.params.id, req.body);

  return res.send(req.body);
});

router.delete("/:id", async (req, res) => {
  const applicationId = await Application.findByIdAndDelete(req.params.id);
  if (!applicationId)
    return res.status(400).send("Ansökan hittades ej. Försök igen!");

  return res.send("Delete Success!");
});

export default router;
