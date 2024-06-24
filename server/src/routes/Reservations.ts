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
  // try {
  //   const newReservation = new Reservation(req.body);
  //   const place = await ParkingSpot.find({
  //     number: { $eq: req.body.number },
  //   });
  //   if (place.length && place[0].reservedOn.includes(req.body.day)) {
  //     res.status(401).json({ error: "Place is already reserved" });
  //   }
  //   await newReservation.save();
  //   res.status(201).send(newReservation);
  // } catch (e) {
  //   res.status(401).json({ error: "Reservation creation failed" });
  // }
});

export default reservationsRouter;
