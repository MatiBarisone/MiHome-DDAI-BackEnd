let instance = null;
require('dotenv').config();
const jwt = require("jsonwebtoken");
const RealStateService = require("../services/realState.service");
const AuthRealStateService = require('../services/authRealState.service');

class RealStateController {

  static getInstance() {
    if (!instance) {
      return new RealStateController();
    }
    return instance;
  }

  async getRealStates(req, res) {
    try {
      const realState = await RealStateService.getRealStates();
      return res.status(200).json(realState);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealState",
        message: err,
      });
    }
  }

  async getRealState(req, res) {
    try {
      const { email } = req.params;
      const realState = await RealStateService.getRealStateByEmail(email);
      return res.status(200).json(realState);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealStateByEmail",
        message: err,
      });
    }
  }

  async createRealState(req, res) {
    try {
      let newRealState = await RealStateService.createRealState(req.body);

      return res.status(201).json({
        message: "Created!",
        user: newRealState,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createRealState",
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let isRealStateRegistered = await AuthRealStateService.hasValidCredentials(email, password);

      if (isRealStateRegistered) {

        const realState = await RealStateService.getRealStateByEmail(email);

        const token = jwt.sign(realState.toJSON(), process.env.PRIVATE_KEY, {
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

  async updateRealState(req, res) {
    try {
      let realState = await RealStateService.getRealStateById(req.params.id);
      if (!realState) {
        return res
          .status(404)
          .json({ method: "updateProduct", message: "Not Found" });
      }

      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const profilePicUrl = req.body.profilePicUrl;
      const rating = req.body.rating;
      const modifiedProduct = await RealStateService.updateRealState(
        req.params.id,
        {
          name,
          email,
          password,
          profilePicUrl,
          rating
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

  async deleteRealState(req, res) {
    try {
      let isRealState = await RealStateService.getRealStateById(req.params.id);
      if (isRealState) {
        await RealStateService.deleteRealState(req.params.id);
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

module.exports = RealStateController.getInstance();