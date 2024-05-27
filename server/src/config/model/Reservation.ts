import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: Number,
    userName: String,
    place: Number
})

const Reservation = mongoose.model('Reservation', schema);

export default Reservation;