import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // hashed password
   role: {
    type: String,
    default: "admin"
  }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;
