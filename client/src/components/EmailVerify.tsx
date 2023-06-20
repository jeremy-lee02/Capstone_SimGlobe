import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<div>
			{validUrl ? (
				<div className={styles.container}>
					<h1>Email verified successfully</h1>
					<Link to="/">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</div>
	);
};

export default EmailVerify;