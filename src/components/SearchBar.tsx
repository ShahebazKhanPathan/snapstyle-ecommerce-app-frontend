import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    return (
            <Box>
                <InputGroup size={{base: 'xs', sm: 'xs', md: 'sm', lg: 'md', xl: 'md'}}>
                    <InputLeftElement><CiSearch /></InputLeftElement>
                    <Input borderRadius={3} type="text" placeholder="Search for Products, Brands and More"/>
                </InputGroup>
            </Box>
    );
}

export default SearchBar;