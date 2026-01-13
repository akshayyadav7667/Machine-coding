import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    // console.log(token);

    const decoded= jwt.verify(token,process.env.JWT_SECRET);

    // console.log(decoded)

    

    req.user=decoded;

    // console.log(req.user)

    

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
