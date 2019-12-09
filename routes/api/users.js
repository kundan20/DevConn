const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const config = require('config');
const {check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route  POST api/users/
//@desc   Register route
//@access Public

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email', 'Please type valid email').isEmail(),
    check('password', 'Please enter password with minimum length 8').isLength({ min: 8 })
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        
        try {

             //check if user exists
             let user = await User.findOne({ email });
             if(user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists.'}] });
             }

            //Get user gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'g',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });
            
            //Encrypt the password using bcrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            
            //save to db
            await user.save();

            //return jwt
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                ( err, token ) => {
                    if(err) throw err;
                    res.json({ token });
                }                
            );
        } catch(err) {
            console.error(err.message);
            res.status(500).send(`Server Error`);
        }       
        //console.log(req.body);    
});

module.exports = router;