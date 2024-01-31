import { Grid, GridItem, Box, Button, Image, Show, Hide, HStack, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react"
import AdminSidebar from "./AdminSidebar";
import SearchBar from "./SearchBar";
import { FaChevronDown, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const token = localStorage.getItem('admin-auth-token');
    if (!token) return <Navigate to={"/"} />;

    const [isToken, setToken] = useState(Boolean);

    const logOut = () => {
        axios.delete("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/blacklist",
        { headers: { "admin-auth-token": localStorage.getItem('admin-auth-token') } })
        .then(() => {
            localStorage.removeItem("admin-auth-token");
            setToken(false);
            window.location.href="/";
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (token) {
        axios.get("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/blacklist", { headers: { "auth-token": localStorage.getItem('auth-token') } })
        .then(() => setToken(true))
        .catch(() => setToken(false));
        }
    });

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
            {isToken
                ?
                <HStack>
                    <Button onClick={() => logOut()} size={{ base: 'xs', sm: 'xs', md: 'sm', lg: 'md' }} leftIcon={<FaSignOutAlt />} variant="ghost" colorScheme="green">Logout</Button>
                </HStack>
                :
                <HStack>
                <Menu>
                    <MenuButton variant="ghost" colorScheme="green" as={Button} leftIcon={<FaUserCircle />} rightIcon={<FaChevronDown/>}>
                    Login
                    </MenuButton>
                    <MenuList>
                    <MenuItem>
                        <Link to={"/admin"}>Admin</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={"/signin"}>User</Link>
                    </MenuItem>
                    </MenuList>
                </Menu>
                <Link to={"/signup"}><Button size={{ base: 'xs', sm: 'xs', md: 'sm', lg: 'md' }} leftIcon={<FaUserCircle />} variant="outline" colorScheme="green">Sign Up</Button></Link>
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
                    <AdminSidebar/>
                </GridItem>
            </Show>

            <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 4, xl: 4}}>
                <Outlet />
            </GridItem>
        </Grid>
        </>
    )
}

export default Dashboard;

