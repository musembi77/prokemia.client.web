import {useEffect,useState} from 'react'
import {Flex, Text,Button,Center,Link,SimpleGrid} from '@chakra-ui/react'
import {useRouter} from 'next/router';
// import styles from '../styles/Home.module.css';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Footer(){
	const router = useRouter();
	const [window,set_window]=useState({});

	
	useEffect(()=>{
		const client = {
			width: document?.documentElement?.clientWidth,
		}
		//console.log(typeof(client))
		if (client != {}){
			set_window(client)
		}else{
			set_window({})
		}
	},[])
	return(
		<Flex borderTop='1px solid #eee' direction='column' gap='5' mt='5' cursor='pointer' p='4' pl={window?.width > 500? '100px':'10px'} pr={window?.width > 500? '100px':'10px'}>
			<Flex justify='space-between'  wrap='Wrap' p='2'>
				<Flex direction='column'>
					<Text cursor='pointer'fontFamily='ClearSans-Bold' onClick={(()=>{router.push('/')})} fontSize='1.5em' color='#00e0c6' fontWeight='bold' >Pro<span style={{color:"#000"}}>Kemia</span></Text>
					<Link href='/contact' w='100px' fontWeight={'bold'} bg='#009393' p='2' color='#fff' borderRadius={'5px'} cursor='pointer' onClick={(()=>{router.push('/contact')})}>Contact Us</Link>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text cursor='pointer'fontFamily='ClearSans-Bold' fontSize='20px' color='#009393' fontWeight='bold' >Company</Text>
					<Link href='/Aboutus' fontSize={'16px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/Aboutus')})}>About Us</Link>
					
				</Flex>
				<Flex direction='column' gap='2'>
					<Text cursor='pointer' fontFamily='ClearSans-Bold' fontSize='20px' color='#009393' fontWeight='bold' >Support</Text>
					<Link href='/contact' fontSize={'16px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/contact')})}>Contact Us</Link>
					<Link href='/faqs' fontSize={'16px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/faqs')})}>FAQs</Link>
					<Link href='/feedback' fontSize={'16px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/feedback')})}>FeedBacks</Link>
				</Flex>
				<Flex direction='column' gap='2'>
					<Text cursor='pointer' fontFamily='ClearSans-Bold' fontSize='20px' color='#009393' fontWeight='bold' >Legals</Text>
					<Link href='/t&c' fontSize={'16px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/t&c')})}>Terms&Conditions</Link>
					<Link href='/privacy_policy' fontSize={'16px'} color='grey' cursor='pointer' onClick={(()=>{router.push('/privacy_policy')})}>Privacy Policy</Link>
				</Flex>
			</Flex>
			<Center>
				<Text fontSize={'12px'} color={'grey'}>Copyright @ ProKemia 2022</Text>
			</Center>
		</Flex>
	)
}

export default Footer;

/**
 * 
 * <Flex align='center' gap='3' fontSize={'12px'} color='grey'>
						<EmailIcon style={{fontSize:'12px'}}/>
						<Link color='#009393' href={`mailto: help@prokemia.com`} isExternal>help@prokemia.com</Link>
					</Flex>
					<Flex align='center' gap='3' fontSize={'12px'} color='grey'>
						<PhoneIcon style={{fontSize:'12px'}}/>
						<Link href={`tel:+254 20 2525265`} isExternal>+254 20 2525265</Link>
					</Flex>
					<Flex align='center' gap='3' fontSize={'12px'} color='grey'>
						<LocationCityIcon style={{fontSize:'12px'}}/>
						<Text>Nairobi,Kenya</Text>
					</Flex>
					<Flex align='center' gap='3' fontSize={'12px'} color='grey'>
						<AccessTimeIcon style={{fontSize:'12px'}}/>
						<Text>0900hrs-1700hrs</Text>
					</Flex>

					
 */