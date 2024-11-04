const express = require("express")
const router = express.Router()
const user = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const jwtSecret= "jwtsecreteAsASignature"



router.post("/createuser",
    [body("email", "invalid email").isEmail(),
    body("password").isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        // Performing bcrypt.
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            const isAdmin = req.body.password === "aakrish";

            await user.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
                admin: isAdmin
            })
            res.json({ success: true })
        } catch (err) {
            console.log(err)
            res.json({ success: false })

        }
    })
router.post("/loginUser",
    [body("email", "invalid email").isEmail(),
    body("password").isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        let email = req.body.email
        try {
            let userData = await user.findOne({email})
            if(!userData){
                return res.status(400).json({ error: "try correct email" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if(!pwdCompare){
                return res.status(400).json({ error: "try correct password" });
            }
            const data = {
                user:{
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            res.json({ success: true, authToken: authToken, admin: userData.admin  })
        } catch (err) {
            console.log(err)
            res.json({ success: false })

        }
    })

module.exports = router;