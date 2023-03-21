const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
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

const RoomModel = mongoos.model("Room", RoomSchema);

module.exports = RoomModel;
