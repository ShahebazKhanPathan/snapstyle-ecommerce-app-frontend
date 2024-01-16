import { Card, CardBody, Center, Image, SimpleGrid, Text } from "@chakra-ui/react"

const ProductList = () => {

    const products = [1, 2, 3, 4, 5, 6, 7, 8];
    const imageHeight = { base: "100px", md: "150px", lg: "160px", xl: "250px" };
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 3, xl: 4 };

    return (
        <>
            <SimpleGrid spacing={4} columns={gridColumns}>
                {products.map((product) =>
                <Card key={product}>
                    <CardBody>
                        <Center>
                            <Image height={imageHeight} src="/image.webp" />
                        </Center>                        
                        <Text mt={2} fontSize={{base: "10px", md: "12px", lg: "16px", xl: "16px" }}>Men Solid Cotton T-Shirt</Text>
                        <Text>Rs. 499/-</Text>
                    </CardBody>
                </Card>
            )}
            </SimpleGrid>
        </>
    );
}

export default ProductList;