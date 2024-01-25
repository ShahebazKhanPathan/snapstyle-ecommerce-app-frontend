import { Grid, GridItem, Box, Button, Image, Show, Hide, HStack, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react"
import SearchBar from "./components/SearchBar"
import CategoryList from "./components/CategoryList"
import { FaChevronDown, FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoCube } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const token = localStorage.getItem('auth-token');
  const [isToken, setToken] = useState(Boolean);
  const buttonSizes = { base: 'xs', sm: 'xs', md: 'sm', lg: 'md' };

  const logOut = () => {
    axios.delete("http://localhost:3000/api/blacklist",
      { headers: { "auth-token": localStorage.getItem('auth-token') } })
      .then(() => {
        localStorage.removeItem("auth-token");
        setToken(false);
        window.location.href="/";
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:3000/api/blacklist", { headers: { "auth-token": localStorage.getItem('auth-token') } })
      .then(() => setToken(true))
      .catch(() => setToken(false));
    }
  }, []);

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
        alignItems="center">
        
        <GridItem colSpan={{base: 4, sm: 1, md: 1}}>
          <Box width={{ base: "160px", sm: "160px", md: "160px", lg: "220px" }}>
            <Link to={"/"}>
              <Image src="/logo.png"/>
            </Link>
          </Box>
        </GridItem>

        <Hide below="sm">
          <GridItem colSpan={{sm: 4, md: 3, lg: 3, xl: 3}}>
            <SearchBar/>
          </GridItem>
        </Hide>

        <GridItem colSpan={{base: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
          {isToken || null
            ?
            <HStack>
              <Link to={"/cart"}><Button size={buttonSizes} leftIcon={<FaShoppingCart />} variant="ghost" colorScheme="green">Cart</Button></Link>
              <Menu>
                <MenuButton variant="ghost" colorScheme="green" as={Button} leftIcon={<FaUserCircle />} rightIcon={<FaChevronDown />}>
                  My account
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={"/orders"}>
                      <Button leftIcon={<IoCube />} variant="ghost" colorScheme="green">My Orders</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={() => logOut()} size={buttonSizes} leftIcon={<FaSignOutAlt />} variant="ghost" colorScheme="green">Logout</Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            :
            <HStack>
              <Menu>
                <MenuButton size={buttonSizes} variant="ghost" colorScheme="green" as={Button} leftIcon={<FaUserCircle />} rightIcon={<FaChevronDown/>}>
                  Login
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={"/admin"}>
                      <Button leftIcon={<MdAdminPanelSettings />} variant="ghost" colorScheme="green">Admin</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={"/signin"}>
                      <Button leftIcon={<FaUserCircle />} variant="ghost" colorScheme="green">User</Button>
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Link to={"/signup"}><Button size={buttonSizes} leftIcon={<FaUserCircle />} variant="outline" colorScheme="green">Sign Up</Button></Link>
            </HStack>
          }
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
        gap={4} >
        
        <Show above='md'>
          <GridItem width={{ md: "160px", lg: "220px" }}>
            <CategoryList/>
          </GridItem>
        </Show>

        <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 4, xl: 4}}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  )
}

export default App
