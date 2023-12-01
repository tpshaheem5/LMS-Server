const express = require("express");
const router = express.Router()
const auth = require("../middlware/auth")
const bodyparser = require("body-parser");
const userController = require("../User/userController")
const books = require("../User/books")
const tryCatch = require ("../middlware/tryCatch.js")
const profile = require("../User/userProfile")
const loans = require("../User/loans")

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));


router.get("/loans/:bookId",auth,tryCatch(loans.getSpecificBorrowedBook))
router.get("/loans",auth,tryCatch(loans.getBorrowedbook))
router.post("/signup",tryCatch(userController.signup))
router.post("/login",tryCatch(userController.login))

router.get("/allbooks",auth,tryCatch(books.getAllBooks))
router.get("/books/:bookId",auth,tryCatch(books.getBookDetails))
// router.get("/search",tryCatch(books.searchBooks))
router.post("/books/:bookId/reserve",auth,tryCatch(books.reserveBook))
router.post("/books/:bookId/borrow",auth,tryCatch(books.borrowBook))
router.post("/books/:bookId/return",auth,tryCatch(books.returnBook))

router.get("/profile",auth,tryCatch(profile.getUserProfle))
router.put("/profile",auth,tryCatch(profile.updateProfile))
router.put("/password",auth,tryCatch(profile.updatePassword))



module.exports = router 