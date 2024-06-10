import { Router } from "express";
import Reservation from "../config/model/Reservation";
import Place from "../config/model/Place";

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

reservationsRouter.get("/getAll/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const reservationsList = await Reservation.find({
      userId: { $eq: userId },
    });
    res.status(200).json(reservationsList);
  } catch (e) {
    res.status(401).json({ error: "No reservations found" });
    console.log(e);
  }
});

reservationsRouter.post("/create", async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const place = await Place.find({
      number: { $eq: req.body.number },
    });
    if (place.length && place[0].reservedOn.includes(req.body.day)) {
      res.status(401).json({ error: "Place is already reserved" });
    }
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
