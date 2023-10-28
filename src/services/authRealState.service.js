require("dotenv").config();
const bcrypt = require("bcrypt");
const RealStateModel = require("../models/realstate");

class AuthRealStateService {
  async hasValidCredentials(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, process.env.SALT);

      const realState = await RealStateModel.findOne({ email });

      if (realState && hashedPassword === realState.password) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthRealStateService();