const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true,
        maxlength: [50, 'Nome não pode exceder 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true,
        lowercase: true,
        match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Adicione um email válido'
        ]
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: [8, 'A senha precisa ter no mínimo 8 caracteres'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    },
    empresas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa'
    }],
    lastAccess: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.updateLastAccess = async function() {
    this.lastAccess = Date.now();
    await this.save();
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        console.error('Erro ao comparar senhas:', err);
        return false;
    }
};

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
            email: this.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE || '24h',
            algorithm: 'HS256'
        }
    );
};

UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 3600000; // 1 hora

    return resetToken;
};


UserSchema.pre('remove', async function(next) {
    await this.model('Empresa').updateMany(
        { usuario: this._id },
        { $pull: { usuarios: this._id } }
    );
    next();
});

module.exports = mongoose.model('User', UserSchema);