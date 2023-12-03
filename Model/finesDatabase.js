const mongoose = require("mongoose");
const finesSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Users collection
    required: true,
  },
  // loanId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Loan", // Reference to the Loans collection
  //   required: true,
  // },
  fineAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Unpaid"],
    required: true,
  },
  paymentDate: Date, 
});

module.exports = mongoose.model("Fines",finesSchema );