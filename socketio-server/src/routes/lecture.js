const router = require("express").Router();
const {db} = require('../firebase');

//This is setting from admin for total game configuration
router.post("/", async (req, res) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const generateString = (length) => {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
	const roomId = generateString(5).split(" ").join("");
	const createTeam = async (round, number) => {
		for (let i = 1; i < number+1; i++) {
			try {
				const team = db.collection('teams').doc(round +"-"+i);
				await team.set({
					roomId: roomId,
					userList: [],
					deviceList: [],
					input:[],
					turn: 0
					})
			} catch (error) {
				console.log(error);
			}
		}
	}
	const createRound = async (number) => {
		for (let i = 1; i < 8 ; i++) {
			try {
				const round = db.collection('rounds').doc(number +"-"+i);
				await round.set({
					input:[],
					teams:[]
					})
			} catch (error) {
				console.log(error);
			}
		}
	}
	try {
		const room = db.collection('rooms').doc(roomId);
		createTeam(roomId, req.body.team.length, 4)
		createRound(roomId)
		await room.set({
		...req.body,
		ranking: []
		})

		res
			.status(201)
			.send({ message: "Game configuration completed!!!", roomId: roomId });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}


});



module.exports = router;
