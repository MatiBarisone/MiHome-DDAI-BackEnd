require("dotenv").config();
const bcrypt = require("bcrypt");
const UsersModel = require("../models/Users");

class AuthUserService {
  async hasValidCredentials(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, process.env.SALT);

      const user = await UsersModel.findOne({ email });

      if (user && hashedPassword === user.password) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthUserService();
