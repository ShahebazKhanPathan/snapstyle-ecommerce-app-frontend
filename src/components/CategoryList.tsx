import { Button, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import { GiWashingMachine, GiSofa } from "react-icons/gi";
import { FaTshirt, FaLaptop } from "react-icons/fa";
import { MdToys } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryList = () => {

    const buttonSizes = { md: 'sm', lg: 'md', xl: 'lg' };
    const fontWeight = '400';
    const buttonVariant = 'ghost';

    return (
        <SimpleGrid>
            <List spacing={2}>
                <ListItem>
                    <Link to={"/"}>
                        <Button fontWeight={fontWeight} size={buttonSizes} variant={buttonVariant} leftIcon={<FaTshirt />}>All</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"/category?name=Fashion"}>
                        <Button fontWeight={fontWeight} size={buttonSizes} variant={buttonVariant} leftIcon={<FaTshirt />}>Fashion</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={"/category?name=Electronics"}>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<FaLaptop />}>Electronics</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<GiWashingMachine />}>Appliances</Button>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<GiSofa />}>Furniture</Button>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<MdToys />}>Toys</Button>
                </ListItem>
            </List>
        </SimpleGrid>
    );
}

export default CategoryList;