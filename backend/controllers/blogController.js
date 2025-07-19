import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req,res) => {
    try {
        //get all the data from the request
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog); //data comes in string format
        const imageFile = req.file;
        //check if all the fields are present
        if (!title || !description || !category || !imageFile)
                return res.json({success:false, message: "Missing required fields"})
        //we will store the image url, hence we need cloud storage - imagekit to store image on online storage, optimizes img
        const fileBuffer = fs.readFileSync(imageFile.path);
        //upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs" //to save all the images in this folder
        })
        //optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //less file size and more quality, auto compression
                {format: 'webp'}, //convert to modern format
                {width: '1280'} //width resizing
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success: true, message: "Blog added successfully"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async (req,res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if (!blog)
        {
            return res.json({success: false, message: "Blog not found"});
        }
        res.json({success: true, blog});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteBlogById = async (req,res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);
        //delete all comments associated with the blog
        await Comment.deleteMany({blog: id})
        res.json({success: true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({
      success: true,
      message: `Blog ${
        blog.isPublished ? "published" : "unpublished"
      } successfully`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const addComment = async (req,res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog,name,content});
        res.json({success: true, message: 'Comment added for review'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async (req,res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1})
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const generateContent = async(req,res) => {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.json({success: true,content})
    } catch (error) {
        res.json({success: false,message: error.message})
    }
}