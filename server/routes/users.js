const router = require("express").Router();

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const {db} = require('../firebase');

router.post("/", async (req, res) => {
	try {
		const userRef = db.collection("users");
		const queryUserRef = await userRef.where('email', '==', req.body.email).get();

		if (queryUserRef.size > 1)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);


		const user = db.collection('users').doc()
		await user.set({
		...req.body,
		user_id: user.id,	
		password: hashPassword, verified: false
		})

		const token = db.collection('tokens').doc()
		await token.set({
			userId: user.id,
			token: crypto.randomBytes(32).toString("hex"),
		})

		const userDb = db.collection('users').doc(user.id)
		const userGetter = (await userDb.get()).data();

		const tokenDb = db.collection('tokens').doc(token.id)
		const tokenGetter = (await tokenDb.get()).data();

		const url = `${process.env.BASE_URL}users/${user.id}/verify/${tokenGetter.token}`;
		await sendEmail(userGetter.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const userDb = db.collection('users').doc(req.params.id)
		const isUserExist = await (await userDb.get()).exists

		if (!isUserExist) return res.status(400).send({ message: "Invalid link" });

		const tokenRef = db.collection("tokens");
		const queryTokenRef = await tokenRef.where('userId', '==', req.params.id).where('token', '==', req.params.token).get();

		if (queryTokenRef.size < 1) return res.status(400).send({ message: "Invalid link" });
		userDb.update('verified', true)


		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
