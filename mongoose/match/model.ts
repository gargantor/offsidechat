import mongoose from "mongoose";
import { MatchSchema } from "./schema";

export const Match = mongoose.models.Match || mongoose.model('Match', MatchSchema);