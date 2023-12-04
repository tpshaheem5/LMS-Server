const finesSchema = require("../Model/finesDatabase")

const getUserFines = async (req,res)=>{
   try {
    const userId = res.token; 
    const userFines = await finesSchema.find({userId:userId} )
    res.status(200).json({ fines: userFines });
   } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
   }
}

const getUserSpecificFine = async (req, res) => {
    try {
      const fineId = req.params.fineId;
      const specificFine = await finesSchema.findById(fineId);
  
      if (!specificFine) {
        return res.status(404).json({ error: 'Fine not found' });
      }  
      res.status(200).json({specificFines:specificFine});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
const payFine = async (req,res)=>{
    try {
      const { fineAmount } = req.body;
        const fineId = req.params.fineId
        const specificFine = await finesSchema.findById(fineId)
      if(!specificFine){
        res.status(404).json({error:"Fine not found"})
      }
      if(specificFine.paymentStatus ==="Paid"){
        res.status(400).json({error:"Fine has already been paid"})
      }
      if (fineAmount === specificFine.fineAmount) {
        specificFine.paymentStatus = 'Paid';
        specificFine.paymentDate = new Date();
        await specificFine.save();
  
        res.status(204).json({message :"successful payment"})
      } else {
        res.status(400).json({ error: 'Invalid fine amount' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
  
  
module.exports = {getUserFines,getUserSpecificFine,payFine}