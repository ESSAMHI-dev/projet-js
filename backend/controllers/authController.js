const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

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
  const { fullName, email, password } = req.body;

  try {
    console.log('Update request received:', { fullName, email, hasPassword: !!password });
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) user.password = password;
    
    await user.save();
    
    console.log('User updated successfully');

    // Return user without password
    const userResponse = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user: userResponse });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  } 
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
}

