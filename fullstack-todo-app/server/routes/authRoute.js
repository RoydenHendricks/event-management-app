const express = require("express");
const register = require("../controllers/register.controller");
const login = require("../controllers/login.controller");
const validateUser = require("../middleware/validate.middleware");
const router = express.Router();

// routes
router.post("/register", validateUser, register);
router.post("/login", validateUser, login);

module.exports = router;
