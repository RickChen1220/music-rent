const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaceSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  price: [String],
  extraInfo: String,
  openTime: Number,
  closeTime: Number,
  maxGuests: Number,
});

const PlaceModel = mongoos.model("Place", PlaceSchema);

module.exports = PlaceModel;
