import express from 'express'
import { doctorAppointments, doctorList, doctorLogin, completeAppointment, cancelAppointment, doctorDashboard, doctorProfile, updateProfile, changeAvailablity, doctorRegister } from '../controllers/doctor-controller.js'
import authDoctor from '../middlewares/auth-doctor.js'
import upload from '../middlewares/multer.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/register', upload.single('image'), doctorRegister);
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/appointments', authDoctor, doctorAppointments)
doctorRouter.post('/complete-appointment', authDoctor, completeAppointment)
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateProfile)
doctorRouter.post('/change-availablity', authDoctor, changeAvailablity)

export default doctorRouter