const router = require("express").Router();

const bcrypt = require("bcrypt");
const Joi = require("joi");
const {db} = require('../firebase');
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		const userRef = db.collection("users");
		const tokenRef = db.collection("tokens");
		const queryUserRef = await userRef.where('email', '==', req.body.email).get();
		const userInfo = [];
		const tokenInfo = [];

		queryUserRef.forEach(user => {
			userInfo.push(user.data())
		})
		const queryTokenRef = await tokenRef.where('userId', '==', userInfo[0].user_id).get();

		queryTokenRef.forEach(token => {
			tokenInfo.push(token.data())
		})

		if (queryUserRef.size !== 1) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}
			
		const validPassword = await bcrypt.compare(
			req.body.password,
			userInfo[0].password
		);


		if (!validPassword) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}
			
		if (!userInfo[0].verified) {
			return res.status(400).send({ message: "An Email sent to your account please verify" });
		}

		const token = jwt.sign({ _id: userInfo[0].user_id, email: req.body.email }, process.env.JWTPRIVATEKEY, {
			expiresIn: "7d",
		});

		res.json({message: "Logged in successfully", token: token})

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/auth/me", async(req, res) =>{
	
})

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
