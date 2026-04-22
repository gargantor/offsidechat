import mongoose from "mongoose";
import { LeagueSchema } from "./schema";

export const League = mongoose.models.League || mongoose.model('League', LeagueSchema);