import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://parikesitwidodo_db_user:M8JPD5g8aJrN6EVv@cluster0.eatljww.mongodb.net/appdb?retryWrites=true&w=majority";
// const MONGO_URI = "mongodb://parikesitwidodo_db_user:M8JPD5g8aJrN6EVv@ac-llcotdp-shard-00-00.eatljww.mongodb.net:27017,ac-llcotdp-shard-00-01.eatljww.mongodb.net:27017,ac-llcotdp-shard-00-02.eatljww.mongodb.net:27017/appdb?ssl=true&replicaSet=atlas-69uhmh-shard-0&authSource=admin&retryWrites=true&w=majority";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("bufferCommands", false);

    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // jangan 10 detik
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}