import { Card, CardBody, Grid, GridItem, Image, SimpleGrid, Text} from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Item{
    pId: {
        title: string;
        price: number;
        photo: { name: string };
    }
}

const Cart = () => {

    const token = localStorage.getItem("auth-token");
    if (!token) return <Navigate to={"/signin"} />;
    
    const [cart, setCart] = useState<Item[]>([]);
    const fontSizes = { base: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" };

    const getCartItems = async () => {
        await axios.get("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/cart", { headers: { "auth-token": token }})
            .then(({ data }) => setCart(data))
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <>
            <Text px={2} fontWeight={500} fontSize={fontSizes}>My Cart ({cart.length})</Text>
            <SimpleGrid paddingX={5} spacing={4}>
                {cart.map((item) => 
                        <Card>
                            <CardBody>
                                <Grid templateColumns="repeat(4, 1fr)">
                                    <GridItem colSpan={3}>
                                        <Text fontSize={fontSizes} fontWeight={600}>{item.pId.title}</Text>
                                        <Text fontSize={fontSizes}>Price: {item.pId.price}</Text>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Image boxSize={"100px"} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+item.pId.photo.name}/>
                                    </GridItem>
                                </Grid>
                                </CardBody>
                        </Card>
                    )
                    }
                </SimpleGrid>
        </>
    );
}

export default Cart;