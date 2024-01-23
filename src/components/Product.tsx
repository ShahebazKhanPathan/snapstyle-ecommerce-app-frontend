import { Box, Button, Center, Divider, HStack, Heading, Image, Input, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniCurrencyDollar  } from "react-icons/hi2";


const Product = () => {
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 2, xl: 2 };
    const imageHeight = { base: "100px", md: "200px", lg: "300px", xl: "400px" };

    return (
        <>
            <SimpleGrid columns={gridColumns} paddingY={2} spacing={2}>
                <Box>
                    <Center>
                        <Image height={imageHeight} src="https://snapstyle.s3.us-west-1.amazonaws.com/image.webp"/>
                    </Center>
                </Box>
                <Box>
                    <Heading mb={8}>Men's T-shirt</Heading>
                    <Heading size="md">Description</Heading>
                    <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio libero, ratione animi vel porro suscipit commodi, alias cum ipsam assumenda dolore? Eligendi sapiente neque dolore quae ad magnam necessitatibus vero.</Text>
                    <HStack fontSize={20} mb={5}>
                        <Heading color="#2F855A">$10/-</Heading>
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