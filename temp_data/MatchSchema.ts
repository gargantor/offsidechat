const MatchSchema = new Schema({
  leagueId: { type: Schema.Types.ObjectId, ref: 'League' },
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
  startTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['TBD', 'NS', '1H', 'HT', '2H', 'ET', 'P', 'FT', 'CANC', 'ABD'], 
    default: 'NS' 
  },
  slug: { type: String, unique: true, required: true }, // persija-vs-persib-2024
  providerMatchId: { type: Number, unique: true, required: true }, // ID dari API-Football
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 }
  }
});

// Indeks untuk pencarian cepat di halaman depan
MatchSchema.index({ startTime: 1, status: 1 });
//export const Match = mongoose.models.Match || mongoose.model('Match', MatchSchema);