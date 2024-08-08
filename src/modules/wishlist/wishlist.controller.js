import WishList from "../../../DB/Models/wishlist.js";




export const addToWishList = async (req, res,next) => {

    const{_id}=req.authUser
    const{productId}=req.body
   
      let wishlist = await WishList.findOne({ userId:_id });
      if (!wishlist) {
        wishlist = new WishList({ userId:_id, products: [productId] });
      } else {
        wishlist.products.push(productId);
      }
      await wishlist.save();
      res.status(201).json({message:wishlist});
   
}


export const viewWishList = async (req, res,next) => {
    const{_id}=req.authUser

    
      const wishlist = await WishList.findOne({ userId:_id }).populate('products');
      res.status(200).json({message:wishlist});
 
  };

export const deleteFromWishList = async (req, res) => {
    ///destructing data
      const{_id}=req.authUser
      const{productid}=req.params
      let wishlist = await WishList.findOne({ userId:_id });
      if (!wishlist) {
        return res.status(404).json({ error: 'WishList not found' });
      }
      wishlist.products = wishlist.products.filter(productId => productId.toString() !== productid);
      
      
      await wishlist.save();
      res.json(wishlist)
   
  };  