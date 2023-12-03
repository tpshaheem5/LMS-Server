const mongoose = require("mongoose");
const reservationSchema = mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Users collection
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Reference to the Books collection
    required: true,
  },
  reservationDate: {
    type: Date,
    default: Date.now,
  },
  pickupDeadline: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Reservation",reservationSchema)