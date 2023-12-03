const finesSchema = require("../Model/finesDatabase")

const getUserFines = async (req,res)=>{
   try {
    const userFines = await finesSchema.find(res.token)
    res.status(200).json({ fines: userFines });
   } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
   }
}

const getUserSpecificFine = async (req, res) => {
    try {
   ;
      const fineId = req.params.fineId;
  
      const specificFine = await finesSchema.findById(fineId);
  
      if (!specificFine) {
        return res.status(404).json({ error: 'Fine not found' });
      }
  
      console.log('Specific Fine:', specificFine);
  
      res.status(200).json({specificFines:specificFine});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
const payFine = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
  
  
module.exports = {getUserFines,getUserSpecificFine}