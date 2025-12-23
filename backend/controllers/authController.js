const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // validation
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please provide email and password"});
    }

    try {
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Invalid email or password"});
        }
        
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({message: "Error logging in user", error: error.message});
    }
};

exports.getUserInfo = async (req, res) => {
   try {
    const user = await User.findOne({_id:req.user.id}).select("-password");
    if(!user){
       return res.status(404).json({message: "User not found!"});
    };
    res.status(200).json({user});
   } catch (error) {
     res.status(500).json({message: "Error getting user info", error: error.message});
   }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { fullName, email, profileImageUrl } = req.body;

    if (fullName) user.fullName = fullName;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      user.email = email;
    }
    if (profileImageUrl !== undefined) user.profileImageUrl = profileImageUrl;

    await user.save();

    const userResponse = await User.findById(req.user.id).select("-password");

    return res.status(200).json({ 
      success: true, 
      data: userResponse, 
      message: "User updated successfully" 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Error updating user", 
      error: error.message 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Optional: Verify password before deletion
    const { password } = req.body;
    if (password) {
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid password. Cannot delete account." 
        });
      }
    }

    await User.findByIdAndDelete(req.user.id);

    return res.status(200).json({ 
      success: true, 
      message: "User account deleted successfully" 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Error deleting user", 
      error: error.message 
    });
  }
};

