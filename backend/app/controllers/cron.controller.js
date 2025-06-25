
const csv = require('csv-parser');
const fs = require('fs');
const { db } = require("./../models/index");
const Import = db.import;
exports.importData = async (req, res) =>{
    const results = [];
    const bulkInsert = [];
    const {filename } = req.body;
    try {
        await fs.createReadStream(`csv/${filename}`)
            .pipe(csv())
            .on('data', async (data) => results.push(data))
            .on('end', async() => {
                results?.map(async(resu)=>{
                    if(resu?.phone.trim() != ''){
                        let phone = resu?.phone.trim()?.replace(/[^+\d]/g, "");
                        phone = phone.startsWith("+") ? phone : "+" + phone;
                       
                        bulkInsert.push({name : resu?.name, place_id : resu?.place_id, description : resu?.description, phone : phone, categories : resu?.categories, owner_name : resu?.owner_name, address : resu?.address})
                    }
                   
                    
                });
                await Import.bulkCreate(bulkInsert);
            });
 
        res.status(200).json({ response: true, message: "Data import Successfully." , data : results});
    } catch (error) {
        
    }
}