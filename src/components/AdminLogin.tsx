import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Input, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface Admin{
    userId: String;
    password: String;
}

const AdminLogin = () => {

    const token = localStorage.getItem("admin-auth-token");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Admin>();
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [loader, setLoader] = useState(false);
    const headingSizes = { base: "18px", sm: "18px", md: "20px", lg: "22px", xl: "22px" };
    const buttonSizes = { base: 'sm', sm: 'sm', md: 'md', lg: 'md' };
    const gridColumns = { base: 1, sm: 1, md: 2, lg: 2, xl: 2 };

    const onSubmit = (data: Admin) => {
        setLoader(true);
        setAlert('');
        setError('');
        axios.post("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/admin", data) 
            .then(({ data }) => {
                localStorage.setItem("admin-auth-token", data);
                setLoader(false);
            })
            .catch(({ response }) => {
                setLoader(false);
                setError(response.data);
            });
    }

    if (!token) {
        return (
            <SimpleGrid paddingX={5} columns={gridColumns}>
                {loader && <Spinner className="mb-3"/>}
                {error && <Alert status="error" className="mb-3">
                    <AlertIcon />
                    {error}
                </Alert>}
                {alert && <Alert status="success" className="mb-3">
                    <AlertIcon />
                    {alert}
                </Alert>}
                <Card py={4}>
                    <CardHeader pt={1} pb={0}>
                        <Text fontSize={headingSizes} fontWeight={600} mb={4}>Admin - Sign in</Text>
                    </CardHeader>
                    <CardBody py={0}>
                        <form onSubmit={handleSubmit((data) => { onSubmit(data); reset({ userId: "", password: ""})})}>
                            <div className="form-group mb-3">
                                <label htmlFor="userId" className="label form-label">User ID</label>
                                <Input {...register("userId", { required: "User ID is required.", minLength: { value: 5, message: "User ID must be at least 5 characters long."} })} id="userId" type="text" size={buttonSizes} placeholder="User ID" />
                                {errors.userId && <p className="text-danger">{errors.userId?.message}</p>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="label form-label">Password</label>
                                <Input {...register("password", { required: "Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters long." } })} id="password" type="password" size={buttonSizes} placeholder="Password" />
                                {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                            </div>
                            <Button size={buttonSizes} colorScheme="green" type="submit" >Login</Button>
                        </form>
                    </CardBody>
                </Card>
            </SimpleGrid>
        );
    }
    
    else {
        return <Navigate to={"/admin/products"} />
    }
    
}

export default AdminLogin;