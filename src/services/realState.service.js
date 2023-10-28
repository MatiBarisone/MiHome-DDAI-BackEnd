const RealStateModel = require('../models/realstate');
const bcrypt = require('bcrypt');
require("dotenv").config();

class RealStateService {

  async getRealStates() {
    try {
      const RealState = await RealStateModel.find();
      return RealState;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getRealStates Service");
    }
  }

  async getRealStateByEmail(email) {
    try {
      let realState = await RealStateModel.findOne({ email });
      return realState;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getRealStateById Service");
    }
  }

  async createRealState(realState) {
    try {
      let isRealStateRegistered = await RealStateModel.findOne({ email: realState.email });
      if (isRealStateRegistered) {
        throw new Error("Real State already registered");
      }
      else {

        realState.password = bcrypt.hashSync(realState.password, process.env.SALT);
        await RealStateModel.create(realState);
        return realState;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error in createRealState Service");
    }
  }

  async getRealStateById(id) {
    try {
      let realState = await RealStateModel.findOne({ _id: id });
      return realState;
    } catch (err) {
      console.error(err);
      throw new Error("Error in getRealStateById Service");
    }
  }

  async updateRealState(id, fields) {
    try {
      const realState = await RealStateModel.findOneAndUpdate({ _id: id }, fields);
      return realState;
    } catch (err) {
      console.error(err);
      throw new Error("Error in updateRealState Service");
    }
  }

  async deleteRealState(id) {
    try {
      await RealStateModel.findOneAndDelete({ _id: id });
    } catch (err) {
      console.error(err);
      throw new Error("Error in delete Service");
    }
  }


}

module.exports = new RealStateService();