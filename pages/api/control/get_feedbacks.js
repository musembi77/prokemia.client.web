import axios from 'axios';
//import Cookies from 'universal-cookie';

export default async function Get_Feedbacks() {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.get("http://localhost:5000/api/get_feedbacks")
    	return result
    }
    else if (env == "production"){
    	const result = await axios.get(`https://prokemia-clientserver-production.up.railway.app/api/get_feedbacks`)
    	return result
    }
}