const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaceSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  facilities: [String],
  price: Number,
  extraInfo: String,
  openTime: Number,
  closeTime: Number,
  maxGuests: Number,
});

const PlaceModel = mongoose.model("Place", PlaceSchema);

module.exports = PlaceModel;
