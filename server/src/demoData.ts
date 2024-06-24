import { connect } from "mongoose";
import ParkingSpot from "./config/model/ParkingSpot";
import { DEMO_PLACES } from "./data/demo-places";

async function main() {
  await connect(
    "mongodb+srv://michalmelka1:test123@carparkcluster.hcgagwl.mongodb.net/?retryWrites=true&w=majority&appName=CarParkCluster",
  );
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
