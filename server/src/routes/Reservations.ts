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

  const date = new Date(req.body.startTime);
  date.setUTCHours(0, 0, 0, 0);

  try {
    const existing = await Reservation.find({
      userId: req.body.userId,
      startTime: new Date(date),
    });

    if (existing[0]) {
      res.status(400).json({
        error: "You have already reserved another place at the same time.",
      });
    } else {
      const newReservation = new Reservation({
        ...req.body,
        startTime: new Date(date),
        endTime: new Date(date),
        status: "active",
      });
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

reservationsRouter.get("/getAll/:userId", async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    try {
      const reservations = await Reservation.find({
        userId: {
          $eq: userId,
        },
      });
      if (reservations.length) {
        res.status(200).json(reservations);
      } else {
        res.status(401).json(undefined);
      }
    } catch (e) {
      res.status(401).json({ error: "Failed to get reservation" });
    }
  }
});

reservationsRouter.get("/:userId/overview", async (req, res) => {
  const { userId } = req.params;
  if (userId) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
      const todaysReservation = await Reservation.find({
        userId: {
          $eq: userId,
        },
        startTime: {
          $eq: today,
        },
      });

      const nearest = await Reservation.find({
        userId: {
          $eq: userId,
        },
        startTime: {
          $gt: today,
        },
      });
      return res.status(200).json({ today: todaysReservation[0], nearest });
    } catch (e) {
      res.status(401).json({ error: "Failed to get reservations" });
    }
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

reservationsRouter.delete("/delete/:id/", async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const reservation = await Reservation.findById(id);
    if (reservation) {
      await Reservation.deleteOne(
        {
          _id: id,
        },
        { session },
      );
      await ParkingSpot.findByIdAndUpdate(reservation.parkingSpot, {
        status: "free",
        lastReservation: reservation._id,
      });
    }
    res.status(200).json("Reservation deleted");
    console.log("Transaction commited.");
    await session.commitTransaction();
  } catch (e) {
    res.status(401).json({ error: "Failed to delete reservation" });
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
});

export default reservationsRouter;
