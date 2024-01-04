import { AbsoluteCenter, Box, Card, CardBody, Center, HStack, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react"

const ProductList = () => {

    const products = [1, 2, 3, 4, 5, 6, 7, 8];
    const imageHeight = { base: "100px", md: "150px", lg: "160px", xl: "250px" };

    return (
        <>
            <SimpleGrid spacing={4} columns={{base: 2, sm: 3, md: 3, lg: 3, xl: 4}}>
                {products.map((product) =>
                <Card>
                    <CardBody>
                        <Center>
                            <Image height={imageHeight} src="/image.webp" />
                        </Center>                        
                        <Text mt={2} fontSize={{base: "10px", md: "12px", lg: "16px", xl: "18px" }}>Men Solid Cotton T-Shirt</Text>
                        <Text>Rs. 499/-</Text>
                    </CardBody>
                </Card>
            )}
            </SimpleGrid>
        </>
       
    );
}

export default ProductList;