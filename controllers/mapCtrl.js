const connection = require("../config/dbConfig");

const mapCtrl = {
  showEveryMap: async (req, res) => {
    console.log("map")
    const query = "SELECT * FROM map ORDER BY SUBSTRING(location, 1, 1), CONVERT(SUBSTRING(location, 2), UNSIGNED INTEGER);";
    connection.query(query, (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
    });
  },
  findLatitudeLongitude: async (name) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM map WHERE name = ?";
      connection.query(query, [name], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }
};

module.exports = mapCtrl;
