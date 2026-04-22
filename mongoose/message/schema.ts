import { InferSchemaType, Schema } from "mongoose";

export const MessageSchema = new Schema({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  user: {
    userId: { type: String, required: true }, // Bisa ID user atau session ID guest
    username: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN', 'BOT'], default: 'USER' }
  },
  text: { type: String, required: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
});

// Indeks agar loading chat per match sangat cepat
MessageSchema.index({ matchId: 1, createdAt: -1 });

export declare type MessageType = InferSchemaType<typeof MessageSchema>