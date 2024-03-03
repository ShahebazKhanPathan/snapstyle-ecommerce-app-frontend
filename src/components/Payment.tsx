import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, HStack, Heading, Image, Input, SimpleGrid, Skeleton, Spacer, Text, Textarea } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useSearchParams } from "react-router-dom";
import { Product } from "./Product";
import commonStyles from "../utils/commonCSS";

interface Order{
    name: string;
    email: string;
    mobile: number;
    address: string;
    pId: string | null;
    pTitle: string | undefined;
    pImage: string | undefined;
    pPrice: number;
    pTaxes: number;
    pShippingCharges: number;
    pTotal: number;
    card: {
        cardNo: number;
        expiry: string;
        cvvNo: number
    }
}

const Payment = () => {

    const [params] = useSearchParams();
    const token = localStorage.getItem('auth-token');
    if (!token && params.get('pid')) return <Navigate to={"/signin?page=payment&pid="+params.get('pid')} />;

    const [product, setProduct] = useState<Product>();
    const [loadingSkeleton, setSkeleton] = useState(true);
    const [loadingSpinner, setSpinner] = useState(false);
    const [alert, setAlert] = useState(false);
    const [price, setPrice] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [total, setTotal] = useState(0);
    const id = params.get("pid") ? params.get("pid") : '';
    const shippingCharges = 1;

    const { handleSubmit, register, reset, formState: { errors } } = useForm<Order>();

    const getProduct = async (id: String | null) => {
        await apiClient.get("/api/product/" + id)
            .then(({ data }) => {
                setProduct(data);
                setPrice(data.price);
                setTaxes(data.price / 100 * 10);
                setTotal((data.price) + (data.price / 100 * 10) + shippingCharges);
                setSkeleton(false);
            })
            .catch((err) => {
                console.log(err.message);
                setSkeleton(false);
            });
    }

    const onSubmit = async (data: Order) => {
        const { name, email, mobile, address } = data;
        const orderData = {
            name: name,
            email: email,
            mobile: mobile,
            address: address,
            pId: id,
            pTitle: product?.title,
            pImage: product?.photo.name,
            pPrice: price,
            pTaxes: taxes,
            pShippingCharges: shippingCharges,
            pTotal: total               
        };
        setSpinner(true);
        await apiClient.post(
            "/api/orders",
            orderData,
            { headers: { "auth-token": token } }
        ).then(({ data }) => {
            setSpinner(false);
            callAlert();
            reset();
            console.log(data);
        }).catch((err) => {
            setSpinner(false);
            reset();
            console.log(err.message)
        });
    }

    const callAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 5000);
    }

    useEffect(() => {
        getProduct(id);
    }, []);

    return (
        <>
            {loadingSkeleton &&
                <SimpleGrid columns={commonStyles.payment.gridColumns} paddingY={2} spacing={5}>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}} >
                        <Skeleton height={commonStyles.payment.imageHeight}></Skeleton>
                    </Box>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}}>
                        <Skeleton mb={3} height={{ base: "10px", md: "12px", lg: "16px", xl: "28px" }}></Skeleton>
                        <Skeleton mb={3} height={{ base: "10px", md: "12px", lg: "16px", xl: "24px" }}></Skeleton>
                        <Skeleton mb={3} width="75%" height={{ base: "10px", md: "12px", lg: "140px", xl: "200px" }}></Skeleton>
                        <Skeleton width="60%" mb={3} height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                        <Skeleton width="50%" height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                    </Box>
                </SimpleGrid>
            }

            {!loadingSkeleton && <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                {alert &&
                    <Alert fontSize={commonStyles.fontSizes} status="success">
                        <AlertIcon />
                        <AlertTitle>Order placed!</AlertTitle>
                        <AlertDescription>Check my orders.</AlertDescription>
                    </Alert>
                }
                <SimpleGrid columns={commonStyles.payment.gridColumns} paddingY={2} spacing={5}>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}}>
                        <Text fontWeight={500} fontSize={commonStyles.payment.headingSizes} mb={5}>Payment</Text>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="label form-label">Name:</label>
                            <Input {...register("name", { required: "Name is required.", minLength: { value: 5, message: "Name must be atleast 5 characters long." } })} size={commonStyles.payment.buttonSizes} type="text" id="name" placeholder="Enter name" />
                            {errors?.name && <Text fontSize={commonStyles.fontSizes} color="red">{errors?.name.message}</Text>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="label form-label">Email:</label>
                            <Input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} size={commonStyles.payment.buttonSizes} type="text" id="email" placeholder="Enter email" />
                            {errors?.email && <Text fontSize={commonStyles.fontSizes} color="red">{errors?.email.message}</Text>}

                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="mobile" className="label form-label">Mobile No:</label>
                            <Input {...register("mobile", { required: "Mobile is required.", minLength: {value: 10, message: "Mobile no must be 10 digits."} })} size={commonStyles.payment.buttonSizes} type="number" id="mobile" placeholder="Enter mobile no." />
                            {errors?.mobile && <Text fontSize={commonStyles.fontSizes} color="red">{errors?.mobile.message}</Text>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address" className="label form-label">Shipping Address:</label>
                            <Textarea {...register("address", { required: "Shipping address is required.", minLength: {value: 10, message: "Address must be at least 10 characters long."} })} size={commonStyles.payment.buttonSizes} id="address" placeholder="Enter full address" />
                            {errors?.address && <Text fontSize={commonStyles.fontSizes} color="red">{errors?.address.message}</Text>}
                        </div>
                    </Box>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}}>
                        <Card>
                            <CardBody>
                                <Heading mb={5} size="sm">{product?.title}</Heading>
                                <Image mb={5} boxSize={commonStyles.payment.boxSizes} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/" + product?.photo.name} />
                                <HStack>
                                    <Text fontSize={commonStyles.fontSizes}>Price: </Text>
                                    <Spacer />
                                    <Text fontSize={commonStyles.fontSizes} textAlign="right">${price.toFixed(2)}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={commonStyles.fontSizes}>Taxes: </Text>
                                    <Spacer />
                                    <Text fontSize={commonStyles.fontSizes} textAlign="right">${taxes.toFixed(2)}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={commonStyles.fontSizes}>Shipping charges: </Text>
                                    <Spacer />
                                    <Text fontSize={commonStyles.fontSizes} textAlign="right">${shippingCharges.toFixed(2)}</Text>
                                </HStack>
                                <HStack mb={5}>
                                    <Text fontWeight={500} fontSize={commonStyles.payment.headingSizes}>Total: </Text>
                                    <Spacer />
                                    <Text fontWeight={500} fontSize={commonStyles.payment.headingSizes} textAlign="right">${total.toFixed(2)}</Text>
                                </HStack>
                                <div className="form-group mb-3">
                                    <Input {...register("card.cardNo", { required: "Card No. is required.", minLength: {value: 12, message: "Card no must be 12 digits."} })} size={commonStyles.payment.buttonSizes} type="number" id="cardNo" placeholder="Credit or Debit Card no." />
                                    {errors.card?.cardNo && <Text fontSize={commonStyles.fontSizes} color="red">{errors.card?.cardNo.message}</Text>}
                                </div>
                                <HStack mb={5}>
                                    <Input {...register("card.expiry", { required: true, minLength: { value: 5, message: "Date must be like 01/23" } })} size={commonStyles.payment.buttonSizes} width="70%" type="text" id="expiry" placeholder="Expiry date" />
                                    <Input {...register("card.cvvNo", { required: true, minLength: { value: 3, message: "CVV 3 digits required" } })} size={commonStyles.payment.buttonSizes} width="30%" type="number" id="cvvNo" placeholder="CVV" />
                                </HStack>
                                <Button isLoading={loadingSpinner} width="20%" size={commonStyles.payment.buttonSizes} colorScheme="yellow" type="submit" >Pay</Button>
                            </CardBody>
                        </Card>
                    </Box>
                </SimpleGrid>
            </form>
            }
        </>
    )
}

export default Payment;