import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk để fetch danh sách phim có bộ lọc
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ genre, year, rating }) => {
    const query = new URLSearchParams({ genre, year, rating }).toString();
    const response = await fetch(`http://localhost:5000/api/movies?${query}`);
    return response.json();
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
