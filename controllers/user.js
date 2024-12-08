const User=require('../models/User')

exports.getUsers= async (req, res, next) => {
  const users = await User.findAll();
  // console.log(users);
  res.status(200).json({allUsers: users});
 }

 exports.postUser = async(req,res,next)=>{
  const item=req.body.item;
  const description=req.body.description;
  const price=req.body.price;
  const quantity=req.body.quantity;
  const data=await User.create({item: item, description: description, price:price ,quantity:quantity});
  res.status(201).json({newUserDetails:data});
  
 }

 exports.reduce_quantity = async (req, res, next) => {
   // Extract and validate the prodId from request parameters
   const prodId = parseInt(req.params.prodId, 10);
   const amount = parseInt(req.params.amount, 10);
   if (isNaN(prodId)) {
     return res.status(400).json({ error: "Invalid prodId" });
   }

   try {
     // Fetch the current quantity for the specified prodId
     const product = await User.findOne({ where: { id: prodId } });

     if (!product) {
       return res.status(404).json({ error: "Product not found" });
     }

     // Reduce the quantity by 2
     const newQuantity = product.quantity - amount;

     // Ensure quantity does not go below zero
     if (newQuantity < 0) {
       return res
         .status(400)
         .json({ error: "Insufficient quantity to reduce by 2" });
     }

     // Update the quantity in the database
     await User.update({ quantity: newQuantity }, { where: { id: prodId } });

     return res
       .status(200)
       .json({ message: "Quantity reduced by 2 successfully", newQuantity });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: "Internal server error" });
   }
 };