const { where } = require("sequelize");
const db = require("../../database");
const User = require("../entity/user");

const redis = require("redis");

require("dotenv").config();

const client = redis.createClient(process.env.redis_port, process.env.host);

//connect to redis dataabse

client.connect();

const addUSer = async (req, res) => {
  try {
    const resp = await User.bulkCreate(req.body);

    res.status(201).json({
      status: "success",
      response: resp,
      message: "successfull data inserted..",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "fail",
      response: null,
      message: "failled to store record",
    });
  }
};

const getAllRecord = async (req, res) => {
  try {
    let response;
    const itemKeys = "user01" + "#";

    const cacheData = await client.get(itemKeys);
    if (cacheData) {
      console.log("from cache");
      const resp = JSON.parse(cacheData);
      res.status(200).json({
        status: "success",
        response: resp,
        message: "successful fetching from cache",
      });
    } else if (!cacheData) {
      console.log("from db");
      const resp = await User.findAll();

      client.set(itemKeys, JSON.stringify(resp));
      res.status(200).json({
        status: "success",
        response: resp,
        message: "fetching from db...",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "fail",
      response: null,
      message: "failled to insert ",
    });
  }
};
const getOneRecordById = async (req, res) => {
  try {
    let response;

    const itemKeysOne = "user11" + "#";
    const cacheItemOne = client.get(itemKeysOne);
    if (cacheItemOne) {
      console.log("from cache");
      const resp = await json.parse(cacheItemOne);
      res.status(200).json({
        status: "success",
        response: resp,
        message: "fetching from cache...",
      });
    } else if (!cacheItemOne) {
      console.log("from db");
      const resp = await User.findByPk(req.params.id);
      console.log(resp);

      await client.set(itemKeysOne, JSON.stringify(resp));
      res.status(200).json({
        status: "success",
        response: resp,
        message: "fetching from db...",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "fail",
      response: null,
      message: null,
    });
  }
};
arun-kumar-98/node.js_redis
//find one record

const getOneRecordBasedOnField = async (req, res) => {
  try {
    const itemKeysOne = "user11" + "#";
    const cacheGetData = await client.get(itemKeysOne);

    if (cacheGetData) {
      console.log("from cache");
      const resp = JSON.parse(cacheGetData);
      res.status(200).json({
        status: "success",
        response: resp,
        message: "fetching from cache...",
      });
    } else if (!cacheGetData) {
      console.log("from db");
      const resp = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      client.set(itemKeysOne, JSON.stringify(resp));
      res.status(200).json({
        status: "success",
        response: resp,
        message: null,
      });
    }
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: "fail",
      response: null,
      message: "failled to fetch input",
    });
  }
};

//update record

const updateRecordByUsername = async (req, res) => {
  try {
    const itemKeysUpdate = "user200" + "#";

    const cacheUpdatable = await client.get(itemKeysUpdate);
    if (cacheUpdatable) {
      console.log("from cache implementation");
      const resp = JSON.parse(cacheUpdatable);
      res.status(200).json({
        status: "success",
        response: resp,
        message: "fetching from cache...",
      });
    } else if (!cacheUpdatable) {
      console.log(" from db");
      const resp = await User.update(req.body, {
        where: {
          username: req.body.username,
        },
      });

      client.set(itemKeysUpdate, JSON.stringify(resp));
      res.status(200).json({
        status: "success",
        response: resp,
        message: "fetching from db",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "fail",
      response: null,
      message: "failled to update",
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const deleteItemKeys = "user00" + "#";
    const cacheDeletion = await client.get(deleteItemKeys);

    if (cacheDeletion) {
      console.log("from cache");
      const resp = client.del(deleteItemKeys);

      res.status(200).json({
        status: "success",
        response: resp,
        message:"fetching from cache..."
      });
    } else if (!cacheDeletion) {
      console.log("from db");
      const resp = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      client.set(deleteItemKeys, JSON.stringify(resp));

      res.status(200).json({
        status: "success",
        response: resp,
        message: "fetching from db..",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "fail",
      response: null,
      message: "failed to remove record",
    });
  }
};

module.exports = {
  addUSer,
  getAllRecord,
  getOneRecordById,
  getOneRecordBasedOnField,
  updateRecordByUsername,
  deleteRecord,
};
