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
  } catch (e: any) {
    res.status(401).json({ error: "No free spot found" });
  }
});

export default parkingSpotsRouter;
