
const EmployeeVitalsAndHistory  = require("../models/employeeVitalsAndHistory")

const CheckupData = require("../models/checkupData")


exports.addVitalAndHistory = async (req, res) => {
    try {
        const data = req.body;

        const {checkupDataId} = req.body

        const newVitalAndHistory= new EmployeeVitalsAndHistory(data);

        newVitalAndHistory
            .save()
            .then(() => {
                res.status(201).json({ message: "empy vital and history added successfully" });
            })
            .catch((err) => {
                console.error("Error saving vital and histor", err);
                res.status(500).json({ error: "Error saving vital and histor", details: err });
            });
           
        const newid = newVitalAndHistory._id;    

        await CheckupData.findByIdAndUpdate( {_id :checkupDataId} , 
            
            { $set: { 'employeeReports.employeeVitalAndHistoryId': newid } },
         )   
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};