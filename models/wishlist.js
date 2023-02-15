const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
});

const Wishlist = mongoose.model("wishlist", WishlistSchema);

module.exports = Wishlist;
