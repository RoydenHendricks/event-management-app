const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //checking if the user already exists
    const user = await User.findOne({ email });

    // if the user already exists then return status code 400
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }

    // hashing the password

    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a new user

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //saving the user in the database
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });

    //creating a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      algorithm: "HS256",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error occurred on the server while registering" });
  }
};

module.exports = register;
