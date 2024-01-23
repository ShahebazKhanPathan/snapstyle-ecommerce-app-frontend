import { Button, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { IoPeopleSharp, IoCube } from "react-icons/io5";
import { Link } from "react-router-dom";

const AdminSidebar = () => {

    const buttonSizes = { md: 'sm', lg: 'md', xl: 'lg' };
    const fontWeight = '400';
    const buttonVariant = 'ghost';

    return (
        <SimpleGrid>
            <List spacing={2}>
                <ListItem>
                    <Link to={"/admin/products"}>
                        <Button fontWeight={fontWeight} size={buttonSizes} variant={buttonVariant} leftIcon={<IoCube />}>Products</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"/admin/users"}>
                        <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<IoPeopleSharp/>}>Users</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={< FaShoppingCart/>}>Orders</Button>
                </ListItem>
            </List>
        </SimpleGrid>
    );
}

export default AdminSidebar;