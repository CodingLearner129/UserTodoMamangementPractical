import mongoose from "mongoose";

// create schema 
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: ""
    },
    body: {
        type: String,
        trim: true,
        default: ""
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        index: true
    },
    created_at: {
        type: Number,
        default: 0
    },
    updated_at: {
        type: Number,
        default: 0
    },
    deleted_at: {
        type: Number,
        default: 0
    },
}, {
    timestamps: false
});

// create model
const todo = mongoose.model("todo", todoSchema); //where "todo" is model name which is used for relationship

export { todo };