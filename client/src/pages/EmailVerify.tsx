import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { simGlobe_logo, rmit_logo } from '../assets'


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
		<div className='background flex flex-col gap-[35vh] pl-5 py-4'>
			<div className='flex items-center justify-between'>
				<img src= {rmit_logo} width={150} height={60} className='object-contain' />
				<img src= {simGlobe_logo} width={180} height={180} className='object-contain' />
			</div>
			<div className="flex flex-col justify-center items-center text-white">
			{validUrl ? (
				<div className="flex gap-7 flex-col justify-center items-center m-auto">
					<h1 className="text-3xl tracking-[2px] font-bold">Email verified successfully</h1>
					<Link className="bg-[#044C87] py-2 px-8  font-semibold rounded-md border border-[#0000003c] hover:underline hover:bg-white hover:text-[#044C87]" to="/">
						Login
					</Link>
				</div>
			) : (
				<div className="flex gap-7 flex-col justify-center items-center">
					<h1 className="text-3xl tracking-[2px] font-bold">404 Not Found</h1>
					<Link className="bg-[#044C87] py-2 px-8  font-semibold rounded-md border border-[#0000003c] hover:underline hover:bg-white hover:text-[#044C87]" to="/">
						Back To Home 
					</Link>
				</div>
			)}
		</div>
		</div>
	
	);
};

export default EmailVerify;