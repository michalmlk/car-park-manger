import { Router } from "express";
import ParkingSpot from "../config/model/ParkingSpot";

const parkingSpotsRouter = Router();

parkingSpotsRouter.get("/availableSpots", async (req, res) => {
  try {
    const availableSpots = await ParkingSpot.find({
      status: {
        $eq: "free",
      },
    });
    res.status(200).json(availableSpots);
  } catch (e) {
    res.status(401).json({ error: "No free spot found" });
  }
});

parkingSpotsRouter.get("/getSpot/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const spot = await ParkingSpot.findById(id);
      res.status(200).json(spot);
    } catch (e) {
      res.status(401).json({ error: "No free spot found" });
    }
  }
});

parkingSpotsRouter.put("/pick/:id", async (req, res) => {
  try {
    const updatedPlace = await ParkingSpot.findByIdAndUpdate(req.params.id, {
      ...req.body,
      status: "reserved",
    });
    if (!updatedPlace) {
      res.status(401).json({ error: " Invalid id." });
    } else {
      await updatedPlace.save();
      res.status(200).json(updatedPlace);
    }
  } catch (e) {
    res.status(401).json({ error: "Update failed" });
  }
});

export default parkingSpotsRouter;
