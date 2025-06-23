import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const docToken = req.headers.doctoken;

        if (!docToken) {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized'
            });
        }

        const token_decode = jwt.verify(docToken, process.env.JWT_DOCTOR_SECRET_KEY);

        req.docId = token_decode.id;

        next();
    } catch (error) {
        console.error("Doctor Auth Error:", error.message);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired doctor token.'
        });
    }
};

export default authDoctor;
