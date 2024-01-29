import { Box, Button, Center, Divider, HStack, Heading, Image, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniCurrencyDollar  } from "react-icons/hi2";
import { Link, useSearchParams } from "react-router-dom";

interface Product{
    title: String;
    price: String;
    description: String;
    photo: {
        name: String;
    }
}

const Product = () => {
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 2, xl: 2 };
    const imageHeight = { base: "100px", md: "200px", lg: "300px", xl: "400px" };
    const [params, setParams] = useSearchParams();
    const [product, setProduct] = useState<Product>();
    const [loadingSkeleton, setSkeleton] = useState(true);
    const id = params.get("pid");

    const getProduct = (id: String | null) => {
        axios.get("http://localhost:3000/api/product/" + id)
            .then(({ data }) => {
                setProduct(data);
                setSkeleton(false);
            })
            .catch((err) => {
                console.log(err.message);
                setSkeleton(false);
            });
    }

    const addtoCart = () => {
        if (!localStorage.getItem("auth-token")) return location.href = "/signin?page=product&pid=" + id;
        
        axios.post(
            "http://localhost:3000/api/cart",
            { pId: id },
            { headers: { "auth-token": localStorage.getItem("auth-token")}}
        ).then(({ data }) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
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
                            <Button onClick={() => addtoCart()} colorScheme="yellow" size="sm" leftIcon={<FaShoppingCart/>}>Add to Cart</Button>
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