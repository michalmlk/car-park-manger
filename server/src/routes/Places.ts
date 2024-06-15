import { Router } from "express";
import Place from "../config/model/Place";
import mongoose from "mongoose";
import { DEMO_PLACES } from "../data/demo-places";

const placesRouter = Router();

placesRouter.get("/get/:place/:day", async (req, res) => {
  try {
    const place = await Place.find({
      number: { $eq: req.params.place },
    });
    if (!place) {
      res.status(404).send();
    }
    res.status(200).json(place[0]);
  } catch (e: unknown) {
    res.status(401).json({ error: "No place found" });
  }
});

placesRouter.get("/getById/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.status(200).json(place);
  } catch (e: unknown) {
    res.status(401).json({ error: "No place found" });
  }
});

placesRouter.put("/update/:id", async (req, res) => {
  try {
    const placeId = req.params.id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(placeId)) {
      res.status(400).send({ error: "Invalid place id" });
    }

    const updatedPlace = await Place.findByIdAndUpdate(placeId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlace) {
      res.status(404).send({ error: "Place not found" });
    }
    res.status(200).json(updatedPlace);
  } catch (err) {
    res.status(500).send({ error: "Failed to update place" });
  }
});

placesRouter.get("/availablePlaces/:floor/:day", async (req, res) => {
  const floor = req.params.floor;
  const day = req.params.day;
  try {
    const availablePlacesForSelectedFloor = await Place.find({
      floor: { $eq: floor },
      reservedOn: { $not: { $in: [day] } },
    });
    res.status(200).json(availablePlacesForSelectedFloor);
  } catch (err) {
    res.status(401).json({ error: `No places found for floor ${floor}.` });
  }
});

placesRouter.post("/create", async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).send(place);
  } catch (err) {
    res.status(401).json({ error: "Place creation failed" });
  }
});

placesRouter.post("/demodata", async (req, res) => {
  try {
    await Place.insertMany(DEMO_PLACES);
    res.status(200).json("DEMO PLACES added successfully");
  } catch (err) {
    res.status(400).json({ error: "Failed to load demo places" });
  }
});

export default placesRouter;
