const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 10,
        trim: true,
        match: /^[a-zA-Z0-9_-]+$/
    },    
} , { timestamps: true });
module.exports = mongoose.model('User', userSchema);