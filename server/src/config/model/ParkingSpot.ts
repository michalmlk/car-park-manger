import mongoose, { Schema } from "mongoose";

export interface ParkingSpotDAO {
  number: number;
  level: number;
  status: "free" | "reserved";
  lastReservation:
    | {
        type: typeof mongoose.Schema.Types.ObjectId;
        ref: string;
        required: true;
      }
    | undefined;
}

const schema = new Schema<ParkingSpotDAO>({
  number: Number,
  level: Number,
  status: String,
  lastReservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: false,
  },
});

const ParkingSpot = mongoose.model("ParkingSpot", schema);

export default ParkingSpot;
