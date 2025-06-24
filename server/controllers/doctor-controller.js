import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import doctorModel from "../models/doctor-model.js";
import appointmentModel from "../models/appointment-model.js";

// Change Doctors Availablity API : /api/doctor/change-availablity
const changeAvailablity = async (req, res) => {
    try {
        const docId = req.docId;

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// Change Doctors Availablity API : /api/doctor/list
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email', '-phone'])
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// Login Doctor Panel API : /api/doctor/login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_DOCTOR_SECRET_KEY, {
            expiresIn: "1d",
        });

        return res.status(200).json({ success: true, token });

    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Register Doctor : /api/doctor/register
const doctorRegister = async (req, res) => {
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

        const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_DOCTOR_SECRET_KEY, {
            expiresIn: "1d",
        });

        res.json({ success: true, token, message: "Doctor registration successful" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


// Get Doctor Appointments for Doctor Panel API : /api/doctor/appointments
const doctorAppointments = async (req, res) => {
    try {
        const docId = req.docId;

        const appointments = await appointmentModel.find({ docId });

        return res.status(200).json({ success: true, appointments });

    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Appointment Complete for Doctor Panel API : /api/doctor/complete-appointment
const completeAppointment = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed" });
        } else {
            return res.json({ success: true, message: "Completion Failed" })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Appointment Cancel for Doctor Panel API : /api/doctor/cancel-appointment
const cancelAppointment = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: "Appointment Cancelled" });
        } else {
            return res.json({ success: true, message: "Cancellation Failed" })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Dashboard Data for Doctor Panel API : /api/doctor/dashboard
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId;

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0;

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        const patients = [];

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const docAvailable = await doctorModel.findById(docId).select('available');

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            lastestAppointments: appointments.reverse().slice(0, 7),
            docAvailable
        }

        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Get Doctor Profile for Doctor Panel API : /api/doctor/profile
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId;

        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Update Doctor Profile for Doctor Panel API : /api/doctor/update-profile
const updateProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const { fees, address, available } = req.body;

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { changeAvailablity, doctorList, doctorRegister, doctorLogin, doctorAppointments, completeAppointment, cancelAppointment, doctorDashboard, doctorProfile, updateProfile }