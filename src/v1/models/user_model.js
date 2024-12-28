import mongoose from "mongoose";

// create schema 
const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        trim: true,
        default: ""
    },
    phone: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        trim: true,
        default: ""
    },
    access_token: {
        type: String,
        trim: true,
        default: ""
    },
    created_at: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    updated_at: {
        type: Number,
        default: 0
    },
    deleted_at: {
        type: Number,
        default: 0
    },
    blocked_at: {
        type: Number,
        default: 0
    },
}, {
    timestamps: false
});

userSchema.index({ phone: 1 });

// create model
const user = mongoose.model("user", userSchema); //where "user" is model name which is used for relationship

export { user };