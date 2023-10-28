const UsersModel = require('../models/Users');
const bcrypt = require('bcrypt');
require("dotenv").config();

class UsersService {

  async getUsers() {
    try {
      const users = await UsersModel.find();
      return users;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUsers Service");
    }
  }

  async getUserByEmail(email) {
    try {
      let user = await UsersModel.findOne({ email });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUserById Service");
    }
  }

  async createUser(user) {
    try {
      let isUserRegistered = await UsersModel.findOne({ email: user.email });
      if (isUserRegistered) {
        throw new Error("User already registered");
      }
      else {

        user.password = bcrypt.hashSync(user.password, process.env.SALT);
        await UsersModel.create(user);
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error in createUser Service");
    }
  }

  async getUsersById(id) {
    try {
      let user = await UsersModel.findOne({ _id: id });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getUsersById Service");
    }
  }

  async updateUsers(id, fields) {
    try {
      const user = await UsersModel.findOneAndUpdate({ _id: id }, fields);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error in updateUsers Service");
    }
  }

  async deleteUsers(id) {
    try {
      await UsersModel.findOneAndDelete({ _id: id });
    } catch (err) {
      console.error(err);
      throw new Error("Error in delete Service");
    }
  }


}

module.exports = new UsersService();