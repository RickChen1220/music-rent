const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  place: { type: Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
