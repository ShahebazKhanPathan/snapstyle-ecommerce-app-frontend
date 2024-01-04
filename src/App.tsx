import { Grid, GridItem, Box, Button, Image, Show, Hide} from "@chakra-ui/react"
import SearchBar from "./components/SearchBar"
import CategoryList from "./components/CategoryList"
import { FaUserCircle } from "react-icons/fa";
import ProductList from "./components/ProductList";

function App() {
  
  return (
    <>
      <Grid
        paddingX={{ base: 4, sm: 4}}
        paddingY={{ base: 1, sm: 1, md: 3, lg: 3, xl: 3}}
        templateAreas={{
        base: `"logo nav" "aside main"`,
        }}
        templateColumns={{
          base: 'repeat(5, 1fr)',
          sm: 'repeat(6, 1fr)',
          md: 'repeat(6, 1fr)'
        }}
        
        gap={{ base: 2, sm: 2, md: 4}}
        alignItems="center"
      >
        <GridItem colSpan={{base: 4, sm: 1, md: 1}}>
          <Box width={{base: "160px", sm: "160px", md: "160px", lg: "220px"}}>
           <Image src="/logo.png"/>
          </Box>
        </GridItem>

        <Hide below="sm">
          <GridItem colSpan={{sm: 4, md: 4}}>
            <SearchBar/>
          </GridItem>
        </Hide>

        <GridItem colSpan={{base: 1, sm: 1}}>
          <Box>
            <Button size={{ base: 'xs', sm: 'xs', md: 'sm', lg: 'md' }} leftIcon={<FaUserCircle />} variant="outline" colorScheme="green">Login</Button>
          </Box>
        </GridItem>

        <Show below="sm">
          <GridItem colSpan={{ base: 5, sm: 6}}>
            <SearchBar/>
          </GridItem>
        </Show>
      </Grid>

      <Grid
        templateColumns={{
          md: 'repeat(6, 1fr)',
          lg: 'repeat(6, 1fr)'
        }}
        templateRows="repeat(1, 1fr)"
        paddingX={4}
        paddingTop={{ base: 3, sm: 1 }}
        paddingBottom={{ base: 3, sm: 1, md: 3, lg: 5}}
        gap={4}
      >
        <Show above='md'>
          <GridItem width={{ md: "160px", lg: "220px" }}>
            <CategoryList/>
          </GridItem>
        </Show>
        <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 4, xl: 4}}>
          <ProductList/>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
