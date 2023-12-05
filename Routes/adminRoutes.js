const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController");
const bookController = require("../Controller/bookController")
const usermanagement = require("../Controller/usermanagement")
const fines = require('../Controller/fines')
const tryCatch = require("../middlware/tryCatch")
const auth = require("../middlware/auth")
const reservation = require("../Controller/reservation")

router.post('/login',auth,tryCatch(adminController));

router.post("/addbooks",tryCatch(bookController.addBook))
router.get("/allbooks",tryCatch(bookController.getAllBooks))
router.get("books/:bookId",tryCatch(bookController.getBookDetails))
router.put("books/:bookId",tryCatch(bookController.updateBookDetails))
router.delete("books/:bookId",tryCatch(bookController.deleteBook))

router.get("/allusers", tryCatch(usermanagement.getAllUsers));
router.get("/users/:userId",tryCatch(usermanagement.getUserDetails))
router.delete("/users/:userId",tryCatch(usermanagement.deleteUser))

router.get("/fines",auth,tryCatch(fines.getAllFines))
router.post("/fines",auth,tryCatch(fines.createFines))
router.get("/fines/:fineId",auth,tryCatch(fines.specificFine))
router.put("/fines/:fineId",auth,tryCatch(fines.updateFine))
router.delete("/fines/:fineId",auth,tryCatch(fines.deleteFine))

router.get("/allreserve",auth,tryCatch(reservation.getAllReservation))
router.get("/reserve/:reserveId",auth,tryCatch(reservation.specificReserve))
router.delete("/reserve/:reserveId",auth,tryCatch(reservation.deleteReserve))

module.exports = router;