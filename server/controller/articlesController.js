const db = require("../database/connection.js");
const response = require("../response.js");

const userController = {
  getAllData: (req, resp) => {
    const sql = `SELECT * FROM articles`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      response(200, res, "GET all data", resp);
    });
  },
  getDataById: (req, resp) => {
    const sql = `SELECT * FROM articles WHERE id = ${req.params.id}`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      response(200, res, "GET data by id", resp);
    });
  },
  postData: (req, resp) => {
    const { title, tag, image, description, paragraph, createdAt, lastUpdated } =
      req.body;
    const unixTimestamp = Date.now();
    const sql = `INSERT INTO articles VALUES (NULL,'${title}','${tag}', '${image}','${description}','${paragraph}','${unixTimestamp}', NULL)`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      if (res.affectedRows) {
        const data = {
          isSuccess: res.affectedRows,
          id: res.insertId,
        };
        response(201, data, "POST article", resp);
      }
    });
  },
  updateData: (req, resp) => {
    const { title, tag, image, description, paragraph, createdAt, lastUpdated } =
      req.body;
    const unixTimestamp = Date.now();
    const sql = `UPDATE articles SET id=${req.params.id}, title='${title}', tag='${tag}', image='${image}', description='${description}', paragraph= '${paragraph}', lastUpdated='${unixTimestamp}' WHERE id = ${req.params.id}`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      if (res.affectedRows) {
        const data = {
          isUpdated: res.affectedRows,
          message: res.message,
        };
        response(201, data, "PUT article", resp);
      } else {
        response(
          404,
          { isUpdated: res.affectedRows },
          "not found, cannot PUT article",
          resp
        );
      }
    });
  },
  deleteData: (req, resp) => {
    const sql = `DELETE FROM articles WHERE id=${req.params.id}`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      if (res.affectedRows) {
        response(201, { isDeleted: res.affectedRows }, "DELETE article", resp);
      } else {
        response(
          404,
          { isDeleted: res.affectedRows },
          "not found, cannot DELETE article",
          resp
        );
      }
    });
  },
};

// {
//   "id": 1,
//   "title": "",
//   "tag": "",
//   "description": "",
//   "paragraph": "",
//   "createdAt": 1,
//   "lastUpdated": null
//  }

module.exports = userController;
