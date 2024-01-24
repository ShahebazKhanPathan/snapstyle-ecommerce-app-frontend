import { Box, Button, Center, Divider, HStack, Heading, Image, Input, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniCurrencyDollar  } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

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
    const id = params.get("id");

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

            <SimpleGrid columns={gridColumns} paddingY={2} spacing={2}>
                <Box>
                    <Center>
                        <Image height={imageHeight} src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+product?.photo.name} />
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
                        <Button colorScheme="yellow" size="sm" leftIcon={<FaShoppingCart/>}>Add to Cart</Button>
                        <Button colorScheme="green" size="sm" leftIcon={<HiMiniCurrencyDollar size="20px"/>}>Buy Now</Button>
                    </HStack>
                </Box>
            </SimpleGrid>
            <Divider />
            <SimpleGrid columns={{base: 1, sm: 1, md: 1, lg: 2, xl: 2}} padding={5} spacing={10}>
                <Box>
                    <Heading mb={5} size="md">Credit Card or Debit Card</Heading>
                    <form>
                        <div className="form-group mb-3">
                            <Input type="number" id="card_no" placeholder="Card no."/>
                        </div>
                        <HStack mb={5}>
                            <Input width="70%" type="text" id="expiry_date" placeholder="Expiry date" />
                            <Input width="30%" type="number" id="cvv" placeholder="CVV"/>
                        </HStack>
                        <Button width="20%" size="sm" colorScheme="yellow" type="submit" >Pay</Button>
                    </form>
                </Box>
            </SimpleGrid>
        </>
        
    )
}

export default Product;