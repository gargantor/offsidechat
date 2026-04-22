import mongoose from "mongoose";
import { LiveSnapshotSchema } from "./schema";

export const LiveSnapshot = mongoose.models.LiveSnapshot || mongoose.model('LiveSnapshot', LiveSnapshotSchema);