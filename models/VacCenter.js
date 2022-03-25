const sql = require("../config/vacCenterDB");
const sql_config = require("../config/sql_config");

// constructor
const VacCenter = function(vacCenter) {
    this.id = vacCenter.id;
    this.name = vacCenter.name;
    this.tel = vacCenter.tel;
};

VacCenter.getAll = result => {
    sql.query(`SELECT * FROM ${sql_config.table}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("VacCenters: ", res);
        result(null, res);
    });
};

module.exports = VacCenter;