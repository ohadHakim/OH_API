const jwt = require("jsonwebtoken");
const config = require("../DB_config/dev");
const joi = require("joi");
const database = require("./database");
const bcrypt = require("bcrypt");

module.exports = {
  login: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      email: joi.string().required().email().min(6).max(100),
      password: joi.string().required().min(6),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      console.log(error.details[0].message);
      res.status(401).send("Unauthorized");
      return;
    }

    const sql = "SELECT * FROM customers WHERE email=?;";

    try {
      const result = await database.getConnection(sql, [reqBody.email]);
      const rows = result[0];
      const validPassword = await bcrypt.compare(
        reqBody.password,
        rows[0].password_hash
      );
      if (!validPassword) throw "Invalid password";

      const param = { email: reqBody.email };
      const token = jwt.sign(param, config.JWT_SECRET, { expiresIn: "72800s" });
      res.json({
        full_client_name: rows[0].name,
        client_email: rows[0].email,
        business_type: rows[0].type,
        token: token,
      });
    } catch (err) {
      console.log(`Error: ${err}`);
      res.status(401).send("Unauthorized");
      return;
    }
  },
};
