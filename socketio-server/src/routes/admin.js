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

		const adminRef = db.collection("users");
		const queryAdminRef = await adminRef.where('email', '==', req.body.email).get();
		const adminInfo = [];

		queryAdminRef.forEach(admin => {
			adminInfo.push(admin.data())
		})

		if (queryAdminRef.size !== 1) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}
			
		const validPassword = await bcrypt.compare(
			req.body.password,
			adminInfo[0].password
		);


		if (!validPassword) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}

		const token = jwt.sign({ _id: userInfo[0].user_id, email: req.body.email }, process.env.JWTPRIVATEKEY, {
			expiresIn: "7d",
		});

		res.json({message: "Logged in successfully", token: token})

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
