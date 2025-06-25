exports.custom = async (req, res) =>{
    try {
        console.log(req.body);
        res.status(200).json({ response: true });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}