import mongoose, { Schema } from "mongoose";

export interface PlaceDAO {
  number: number;
  floor: number;
  reservedOn: string[];
  isSeriesReserved: boolean;
}

const schema = new Schema<PlaceDAO>({
  number: Number,
  floor: Number,
  reservedOn: [Date],
  isSeriesReserved: Boolean,
});

const Place = mongoose.model("Place", schema);

export default Place;
