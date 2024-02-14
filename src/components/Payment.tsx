import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, HStack, Heading, Image, Input, SimpleGrid, Skeleton, Spacer, Text, Textarea } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useSearchParams } from "react-router-dom";
import { Product } from "./Product";

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

    const gridColumns = { base: 1, sm: 1, md: 1, lg: 2, xl: 2 };
    const imageHeight = { base: "150px", md: "200px", lg: "300px", xl: "400px" };
    const headingSizes = { base: "20px", sm: "20px", md: "20px", lg: "22px", xl: "22px" };
    const buttonSizes = { base: 'sm', sm: 'sm', md: 'sm', lg: 'md' };
    const fontSizes = { base: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" };
    const boxSizes = { base: "240px", sm: "260px", md: "280px", lg: "320px", xl: "360px" };
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
                <SimpleGrid columns={gridColumns} paddingY={2} spacing={5}>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}} >
                        <Skeleton height={imageHeight}></Skeleton>
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
                    <Alert fontSize={fontSizes} status="success">
                        <AlertIcon />
                        <AlertTitle>Order placed!</AlertTitle>
                        <AlertDescription>Check my orders.</AlertDescription>
                    </Alert>
                }
                <SimpleGrid columns={gridColumns} paddingY={2} spacing={5}>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}}>
                        <Text fontWeight={500} fontSize={headingSizes} mb={5}>Payment</Text>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="label form-label">Name:</label>
                            <Input {...register("name", { required: "Name is required.", minLength: { value: 5, message: "Name must be atleast 5 characters long." } })} size={buttonSizes} type="text" id="name" placeholder="Enter name" />
                            {errors?.name && <Text fontSize={fontSizes} color="red">{errors?.name.message}</Text>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="label form-label">Email:</label>
                            <Input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} size={buttonSizes} type="text" id="email" placeholder="Enter email" />
                            {errors?.email && <Text fontSize={fontSizes} color="red">{errors?.email.message}</Text>}

                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="mobile" className="label form-label">Mobile No:</label>
                            <Input {...register("mobile", { required: "Mobile is required.", minLength: {value: 10, message: "Mobile no must be 10 digits."} })} size={buttonSizes} type="number" id="mobile" placeholder="Enter mobile no." />
                            {errors?.mobile && <Text fontSize={fontSizes} color="red">{errors?.mobile.message}</Text>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address" className="label form-label">Shipping Address:</label>
                            <Textarea {...register("address", { required: "Shipping address is required.", minLength: {value: 10, message: "Address must be at least 10 characters long."} })} size={buttonSizes} id="address" placeholder="Enter full address" />
                            {errors?.address && <Text fontSize={fontSizes} color="red">{errors?.address.message}</Text>}
                        </div>
                    </Box>
                    <Box px={{ base: 10, sm: 10, md: 8, lg: 2, xl : 2}}>
                        <Card>
                            <CardBody>
                                <Heading mb={5} size="sm">{product?.title}</Heading>
                                <Image mb={5} boxSize={boxSizes} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/" + product?.photo.name} />
                                <HStack>
                                    <Text fontSize={fontSizes}>Price: </Text>
                                    <Spacer />
                                    <Text fontSize={fontSizes} textAlign="right">${price.toFixed(2)}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={fontSizes}>Taxes: </Text>
                                    <Spacer />
                                    <Text fontSize={fontSizes} textAlign="right">${taxes.toFixed(2)}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={fontSizes}>Shipping charges: </Text>
                                    <Spacer />
                                    <Text fontSize={fontSizes} textAlign="right">${shippingCharges.toFixed(2)}</Text>
                                </HStack>
                                <HStack mb={5}>
                                    <Text fontWeight={500} fontSize={headingSizes}>Total: </Text>
                                    <Spacer />
                                    <Text fontWeight={500} fontSize={headingSizes} textAlign="right">${total.toFixed(2)}</Text>
                                </HStack>
                                <div className="form-group mb-3">
                                    <Input {...register("card.cardNo", { required: "Card No. is required.", minLength: {value: 12, message: "Card no must be 12 digits."} })} size={buttonSizes} type="number" id="cardNo" placeholder="Credit or Debit Card no." />
                                    {errors.card?.cardNo && <Text fontSize={fontSizes} color="red">{errors.card?.cardNo.message}</Text>}
                                </div>
                                <HStack mb={5}>
                                    <Input {...register("card.expiry", { required: true, minLength: { value: 5, message: "Date must be like 01/23" } })} size={buttonSizes} width="70%" type="text" id="expiry" placeholder="Expiry date" />
                                    <Input {...register("card.cvvNo", { required: true, minLength: { value: 3, message: "CVV 3 digits required" } })} size={buttonSizes} width="30%" type="number" id="cvvNo" placeholder="CVV" />
                                </HStack>
                                <Button isLoading={loadingSpinner} width="20%" size={buttonSizes} colorScheme="yellow" type="submit" >Pay</Button>
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