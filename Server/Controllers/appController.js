import UserModel from "../model/User.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator';

/*** custom middleware for verify user**/
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        // check the user existance
        let exists = await UserModel.findOne({ username });
        if (!exists) return res.status(404).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" })
    }
}


export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check if username already exists
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: "Please use a unique username" });
        }

        // Check if email already exists
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Please use a unique email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        await newUser.save();

        res.status(201).send('User Created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password).then(
                    passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" })
                        // create jwt token to authenticate user
                        //npm i jsonwebtoken
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "24h" })

                        return res.status(200).send({
                            msg: "Login Successful...",
                            username: user.username,
                            token

                        })
                    }

                )
                    .catch(error => {
                        return res.status(404).send({ error: " Password does not match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" })
            })
    } catch (error) {
        return res.status(500).send({ error })
    }
}

export async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username) return res.status(501).send({ error: "Invalid Username" });
        const user = await UserModel.findOne({ username }).exec();

        if (!user) return res.status(404).send({ error: "User not found" });

        const { password, ...rest } = user;
        return res.status(200).send(rest);
    } catch (error) {
        // Log username to check if it's received correctly
        console.log("Username:", username);
        console.log(error);
        return res.status(404).send({ error: "Cannot Find User Data" })
    }
}

export async function updateUser(req, res) {
    try {
        // const { id } = req.query;
        const { userId } = req.user;
        if (userId) {
            const body = req.body;
            // Update the user data and await the result
            const newdata = await UserModel.findOneAndUpdate({ _id: userId }, body, { new: true });
            if (!newdata) {
                // User with given ID not found
                return res.status(404).send({ error: 'User not found' });
            }
            return res.status(200).send({ msg: 'Record updated', newdata });
        } else {
            return res.status(400).send({ error: "Invalid ID" });
        }

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(401).send({ error: "User Not Found" });
    }
}

export async function generateOTP(req, res) {
    // npm i otp-genrator
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })//generate otp with length
    res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: 'Verify Successfully!' })
    }
    return res.send(400).send({ error: 'Invalid OTP' });
}

export async function createResetSession(req, res) {
    res.json('createResetSession route')
}

export async function resetPassword(req, res) {
    res.json('resetPassword route')
}


