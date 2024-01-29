import { Button, Heading, Image, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
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
    let srNo = 0;
    let total = 0;
    let shippingCharges = 1;
    let taxes = 0;

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
                                <Th>Photo</Th>
                                <Th>Price</Th>
                                <Th>Title</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cart.map((cartItem) => {
                                srNo += 1;
                                total += cartItem.pId.price;
                                taxes = (total / 100) * 10;
                                return (
                                    <Tr key={srNo}>
                                        <Td>{srNo}</Td>
                                         <Td>
                                            <Image boxSize="60px" objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+cartItem.pId.photo.name} />
                                        </Td>
                                        <Td>
                                            ${cartItem.pId.price}
                                        </Td>
                                        <Td>
                                            {cartItem.pId.title}
                                        </Td>
                                    </Tr>);
                                }
                            )}
                            <Tr>
                                <Th colSpan={2}>Taxes</Th>
                                <Td fontWeight={400}>${taxes.toFixed()}</Td>
                            </Tr>
                            <Tr>
                                <Th colSpan={2}>Shipping charges</Th>
                                <Td fontWeight={400}>${shippingCharges}</Td>
                            </Tr>
                            <Tr>
                                <Th colSpan={2}>Total</Th>
                                <Td fontSize="large" fontWeight={500}>${total + shippingCharges + taxes}</Td>
                                <Td><Button size="sm" colorScheme="green" variant="solid">Check out</Button></Td>
                            </Tr>
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