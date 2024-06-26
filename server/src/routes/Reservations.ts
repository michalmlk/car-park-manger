import { Router } from "express";
import Reservation from "../config/model/Reservation";

const reservationsRouter = Router();

reservationsRouter.get("/getAll", async (req, res) => {
  try {
    const reservationsList = await Reservation.find();
    return res.status(200).json(reservationsList);
  } catch (e) {
    res.status(401).json({ error: "No reservations found" });
    console.log(e);
  }
});

reservationsRouter.post("/create", async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(200).json(newReservation);
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "Failed to create reservation" });
  }
});

reservationsRouter.get("/get/:userId", async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    try {
      const reservation = await Reservation.find({
        userId: {
          $eq: userId,
        },
      });
      res.status(200).json(reservation[0]);
    } catch (e) {
      res.status(401).json({ error: "Failed to get reservation" });
    }
  }
});

export default reservationsRouter;
