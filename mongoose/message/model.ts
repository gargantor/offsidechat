import mongoose from "mongoose";
import { MessageSchema } from "./schema";

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);