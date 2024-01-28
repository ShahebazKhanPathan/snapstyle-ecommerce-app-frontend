import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {

    const navigate = useNavigate();

    const onSearch = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            navigate("/search?query=" + event.target.value);
        }
    }

    return (
        <Box>
            <InputGroup size={{base: 'xs', sm: 'xs', md: 'sm', lg: 'md', xl: 'md'}}>
                <InputLeftElement><CiSearch /></InputLeftElement>
                <Input onKeyUp={(event) => onSearch(event)} borderRadius={3} type="text" placeholder="Search for Products, Brands and More"/>
            </InputGroup>
        </Box>            
    );
}

export default SearchBar;