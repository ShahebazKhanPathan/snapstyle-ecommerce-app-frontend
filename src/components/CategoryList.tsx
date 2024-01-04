import { Button, Divider, Heading, List, ListIcon, ListItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { GiWashingMachine, GiSofa } from "react-icons/gi";
import { FaMobileAlt, FaTshirt, FaLaptop } from "react-icons/fa";
import { MdToys } from "react-icons/md";

const CategoryList = () => {

    const buttonSizes = { md: 'sm', lg: 'md', xl: 'lg' };
    const fontWeight = '400';
    const buttonVariant = 'ghost';

    return (
        <SimpleGrid>
            <List spacing={2}>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant={buttonVariant} leftIcon={<FaTshirt />}>Fashion</Button>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<FaLaptop />}>Electronics</Button>
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
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<FaTshirt />}>Fashion</Button>
                </ListItem>
                <ListItem>
                    <Button fontWeight={fontWeight} size={buttonSizes} variant="ghost" leftIcon={<FaLaptop />}>Electronics</Button>
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