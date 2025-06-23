import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized' });
        }

        const token_decode = jwt.verify(token, process.env.JWT_USER_SECRET_KEY);
        
        req.userId = token_decode.id;

        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

export default authUser;
