const CheckupName = require("../models/checkupMaster")

exports.addCheckupName = async (req, res) => {
    try {
        const data = req.body;

        console.log("-----")

        const { checkupName } = req.body;

        const isPresent = await CheckupName.findOne({ checkupName });

        if (isPresent) {

            return res.status(201).json({ message: "alredy registered" });

        }

        const newCheckUpType = new CheckupName(data);

        newCheckUpType

            .save()

            .then(() => {

                res.status(201).json({ message: "checkup name added successfully" });

            })
            .catch((err) => {

                console.error("Error saving checkup type", err);

                res.status(500).json({ error: "Error saving checkup name", details: err });

            });
    } catch (error) {
        console.error("Internal server error:", error);

        res.status(500).json({ error: "Internal server error" });

    }
};





