import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Divider, HStack, Heading, Image, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniCurrencyDollar  } from "react-icons/hi2";
import { Link, useSearchParams } from "react-router-dom";

export interface Product{
    title: string;
    price: number;
    description: string;
    photo: {
        name: string;
    }
}

const Product = () => {
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 2, xl: 2 };
    const imageHeight = { base: "100px", md: "200px", lg: "300px", xl: "400px" };
    const [params] = useSearchParams();
    const [product, setProduct] = useState<Product>();
    const [loadingSkeleton, setSkeleton] = useState(true);
    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState('');
    const id = params.get("pid");

    const getProduct = (id: string | null) => {
        axios.get("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/product/" + id)
            .then(({ data }) => {
                setProduct(data);
                setSkeleton(false);
            })
            .catch((err) => {
                setSkeleton(false);
                console.log(err.message);
            });
    }

    const addtoCart = () => {

        if (!localStorage.getItem("auth-token")) return location.href = "/signin?page=product&pid=" + id;
        setLoader(true);
        
        axios.post(
            "https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/cart",
            { pId: id },
            { headers: { "auth-token": localStorage.getItem("auth-token")}}
        ).then(() => {
            setLoader(false);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 4000);
        })
        .catch((err) => {
            setLoader(false);
            setError(err.message);
            setTimeout(() => {
                setError('');
            }, 4000);
        })
    }

    useEffect(() => {
        getProduct(id);
    }, []);

    return (
        <>
            {loadingSkeleton &&
                <SimpleGrid columns={gridColumns} paddingY={2} spacing={5}>
                    <Box>
                        <Skeleton height={imageHeight}></Skeleton>
                    </Box>
                    <Box>
                        <Skeleton mb={8} height={{ base: "10px", md: "12px", lg: "16px", xl: "36px" }}></Skeleton>
                        <Skeleton mb={5} height={{ base: "10px", md: "12px", lg: "16px", xl: "24px" }}></Skeleton>
                        <Skeleton mb={6} height={{ base: "10px", md: "12px", lg: "16px", xl: "200px" }}></Skeleton>
                        <Skeleton width="70%" mb={5} height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                        <Skeleton width="50%" height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                    </Box>
                </SimpleGrid>
            }

            {product && 
                <>
                {alert &&
                    <Alert status="success">
                        <AlertIcon />
                        <AlertTitle>Added into cart successfully!</AlertTitle>
                        <AlertDescription>Check your cart.</AlertDescription>
                    </Alert>
                }
                {error &&
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>Error:</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                }
                <SimpleGrid columns={gridColumns} paddingY={2} spacing={5}>
                    <Box>
                        <Center>
                            <Image boxSize="400px" objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+product?.photo.name} />
                        </Center>
                    </Box>
                    <Box>
                        <Heading mb={8}>{product?.title}</Heading>
                        <Heading size="md">Description</Heading>
                        <Text textAlign="justify">{product?.description}</Text>
                        <HStack fontSize={20} mb={5}>
                            <Heading color="#2F855A">${product?.price}/-</Heading>
                        </HStack>
                        <HStack spacing={5}>
                            <Button isLoading={loader} onClick={() => addtoCart()} colorScheme="yellow" size="sm" leftIcon={<FaShoppingCart/>}>Add to Cart</Button>
                            <Link to={"/payment?pid="+id}><Button colorScheme="green" size="sm" leftIcon={<HiMiniCurrencyDollar size="20px"/>}>Buy Now</Button></Link>
                        </HStack>
                    </Box>
                </SimpleGrid>
                <Divider />
                </>
            }
        </>
        
    )
}

export default Product;