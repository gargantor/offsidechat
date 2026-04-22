import { InferSchemaType, Schema } from "mongoose";

export const LiveSnapshotSchema = new Schema({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true, unique: true },
  // Data mentah dari API (events, stats, lineups) disimpan dalam satu object
  data: { type: Object, required: true },
  fetchedAt: { type: Date, default: Date.now },
  // Fitur TTL: Data akan otomatis terhapus dari DB setelah waktu tertentu
  expireAt: { type: Date, required: true } 
});

// Indeks TTL (Time To Live)
LiveSnapshotSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export declare type LiveSnapshotType = InferSchemaType<typeof LiveSnapshotSchema>