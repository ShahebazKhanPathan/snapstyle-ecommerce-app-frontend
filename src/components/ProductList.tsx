import { Card, CardBody, Center, Image, SimpleGrid, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";

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
    const imageHeight = { base: "100px", md: "150px", lg: "160px", xl: "250px" };
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 3, xl: 4 };

    const getProducts = () => {
        axios.get("http://localhost:3000/api/product")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {products.length > 0
                ?
                <SimpleGrid spacing={4} columns={gridColumns}>
                {products.map((product) =>
                <Card key={product._id}>
                    <CardBody>
                        <Center>
                                <Image height={imageHeight} src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+product.photo.name} />
                        </Center>                        
                        <Text mt={2} fontSize={{base: "10px", md: "12px", lg: "16px", xl: "16px" }}>{product.title}</Text>
                        <Text>Rs. {product.price}/-</Text>
                    </CardBody>
                </Card>
                )}
                </SimpleGrid>
                :
                <Text>Sorry! No products available this time.</Text>
            }
            
        </>
    );
}

export default ProductList;