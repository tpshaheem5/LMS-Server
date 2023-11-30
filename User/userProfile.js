const userSchema = require("../Model/userDatabase")

const getUserProfle = async (req,res)=>{
    try {
        const userProfile = await userSchema.findById({ _id: res.token });
        if (userProfile) {
          res.status(200).json({ user: userProfile });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
      }
}

const updateProfile = async (req,res)=>{
    const {username,email,image, address,firstname}= req.body
    try {
        const updatedUser = await userSchema.findByIdAndUpdate(
            res.token,
            { $set: { username,email, image, address,firstname } },
            { new: true } 
        );
        if (updatedUser) {
            res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

const updatePassword = async (req,res)=>{
    const {password} = req.body
    try {
        const putPassword = await userSchema.findByIdAndUpdate(res.token,{ $set: { password}}, { new: true } )
        if(putPassword){
            res.status(200).json({message:"User password updated successfully"})
        }else{
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
}

module.exports = {getUserProfle,updateProfile}