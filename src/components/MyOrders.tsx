import { Card, CardBody, CardHeader, Divider, Text, Grid, GridItem, Heading, Image, SimpleGrid } from "@chakra-ui/react"
import axios from "axios";
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

    const getMyOrders = () => {
        axios.get(
            "http://localhost:3000/api/orders",
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
        <SimpleGrid paddingX={5}>
            <Card>
                <CardHeader>
                    <Heading size="md">My Orders ({orders.length})</Heading>
                </CardHeader>
                <CardBody>
                    {orders.map((order) => 
                        <>
                            <Grid gap={4} templateColumns="repeat(6, 1fr)">
                                <GridItem colSpan={3}>
                                    <Text>Order ID: {order._id}</Text>
                                    <Text fontWeight={700}>{order.title}</Text>
                                    <div>
                                        {order.userName} <br />
                                        {order.email} <br />
                                        {order.mobile} <br />
                                        {order.address} <br />
                                    </div>
                                    <br />
                                    <Text>Date: {order.date.substring(0,24)}</Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Image boxSize="120px" objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+order.image} />
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <Card>
                                        <CardBody>
                                            <Text fontWeight={700}>Payment details</Text>
                                            Price: ${order.price} <br />
                                            Taxes: ${order.taxes} <br />
                                            Shipping charges: ${order.shippingCharges}
                                            <Text mt={3} fontWeight={700} fontSize="20px">Total: ${order.total}</Text>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </Grid>
                            <Divider />
                        </>
                    )}
                </CardBody>
            </Card>
            
        </SimpleGrid>
    );
}

export default MyOrders;