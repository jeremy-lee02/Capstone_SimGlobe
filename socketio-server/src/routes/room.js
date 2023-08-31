const router = require("express").Router();

const bcrypt = require("bcrypt");
const Joi = require("joi");
const {db} = require('../firebase');
const jwt = require("jsonwebtoken");

//use to create room when lecture hit the create button with the roomID will be automatically generated
router.post("/", async (req, res) => {
	try {
		const roomRef = db.collection("rooms");
		const queryRoomRef = await roomRef.where('roomId', '==', req.body.room).get();

		if (queryRoomRef.size > 1) {
			return res
				.status(409)
				.send({ message: "Room already Exist!" });
		}

		const room = db.collection('rooms').doc()
		await room.set({
		...req.body,
		roomId: room.id,	
		})

		res
			.status(201)
			.send({ message: "Room create successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.get("/join/:roomId", async (req, res) => {
	const roomDB = db.collection('rooms').doc(req.params.roomId);
	const roomGetter = (await roomDB.get()).data();
    if (roomGetter.size < 1) {
        return res
            .status(409)
            .send({ message: "Room not Exist!" });
    } else {
		return res
		.status(200)
		.send({ message: "Room valid!" });
	}
})

module.exports = router;
