import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  number: Number,
  floor: Number,
  reservedOn: [String],
});

const Place = mongoose.model("Place", schema);

export default Place;
