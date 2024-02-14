import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Input, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { Navigate, useSearchParams } from "react-router-dom";
import apiClient from "../services/api-client";
import { useState } from "react";

interface User{
    email: String;
    password: String;
}

const SignInForm = () => {

    const token = localStorage.getItem("auth-token");
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const [params] = useSearchParams();
    const headingSizes = { base: "18px", sm: "18px", md: "20px", lg: "22px", xl: "22px" };
    const buttonSizes = { base: 'sm', sm: 'sm', md: 'md', lg: 'md' };
    const fontSizes = { base: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" };
    const gridColumns = { base: 1, sm: 1, md: 2, lg: 2, xl: 2 };

    const onSubmit = (data: User) => {
        setError('');
        setLoader(true);
        apiClient.post("/api/auth", data) 
            .then(({ data }) => {
                localStorage.setItem("auth-token", data);
                setLoader(false);
                if (params.get('page') == 'payment' && params.get('pid')) {
                    location.href = "/payment?pid="+params.get('pid');
                }
                else if (params.get('page') == 'product' && params.get('pid')) {
                    location.href = "/product?pid="+params.get('pid');
                }
                else {
                    location.href = "/";
                }
            })
            .catch(({ response }) => {
                setLoader(false);
                setError(response.data);
            });
    }

    if (!token) {
        return (
            <SimpleGrid columns={gridColumns} paddingX={5}>
                <Card py={4}>
                    <CardHeader pt={1} pb={0}>
                        {loader && <Spinner fontSize={fontSizes} className="mb-3"/>}
                        {error && <Alert status="error" className="mb-3">
                            <AlertIcon />
                            {error}
                        </Alert>}
                        <Text fontWeight={600} fontSize={headingSizes}>Sign In</Text>
                    </CardHeader>
                    <CardBody py={0}>
                        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="label form-label">Email</label>
                                <Input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} size={buttonSizes} id="email" type="text" placeholder="Enter email" />
                                {errors.email && <Text fontSize={fontSizes} color="red">{errors.email?.message}</Text>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="label form-label">Password</label>
                                <Input {...register("password", { required: "Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters long." } })} size={buttonSizes} id="password" type="password" className="form-control form-control-sm" placeholder="Enter password" />
                                {errors.password && <Text fontSize={fontSizes} color="red">{errors.password?.message}</Text>}
                            </div>
                            <Button size={buttonSizes} colorScheme="green" type="submit" >Login</Button>
                        </form>
                    </CardBody>
                    </Card>
                
            </SimpleGrid>
        );
    }
    
    else {
        return <Navigate to={"/"} />
    }
    
}

export default SignInForm;