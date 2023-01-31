//modules import
import React,{useState,useEffect} from 'react';
import {Flex,Text,Center,Image,useToast} from '@chakra-ui/react';
//components import
import Header from '../../components/Header.js';
//api calls imports
import Get_Industries from '../api/control/get_industries.js'
import Get_Technologies from '../api/control/get_technologies.js'
import Get_Distributors from '../api/auth/distributor/get_distributors.js'
import Get_Manufacturers from '../api/auth/manufacturer/get_manufacturers.js'
//utils
import {useRouter} from 'next/router';
//icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function All(){
	//utils
	const router = useRouter();
	let categ = router.query;
	const toast = useToast();
	//console.log(categ)
	//apis
	//states
	const [industries_data,set_industries_data]=useState([])
	const [technologies_data,set_technologies_data]=useState([])
	const [distributors_data,set_distributors_data]=useState([])
	const [manufacturers_data,set_manufacturers_data]=useState([])
	//functions
	/**fetch industries */
	const get_Industries_Data=async()=>{
		await Get_Industries().then((response)=>{
			const result = response?.data.filter((item)=> item?.verification_status)
			set_industries_data(result)
			////console.log(result)
		})
	}
	/**fetch technologies */
	const get_Technologies_Data=async()=>{
		await Get_Technologies().then((response)=>{
			const result = response?.data.filter((item)=> item?.verification_status)
			set_technologies_data(result)
			////console.log(response.data)
		})
	}
	/**fetch distributors */
	const get_Distributors_Data=async()=>{
		await Get_Distributors().then((response)=>{
			set_distributors_data(response.data)
			////console.log(response.data)
		})
	}
	/**fetch manufacturers */
	const get_Manufacturers_Data=async()=>{
		await Get_Manufacturers().then((response)=>{
			set_manufacturers_data(response.data)
			////console.log(response.data)
		})
	}
	//useEffects
	useEffect(()=>{
		if(!categ){
			alert('could not get options')
			router.back()
		}
		if(categ.category === 'Industries'){
			////console.log('1')
			get_Industries_Data()
		}else if(categ.category === 'Technologies'){
			////console.log('2')
			get_Technologies_Data()
		}else{
			toast({
				title: '',
				description: `broken link, redirecting`,
				status: 'info',
				isClosable: true,
			});
			router.back()
		}
		get_Distributors_Data()
		get_Manufacturers_Data()
	},[categ])
	
	return(
		<Flex direction='column' gap='2'>
			<Header/>
			<Flex direction='column' gap='2' p='2'>
				{categ?.category === 'Industries'?
					<Flex direction='column' gap='2' w='100%'>
						<Text fontSize='28px' fontFamily='ClearSans-Bold' >{categ?.category}</Text>
						<Flex wrap='Wrap' w='100%'>
							{industries_data?.map((item)=>{
								return(
									<Flex key={item._id} w='170px' h='225px' m='1' position='relative' cursor='pointer' onClick={(()=>{router.push(`/products/${item.title}`)})}>
										<Image borderRadius='10px' objectFit='cover' src={item?.cover_image == ''? '../Pro.png':item?.cover_image} alt='next'/>
										<Text bg='rgb(192,192,192,0.6)' p='1' m='2' mb='0' borderRadius='5' position='absolute' top='10px' left='10px' fontSize='20px' color='#000' fontFamily='ClearSans-Bold'>{item.title}</Text>
									</Flex>
								)
							})}
						</Flex>
					</Flex>
				:
					<Flex direction='column' gap='2' w='100%'>
						<Text fontSize='28px' fontFamily='ClearSans-Bold' borderBottom='1px solid #000' >{categ.category}</Text>
						<Flex wrap='Wrap' w='100%'>
							{technologies_data?.map((item)=>{
								return(
									<Flex key={item._id} w='170px' h='225px' m='1' position='relative' cursor='pointer' onClick={(()=>{router.push(`/products/${item.title}`)})} boxShadow='lg'>
										<Image borderRadius='10px' objectFit='cover' src={item?.cover_image == ''? '../Pro.png':item?.cover_image} alt='next'/>
										<Text bg='rgb(192,192,192,0.6)' p='1' m='2' mb='0' borderRadius='5' position='absolute' top='10px' left='10px' fontSize='20px' color='#000' fontFamily='ClearSans-Bold'>{item.title}</Text>
									</Flex>
								)
							})}
						</Flex>
					</Flex>
				}
				<Flex p='2' direction='column' gap='2'>
					<Text color='#009393' fontSize='24px'> Featured Distributors </Text>
					{distributors_data?.slice(0,4).map((distributor)=>{
						return(
							<Flex direction='column' bg='#eee' p='1' mb='1' key={distributor._id}>
								<Text mb='0' fontSize='20px'>{distributor.company_name}</Text>
								<Text mb='0' >{distributor.description}</Text>
								<Text mb='0' fontSize='14px' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/account/distributor/${distributor._id}`)})}> view &gt;&gt; </Text>
							</Flex>
						)
					})}
					<Text color='#009393' fontSize='24px'>Featured Manufacturers </Text>
					{manufacturers_data?.slice(0,4).map((manufacturer)=>{
						return(
							<Flex direction='column' bg='#eee' mb='1' p='1' key={manufacturer._id} gap='2'>
								<Text mb='0' fontSize='20px' fontFamily='ClearSans-Bold'>{manufacturer.company_name}</Text>
								<Text mb='0' overflow='hidden' h='20px'>{manufacturer.description}</Text>
								<Text mb='0' fontSize='14px' color='#009393' cursor='pointer' onClick={(()=>{router.push(`/account/manufacturer/${manufacturer._id}`)})}> view &gt;&gt; </Text>
							</Flex>
						)
					})}
				</Flex>
				</Flex>
		</Flex>
	)
}

const Categories=({item})=>{
	const router = useRouter();
	return(
		<Flex direction='column' p='' gap='2' cursor='pointer'>
			<Flex wrap='Wrap' justify='space-between'>
				{item.contents.map((content)=>{
					return(
						<>
							<Item content={content}/>
						</>
					)
				})}
			</Flex>
		</Flex>
	)
}

const Item=({content})=>{
	const router = useRouter();
	return(
		<Flex w='175px' h='225px' m='1' position='relative' onClick={(()=>{router.push(`/industry/${content.name}`)})}>
			<Image borderRadius='10px' objectFit='cover' src={content.img} alt='next'/>
			<Text position='absolute' top='10px' left='10px' fontSize='20px' color='#fff' fontFamily='ClearSans-Bold'>{content.name}</Text>
		</Flex>
	)
}

const categories=[
	{
		id:1,
		title:'Industries',
		contents:[
			{
				id:1,
				name:"Adhesives",
				img:"../images.jpeg",
			},
			{
				id:2,
				name:"Agriculture",
				img:"../download.jpeg",
			},
			{
				id:3,
				name:"Food and Nutrition",
				img:"../download (1).jpeg",
			},
			{
				id:4,
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				id:5,
				name:"Personal Care",
				img:"../download (2).jpeg",
			},
			{
				id:6,
				name:"Electrical & Electronics",
				img:"../download (3).jpeg",
			},
			{
				id:7,
				name:"Paintings & Coatings",
				img:"../images (2).jpeg",
			},
			{
				id:8,
				name:"Printing & Labelling",
				img:"../download (4).jpeg",
			}]
	},
	{
		id:2,
		title:'Technologies',
		contents:[
			{
				id:1,
				name:"AgroChemicals",
				img:"../download.jpeg",
			},
			{
				id:2,
				name:"Cosmetics ingredients",
				img:"../images (3).jpeg",
			},
			{
				id:3,
				name:"Lab ingredients",
				img:"../download (6).jpeg",
			},
			{
				id:4,
				name:"Pharmaceuticals",
				img:"../images (1).jpeg",
			},
			{
				id:5,
				name:"Paints",
				img:"../images (2).jpeg",
			}]
	},
]

const technologiesop=[
			{
				id:1,
				name:"Agriculture Crops",
				img:"../images (1).jpeg",
			},
			{
				id:2,
				name:"Agriculture films",
				img:"../images (1).jpeg",
			},
			{
				id:3,
				name:"Animal Health & Nutrition",
				img:"../images (1).jpeg",
			},
			{
				id:4,
				name:"Pest Control",
				img:"../images (1).jpeg",
			},
]

const distributors=[
	{
		id:1,
		name:'IMCD',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		id:2,
		name:'Carst and Walker',
		industries:['Personal Care','H I &I']
	},
	{
		id:3,
		name:'Azelis',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
	{
		id:4,
		name:'Brentag',
		industries:['Personal Care','H I &I','Building and Construction',]
	},
]

const manufacturers=[
	{
		id:1,
		name:'Crda Inc.',
		industries:['Personal Care','H I &I']
	},
	{
		id:2,
		name:'BASF',
		industries:['Personal Care','H I &I']
	},
	{
		id:3,
		name:'Du Pont',
		industries:['Personal Care','Building and Construction',]
	},
]