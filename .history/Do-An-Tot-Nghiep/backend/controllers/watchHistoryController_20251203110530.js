import WatchHistory from '../models/WatchHistory.js';

// Lấy tất cả lịch sử xem
export const getAllWatchHistory = async (req, res) => {
  try {
    const history = await WatchHistory.find();
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm lịch sử xem
export const addWatchHistory = async (req, res) => {
  const { user, movie } = req.body;

  try {
    const newHistory = new WatchHistory({ user, movie });
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateWatchHistory = async (req, res) => {
  try {
    const { userId, movieId, lastWatchedTime } = req.body;

    // Tìm lịch sử xem hiện có
    const existingHistory = await WatchHistory.findOne({ 
      user: userId, 
      movie: movieId 
    });

    if (existingHistory) {
      // Nếu đã có, cập nhật thời gian xem
      existingHistory.lastWatchedTime = lastWatchedTime;
      existingHistory.date = new Date();
      await existingHistory.save();
      res.status(200).json(existingHistory);
    } else {
      // Nếu chưa có, tạo mới
      const newHistory = new WatchHistory({
        user: userId,
        movie: movieId,
        lastWatchedTime,
        date: new Date()
      });
      await newHistory.save();
      res.status(200).json(newHistory);
    }
  } catch (error) {
    console.error('Error updating watch history:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật lịch sử xem' });
  }
};

export const getUserWatchHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const watchHistory = await WatchHistory.find({ user: userId })
      .populate('movie')
      .sort({ date: -1 });

    res.status(200).json(watchHistory);
  } catch (error) {
    console.error('Error getting watch history:', error);
    res.status(500).json({ message: 'Lỗi khi lấy lịch sử xem' });
  }
};
