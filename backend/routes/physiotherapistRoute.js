import express from 'express';
import { loginPhysiotherapist, appointmentsPhysiotherapist, appointmentCancel, physiotherapistList, changeAvailablity, appointmentComplete, physiotherapistDashboard, physiotherapistProfile, updatePhysiotherapistProfile } from '../controllers/physiotherapistController.js';
import authPhysiotherapist from '../middleware/authPhysiotherapist.js';
import upload from '../middleware/multer.js';
const physiotherapistRouter = express.Router();

physiotherapistRouter.post("/login", loginPhysiotherapist)
physiotherapistRouter.post("/cancel-appointment", authPhysiotherapist, appointmentCancel)
physiotherapistRouter.get("/appointments", authPhysiotherapist, appointmentsPhysiotherapist)
physiotherapistRouter.get("/list", physiotherapistList)
physiotherapistRouter.post("/change-availability", authPhysiotherapist, changeAvailablity)
physiotherapistRouter.post("/complete-appointment", authPhysiotherapist, appointmentComplete)
physiotherapistRouter.get("/dashboard", authPhysiotherapist, physiotherapistDashboard)
physiotherapistRouter.get("/profile", authPhysiotherapist, physiotherapistProfile)
physiotherapistRouter.post("/update-profile", upload.single('image'), authPhysiotherapist, updatePhysiotherapistProfile)

export default physiotherapistRouter;