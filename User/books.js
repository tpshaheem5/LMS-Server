const bookSchema = require("../Model/booksDatabase")
const userSchema = require('../Model/userDatabase')

const getAllBooks = async (req,res)=>{
    try {
        const allBooks = await bookSchema.find()
        res.status(200).json(allBooks)
    } catch (error) {
      console.error(error)
      res.json({error:error.message})  
    }
}

const getBookDetails  = async (req,res)=>{
    try {
        const bookId = req.params.bookId;
        const detailsbook = await bookSchema.findById(bookId)
        
        if(!detailsbook){
            return res.status(404).json({error:"Book not found"})
        }
        res.status(200).json(detailsbook)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
}

// const searchBooks = async (req,res)=>{
//     try {
//         const { title, author, isbn } = req.query;
//         const searchQuery = {};
//         if (title) searchQuery.title = new RegExp(title, "i");
//         if (author) searchQuery.author = new RegExp(author, "i");
//         if (isbn) searchQuery.isbn = isbn;

//         const searchResults = await bookSchema.find(searchQuery);

//         res.status(200).json(searchResults);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server error" });
//     }
// }

const reserveBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await bookSchema.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      if (book.availableCopies > 0) {
        // If there are available copies, reserve the book
        book.availableCopies -= 1;
        await book.save();
  
        res.status(201).json({ message: 'Book reserved successfully', reservedBook: book });
      } else {
        res.status(400).json({ error: 'No available copies for reservation' });
      }
    } catch (error) {
      console.error(error);
      res.json({ error: error.message });
    }
  };
  const borrowBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await bookSchema.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      if (book.availableCopies > 0) {
        
         await userSchema.updateOne({_id:book._id},{$set:{availableCopies:book.availableCopies - 1}});
        const user = await userSchema.findById(res.token);
        if (user) {
          await userSchema.updateOne({_id:res.token},{$push:{borrowBooks:book}});
          res.status(201).json({ message: 'Book borrowed successfully', borrowedBook: book });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } else {
        res.status(400).json({ error: 'No available copies for borrowing' });
      }
    } catch (error) {
      console.error(error);
      res.json({ error: error.message });
    }
  };
  
const returnBook = async (req,res)=>{
  try {
    const bookId = req.params.bookId;
    const book = await bookSchema.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.availableCopies > 0) {
    
       await userSchema.updateOne({_id:book._id},{$set:{availableCopies:book.availableCopies + 1}});
      const user = await userSchema.findById(res.token);
      if (user) {
        await userSchema.updateOne({_id:res.token},{$pull:{borrowBooks:{_id:book._id}}});
        res.status(201).json({ message: 'Book returned successfully', borrowedBook: book });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(400).json({ error: 'Book is not currently borrowedg' });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
}

module.exports = {getAllBooks,getBookDetails,reserveBook,borrowBook,returnBook }