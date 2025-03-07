import mongoose from "mongoose";

const physiotherapistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, default: "Physiotherapist" },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    reviews: { 
        type: [{
            userId: { type: String, required: true },
            appointmentId: { type: String, required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String },
            date: { type: Number }
        }], 
        default: [] 
    }
}, { minimize: false });

const physiotherapistModel = mongoose.models.physiotherapist || mongoose.model("physiotherapist", physiotherapistSchema);
export default physiotherapistModel;