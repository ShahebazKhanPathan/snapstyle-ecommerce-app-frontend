import { Alert, AlertIcon, Button, Heading, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

interface User{
    email: string;
    password: string;
}

const SignInForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/users").then((res) => console.log(res)).catch((err) => console.log(err));
    }, []);

    const onSubmit = (data: User) => {
        setLoader(true);
        axios.post("http://localhost:3000/api/users", data)
            .then(() => {
                setLoader(false);
                setAlert('Thank you. You have registered successfully!');
                reset({ email: "", password: "" });
            })
            .catch(({ response }) => {
                setLoader(false);
                setError(response.data);
            });
    }

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
            <Heading size="lg" mb={4}>Sign In</Heading>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <div className="form-group mb-3">
                            <label htmlFor="email" className="label form-label">Email</label>
                            <input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} id="email" type="text" className="form-control" placeholder="Enter email" />
                            {errors.email && <p className="text-danger">{errors.email?.message}</p>}
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

export default SignInForm;