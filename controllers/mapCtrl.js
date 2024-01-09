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
};

module.exports = mapCtrl;
