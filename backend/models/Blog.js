import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type:String, required:true},
    subTitle: {type:String},
    description: {type:String, required:true},
    category: {type:String,required:true},
    image: {type:String, required:true},
    isPublished: {type:Boolean, required:true},
},{timestamps:true})

// we created the blog model, using this model we can store the data in the database
//now we need to add controller functions to add new blog data
const Blog = mongoose.model('blog',blogSchema);

export default Blog;