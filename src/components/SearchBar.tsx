import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {

    const navigate = useNavigate();
    const searchBarSizes = { base: 'sm', sm: 'sm', md: 'sm', lg: 'md', xl: 'md' };

    const onSearch = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            navigate("/search?query=" + (event.target as HTMLInputElement).value);
        }
    }

    return (
        <Box>
            <InputGroup size={searchBarSizes}>
                <InputLeftElement><CiSearch /></InputLeftElement>
                <Input fontSize={{base: "12px", sm: "12px", md: "12px", lg: "14px", xl: "16px"}} onKeyUp={(event) => onSearch(event)} borderRadius={3} type="text" placeholder="Search for Products, Brands and More..."/>
            </InputGroup>
        </Box>            
    );
}

export default SearchBar;