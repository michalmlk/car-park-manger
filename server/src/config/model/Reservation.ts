import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  floor: Number,
  day: String,
  userId: String,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

const Reservation = mongoose.model("Reservation", schema);

export default Reservation;
