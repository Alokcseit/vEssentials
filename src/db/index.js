import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
      {
        writeConcern: {
          w: "majority",
        },
      }
    );
    console.log("database connected");
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log(error);
  }
};
export { connectDB };
