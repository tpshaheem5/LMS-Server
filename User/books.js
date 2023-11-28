const bookSchema = require("../Model/booksDatabase")

const getAllBooks = async (req,res)=>{
    try {
        const allBooks = await bookSchema.find()
        res.status(200).json(allBooks)
    } catch (error) {
      console.error(error)
      res.status(500).json({error:"Internal Server error"})  
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
      res.status(500).json({ error: 'Internal Server error' });
    }
  };

  const borrowBook = async (req,res)=>{
    try {
        const bookId = req.params.bookId
        const book = await bookSchema
    } catch (error) {
        
    }
  }

module.exports = {getAllBooks,getBookDetails,reserveBook }