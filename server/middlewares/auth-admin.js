import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized' })
        }

        const token_decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized' })
        }

        next()
    } catch (error) {
        console.error("Auth error:", error.message);
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

export default authAdmin