import axios from 'axios';

export default async function Get_Manufacturers() {
	const env = process.env.NODE_ENV
    //console.log(env)
    if(env == "development"){
        const result = await axios.get("http://localhost:5000/api/get_manufacturers");
    	return result
    }
    else if (env == "production"){
    	const result = await axios.get(`https://prokemia-clientserver-production.up.railway.app/api/get_manufacturers`);
    	return result
    }
}