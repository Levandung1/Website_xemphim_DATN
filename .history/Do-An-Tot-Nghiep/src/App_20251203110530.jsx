import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import MovieDetail from './pages/MovieDetail';
import GlobalStyles from './styles/GlobalStyles'; // ✅ Import thêm dòng này

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import ManageMovies from './admin/pages/ManageMovies';
import ManageUsers from './admin/pages/ManageUsers';
import ManageComments from './admin/pages/ManageComments';
import ManageWatchHistory from './admin/pages/ManageWatchHistory';
import ManageCategories from './admin/pages/ManageCategories';
import AdminLogin from './admin/pages/AdminLogin';
import RequireAdmin from './admin/RequireAdmin';
import WatchHistory from './pages/WatchHistory';
function App() {
  return (
    <Router>
      <GlobalStyles /> {/* ✅ Kích hoạt style toàn cục */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch-history" element={<WatchHistory />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/manage-movies"
          element={
            <RequireAdmin>
              <AdminLayout>
                <ManageMovies />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <RequireAdmin>
              <AdminLayout>
                <ManageUsers />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/manage-comments"
          element={
            <RequireAdmin>
              <AdminLayout>
                <ManageComments />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/manage-history"
          element={
            <RequireAdmin>
              <AdminLayout>
                <ManageWatchHistory />
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/manage-categories"
          element={
            <RequireAdmin>
              <AdminLayout>
                <ManageCategories />
              </AdminLayout>
            </RequireAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
