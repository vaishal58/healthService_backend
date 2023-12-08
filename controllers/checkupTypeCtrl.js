const CheckupType = require("../models/checkupTypes")


exports.addCheckupType = async (req, res) => {
    try {
        const data = req.body;

        console.log("-----")

        const { checkupType } = req.body;

        const isPresent = await CheckupType.findOne({ checkupType });

        if (isPresent) {
            return res.status(201).json({ message: "alredy registered" });
        }

        const newCheckUpType = new CheckupType(data);

        newCheckUpType
            .save()
            .then(() => {
                res.status(201).json({ message: "checkup added successfully" });
            })
            .catch((err) => {
                console.error("Error saving checkup type", err);
                res.status(500).json({ error: "Error saving checkup type", details: err });
            });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getCheckupType = async (req, res) => {
    try {

        const data = await CheckupType.find().then((data) => {
            res.status(201).json({ data: data });
        }).catch((error) => {
            console.error("Internal server error:", error);
            res.status(500).json({ error: "Internal server error" });
        });



    } catch (error) {

        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}