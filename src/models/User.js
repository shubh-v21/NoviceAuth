import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Not required for Google auth
  },
  isGoogleAuth: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verificationOTP: {
    code: String,
    expiresAt: Date,
  },
  resetPasswordToken: {
    token: String,
    expiresAt: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to prevent overwriting
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User; 