import mongoose from "mongoose";
import { UserSchema } from "./schema";

export const User = mongoose.models.User || mongoose.model('User', UserSchema);