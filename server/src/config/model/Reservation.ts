import * as mongoose from "mongoose";

export interface ReservationDAO {
  userId: string;
  place: {
    type: typeof mongoose.Schema.Types.ObjectId;
    ref: string;
    required: true;
  };
  date?: Date;
  day?: string;
  isSeriesReservation: boolean;
}

const schema = new mongoose.Schema<ReservationDAO>({
  userId: {
    type: String,
    required: true,
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  date: {
    type: Date,
    required: function () {
      return !this.isSeriesReservation;
    },
  },
  day: {
    type: String,
    required: function () {
      return this.isSeriesReservation;
    },
  },
  isSeriesReservation: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model("Reservation", schema);

export default Reservation;
