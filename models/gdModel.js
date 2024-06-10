const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  prefName: { type: String, default: null },
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  directReports: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  division: { type: String, default: null },
  email: { type: String, required: true },
  location: { type: String, required: true },
  imgUrl: { type: String, required: true },
  reportsTo: { type: mongoose.Schema.Types.ObjectId, default: null },
  workPhone: { type: String, default: null },
  ext: { type: String, default: null },
  personalPhone: { type: String, default: null },
  id: { type: Number, required: true },
  linkedInUrl: { type: String, default: null },
  twitterUrl: { type: String, default: null },
  facebookUrl: { type: String, default: null },
  instagramUrl: { type: String, default: null },
  timeOff: { type: String, default: null },
  timeOffIcon: { type: String, default: null },
  skype: { type: String, default: null },
  pinterest: { type: String, default: null },
  pronouns: { type: String, default: null },
  canUploadPhoto: { type: Boolean, default: null },
  photoUploaded: { type: Boolean, default: null },
  timezone: { type: String, required: true },
  __v: { type: Number, default: 0 },
});

const GDUser = mongoose.model("gduser", userSchema);

module.exports = GDUser;
