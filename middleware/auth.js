import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try {
        const token = req.cookies.app_auth_token
        jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (err) {
        res.status(401).send({ error: err.message })
    }
}