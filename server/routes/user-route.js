import express from 'express'
import { userRegister, userLogin, getUserProfile, updateUserProfile, bookAppointment, userAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/user-controller.js'
import authUser from '../middlewares/auth-user.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/get-profile', authUser, getUserProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateUserProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, userAppointments)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verify-razorpay', authUser, verifyRazorpay)

export default userRouter