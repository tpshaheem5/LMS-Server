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

const getAllFines = async (req,res)=>{
    try {
        const allFines = await finesSchema.find()
        res.status(200).json(allFines)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
}

const specificFine = async (req,res)=>{
    try {
        const fineId = req.params.fineId
        const detailFine = await finesSchema.findById(fineId)
        if(!detailFine){
            res.status(404).json({error:"Fine not found"})
        }
        res.status(200).json({specificfine:detailFine})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
}

const updateFine = async (req,res)=>{
    try {
        const fineId = req.params.fineId
        const { fineAmount, paymentStatus, paymentDate } = req.body;
        const upFine ={
            fineAmount,
            paymentStatus,
            paymentDate: new Date()
        }
        const updatedfine = await finesSchema.findByIdAndUpdate(fineId,upFine,{new:true})
        if(!updatedfine){
            res.status(404).json({error:"Fine not found"})
        }
        res.status(200).json({ message: 'Fine updated successfully', updatedthefine:updatedfine })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const deleteFine = async (req,res)=>{
    try {
        const fineId = req.params.fineId
        const deletedfine  = await finesSchema.findByIdAndDelete(fineId)
        if(!deletedfine){
            res.status(404).json({error:"Fine not found"})
        }
        res.status(204).json({message:"Fine deleted successfully",deletedfine})
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: error.message });
    }
}
module.exports = {createFines,getAllFines,specificFine,updateFine,deleteFine}