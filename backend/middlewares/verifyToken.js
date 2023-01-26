const jwt = require("jsonwebtoken")

// const verifyToken = (req,res,next)=> {

//     const token = req.cookies.access_token;
//   if (!token) return next(res.json("You are not authenticated!"));

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(res.json("Token is not valid!"));
//     req.user = user;
//     next()
//   });
// }

const verifyToken = async (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(' ')[1];

  //   jwt.verify(token, process.env.JWT, (err, user) => {
  //     if (err) return next(res.json("Token is not valid!"));
  //     req.user = user;
  //     next()
  //   });
  //   // const decodedToken = jwt.verify(token, process.env.JWT);
  //   // const { id, name, photoURL } = decodedToken;
  //   // req.user = 
  //   // { id, name, photoURL };
  //   //}
  //   next();
  // } catch (error) {
  //   console.log(error);
  //   res.status(401).json({
  //     success: false,
  //     message: 'Something is wrong with your authorization!',
  //   });
  // }





  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.json("No authorization")
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, `${process.env.JWT}`, (err, user) => {
      if (err) return next(res.json("Token is not valid!"));
      req.user = user;
      next()
    });
    // req.user = user;
    res.json("Token found")
    next()
  } catch (err) {
    return res.json("Could not decode token")
  }
  // if (!decodedToken){
  //   res.json("Unauthorized user")
  // } else {
  //   res.json("Here is your resource")
  // }
};

// const accessToken = req.headers['x-access-token'];

// // Verify the JWT using the secret key
// jwt.verify(accessToken, process.env.JWT, (err, decoded) => {
//   if (err) {
//     // Return an error if the JWT is invalid
//     return res.status(401).json({ error: 'Invalid JWT' });
//   }

//   // Attach the decoded JWT payload to the request object
//   req.decoded = decoded;

//   // Call the next middleware function
//   next();
// });
// };







// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT, (err, user) => {
//       if (err) res.json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.json("You are not authenticated!");
//   }
// };

// const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.json("You are not allowed to do that!");
//     }
//   });
// };

// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.json("You are not alowed to do that!");
//     }
//   });
// };


module.exports = {
  verifyToken
  // , verifyTokenAndAuthorization, verifyTokenAndAdmin
}