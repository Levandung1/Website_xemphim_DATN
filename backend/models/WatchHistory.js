import mongoose from 'mongoose';

const watchHistorySchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie',
    required: true 
  },
  lastWatchedTime: {
    type: Number,
    default: 0
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema);
export default WatchHistory;
