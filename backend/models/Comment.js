import mongoose, { Mongoose } from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {type: mongoose.Schema.Types.ObjectId, ref: 'blog', required: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    isApproved: {type: Boolean,default: false}
},{timestamps:true})

// we created the blog model, using this model we can store the data in the database
//now we need to add controller functions to add new blog data
const Comment = mongoose.model('Comment',commentSchema);

export default Comment;