import { Heading, Image, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface User{
    _id: String;
    name: String;
    email: String;
    mobile: String;
}

const Cart = () => {

    const token = localStorage.getItem("auth-token");
    if (!token) return <Navigate to={"/signin"} />;
    
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [loader, setLoader] = useState(false);
    const [cart, setCart] = useState<User[]>([]);
    let srNo = 0;

    const getCartItems = () => {
        axios.get("http://localhost:3000/api/cart", { headers: { "auth-token": token }})
            .then(({ data }) => setCart(data))
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <SimpleGrid paddingX={5}>
            <Heading size="md">Cart ({cart.length})</Heading>
            {cart.length>0 ? 
                <TableContainer padding={5}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Sr. no.</Th>
                                <Th>Title</Th>
                                <Th>Price</Th>
                                <Th>Photo</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cart.map((cartItem) => {
                                srNo+=1;
                                return (
                                    <Tr key={srNo}>
                                        <Td>{srNo}</Td>
                                        <Td>
                                            {cartItem.pId.title}
                                        </Td>
                                        <Td>
                                            ${cartItem.pId.price}
                                        </Td>
                                        <Td>
                                            <Image height="80px" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+cartItem.pId.photo.name} />
                                        </Td>
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

export default Cart;