import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  floor: Number,
  date: Date,
  userId: Number,
  userName: String,
  place: Number,
});

const Reservation = mongoose.model("Reservation", schema);

export default Reservation;
