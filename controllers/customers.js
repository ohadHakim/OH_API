const database = require("./database");
const joi = require("joi");
const { stringify } = require("querystring");

module.exports = {
  //add customer
  addCustomer: async function (req, res, next) {
    const qs = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      email: joi.string().required().email().max(100),
      type: joi.string().required().min(4).max(100),
    });

    const { error } = schema.validate(qs);
    if (error) {
      console.log(error);
      res.status(400).send(`error adding customer: ${error}`);
      return;
    }

    const sql = "INSERT INTO customers(name,email,type) VALUES (?,?,?);";
    try {
      const result = await database.getConnection(sql, [
        qs.name,
        qs.email,
        qs.type,
      ]);
      res.status(200).json(qs);
    } catch (err) {
      throw err;
    }
  },
  //GET customer by id
  getCustomer: async function (req, res, next) {
    const sql = "SELECT name,email,type FROM customers WHERE id=?";
    try {
      const result = await database.getConnection(sql, [req.params.id]);
      if (result[0].length === 0) {
        res.status(400).json("No id found! Try again!");
      } else res.json(result[0]);
    } catch (err) {
      throw err;
    }
  },
};
