import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Divider, HStack, Image, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniCurrencyDollar  } from "react-icons/hi2";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../App";

export interface Product{
    title: string;
    price: number;
    description: string;
    photo: {
        name: string;
    }
}

const Product = () => {

    const { setCount } = useCart();
    const gridColumns = { base: 1, sm: 1, md: 1, lg: 2, xl: 2 };
    const imageHeight = { base: "150px", md: "200px", lg: "300px", xl: "400px" };
    const boxSizes = { base: "240px", sm: "260px", md: "280px", lg: "320px", xl: "360px" };
    const headingSizes = { base: "18px", sm: "18px", md: "20px", lg: "22px", xl: "22px" };
    const priceLabelSizes = { base: "22px", sm: "22px", md: "24px", lg: "28px", xl: "28px" };
    const fontSizes = { base: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" };
    const buttonSizes = { base: 'sm', sm: 'sm', md: 'md', lg: 'md' };
    const [params] = useSearchParams();
    const [product, setProduct] = useState<Product>();
    const [loadingSkeleton, setSkeleton] = useState(true);
    const [loader, setLoader] = useState(false);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState('');
    const id = params.get("pid");

    const getProduct = async (id: string | null) => {
        await apiClient.get("/api/product/" + id)
            .then(({ data }) => {
                setProduct(data);
                setSkeleton(false);
            })
            .catch((err) => {
                setSkeleton(false);
                console.log(err.message);
            });
    }

    const addtoCart = async() => {

        if (!localStorage.getItem("auth-token")) return location.href = "/signin?page=product&pid=" + id;
        setLoader(true);
        
        await apiClient.post(
            "/api/cart",
            { pId: id },
            { headers: { "auth-token": localStorage.getItem("auth-token")}}
        ).then(() => {
            setCount(1);
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
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}} >
                        <Skeleton height={imageHeight}></Skeleton>
                    </Box>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}}>
                        <Skeleton mb={3} height={{ base: "10px", md: "12px", lg: "16px", xl: "28px" }}></Skeleton>
                        <Skeleton mb={3} height={{ base: "10px", md: "12px", lg: "16px", xl: "24px" }}></Skeleton>
                        <Skeleton mb={3} width="75%" height={{ base: "10px", md: "12px", lg: "140px", xl: "200px" }}></Skeleton>
                        <Skeleton width="60%" mb={3} height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                        <Skeleton width="50%" height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                    </Box>
                </SimpleGrid>
            }

            {product && 
                <>
                {alert &&
                    <Alert status="success" mb={4} fontSize={fontSizes}>
                        <AlertIcon />
                        <AlertTitle>Added!</AlertTitle>
                        <AlertDescription>Check your cart.</AlertDescription>
                    </Alert>
                }
                {error &&
                    <Alert status="error" mb={4} fontSize={fontSizes}>
                        <AlertIcon />
                        <AlertTitle>Error:</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                }
                <SimpleGrid columns={gridColumns} paddingY={2} paddingX={2} spacing={5}>
                    <Box>
                        <Center>
                            <Image boxSize={boxSizes} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+product?.photo.name} />
                        </Center>
                    </Box>
                    <Box>
                        <Text fontWeight={600} fontSize={headingSizes} mb={5}>{product?.title}</Text>
                        <Text fontWeight={600} fontSize={fontSizes} >Description</Text>
                        <Text fontSize={fontSizes} textAlign="justify">{product?.description}</Text>
                        <HStack mb={3}>
                            <Text fontSize={priceLabelSizes} fontWeight={500}>${product?.price}</Text>
                            <Text fontSize={fontSizes} color="green">50% off</Text>
                        </HStack>
                        <Center>
                            <HStack spacing={5}>
                                <Button isLoading={loader} onClick={() => addtoCart()} colorScheme="yellow" size={buttonSizes} leftIcon={<FaShoppingCart/>}>Add to Cart</Button>
                                <Link to={"/payment?pid="+id}><Button colorScheme="green" size={buttonSizes}  leftIcon={<HiMiniCurrencyDollar size="20px"/>}>Buy Now</Button></Link>
                            </HStack>
                        </Center>

                    </Box>
                </SimpleGrid>
                <Divider />
                </>
            }
        </>
        
    )
}

export default Product;