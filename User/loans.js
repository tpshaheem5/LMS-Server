const userSchema = require("../Model/userDatabase")
const bookSchema = require("../Model/booksDatabase")
const reserveSchema = require("../Model/reservationDatabase")

const getBorrowedbook = async (req,res)=>{
    try {
        const user = await userSchema.findById({ _id: res.token })
        if(user){
            res.status(200).json({borrowedBooks:user.borrowBooks})
        }else{
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
const getSpecificBorrowedBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const user = await userSchema.findById(res.token);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const borrowedBook = user.borrowBooks.find(book => book._id == bookId);
        if (!borrowedBook) {
            return res.status(404).json({ error: 'Book not found in user\'s borrowed list' });
        }
        res.status(200).json({ borrowedBookDetails: borrowedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getReservedBook = async (req,res)=>{
    try {
        const userId = res.token 
       
        const userReserve = await reserveSchema.findOne({userId:userId})
        if(userReserve){
            res.status(200).json({reservebook:userReserve})
        }else{
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } 
}

const getSpecificReservedBooks = async (req,res)=>{
    try {
        const reserveId = req.params.reserveId
        const specificReserve = await reserveSchema.findById(reserveId)
        console.log(specificReserve,"specific book");
        if(!specificReserve){
            res.status(404).json({error:"Reservation  not found"})
        }
        res.status(200).json({reservedbookdetails :specificReserve})
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
}

module.exports = {getBorrowedbook,getSpecificBorrowedBook,getReservedBook,getSpecificReservedBooks}