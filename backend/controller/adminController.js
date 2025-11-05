import jwt from "jsonwebtoken";
export const adminLogin = async (req, res) => {
 const { email, password } = req.body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Generate JWT token for 1 hour
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({ success: true, token });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};
