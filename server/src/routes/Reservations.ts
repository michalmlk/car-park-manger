import { Router } from "express";
import Reservation from "../config/model/Reservation";
import ParkingSpot from "../config/model/ParkingSpot";
import mongoose from "mongoose";

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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const startTime = new Date(req.body.startTime);
    startTime.setUTCHours(0, 0, 0, 0);

    const existing = await Reservation.find({
      userId: req.body.userId,
      startTime,
    });

    if (existing[0]) {
      res.status(400).json({
        error: "You have already reserved another place at the same time.",
      });
    } else {
      const newReservation = new Reservation(req.body);
      await newReservation.save({ session });

      await ParkingSpot.findByIdAndUpdate(
        req.body.parkingSpot,
        {
          lastReservation: newReservation._id,
          status: "reserved",
        },
        { session },
      );
      console.log("Transaction committed.");
      await session.commitTransaction();
      res.status(200).json({
        message: "Reservation created",
      });
    }
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    res.status(401).json({ message: "Something  went wrong" });
  } finally {
    await session.endSession();
  }
});

reservationsRouter.get("/get/:userId/:date", async (req, res) => {
  const { userId, date } = req.params;
  if (userId) {
    const today = new Date(date);
    today.setUTCHours(0, 0, 0, 0);
    try {
      const reservation = await Reservation.find({
        userId: {
          $eq: userId,
        },
        startTime: {
          $eq: today,
        },
      });
      if (reservation.length) {
        res.status(200).json(reservation[0]);
      } else {
        res.status(401).json(undefined);
      }
    } catch (e) {
      res.status(401).json({ error: "Failed to get reservation" });
    }
  }
});

export default reservationsRouter;
