import { Alert, AlertIcon, Button, Heading, SimpleGrid, Spinner } from "@chakra-ui/react"
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

    const onSubmit = (data: Admin) => {
        setLoader(true);
        setAlert('');
        setError('');
        axios.post("http://localhost:3000/api/admin", data) 
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
            <SimpleGrid paddingX={5}>
                {loader && <Spinner className="mb-3"/>}
                {error && <Alert status="error" className="mb-3">
                    <AlertIcon />
                    {error}
                </Alert>}
                {alert && <Alert status="success" className="mb-3">
                    <AlertIcon />
                    {alert}
                </Alert>}
                <Heading size="lg" mb={4}>Admin - Sign in</Heading>
                <form onSubmit={handleSubmit((data) => { onSubmit(data); reset({ userId: "", password: ""})})}>
                        <div className="form-group mb-3">
                                <label htmlFor="userId" className="label form-label">User ID</label>
                                <input {...register("userId", { required: "User ID is required.", minLength: { value: 5, message: "User ID must be at least 5 characters long."} })} id="userId" type="text" className="form-control" placeholder="Enter user id" />
                                {errors.userId && <p className="text-danger">{errors.userId?.message}</p>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="label form-label">Password</label>
                            <input {...register("password", { required: "Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters long." } })} id="password" type="text" className="form-control" placeholder="Enter password" />
                            {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                        </div>
                        <Button colorScheme="green" type="submit" >Login</Button>
                    </form>
            </SimpleGrid>
        );
    }
    
    else {
        return <Navigate to={"/admin/products"} />
    }
    
}

export default AdminLogin;