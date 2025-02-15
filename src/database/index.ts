import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/db_users";

export const connectDB = async (): Promise<void> => {
  const mongo = await mongoose.connect(MONGO_URI);

  if(!mongo){
     console.error("Erro ao conectar ao MongoDB:");
     process.exit(1)
  }

  console.log('Conectado ao mongoDB com sucesso');

}