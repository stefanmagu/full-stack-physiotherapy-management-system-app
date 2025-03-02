import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addPhysiotherapist, allPhysiotherapists, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/physiotherapistController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-physiotherapist", authAdmin, upload.single('image'), addPhysiotherapist) // not tested yet
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-physiotherapists", authAdmin, allPhysiotherapists)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;