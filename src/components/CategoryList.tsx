import { Button, Heading, List, ListIcon, ListItem, SimpleGrid, VStack } from "@chakra-ui/react";
import { GiWashingMachine, GiSofa } from "react-icons/gi";
import { FaMobileAlt, FaTshirt, FaLaptop } from "react-icons/fa";
import { MdToys } from "react-icons/md";

const CategoryList = () => {
    return (
        <SimpleGrid marginTop={10}>
            <List>
                <ListItem>
                    <Button variant="ghost" leftIcon={<FaTshirt />}>Fashion</Button>
                </ListItem>
                <ListItem>
                    <Button variant="ghost" leftIcon={<FaMobileAlt />}>Mobiles</Button>
                </ListItem>
                <ListItem>
                    <Button variant="ghost" leftIcon={<FaMobileAlt />}>Mobiles</Button>
                </ListItem>
                <ListItem>
                    <Button variant="ghost" leftIcon={<FaMobileAlt />}>Mobiles</Button>
                </ListItem>
            </List>

            {/* <Heading size={"md"}>Categories</Heading>
            <Button variant="ghost" leftIcon={<FaTshirt />}>Fashion</Button>
            <Button variant="ghost" leftIcon={<FaMobileAlt />}>Mobiles</Button>
            <Button variant="ghost" leftIcon={<GiWashingMachine />}>Appliances</Button>
            <Button variant="ghost" leftIcon={<FaLaptop />}>Electronics</Button>
            <Button variant="ghost" leftIcon={<GiSofa />}>Furniture</Button>
            <Button variant="ghost" leftIcon={<MdToys />}>Toys</Button> */}
        </SimpleGrid>
    );
}

export default CategoryList;