import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, HStack, Heading, Image, Input, SimpleGrid, Skeleton, Spacer, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useSearchParams } from "react-router-dom";

interface Product{
    title: String;
    price: Number;
    description: String;
    photo: {
        name: String;
    }
}

interface Order{
    name: String;
    email: String;
    mobile: Number;
    address: String;
    pId: String | null;
    pTitle: String;
    pImage: String;
    pPrice: Number;
    pTaxes: Number;
    pShippingCharges: Number;
    pTotal: Number;
    card: {
        cardNo: Number;
        expiry: String;
        cvvNo: Number
    }
}

const Payment = () => {

    const [params, setParams] = useSearchParams();
    const token = localStorage.getItem('auth-token');
    if (!token && params.get('pid')) return <Navigate to={"/signin?page=payment&pid="+params.get('pid')} />;

    const gridColumns = { base: 2, sm: 3, md: 3, lg: 2, xl: 2 };
    const imageHeight = { base: "100px", md: "200px", lg: "300px", xl: "400px" };
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

    const getProduct = (id: String | null) => {
        axios.get("http://localhost:3000/api/product/" + id)
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

    const onSubmit = (data: Order) => {
        // console.log(data);
        data = {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            address: data.address,
            pId: id,
            pTitle: product?.title,
            pImage: product?.photo.name,
            pPrice: price,
            pTaxes: taxes.toFixed(2),
            pShippingCharges: shippingCharges.toFixed(2),
            pTotal: total.toFixed(2)                
        };
        setSpinner(true);
        axios.post(
            "http://localhost:3000/api/order",
            data,
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
                    <Box>
                        <Skeleton height={imageHeight}></Skeleton>
                    </Box>
                    <Box>
                        <Skeleton mb={8} height={{ base: "10px", md: "12px", lg: "16px", xl: "36px" }}></Skeleton>
                        <Skeleton mb={5} height={{ base: "10px", md: "12px", lg: "16px", xl: "24px" }}></Skeleton>
                        <Skeleton mb={6} height={{ base: "10px", md: "12px", lg: "16px", xl: "200px" }}></Skeleton>
                        <Skeleton width="70%" mb={5} height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                        <Skeleton width="50%" height={{ base: "10px", md: "12px", lg: "16px", xl: "20px" }}></Skeleton>
                    </Box>
                </SimpleGrid>
            }

            {!loadingSkeleton && <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                {alert &&
                    <Alert status="success">
                        <AlertIcon />
                        <AlertTitle>Order placed successfully!</AlertTitle>
                        <AlertDescription>You can check your orders.</AlertDescription>
                    </Alert>
                }
                <SimpleGrid columns={gridColumns} paddingY={2} spacing={10}>
                    <Box>
                        <Heading mb={5}>Payment</Heading>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="label form-label">Name:</label>
                            <Input {...register("name", { required: "Name is required.", minLength: { value: 5, message: "Name must be atleast 5 characters long." } })} type="text" id="name" placeholder="Enter name" />
                            {errors?.name && <p className="text-danger">{errors?.name.message}</p>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="label form-label">Email:</label>
                            <Input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} type="text" id="email" placeholder="Enter email" />
                            {errors?.email && <p className="text-danger">{errors?.email.message}</p>}

                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="mobile" className="label form-label">Mobile No:</label>
                            <Input {...register("mobile", { required: "Mobile is required.", minLength: {value: 10, message: "Mobile no must be 10 digits."} })} type="number" id="mobile" placeholder="Enter mobile no." />
                            {errors?.mobile && <p className="text-danger">{errors?.mobile.message}</p>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="address" className="label form-label">Shipping Address:</label>
                            <Textarea {...register("address", { required: "Shipping address is required.", minLength: {value: 10, message: "Address must be at least 10 characters long."} })} id="address" placeholder="Enter full address" />
                            {errors?.address && <p className="text-danger">{errors?.address.message}</p>}
                        </div>
                    </Box>
                    <Box>
                        <Card>
                            <CardBody>
                                <Heading mb={5} size="sm">{product?.title}</Heading>
                                <Image mb={5} height={{ lg: "120px" }} src={"https://snapstyle.s3.us-west-1.amazonaws.com/" + product?.photo.name} />
                                <HStack>
                                    <Text>Price: </Text>
                                    <Spacer />
                                    <Text textAlign="right">${price.toFixed(2)}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Taxes: </Text>
                                    <Spacer />
                                    <Text textAlign="right">${taxes.toFixed(2)}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Shipping charges: </Text>
                                    <Spacer />
                                    <Text textAlign="right">${shippingCharges.toFixed(2)}</Text>
                                </HStack>
                                <HStack mb={5}>
                                    <Heading size="sm">Total: </Heading>
                                    <Spacer />
                                    <Heading size="md" textAlign="right">${total.toFixed(2)}</Heading>
                                </HStack>
                                <div className="form-group mb-3">
                                    <Input {...register("card.cardNo", { required: "Card No. is required.", minLength: {value: 12, message: "Card no must be 12 digits."} })} type="number" id="cardNo" placeholder="Credit or Debit Card no." />
                                    {errors.card?.cardNo && <p className="text-danger">{errors.card?.cardNo.message}</p>}
                                </div>
                                <HStack mb={5}>
                                    <Input {...register("card.expiry", { required: true, minLength: { value: 5, message: "Date must be like 01/23" } })} width="70%" type="text" id="expiry" placeholder="Expiry date" />
                                    <Input {...register("card.cvvNo", { required: true, minLength: { value: 3, message: "CVV 3 digits required" } })} width="30%" type="number" id="cvvNo" placeholder="CVV" />
                                </HStack>
                                <Button isLoading={loadingSpinner} width="20%" size="sm" colorScheme="yellow" type="submit" >Pay</Button>
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