import { Box, Card, CardBody, CardHeader, Divider, Flex, Grid, GridItem, Heading, Image, SimpleGrid, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface User{
    _id: String;
    name: String;
    email: String;
    mobile: String;
}

const MyOrders = () => {

    const token = localStorage.getItem("auth-token");
    if (!token) return <Navigate to={"/"}/>;

    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [loader, setLoader] = useState(false);
    const [orders, setOrders] = useState<User[]>([]);
    let srNo = 0;

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
                                    <Image height="150px" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+order.image} />
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