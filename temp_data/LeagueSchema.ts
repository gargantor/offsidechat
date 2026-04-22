const LeagueSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  logo: { type: String }, // URL logo liga
  providerLeagueId: { type: Number, unique: true, required: true }, // ID dari API-Football
  isPopular: { type: Boolean, default: false }
});

export const League = mongoose.models.League || mongoose.model('League', LeagueSchema);