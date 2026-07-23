const UserModel = require("../models/userModels");

const wishlistcontroller = {
  // ✅ Add to Wishlist
  async add(req, res) {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.send({ msg: "Missing userId or productId", flag: 0 });
      }

      const user = await UserModel.findById(userId);
      if (!user) return res.send({ msg: "User not found", flag: 0 });

      if (user.wishlist.includes(productId)) {
        return res.send({ msg: "Already in wishlist", flag: 0 });
      }

      user.wishlist.push(productId);
      await user.save();

      return res.send({ msg: "Product added to wishlist", flag: 1 });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error", flag: 0 });
    }
  },

  // ✅ Remove from Wishlist
  async remove(req, res) {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.send({ msg: "Missing userId or productId", flag: 0 });
      }

      await UserModel.findByIdAndUpdate(userId, {
        $pull: { wishlist: productId },
      });

      return res.send({ msg: "Product removed from wishlist", flag: 1 });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error", flag: 0 });
    }
  },

  // ✅ Check if product is in wishlist
  async check(req, res) {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res.send({ msg: "Missing userId or productId", flag: 0 });
      }

      const user = await UserModel.findById(userId);
      if (!user) return res.send({ msg: "User not found", flag: 0 });

      const inWishlist = user.wishlist.includes(productId);
      return res.send({ msg: "Wishlist checked", flag: 1, inWishlist });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error", flag: 0 });
    }
  },

  // ✅ Get all wishlist products
async list(req, res) {
  try {
    const userId = req.params.userId;
  

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required", flag: 0 });
    }

    const user = await UserModel.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ msg: "User not found", flag: 0 });
    }

    // console.log("✅ Populated wishlist:", user.wishlist);

    return res.status(200).json({
      msg: "Wishlist fetched",
      flag: 1,
      wishlist: user.wishlist,
      total: user.wishlist.length,
    });
  } catch (error) {
    console.error("❌ Error in wishlist list():", error.message);
    return res.status(500).json({ msg: "Internal server error", flag: 0 });
  }
}

, 
};

module.exports = wishlistcontroller;
