const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import validation
const {
    registerValidation
} = require('../configs/validation')

// import models
const User = require('../models/User')

// Register
router.post('/register', async (req, res) => {

    const {
        error
    } = registerValidation(req.body)
    if (error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // if email exist
    const emailExist = await User.findOne({
        email: req.body.email
    })
    if (emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan !'
    })

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: hashPassword
    })

    //create user
    try {
        const saveUser = await user.save()
        res.json(saveUser)
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal Membuat user baru'
        })
    }
})

module.exports = router