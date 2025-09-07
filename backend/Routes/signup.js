const USER = require("../models/user");
const express = require("express")
const jwt = require("jsonwebtoken");
const Router = express.Router();


Router.post("/", async(req, res) => {
    const { username, email, password } = req.body;

    console.log(username, email, password)
    if (!username || !email || !password) {
        res.json({
            msg: "all fields required",
        });
    }

        try {
            await USER.create({ username,email,password });

                        

            const token = jwt.sign(
                { id: username._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
      token,
      user: {
        id:username._id,
        username:username
      }
    })


        } catch (error) {
            res.json({
                msg: "username already exist",
            })
        }

    
}
)


module.exports=Router;