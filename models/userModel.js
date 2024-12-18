const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxLength: [50, 'Name cannot exceed 50 characters']
    },
    email:{
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        maxLength: [50, 'Email cannot exceed 50 characters']
    }
});

module.exports = mongoose.model('User', userSchema); 