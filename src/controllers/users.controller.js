let instance = null;
require('dotenv').config();
const jwt = require("jsonwebtoken");
const UsersService = require("../services/users.service");
const AuthUserService = require('../services/authUsers.service');

class UsersController {

  static getInstance() {
    if (!instance) {
      return new UsersController();
    }
    return instance;
  }

  async getUsers(req, res) {
    try {
      const users = await UsersService.getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUsers",
        message: err,
      });
    }
  }

  async getUser(req, res) {
    try {
      const { email } = req.params;
      const user = await UsersService.getUserByEmail(email);
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getUserByEmail",
        message: err,
      });
    }
  }

  async createUser(req, res) {
    try {
      let newUser = await UsersService.createUser(req.body);

      return res.status(201).json({
        message: "Created!",
        user: newUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createUser",
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let isUserRegistered = await AuthUserService.hasValidCredentials(email, password);

      if (isUserRegistered) {

        const user = await UsersService.getUserByEmail(email);

        const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          status: 200,
          token,
          message: "Token created successfully."
        });

      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "login",
        message: err.message,
      });
    }
  }

  async updateUsers(req, res) {
    try {
      let user = await UsersService.getUsersById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ method: "updateProduct", message: "Not Found" });
      }

      const name = req.body.name;
      const lastname = req.body.lastname;
      const email = req.body.email;
      const password = req.body.password;
      const profilePicUrl = req.body.profilePicUrl;
      const modifiedProduct = await UsersService.updateUsers(
        req.params.id,
        { 
          name,
          lastname,
          email,
          password,
          profilePicUrl
        }
      );
      return res.status(200).json(modifiedProduct);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateProduct",
        message: err,
      });
    }
  }

  async deleteUsers(req, res) {
    try {
      let isUser = await UsersService.getUsersById(req.params.id);
      if (isUser) {
        await UsersService.deleteUsers(req.params.id);
        return res.status(204).json({ message: "No Content" });
      }
      return res.status(404).json({ message: "Not Found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteProduct",
        message: err,
      });
    }
  }



}

module.exports = UsersController.getInstance();