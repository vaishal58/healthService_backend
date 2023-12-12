const Company = require("../models/companyMaster")

exports.getAllCompany = async (req,res) => {

    try{

        const companyData = await Company.find().then( (data)=>{

            res.status(201).json({ data : data});

        } ).catch( (error)=>{

            console.error("Internal server error:", error);

            res.status(500).json({ error: "Internal server error" });

        } )
    }catch(error){

        console.error("Internal server error:", error);

        res.status(500).json({ error: "Internal server error" });
        
    }

}




