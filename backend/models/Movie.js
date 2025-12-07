import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  year: { 
    type: Number, 
    required: true 
  },
  genre: {
    type: String,
    required: true
  },
  director: String,
  actors: [String],
  country: String,
  duration: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  views: {
    type: Number,
    default: 0
  },
  posterUrl: {
    type: String,
    required: true
  },
  backdropUrl: {
    type: String,
    required: true
  },
  trailerUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Movie', movieSchema);
