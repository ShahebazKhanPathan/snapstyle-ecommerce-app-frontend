import { Button, Card, CardBody, Divider, Grid, GridItem, HStack, Image, Input, SimpleGrid, Spacer, Text} from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    const [loadingSpinner] = useState(false);
    const { register } = useForm();
    const fontSizes = { base: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" };
    const gridColumns = { base: 1, sm: 1, md: 1, lg: 1, xl: 3 };
    const headingSizes = { base: "20px", sm: "20px", md: "20px", lg: "22px", xl: "22px" };
    const buttonSizes = { base: 'sm', sm: 'sm', md: 'sm', lg: 'md' };
    
    var total = 0;
    var shippingCharges = 1;

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
            <SimpleGrid columns={gridColumns} paddingX={5} spacing={4}>
                <GridItem colSpan={{ lg: 2, xl: 2}}>
                    {cart.map((item) => 
                        <Card mb={3}>
                            <CardBody>
                                <Grid templateColumns="repeat(4, 1fr)">
                                    <GridItem colSpan={3}>
                                        <Text fontSize={fontSizes} fontWeight={600}>{item.pId.title}</Text>
                                        <Text fontSize={fontSizes}>Price: ${item.pId.price}</Text>
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
                            <Text mb={5} fontWeight={500} fontSize={headingSizes}>Cart</Text>
                            {cart.map((item) => {
                                total = total + item.pId.price;
                                return <HStack>
                                    <Text noOfLines={1} fontSize={fontSizes}>{item.pId.title}</Text>
                                    <Spacer />
                                    <Text fontSize={fontSizes} textAlign="right">${item.pId.price}</Text>
                                    </HStack>
                                }
                            )}
                            <Divider/>
                                <HStack>
                                    <Text fontSize={fontSizes}>Taxes: </Text>
                                    <Spacer />
                                <Text fontSize={fontSizes} textAlign="right">${total/100*10}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={fontSizes}>Shipping charges: </Text>
                                    <Spacer />
                                <Text fontSize={fontSizes} textAlign="right">${shippingCharges}</Text>
                                </HStack>
                                <HStack mb={5}>
                                    <Text fontWeight={500} fontSize={headingSizes}>Total: </Text>
                                    <Spacer />
                                <Text fontWeight={500} fontSize={headingSizes} textAlign="right">${total}</Text>
                                </HStack>
                                <div className="form-group mb-3">
                                    <Input {...register("card.cardNo", { required: "Card No. is required.", minLength: {value: 12, message: "Card no must be 12 digits."} })} size={buttonSizes} type="number" id="cardNo" placeholder="Credit or Debit Card no." />
                                    {<Text fontSize={fontSizes} color="red"></Text>}
                                </div>
                                <HStack mb={5}>
                                    <Input {...register("card.expiry", { required: true, minLength: { value: 5, message: "Date must be like 01/23" } })} size={buttonSizes} width="70%" type="text" id="expiry" placeholder="Expiry date" />
                                    <Input {...register("card.cvvNo", { required: true, minLength: { value: 3, message: "CVV 3 digits required" } })} size={buttonSizes} width="30%" type="number" id="cvvNo" placeholder="CVV" />
                                </HStack>
                                <Button isLoading={loadingSpinner} width="20%" size={buttonSizes} colorScheme="yellow" type="submit" >Pay</Button>
                        </CardBody>
                    </Card>
                 
                </GridItem>
            </SimpleGrid>
        </>
    );
}

export default Cart;