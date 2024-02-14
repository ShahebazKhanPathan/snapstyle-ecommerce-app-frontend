import { Card, CardBody, Text, Grid, GridItem, Image, SimpleGrid,} from "@chakra-ui/react"
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export interface Info{
    _id: string;
    userName: string;
    email: string;
    mobile: number;
    address: string;
    title: string;
    image: string;
    date: string;
    price: number;
    taxes: number;
    shippingCharges: number;
    total: number
}

const MyOrders = () => {

    const token = localStorage.getItem("auth-token");
    if (!token) return <Navigate to={"/"}/>;
    const [orders, setOrders] = useState<Info[]>([]);
    const fontSizes = { base: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" };

    const getMyOrders = async() => {
        await apiClient.get(
            "/api/orders",
            { headers: { "auth-token": token } }
        )
            .then(({ data }) => {
                setOrders(data);
                console.log(data)
            })
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getMyOrders();
    }, []);

    return (
        <>
            <Text px={2} fontWeight={500} fontSize={fontSizes}>My Orders ({orders.length})</Text>
            <SimpleGrid paddingX={5} spacing={4}>
                {orders.map((order) => 
                    <Card>
                        <CardBody>
                            <Grid templateColumns="repeat(4, 1fr)">
                                <GridItem colSpan={3}>
                                    <Text fontSize={fontSizes} fontWeight={600}>{order.title}</Text>
                                    <Text fontSize={fontSizes}>Order ID: {order._id}</Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Image boxSize={"100px"} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+order.image}/>
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

export default MyOrders;