import { InferSchemaType, Schema } from "mongoose";

export const MatchSchema = new Schema({
  league: { type: Schema.Types.ObjectId, ref: 'League' },
  homeTeam: {
    name: { type: String, required: true },
    logo: { type: String },
    id: { type: Number } // ID provider
  },
  awayTeam: {
    name: { type: String, required: true },
    logo: { type: String },
    id: { type: Number }
  },
  startTime: { type: Date},  
  status: { 
    type: String, 
    enum: ['TBD', 'NS', '1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'FT', 'AET', 'PEN', 'PST', 'CANC', 'ABD', 'AWD', 'WO', 'LIVE'], 
    default: 'NS' 
  },
  slug: { type: String, }, //unique: true, required: true }, // persija-vs-persib-2024
  providerMatchId: { type: Number, unique: true, required: true }, // ID dari API-Football
  goals: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  },
  date: {type: String},
  timestamp: {type: Date },
  timezone: {type: String},
  venue:{
    city: {type: String},
    id: {type: String},
    name: {type: String},
  }
  
},
{
  timestamps: true
});

// Indeks untuk pencarian cepat di halaman depan
MatchSchema.index({ startTime: 1, status: 1 });

export declare type  MatchType = InferSchemaType<typeof MatchSchema>