
const Company = require("../models/companyMaster")
const {ObjectId} = require("mongoose")


// add new company
exports.addCompany = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        const { companyName } = req.body;

        const isPresent = await Company.findOne({ companyName });

        if (isPresent) {
            return res.status(201).json({ message: "alredy registered" });
        }

        const newCompany = new Company(data);

        newCompany
            .save()
            .then(() => {
                res.status(201).json({ message: "company added successfully" });
            })
            .catch((err) => {
                console.error("Error saving employ:", err);
                res.status(500).json({ error: "Error saving company", details: err });
            });

        

    } catch (error) 
    {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// add new category in company
exports.addCompanyCategory = async (req, res) => {
    try {

        const { _id } = req.body;

        const { companyJobCategorys } = req.body;

        
        const companyData = await Company.findById( { _id });

        const categoryData = companyData.companyJobCategorys;
        
        const isPresent = categoryData.find( (cate) => cate === companyJobCategorys )


        if(isPresent){
            return res.status(201).json({ message: "category alredy registered" });
        }

        const newData = await Company.findByIdAndUpdate(_id,
            { $push: { companyJobCategorys: companyJobCategorys } },
            { returnDocument: 'after' }
        ).then(() => {
            res.status(201).json({ message: "company category added successfully"});
        }).catch((error) => {
            console.error("Internal server error:", error);
            res.status(500).json({ error: "Internal server error" });

        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// add new Departments in company
exports.addCompanyDepartments = async (req, res) => {
    try {

        const { _id } = req.body;
        const { companyDepartments } = req.body;

        const companyData = await Company.findById(_id);

        const departmentData = companyData.companyDepartments;
        
        const isPresent = departmentData.find( (depa) => depa === companyDepartments )


        if(isPresent){
            return res.status(201).json({ message: "department alredy registered" });
        }

        const newData = await Company.findByIdAndUpdate(_id,
            { $push: { companyDepartments: companyDepartments } },
            { returnDocument: 'after' }
        ).then(() => {
            res.status(201).json({ message: "company department added successfully"});
        }).catch((error) => {
            console.error("Internal server error:", error);
            res.status(500).json({ error: "Internal server error" });

        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// add new location in company
exports.addCompanyLocation = async (req, res) => {
    try {

        const { _id } = req.body;
        const { companyLocation } = req.body;

        const companyData = await Company.findById(_id);

        const locationData = companyData.companyLocation;
        
        const isPresent = locationData.find( (loca) => loca === companyLocation )


        if(isPresent){
            return res.status(201).json({ message: "location alredy registered" });
        }

        const newData = await Company.findByIdAndUpdate(_id,
            { $push: { companyLocation: companyLocation } },
            { returnDocument: 'after' }
        ).then(() => {
            res.status(201).json({ message: "company location added successfully"});
        }).catch((error) => {
            console.error("Internal server error:", error);
            res.status(500).json({ error: "Internal server error" });

        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// get all company
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

// get company bt id 

exports.getComapnyById = async (req,res) => {
    
    const id = req.params.id

    console.log( id )

    const companyData = await Company.findById({_id:id}).then( (data)=>{
        res.status(201).json(
            {
                data:data
            }
        )
    } ).catch( (error)=>{
        res.status(501).json( {error:"internal server error"} );
    } )
     
}

// get all employee by company

exports.getAllEmployByCompany = async (req,res) => {
   
    try{
     const {id} = req.body;
   
     await Company.findOne( { _id : id } ).then( (data) => {
   
       res.status(201).json( {
         data:data
       } )
     } ).catch( (error)=>{
       console.log("error :" ,error);
       res.status(501).json({
         message:"internal server error"
       })
     } )
   
    }catch(error){
       console.log("error :" ,error);
       res.status(501).json({
         message:"internal server error"
       })
    }
   }


// all employee by company and location
   
exports.getAllEmployByCompanyAndLocation = async (req,res) => {
   
    try{
        const id = req.params.id

        const {location} = req.body


        console.log(req.body)

   
     await Company.findOne( { _id : id } ).populate("companyEmployees").then( (data) => {
   
       const newData = data.companyEmployees


       const empLocation = newData.filter( ( ldata ) => ldata.companyLocation == location )

       console.log( empLocation )

       res.status(201).json( {
        data : empLocation
       } )
     } ).catch( (errot)=>{
       console.log("error :" ,error);
       res.status(501).json({
         message:"internal server error"
       })
     } )
   
    }catch(error){
       console.log("error :" ,error);
       res.status(501).json({
         message:"internal server error"
       })
    }
   
   }   