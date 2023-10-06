const { getDb } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async regis(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
      };

      const result = await User.create(userData);
      if (result.acknowledged) {
        return res
          .status(201)
          .json({ message: "Pengguna berhasil ditambahkan" });
      } else {
        return res.status(500).json({ message: "Gagal menambahkan pengguna" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan saat menambahkan pengguna" });
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "username cannot empty" };
      }
      if (!password) {
        throw { name: "password cannot empty" };
      }

      const user = await User.findOne(username);

      if (!user) {
        throw { name: "Invalid username/password" };
      }

      const validPass = bcrypt.compareSync(password, user.password);

      if (!validPass) {
        throw { name: "Invalid username/password" };
      }

      const access_token = createToken({ id: user._id });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findAll(req, res) {
    try {
      const users = await User.findAll();
      if (!users) {
        throw {
          name: "user not found",
        };
      }
      return res.json(users);
    } catch (error) {
      if (error.name === "user not found") {
        res.status(400).json(error.name);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }
}

module.exports = Controller;
