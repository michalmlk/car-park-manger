import { Router } from "express";
import Reservation from "../config/model/Reservation";

const reservationsRouter = Router();

reservationsRouter.get("/getAll", async (req, res) => {
  try {
    const reservationsList = await Reservation.find();
    console.log(reservationsList);
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
    res.status(201).send(newReservation);
  } catch (e) {
    res.status(401).json({ error: "Reservation creation failed" });
  }
});

reservationsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.status(200).send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default reservationsRouter;
