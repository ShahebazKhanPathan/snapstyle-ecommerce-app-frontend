import { Box, Button, Image, Input, InputGroup, InputLeftElement, SimpleGrid } from "@chakra-ui/react"
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {

    return (
        <SimpleGrid alignItems="center" columns={3} spacing={6}>
            <Box width="50%">
                <Image src="/logo.png"/>
            </Box>
            <Box>
                <InputGroup>
                    <InputLeftElement><CiSearch /></InputLeftElement>
                    <Input type="text" placeholder="Search for Products, Brands and More"/>
                </InputGroup>
            </Box>
            <Box>
                <Button leftIcon={<FaUserCircle />} size="md" colorScheme="whatsapp" variant="outline">Login</Button>
            </Box>
        </SimpleGrid>
        
    );
}

export default NavBar;