const reserveSchema = require("../Model/reservationDatabase")

const getAllReservation = async (req,res)=>{
    try {
        const allReservation = await reserveSchema.find()
        res.status(200).json(allReservation)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
}

const specificReserve = async (req,res)=>{
    try {
        const reserveId = req.params.reserveId
        const specificreserve = await reserveSchema.findById(reserveId)
        if(!specificreserve){
            res.status(404).json({error:"Reserve not found"})
        }
        res.status(200).json({specificreservation:specificreserve})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
}
const createReserve = async (req,res)=>{
    try {
        const {userId, bookId, reservationDate,pickupDeadline} = req.body;
        const reserve = new reserveSchema({
            userId,
            bookId,
            reservationDate:new Date(),   
            pickupDeadline: new Date(),   
        })
        await reserve.save()
        res.status(201).json({ message: 'reserve created successfully', reserve });
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
}


const deleteReserve = async (req,res)=>{
    try {
        const reserveId = req.params.reserveId
        const deletereserve = await reserveSchema.findByIdAndDelete(reserveId)
        if(!deletereserve){
            res.status(404).json({error:"reserve not found"})
        }
        res.status(204).json({message:"reserve deleted successfully",deletereserve})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
}

module.exports ={getAllReservation,specificReserve,createReserve,deleteReserve}