import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // hashed password
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;
