const router = require("express").Router();
const {db} = require('../firebase');

//This is setting from admin for total game configuration
router.post("/", async (req, res) => {
	try {
        //Perpetual Growth (%)
		const perpetualGrowth = req.body.perpetualGrowth;

        //Impact of Inflation on Induced Consumption
		const inflation = req.body.inflation;

        //Impact of Interest Rate (Change) on Induced Consumption
		const IRC = req.body.IRC;

        //Impact of Interest Rate (Level) on Induced Consumption
		const IRL = req.body.IRL;

        //Impact of Interest Rate (Change) on Induced Investment
		const IRLII = req.body.IRLII;

        //Impact of Interest Rate (Level) on Inflation
		const IRLI = req.body.IRLI;

        //Impact of Inflation Expectation on Inflation
		const IEI = req.body.IEI;

        //Impact of Supply and Demand change on Inflation
		const SDI = req.body.SDI;
        
		const setting = db.collection('setting').doc("settingGeneral")
		await setting.update({
			perpetualGrowth : perpetualGrowth,
            inflation: inflation,
			IRC: IRC,
			IRL: IRL,
			IRLII: IRLII,
			IRLI: IRLI,
			IEI: IEI,
			SDI: SDI,
		})

		res
			.status(201)
			.send({ message: "Game configuration completed!!!" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});



module.exports = router;
