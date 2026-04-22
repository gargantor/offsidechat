import { InferSchemaType, Schema } from "mongoose";

export const LeagueSchema: Schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true},
    type: {type: String, default: 'League'},
    logo: { type: String }, // URL logo liga
    flag: {type: String},
    providerLeagueId: { type: Number, unique: true, required: true }, // ID dari API-Football
    isPopular: { type: Boolean, default: false }
});

export declare type LeagueType = InferSchemaType<typeof LeagueSchema>