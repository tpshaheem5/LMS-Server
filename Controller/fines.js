const finesSchema = require("../Model/finesDatabase")

const createFines = async (req,res)=>{
    try {
        const {userId, fineAmount, paymentStatus} = req.body;

        const fine = new finesSchema({
            userId,
            fineAmount,
            paymentStatus,
            paymentDate: new Date(),
          });

          await fine.save()
          res.status(201).json({ message: 'Fine created successfully', fine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {createFines}