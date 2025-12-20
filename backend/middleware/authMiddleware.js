const jwt = require("jsonwebtoken");
const User = require ("../models/User");
// the logic to follow is check for token , then validate it then attach userDaata and continue
exports.protect = async(req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // to extract the token from Bearer token
    if(!token){
        return  res.status(401).json({message: "Not authorized, no token"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({message: "Not authorized, token failed"});
    }
}