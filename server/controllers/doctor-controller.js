import doctorModel from "../models/doctor-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export { changeAvailablity, doctorList, doctorLogin, doctorAppointments, completeAppointment, cancelAppointment, doctorDashboard, doctorProfile, updateProfile }