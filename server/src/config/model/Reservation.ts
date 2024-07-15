import * as mongoose from "mongoose";

export interface ReservationDAO {
  userId: string;
  parkingSpot: {
    type: typeof mongoose.Schema.Types.ObjectId;
    ref: string;
    required: true;
  };
  startTime: Date;
  endTime: Date;
  status: "active" | "completed" | "cancelled";
}

const schema = new mongoose.Schema<ReservationDAO>({
  userId: {
    type: String,
    required: true,
  },
  parkingSpot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSpot",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", schema);

export default Reservation;
