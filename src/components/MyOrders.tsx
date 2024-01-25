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
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Image height="100px" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+order.image} />
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <Card>
                                        <CardHeader fontWeight={500}>Payment</CardHeader>
                                        <CardBody>
                                            <Text>Price: ${order.price}</Text>
                                            <Text>Taxes: ${order.taxes}</Text>
                                            <Text>Shipping charges: ${order.shippingCharges}</Text>
                                            <Text>Total: ${order.total}</Text>
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