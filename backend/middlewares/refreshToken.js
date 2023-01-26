// const jwt = require("jsonwebtoken")
// const { Account } = require("../models");

// const refreshToken = async (req,res)=> {
//     try {
//         const refreshToken = req.cookies.refreshToken
//         if(!refreshToken) return res.json("No refresh token")
//         const user = await Account.findAll({
//             where: {
//                 refresh_token: refreshToken
//             }
//         })
//         if(!user) return res.json("Invalid user")
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,decoded) => {
//             if (err) return res.json("Unverified")
//             const userId = user.id
//             const username = user.username
//             const accessToken = jwt.sign({userId,username},process.env.ACCESS_TOKEN_SECRET, {
//                 expiresIn: '15s'
//             })
//             res.json( {accessToken})
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = {refreshToken}