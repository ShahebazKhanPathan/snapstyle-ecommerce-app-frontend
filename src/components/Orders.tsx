import { Heading, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface User{
    _id: String;
    name: String;
    email: String;
    mobile: String;
}

const Orders = () => {

    const token = localStorage.getItem("admin-auth-token");
    if (!token) return <Navigate to={"/"} />;
    
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [loader, setLoader] = useState(false);
    const [orders, setOrders] = useState<User[]>([]);
    let srNo = 0;

    const getOrders = () => {
        axios.get("http://localhost:3000/api/orders/admin", { headers: { "admin-auth-token": token }})
            .then(({ data }) => setOrders(data))
            .catch((err) => setError(err.message));
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <SimpleGrid paddingX={5}>
            <Heading size="md">Orders ({orders.length})</Heading>
            {orders.length>0 ? 
                <TableContainer padding={5}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Sr. no.</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Mobile</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map((order) => {
                                srNo+=1;
                                return (
                                    <Tr key={srNo}>
                                        <Td>{srNo}</Td>
                                        <Td>{order.userName}</Td>
                                        <Td>{order.email}</Td>
                                        <Td>{order.mobile}</Td>
                                    </Tr>);
                                }
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
                :
                <Text>No orders yet.</Text>
            }
        </SimpleGrid>
    );
}

export default Orders;