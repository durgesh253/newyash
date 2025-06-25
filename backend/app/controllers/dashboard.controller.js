const { db } = require("./../models/index");
const Call = db.call;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const moment = require("moment");
exports.getDashboard = async (req, res) =>{
    try {
        const {startDate, endDate, type} = req.body;
        let results;
        if(type == "WEEKLY"){
            results = await sequelize.query(
                "SELECT COUNT(*) as calls, DATE_FORMAT(createdAt,'%d %b, %Y') as month  from callhistories GROUP BY week(createdAt) ORDER BY id DESC",
                {
                    type: QueryTypes.SELECT,
                },
              );
              results.reverse();
        }
        if(type == "MONTHLY"){
            results = await sequelize.query(
                "SELECT COUNT(*) as calls, DATE_FORMAT(createdAt,'%b %Y') as month  from callhistories GROUP BY DATE_FORMAT(createdAt,'%m') ORDER BY id DESC",
                {
                    type: QueryTypes.SELECT,
                },
              );
              results.reverse();
        }
        if(type == "CUSTOM"){
            results = await sequelize.query(
                "SELECT COUNT(*) as calls, DATE_FORMAT(createdAt,'%d %b, %Y') as month  from callhistories  GROUP BY DATE_FORMAT(createdAt,'%d') ORDER BY id DESC",
                {
                    type: QueryTypes.SELECT,
                },
              );
              results.reverse();
        }
        if(startDate && endDate){
            var sDate = moment(startDate);
            var eDate = moment(endDate);
            var diff = eDate.diff(sDate,'days');
            let group_by = `DATE_FORMAT(createdAt,'%d')`;
            let field = `DATE_FORMAT(createdAt,'%d %b, %Y') as month`;
            let end_date = moment(endDate).add(1, 'day').format("YYYY-MM-DD");
            if(Number(diff) > 30){
                group_by = `week(createdAt)`;
                field = `DATE_FORMAT(createdAt,'%d %b, %Y') as month`;
            }
            if(Number(diff) > 60){
                group_by = `DATE_FORMAT(createdAt,'%m'`;
                field = `DATE_FORMAT(createdAt,'%b, %Y') as month`;
            }
           
           
            const query = `SELECT COUNT(*) as calls, ${field}  from callhistories WHERE createdAt >= '${startDate}' AND createdAt <= '${end_date}' GROUP BY ${group_by} ORDER BY id DESC`;
            results = await sequelize.query(
                query,
                {
                    type: QueryTypes.SELECT,
                },
              );
              results.reverse();
        }
        res.status(200).json({ response: true, data: results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}