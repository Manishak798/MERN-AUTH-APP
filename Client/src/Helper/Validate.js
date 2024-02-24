
import toast from "react-hot-toast"

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)
    return errors;
}

//validate reset password
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);
    if (values.password !== values.confirmpassword) {
        errors.exist = toast.error("Password Not Match...!")
    }
    return errors;
}

//validate password
function passwordVerify(errors = {}, values) {
    const specialChars = /[!@#$%^&*()_+-/=\[\]{};':"\\|,.<>\/?~]/
    if (!values.password) {
        errors.password = toast.error('Password Required...!')
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('Invalid Password...!')
    } else if (values.password.length < 4) {
        errors.password = toast.error('Password must be more than 4 characters long...!')
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('Password must include special characters...!')
    }
    return errors;
}

//validate username
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...')
    } else if (values.username.includes(' ')) {
        error.username = toast.error('Invalid Username...')
    }
    return error;
}