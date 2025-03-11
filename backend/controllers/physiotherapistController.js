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

        // Get current date
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Calculate start of month and current timestamp
        const startOfMonth = new Date(currentYear, currentMonth, 1).getTime();
        const currentTimestamp = currentDate.getTime();
        
        // Prepare data for charts
        // 1. Monthly appointments (current month)
        const monthlyAppointments = appointments.filter(item => 
            item.date >= startOfMonth && item.date <= currentTimestamp
        );
        
        // 2. Future appointments
        const futureAppointments = appointments.filter(item => 
            item.date > currentTimestamp && !item.cancelled
        );
        
        // 3. Appointment status breakdown
        const completedAppointments = appointments.filter(item => item.isCompleted).length;
        const cancelledAppointments = appointments.filter(item => item.cancelled).length;
        
        // Count all appointments that are neither completed nor cancelled as pending
        // This includes both past and future appointments
        const pendingAppointments = appointments.filter(item => 
            !item.isCompleted && !item.cancelled
        ).length;
        
        // Also calculate future pending appointments separately for reference
        const futurePendingAppointments = appointments.filter(item => 
            !item.isCompleted && !item.cancelled && item.date > currentTimestamp
        ).length;
        
        // 4. Last 6 months appointments trend
        const last6MonthsData = [];
        for (let i = 5; i >= 0; i--) {
            const monthDate = new Date(currentYear, currentMonth - i, 1);
            const monthName = monthDate.toLocaleString('default', { month: 'short' });
            const monthStartTimestamp = monthDate.getTime();
            const monthEndTimestamp = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getTime();
            
            const monthCount = appointments.filter(item => 
                item.date >= monthStartTimestamp && item.date <= monthEndTimestamp
            ).length;
            
            last6MonthsData.push({
                month: monthName,
                count: monthCount
            });
        }

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse(),
            // Chart data
            currentMonthAppointments: monthlyAppointments.length,
            futureAppointments: futureAppointments.length,
            appointmentStatus: {
                completed: completedAppointments,
                cancelled: cancelledAppointments,
                pending: pendingAppointments,
                futurePending: futurePendingAppointments
            },
            last6MonthsData
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