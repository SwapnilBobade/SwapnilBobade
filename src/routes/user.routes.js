const express = require('express');
const registerUser = require('../controllers/user.controller.js');
const upload = require('../middlewares/multer.middlewares.js');

const router = express.Router(); // Correct way to get a router instance

router.route("/register").post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'coverImage',
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(registerUser.loginUser)

router.route("/logout").post(verifyJWT,registerUser.logOutUser)

module.exports = router;
