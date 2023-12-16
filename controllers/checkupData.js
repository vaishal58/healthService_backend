const CheckupData = require("../models/checkupData")

exports.addCheckupData = async (req, res) => {
    try {
        const data = req.body;

        console.log("-----")

        const { checkupName } = req.body;

        const isPresent = await CheckupData.findOne({ checkupName });

        if (isPresent) {

            return res.status(201).json({ message: "alredy registered" });

        }

        const newCheckUpData = new CheckupData(data);

        newCheckUpData

            .save()

            .then(() => {

                res.status(201).json({ data : newCheckUpData });

            })
            .catch((err) => {

                console.error("Error saving checkup data", err);

                res.status(500).json({ error: "Error saving checkup data", details: err });

            });
            
    } catch (error) {
        console.error("Internal server error:", error);

        res.status(500).json({ error: "Internal server error" });

    }
};


exports.updateCheckupData = async (req, res) => {
    try {
        const data = req.body;

        console.log("-----")

        // const { checkupName } = req.body;

        // const isPresent = await CheckupData.findOne({ checkupName });

        // if (isPresent) {

        //     return res.status(201).json({ message: "alredy registered" });

        // }

        const newCheckUpData = new CheckupData(data);

        newCheckUpData

            .save()

            .then(() => {

                res.status(201).json({ data : newCheckUpData });

            })
            .catch((err) => {

                console.error("Error saving checkup data", err);

                res.status(500).json({ error: "Error saving checkup data", details: err });

            });


    } catch (error) {
        console.error("Internal server error:", error);

        res.status(500).json({ error: "Internal server error" });

    }
};





