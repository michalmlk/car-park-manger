import { connect } from "mongoose";
import ParkingSpot from "./config/model/ParkingSpot";
import { DEMO_PLACES } from "./data/demo-places";

async function main() {
  await connect();
  //place your uri here ,
  try {
    await ParkingSpot.insertMany(DEMO_PLACES);
    console.log("Demo data loades successfully");
  } catch (err) {
    console.log("Error while inserting places data");
  } finally {
    process.exit(0);
  }
}

main();
