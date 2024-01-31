import { AbsoluteCenter, Card, CardBody, Center, Heading, Image, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product{
    title: string,
    price: number,
    _id: number;
    photo: {
        name: string;
    }
}

const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loadingSkeleton, setSkeleton] = useState(true);
    const [noProductsLabel, setProductsLabel] = useState("");
    const imageHeight = { base: "100px", md: "150px", lg: "160px", xl: "250px" };
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 3, xl: 4 };
    const skeletons = [1, 2, 3, 4];

    const getProducts = () => {
        setProductsLabel("");
        axios.get("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/product")
            .then(({ data }) => {
                setSkeleton(false);
                if (data.length == 0) {
                    setProductsLabel("Sorry! No products available right now.");
                }
                else {
                    setProducts(data);
                }
            })
            .catch((err) => {
                setSkeleton(false);
                console.log(err.message)
            });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {loadingSkeleton &&
                <SimpleGrid spacing={4} columns={gridColumns}>
                    {skeletons.map((skeleton) =>
                        <Card key={skeleton}>
                            <CardBody>
                                <Skeleton height={imageHeight}></Skeleton>
                                <Skeleton mt={2} height={{ base: "10px", md: "12px", lg: "16px", xl: "16px" }}></Skeleton>
                                <Skeleton mt={2} height={{ base: "10px", md: "12px", lg: "16px", xl: "16px" }}></Skeleton>
                            </CardBody>
                        </Card>
                    )}
                </SimpleGrid>
            }
        
            { products.length > 0 
                ?
                <SimpleGrid spacing={4} columns={gridColumns}>
                    {products.map((product) =>
                    <Link to={"/product?pid="+product._id} key={product._id}>
                        <Card>
                            <CardBody>
                                <Center>
                                    <Image boxSize="220px" objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+product.photo.name} />
                                </Center>
                                <Text noOfLines={1} mt={3} fontSize={{base: "10px", md: "12px", lg: "18px", xl: "18px" }}>{product.title}</Text>
                                <Stack direction="row">
                                    <Heading size={{ base: "xs", md: "xs", lg: "sm", xl: "md" }}>${product.price}</Heading>
                                    <Text color="green">50% off</Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Link>
                    )}
                </SimpleGrid>
                :
                <SimpleGrid>
                    <AbsoluteCenter>
                        <Text fontWeight={500}>{noProductsLabel}</Text>
                    </AbsoluteCenter>
                </SimpleGrid>
            }
        </>
    );
}

export default ProductList;