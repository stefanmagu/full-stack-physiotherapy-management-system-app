import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import physiotherapistModel from "../models/physiotherapistModel.js";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Physiotherapist
const addPhysiotherapist = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add physiotherapist
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const physiotherapistData = {
            name,
            email,
            image: imageUrl,
            password: password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newPhysiotherapist = new physiotherapistModel(physiotherapistData)
        await newPhysiotherapist.save()
        res.json({ success: true, message: 'Physiotherapist Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all physiotherapist list for admin panel
const allPhysiotherapists = async (req, res) => {
    try {

        const physiotherapists = await physiotherapistModel.find({}).select('-password')
        res.json({ success: true, physiotherapists })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const physiotherapists = await physiotherapistModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            physiotherapists: physiotherapists.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addPhysiotherapist,
    allPhysiotherapists,
    adminDashboard
}