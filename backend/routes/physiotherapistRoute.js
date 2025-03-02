import express from 'express';
import { loginPhysiotherapist, appointmentsPhysiotherapist, appointmentCancel, physiotherapistList, changeAvailablity, appointmentComplete, physiotherapistDashboard, physiotherapistProfile, updatePhysiotherapistProfile } from '../controllers/physiotherapistController.js';
import authPhysiotherapist from '../middleware/authPhysiotherapist.js';
const physiotherapistRouter = express.Router();

physiotherapistRouter.post("/login", loginPhysiotherapist)
physiotherapistRouter.post("/cancel-appointment", authPhysiotherapist, appointmentCancel)
physiotherapistRouter.get("/appointments", authPhysiotherapist, appointmentsPhysiotherapist)
physiotherapistRouter.get("/list", physiotherapistList)
physiotherapistRouter.post("/change-availability", authPhysiotherapist, changeAvailablity)
physiotherapistRouter.post("/complete-appointment", authPhysiotherapist, appointmentComplete)
physiotherapistRouter.get("/dashboard", authPhysiotherapist, physiotherapistDashboard)
physiotherapistRouter.get("/profile", authPhysiotherapist, physiotherapistProfile)
physiotherapistRouter.post("/update-profile", authPhysiotherapist, updatePhysiotherapistProfile)

export default physiotherapistRouter;