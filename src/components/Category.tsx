import { AbsoluteCenter, Card, CardBody, Center, HStack, Image, SimpleGrid, Skeleton, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Product{
    title: string,
    price: number,
    _id: string;
    photo: {
        name: string;
    }
}

const Category = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loadingSkeleton, setSkeleton] = useState(true);
    const [params] = useSearchParams();
    const [noProductsLabel, setProductsLabel] = useState("");
    const imageHeight = { base: "100px", md: "150px", lg: "160px", xl: "250px" };
    const boxSizes = { base: "120px", sm: "120", md: "150px", lg: "160px", xl: "240px" };
    const fontSizes = { base: "14px", md: "12px", lg: "18px", xl: "18px" };
    const headingSizes = { base: "18px", sm: "18px", md: "20px", lg: "20px", xl: "20px"  };
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 3, xl: 4 };
    const skeletons = [1, 2, 3, 4];

    const getProducts = () => {
        setProducts([]);
        setProductsLabel("");
        setSkeleton(true);
        axios.get("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/product/category/"+params.get("name"))
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
    }, [params]);
    
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
                            <CardBody p={{base: "10px", sm: "12px", md: "14px", lg: "16px", xl: "20px"}}>
                                <Center>
                                    <Image boxSize={boxSizes} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+product.photo.name} />
                                </Center>
                                <Text noOfLines={1} mt={3} fontSize={{base: "10px", md: "12px", lg: "18px", xl: "18px" }}>{product.title}</Text>
                                <HStack>
                                    <Text fontWeight={600} fontSize={headingSizes}>${product.price}</Text>
                                    <Text fontSize={fontSizes} color="green">50% off</Text>
                                </HStack>
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

export default Category;