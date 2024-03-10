import { Router } from "express";
import * as controller from '../Controllers/appController.js'
import Auth, { localVariables } from "../middleware/auth.js";

const router = Router();

/**POST METHODS**/
router.route('/Register').post(controller.register)
router.route('/RegisterMail').post((req, res) => {
    //send the email
    res.json('register route')
})
router.route('/Authentication').post((req, res) => {
    // authenticate user
    res.json('register route')
})
router.route('/Login').post(controller.verifyUser, controller.login)

/**GET METHODS**/

router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)


/**PUT METHODS**/
router.route('/updateuser').put(Auth, controller.updateUser)
router.route('/resetPassword').put(controller.resetPassword)

export default router;