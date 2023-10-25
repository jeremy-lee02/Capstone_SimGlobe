const router = require("express").Router();
const {db} = require('../firebase');

//This is setting from admin for total game configuration
router.post("/", async (req, res) => {
	try {
        //Perpetual Growth (%)
		const perpetualGrowth = req.body[0].value;

        //Impact of Inflation on Induced Consumption
		const inflation = req.body[1].value;

        //Impact of Interest Rate (Change) on Induced Consumption
		const IRC = req.body[2].value;

        //Impact of Interest Rate (Level) on Induced Consumption
		const IIRIC = req.body[3].value;

		//Impact of Interest Rate (Change) on Induced Investment
		const IIRII = req.body[4].value;

        //Impact of Interest Rate (Level) on Induced Investment
		const IRLII = req.body[5].value;

		//Impact of Interest Rate (Level) on Inflation
		const IIRI = req.body[6].value;

        //Impact of Inflation Expectation on Inflation
		const IIEI = req.body[7].value;

        //Impact of Supply and Demand change on Inflation
		const SDI = req.body[8].value;
        
		//Impact of Interest Rate Differential on Capital Flow
		const IIRD = req.body[9].value;

		//Autonousmous Import (Billion $USD)
		const AI = req.body[10].value;

		//Impact of FX Rate on Induced Import
		const IFRII = req.body[11].value;

		//Height of Sigmoid
		const HS = req.body[12].value;

		//Width of Sigmoid
		const WS = req.body[13].value;

		//Position of Sigmoid
		const PS = req.body[14].value;

		//Size of Rewards
		const SR = req.body[15].value

		const setting = db.collection('setting').doc("settingGeneral")
		await setting.update({
			perpetualGrowth : perpetualGrowth,
            inflation: inflation,
			IRC: IRC,
			IIRIC: IIRIC,
			IIRII: IIRII,
			IRLII: IRLII,
			IIRI: IIRI,
			IIEI: IIEI,
			SDI: SDI,
			IIRD: IIRD,
			IFRII: IFRII,
			AI: AI,
			HS: HS,
			WS: WS,
			PS: PS,
			SR: SR
		})

		res
			.status(201)
			.send({ message: "Game configuration completed!!!" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post('/getter', async (req, res) => {
	try {
		const settingDb = db.collection('setting').doc("settingGeneral")
		const setting = (await settingDb.get()).data();
		res
			.status(201)
			.send({message: "Get Setting!!", 
			perpetualGrowth : setting.perpetualGrowth,
            inflation: setting.inflation,
			IRC: setting.IRC,
			IIRIC: setting.IIRIC,
			IIRII: setting.IIRII,
			IRLII: setting.IRLII,
			IIRI: setting.IIRI,
			IIEI: setting.IIEI,
			SDI: setting.SDI,
			IIRD: setting.IIRD,
			IFRII: setting.IFRII,
			AI: setting.AI,
			HS: setting.HS,
			WS: setting.WS,
			PS: setting.PS,
			SR: setting.SR
		})
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
	
})

module.exports = router;
