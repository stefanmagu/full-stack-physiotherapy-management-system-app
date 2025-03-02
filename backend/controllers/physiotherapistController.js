import jwt from "jsonwebtoken";
import physiotherapistModel from "../models/physiotherapistModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API for physiotherapist Login 
const loginPhysiotherapist = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await physiotherapistModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = password === user.password

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get physiotherapist appointments for physiotherapist panel
const appointmentsPhysiotherapist = async (req, res) => {
    try {

        const { physiotherapistId } = req.body
        const appointments = await appointmentModel.find({ physiotherapistId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for physiotherapist panel
const appointmentCancel = async (req, res) => {
    try {

        const { physiotherapistId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.physiotherapistId === physiotherapistId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment not found' }) 

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark appointment completed for physiotherapist panel
const appointmentComplete = async (req, res) => {
    try {

        const { physiotherapistId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.physiotherapistId === physiotherapistId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment not found' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all physiotherapists list for Frontend
const physiotherapistList = async (req, res) => {
    try {

        const physiotherapists = await physiotherapistModel.find({}).select(['-password', '-email'])
        res.json({ success: true, physiotherapists })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change physiotherapist availablity for Admin and maybe Physiotherapist Panel
const changeAvailablity = async (req, res) => {
    try {
        const { physiotherapistId } = req.body

        const physiotherapistData = await physiotherapistModel.findById(physiotherapistId)
        await physiotherapistModel.findByIdAndUpdate(physiotherapistId, { available: !physiotherapistData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get physiotherapist profile for Physiotherapist Panel
const physiotherapistProfile = async (req, res) => {
    try {

        const { physiotherapistId } = req.body
        const profileData = await physiotherapistModel.findById(physiotherapistId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update physiotherapist profile data from Physiotherapist Panel
const updatePhysiotherapistProfile = async (req, res) => {
    try {

        const { physiotherapistId, fees, address, available } = req.body

        await physiotherapistModel.findByIdAndUpdate(physiotherapistId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for physiotherapist panel
const physiotherapistDashboard = async (req, res) => {
    try {

        const { physiotherapistId } = req.body

        const appointments = await appointmentModel.find({ physiotherapistId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginPhysiotherapist,
    appointmentsPhysiotherapist,
    appointmentCancel,
    physiotherapistList,
    changeAvailablity,
    appointmentComplete,
    physiotherapistDashboard,
    physiotherapistProfile,
    updatePhysiotherapistProfile
}