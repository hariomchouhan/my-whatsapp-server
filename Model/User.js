import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  iss: { type: String },
  nbf: { type: Number },
  azp: { type: String },
  aud: { type: String },
  hd: { type: String },
  email: { type: String },
  sub: { type: String, required: true },
  email_verified: { type: Boolean },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  given_name: { type: String },
  family_name: { type: String },
  iat: { type: Number },
  exp: { type: Number },
  jti: { type: String },
});

export const UserModel = mongoose.model("user", userSchema);