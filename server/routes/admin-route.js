import express from 'express'

import { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentCancel, appointmentsAdmin, changeAvailablity } from '../controllers/admin-controller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/auth-admin.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availablity', authAdmin, changeAvailablity)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter