const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},

    role: {
        type: String,
        enum: ['admin', 'user','superadmin'],
        default: 'user'
    }

});

UserSchema.pre('save', async function (next){
   if(!this.isModified('password')) return next();
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({id: this._id, role: this.role},
        process.env.JWT_SECRET, {expiresIn: '1h'});
};

module.exports = mongoose.model('Usuario', UserSchema);