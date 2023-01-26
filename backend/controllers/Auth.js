const { Account } = require("../models");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async(req,res) => {
    
    const user = await Account.findOne({
        where : {
            username: req.body.username
        }
    });
    if(!user) return res.json("User not found")
    const match = await bcrypt.compare(req.body.password, user.password)
    // bcrypt.compare(req.body.password, user.password).then((match)=>{
    //     if(!match) return res.json("Password does not match")
    //     req.session.userId = user.id

    //     res.json("User logged in")
    // })
    if(!match) return res.json("Password does not match")
    const userId = user.id
    const username = user.username
    const accessToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s'
    })
    const refreshToken = jwt.sign({userId, username}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    })
    await Account.update({refresh_token: refreshToken}, {
        where:{
            id: userId
        }
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24*60*60*1000
    })
    res.json({accessToken})

    // const token = jwt.sign({userId, username}, process.env.ACCESS_TOKEN_SECRET)
    // res.cookie("access_token", token, {
    //     httpOnly: true
    // })



    // req.session.userId = user.id
    // res.json("User logged in")
}



// const Me = async (req, res) =>{
//     if(!req.session.userId){
//         return res.json("Please login!");
//     }
//     const user = await Account.findOne({
//         attributes:['id','username','role'],
//         where: {
//             id: req.session.userId
//         }
//     });
//     if(!user) return res.json("User not found");
//     res.json(user);
// }

// const logout = (req,res) => {
//     req.session.destroy((err) => {
//         if (err) return res.json("You are not logged out")
//         res.json("You are logged out")
//     })
// }
 


module.exports = {login}