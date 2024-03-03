import { Button, Card, CardBody, Divider, Grid, GridItem, HStack, Image, Input, SimpleGrid, Spacer, Text} from "@chakra-ui/react"
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import commonStyles from "../utils/commonCSS";

interface Item{
    _id: string;
    pId: {
        title: string;
        price: number;
        photo: { name: string };
        _id: string;
    }
}

const Cart = () => {

    const token = localStorage.getItem("auth-token");
    if (!token) return <Navigate to={"/signin"} />;
    
    const [cart, setCart] = useState<Item[]>([]);
    const [loadingSpinner] = useState(false);
    const { register } = useForm();
    var total = 0;
    var shippingCharges = 1;

    const getCartItems = async () => {
        await apiClient.get("/api/cart", { headers: { "auth-token": token }})
            .then(({ data }) => setCart(data))
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <>
            <Text px={2} fontWeight={500} fontSize={commonStyles.fontSizes}>My Cart ({cart.length})</Text>
            <SimpleGrid columns={commonStyles.cart.gridColumns} paddingX={5} spacing={4}>
                <GridItem colSpan={{ lg: 2, xl: 2}}>
                    {cart.map((item) => 
                        <Card mb={3} key={item._id}>
                            <CardBody>
                                <Grid templateColumns="repeat(4, 1fr)">
                                    <GridItem colSpan={3}>
                                        <Link to={"/product?pid="+item.pId._id} key={item._id}>
                                            <Text fontSize={commonStyles.fontSizes} fontWeight={600}>{item.pId.title}</Text>
                                        </Link>
                                        <Text fontSize={commonStyles.fontSizes}>Price: ${item.pId.price}</Text>
                                        <Button leftIcon={<FaTrash />} size="xs" colorScheme="red">Remove</Button>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <Image boxSize={"100px"} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/"+item.pId.photo.name}/>
                                    </GridItem>
                                </Grid>
                            </CardBody>
                        </Card>
                        )
                    }
                </GridItem>

                <GridItem colSpan={{ lg:1, xl: 1}}>
                    <Card>
                        <CardBody>
                            <Text mb={5} fontWeight={500} fontSize={commonStyles.cart.headingSizes}>Cart</Text>
                            {cart.map((item) => {
                                total = total + item.pId.price;
                                return <HStack key={item._id}>
                                    <Text noOfLines={1} fontSize={commonStyles.fontSizes}>{item.pId.title}</Text>
                                    <Spacer />
                                    <Text fontSize={commonStyles.fontSizes} textAlign="right">${item.pId.price}</Text>
                                    </HStack>
                                }
                            )}
                            <Divider/>
                                <HStack>
                                    <Text fontSize={commonStyles.fontSizes}>Taxes: </Text>
                                    <Spacer />
                                <Text fontSize={commonStyles.fontSizes} textAlign="right">${total/100*10}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={commonStyles.fontSizes}>Shipping charges: </Text>
                                    <Spacer />
                                <Text fontSize={commonStyles.fontSizes} textAlign="right">${shippingCharges}</Text>
                                </HStack>
                                <HStack mb={5}>
                                    <Text fontWeight={500} fontSize={commonStyles.cart.headingSizes}>Total: </Text>
                                    <Spacer />
                                <Text fontWeight={500} fontSize={commonStyles.cart.headingSizes} textAlign="right">${total}</Text>
                                </HStack>
                                <div className="form-group mb-3">
                                    <Input {...register("card.cardNo", { required: "Card No. is required.", minLength: {value: 12, message: "Card no must be 12 digits."} })} size={commonStyles.cart.buttonSizes} type="number" id="cardNo" placeholder="Credit or Debit Card no." />
                                    {<Text fontSize={commonStyles.fontSizes} color="red"></Text>}
                                </div>
                                <HStack mb={5}>
                                    <Input {...register("card.expiry", { required: true, minLength: { value: 5, message: "Date must be like 01/23" } })} size={commonStyles.cart.buttonSizes} width="70%" type="text" id="expiry" placeholder="Expiry date" />
                                    <Input {...register("card.cvvNo", { required: true, minLength: { value: 3, message: "CVV 3 digits required" } })} size={commonStyles.cart.buttonSizes} width="30%" type="number" id="cvvNo" placeholder="CVV" />
                                </HStack>
                                <Button isLoading={loadingSpinner} width="20%" size={commonStyles.cart.buttonSizes} colorScheme="yellow" type="submit" >Pay</Button>
                        </CardBody>
                    </Card>
                 
                </GridItem>
            </SimpleGrid>
        </>
    );
}

export default Cart;