import { Card, CardBody, Center, Image, SimpleGrid, Skeleton, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product{
    title: String,
    price: Number,
    _id: Number;
    photo: {
        name: String;
    }
}

const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loadingSkeleton, setSkeleton] = useState(true);
    const noProductsLabel = "";
    const imageHeight = { base: "100px", md: "150px", lg: "160px", xl: "250px" };
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 3, xl: 4 };
    const skeletons = [1, 2, 3, 4];

    const getProducts = () => {
        axios.get("http://localhost:3000/api/product")
            .then((res) => {
                setSkeleton(false);
                setProducts(res.data)
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
                    <Link to={"/product"}>
                        <Card key={product._id}>
                            <CardBody>
                                <Center>
                                    <Image height={imageHeight} src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+product.photo.name} />
                                </Center>
                                <Text mt={2} fontSize={{base: "10px", md: "12px", lg: "16px", xl: "16px" }}>{product.title}</Text>
                                <Text>Rs. {product.price}/-</Text>
                            </CardBody>
                        </Card>
                    </Link>
                    )}
                </SimpleGrid>
                :
                <SimpleGrid>
                    <Text>{products.length==0 ? noProductsLabel : 'No products available.'}</Text>
                </SimpleGrid>
            }
        </>
    );
}

export default ProductList;