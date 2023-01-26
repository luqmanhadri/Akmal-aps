const Account  = require("../models/Account.js");
const Profile  = require("../models/AthleteProfile.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const AthleteProfile = require("../models/AthleteProfile.js");

// const Cookies = require("js-cookie")
// const Cookies = require("universal-cookie")
// const jwt = require("jwt-decode")

// const cookies = new Cookies();

const createAccount = async(req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Account({ ...req.body, password: hash });
    
        await newUser.save();
        res.json(newUser);
      } catch (err) {
        next(err);
      }
    
}

const updateAccount = async (req,res,next) =>{
    // if (req.params.id === req.user.id) {
        try {
          const updatedUser = await Account.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.json(updatedUser);
        } catch (err) {
          next(err);
        }
      // } 
      // else {
      //   return next(res.json("You can update only your account!"));
      // }
    
}

const approveUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // Find the booking
    const User = await Account.findById(userId);
    if (!User) {
      throw new Error('User not found');
    }
    // Check if the booking is already approved
    if (User.approved) {
      throw new Error('User is already approved');
    }
    // Update the booking
    User.approved = true;
    await User.save();
    res.json("User is approved")
   
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const deletedUser = await Account.findByIdAndDelete(req.params.id);
    res.json("User deleted");
  } catch (err) {
    next(err);
  }
  
};

const getAccount = async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await Account.findById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAccountUnapproved = async (req, res, next) => {
  try {
    const user = await Account.find({ approved: false});
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAccountCoaches = async (req, res, next) => {
  try {
    const user = await Account.find({
      $and: [
        { role: "Coach" },
        { approved: false }
      ]
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAccountManagers = async (req, res, next) => {
  try {
    const user = await Account.find({
      $and: [
        { role: "Manager" },
        { approved: false }
      ]
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAccountStorekeepers = async (req, res, next) => {
  try {
    const user = await Account.find({
      $and: [
        { role: "Storekeeper" },
        { approved: false }
      ]
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const randomAccount = async (req, res, next) => {
  try {
    const profile = await Account.aggregate([
      { $match: { role: 'Athlete' } },
      { $sample: { size: 12 } }]);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

const randomAccountHome = async (req, res, next) => {
  try {
    const profile = await Account.aggregate([
      { $match: { role: 'Athlete' } },
      { $sample: { size: 4 } }]);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};


const searchAccount = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Account.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { sport: { $regex: query, $options: "i" } }
      ]
      
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const getAccountBySport = async (req, res, next) => {
  try {
    const sport = req.params.id // get the sport from the request params
    const users = await Account.find({ sport: sport }); // get the users with the given sport
    return res.json(users); // return the users in the response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error getting users by sport' });
  }
};


const createAchievement = async (req, res, next) => {
  const userId = req.params.id;
  const achievement = req.body
  
    try {
      await Account.findByIdAndUpdate(userId, {
        $push: { achievement:
         
          achievement
          //  }
        },
      });
    } catch (err) {
      next(err);
    }
    res.json(req.body);
 
};

const deleteAchievement = async (req, res, next) => {
  const userId = req.params.id;
  const achievementid = req.params.achievementid;
  
  try {
    // Find the user by their _id and update the comment field to remove the comment with the specified commentId
    // await Account.findByIdAndUpdate(userId, { $pull: { comment: { $each: ["try string2"], $position: 0 } } });
    await Account.findByIdAndUpdate(userId, { $pull: { achievement: {_id: achievementid} } });

    // await Account.findByIdAndUpdate(userId, { $pull: { comment: { $each: [{ $slice: [position, 1] }] } } });
    return res.json("Achievement deleted");
  } catch (err) {
    return res.json("Achievement can't be deleted")
  }
};

const createComment = async (req, res, next) => {
  const userId = req.params.id;
  const comment = req.body
  // const newAchievement = new Account(req.body);

  // try {
  //   const savedAchievement = await newAchievement.save();
    try {
      await Account.findByIdAndUpdate(userId, {
        $push: { comment:
          //  { $each :
          // savedAchievement._id 
          comment
          //  }
        },
      });
    } catch (err) {
      next(err);
    }
    res.json(req.body);
  // } catch (err) {
  //   next(err);
  // }
};

// const deleteComment = async (req, res, next) => {
//   const userId = req.params.id;
//   // const commentId = req.body;
//   const commentId = req.params.commentId;
//   try {
//     // Find the user by their _id and update the comment field to remove the comment with the specified commentId
//     await Account.findByIdAndUpdate(userId, { $pull: { comment: { _id: commentId } } });

//     return { success: true };
//   } catch (err) {
//     return { success: false, error: err };
//   }
// };

const deleteComment = async (req, res, next) => {
  const userId = req.params.id;
  const commentid = req.params.commentid;
  
  try {
    // Find the user by their _id and update the comment field to remove the comment with the specified commentId
    // await Account.findByIdAndUpdate(userId, { $pull: { comment: { $each: ["try string2"], $position: 0 } } });
    await Account.findByIdAndUpdate(userId, { $pull: { comment: {_id: commentid} } });

    // await Account.findByIdAndUpdate(userId, { $pull: { comment: { $each: [{ $slice: [position, 1] }] } } });
    return res.json("Comment deleted");
  } catch (err) {
    return res.json("Comment can't be deleted")
  }
};

const signin = async (req, res, next) => {
    try {
      const user = await Account.findOne({ username: req.body.username });
      if (!user) return next(res.json("User not found!"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) return next(res.json("Wrong Credentials!"));
  
      const token = jwt.sign({ id: user._id }, process.env.JWT
        
        );

      // const token = generateJWT();
      
      const { password, ...others } = user._doc;
  
      // setCookie(res, "jwt", token, { httpOnly: true });
      res
      // .cookie("token", token, {
      //   maxAge: 86400 * 1000
      //     // httpOnly: true,
      //   })
      .json(user._doc);
    } catch (err) {
      next(err);
    }
  };


module.exports = {createAccount, updateAccount, deleteAccount, getAccount, randomAccount, signin, 
createAchievement, deleteAchievement,  searchAccount, getAccountCoaches,
getAccountManagers, getAccountStorekeepers, createComment, deleteComment, getAccountBySport, 
approveUser, randomAccountHome, getAccountUnapproved}

