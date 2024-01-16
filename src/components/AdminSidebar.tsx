import { Button, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { IoPeopleSharp, IoCube } from "react-icons/io5";

const AdminSidebar = () => {

    const buttonSizes = { md: 'sm', lg: 'md', xl: 'lg' };
    const fontWeight = '400';
    const buttonVariant = 'ghost';

    return (
        <SimpleGrid>
            <List spacing={2}>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant={buttonVariant} leftIcon={<IoCube />}>Products</Button>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<FaShoppingCart />}>Orders</Button>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<IoPeopleSharp />}>Users</Button>
                </ListItem>
            </List>
        </SimpleGrid>
    );
}

export default AdminSidebar;