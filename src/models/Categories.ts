import mongoose from "mongoose";

const categorySchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model<mongoose.Document>("Category", categorySchema);

export default Category;
