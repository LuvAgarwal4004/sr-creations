import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "sr-creations"
    });
  } catch (err) {
  }
};

export default connectDb;