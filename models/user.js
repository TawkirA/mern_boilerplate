import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    },
    lastName: {
        type: String,            
        maxlength: 20,
        trim: true,
        default: 'Lastname'
    },
    location: {
        type: String,            
        maxlength: 20,
        trim: true,
        default: 'My city'
    },
})

UserSchema.pre('save', async function() {
    // console.log(this.modifiedPaths());  This method return the keys for which value is modified 
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);    
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema)