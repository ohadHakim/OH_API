const database = require("./database");
const joi = require("joi");
const { stringify } = require("querystring");

module.exports = {
  //add card
  addBusinessCard: async function (req, res, next) {
    const qs = req.body;
    const schema = joi.object({
      business_name: joi.string().required().min(2).max(200),
      description: joi.string().required().max(500),
      address: joi.string().required().min(5).max(500),
      phone: joi.string().required().min(8).max(50),
      image: joi.string().required().min(4).max(100),
      customer_id: joi.number().required().min(1),
    });

    const { error } = schema.validate(qs);
    if (error) {
      console.log(error);
      res
        .status(400)
        .send("error adding business card, missing/corrupted data");
      return;
    }

    const sql =
      "INSERT INTO bussiness_card(business_name,description,address,phone,image,customer_id) VALUES (?,?,?,?,?,?)";
    try {
      const result = await database.getConnection(sql, [
        qs.business_name,
        qs.description,
        qs.address,
        qs.phone,
        qs.image,
        qs.customer_id,
      ]);
      res.status(200).json(qs);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send("error adding business card, please check your data");
    }
  },
  //GET card by id
  getBusinessCard: async function (req, res, next) {
    const sql =
      "SELECT business_name,description,address,phone,image,customer_id FROM bussiness_card WHERE id=?";
    try {
      const result = await database.getConnection(sql, [req.params.id]);
      if (result[0].length === 0) {
        res.status(400).json("No id found! Try again!");
      } else res.json(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  //GET cards list by id
  getBusinessCardsList: async function (req, res, next) {
    const sql = "SELECT * FROM bussiness_card WHERE customer_id=?";
    try {
      const result = await database.getConnection(sql, [req.params.id]);
      if (result[0].length === 0) {
        res.status(400).json("No id found! Try again!");
      } else res.json(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
  //UPDATE card by id
  updateBusinessCard: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi
      .object({
        business_name: joi.string().min(2).max(200),
        description: joi.string().max(500),
        address: joi.string().min(5).max(500),
        phone: joi.string().min(8).max(50),
        image: joi.string().min(4).max(100),
        customer_id: joi.number().min(1),
      })
      .min(1);

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.status(400).send(`error update business card: ${error}`);
      return;
    }

    const keys = Object.keys(value);
    const values = Object.values(value);
    const fields = keys.map((key) => `${key}=?`).join(",");
    values.push(req.params.id);
    const sql = `UPDATE bussiness_card SET ${fields} WHERE id=?`;

    try {
      const result = await database.getConnection(sql, values);
      res.json(value);
    } catch (err) {
      console.log(err);
      return;
    }
  },
  //DELETE card by id
  deleteBusinessCard: async function (req, res, next) {
    const schema = joi.object({
      id: joi.number().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      res.status(400).send("error delete business card");
      console.log(error.details[0].message);
      return;
    }

    const sql = `DELETE FROM bussiness_card WHERE id=?`;

    try {
      const result = await database.getConnection(sql, [value.id]);
      res.send(`Business Card number:${value.id} was deleted successfully!`);
    } catch (err) {
      res.status(400).send("error delete product");
      console.log(err.message);
    }
  },
};
// jgjgjgj
