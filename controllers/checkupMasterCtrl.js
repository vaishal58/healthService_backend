const CheckupName = require("../models/checkupMaster")

exports.addCheckupName = async (req, res) => {
    try {
        const data = req.body;

        console.log("-----")

        console.log( data.data )

        const { checkupName  } = req.body;

        // const isPresent = await CheckupName.findOne({ checkupName });

        // if (isPresent) {
        //     return res.status(201).json({ message: "alredy registered" });
        // }

       

        const newCheckUpName = new CheckupName( data.data );

        console.log("---new form--")
        
        console.log( newCheckUpName );





        newCheckUpName

            .save()

            .then((data) => {

                
                res.status(201).json({ data : data });

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





