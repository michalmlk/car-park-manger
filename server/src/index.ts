import express from "express";
import { config } from "dotenv";
import cors from "cors";

import reservationsRouter from "./routes/Reservations";
import parkingSpotsRouter from "./routes/ParkingSpots";
import mongoose from "mongoose";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/reservations", reservationsRouter);
app.use("/api/parkingSpots", parkingSpotsRouter);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URI!)
    .catch((error) => console.log(`Connection error ${error}`));
  console.log("Server running on port", process.env.PORT);
});
