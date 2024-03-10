import jwt from 'jsonwebtoken';
import ENV from "../config.js";

/** auth middleware **/
export default async function Auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //retrive user details from logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = decodedToken;
        // res.json(decodedToken);
        next()
    } catch (error) {
        res.status(401).json({ error: 'Authentication Failed' });
    }
}

/**middleware for local vairable*/
export default async function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next()
}