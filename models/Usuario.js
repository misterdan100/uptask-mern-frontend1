import mongoose from "mongoose";
import bcrypt from 'bcrypt'

// defeni schema db
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
}, {
    // crea dos propiedades mas: created and updated
    timestamps: true,
})

usuarioSchema.pre('save', async function(next) {
    if( !this.inModified('password')) {
        next()
    }
    // generar rondas de hasheo
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
})

// create model Usuario with before schema
const Usuario = mongoose.model('Usuario', usuarioSchema)
export default Usuario