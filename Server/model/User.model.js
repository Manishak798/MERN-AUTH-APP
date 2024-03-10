// import mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         require: [true, "Please Provide unique username"],
//         unique: [true, "Username Exists"]
//     },
//     password: {
//         type: String,
//         require: [true, "Please Provide a password"],
//         unique: false,
//     },
//     email: {
//         type: String,
//         require: [true, "Please Provide unique email"],
//         unique: [true],
//     },
//     firstName: {
//         type: String,
//     },
//     lastName: {
//         type: String,
//     },
//     mobile: {
//         type: Number,
//     },
//     address: {
//         type: Number,
//     },
//     profile: {
//         type: Number,
//     }
// })

// export default mongoose.model.Users || mongoose.model('User', UserSchema)

import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: [true, "Username exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: [true, "Email exists"],
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
    profile: {
        type: String,
    }
});

export default mongoose.model('User', UserSchema);
