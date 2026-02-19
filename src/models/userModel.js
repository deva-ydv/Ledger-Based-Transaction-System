const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, "Minimum length should be 8 characters"],
        select: false, 
    }
}, { 
    timestamps: true 
});

userSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;