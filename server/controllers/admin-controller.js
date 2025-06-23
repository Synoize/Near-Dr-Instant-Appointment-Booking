import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctor-model.js';
import appointmentModel from '../models/appointment-model.js';
import userModel from '../models/user-model.js';


// Add doctor API : /api/admin/add-doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, phone, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Validate required fields
        if (!name || !email || !phone || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email address" });
        }

        // Validate password
        if (password.length < 6) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Validate phone
        if (!phone || !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ success: false, message: "Enter a valid 10-digit phone number" });
        }

        // Check image file
        if (!imageFile) {
            return res.json({ success: false, message: "Profile image is required" });
        }

        // Prevent duplicate email
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.json({ success: false, message: "Doctor already exists" });
        }

        // validating strong password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            phone,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Change Doctors Availablity API : /api/admin/change-availablity
const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// Admin login API : /api/admin/login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_ADMIN_SECRET_KEY)

            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// Get All Doctors List API : /api/admin/all-doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// Get All Appointments List: /api/admin/appointments
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API for Appointment Cancellation: /api/admin/appointments
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get dashboard datafor admin panel: /api/admin/dashboard
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            lastestAppointments: appointments.reverse().slice(0, 7)
        }

        res.json({ success: true, dashData });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export { addDoctor, changeAvailablity, adminLogin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };
