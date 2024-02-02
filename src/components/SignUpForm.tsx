import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Input, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface User{
    name: string;
    email: string;
    mobile: number;
    password: string;
}

const SignUpForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [loader, setLoader] = useState(false);
    const headingSizes = { base: "18px", sm: "18px", md: "20px", lg: "22px", xl: "22px" };
    const buttonSizes = { base: 'sm', sm: 'sm', md: 'md', lg: 'md' };
    const fontSizes = { base: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" };
    const gridColumns = { base: 1, sm: 1, md: 2, lg: 2, xl: 2 };

    const onSubmit = (data: User) => {
        setLoader(true);
        setAlert('');
        setError('');
        axios.post("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/users", data)
            .then(({ data }) => {
                setLoader(false);
                localStorage.setItem("auth-token", data);               
                setAlert('Thank you. You have registered successfully!');
                setTimeout(() => {
                    setAlert('');
                }, 4000);
                reset();
            })
            .catch(({ response }) => {
                setLoader(false);
                setError(response.data);
                setTimeout(() => {
                    setError('');
                }, 4000);
            });
    }

    return (
        <SimpleGrid paddingX={5} columns={gridColumns}>
            <Card py={4}>
                <CardHeader pt={1} pb={0}>
                    {loader && <Spinner className="mb-3"/>}
                    {error && <Alert status="error" mb={4} fontSize={fontSizes} className="mb-3">
                        <AlertIcon />
                        {error}
                    </Alert>}
                    {alert && <Alert status="success" mb={4} fontSize={fontSizes} className="mb-3">
                        <AlertIcon />
                        {alert}
                    </Alert>}
                    <Text fontSize={headingSizes} fontWeight={600} mb={4}>Create new account</Text>
                </CardHeader>
                <CardBody py={0}>
                    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="label form-label">Name</label>
                            <Input {...register("name", { required: "Name is required.", minLength: { value: 5, message: "Name must be at least 5 characters long."} })} id="name" type="text" size={buttonSizes} placeholder="Enter name" />
                            {errors.name && <p className="text-danger">{errors.name?.message}</p>}
                        </div>
                        <div className="form-group mb-3">
                                <label htmlFor="email" className="label form-label">Email</label>
                                <Input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} id="email" type="text" size={buttonSizes} placeholder="Enter email" />
                                {errors.email && <p className="text-danger">{errors.email?.message}</p>}
                        </div>
                        <div className="form-group mb-3">
                                <label htmlFor="mobile" className="label form-label">Mobile</label>
                                <Input {...register("mobile", { required: "Mobile is required.", minLength: {value: 10, message: "Mobile no must be 10 digits."} })} id="mobile" type="number" size={buttonSizes} placeholder="Enter mobile" />
                                {errors.mobile && <p className="text-danger">{errors.mobile?.message}</p>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="label form-label">Password</label>
                            <Input {...register("password", { required: "Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters long." } })} id="password" type="password" size={buttonSizes} placeholder="Enter password" />
                            {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                        </div>
                        <Button size={buttonSizes} colorScheme="green" type="submit" >Sign up</Button>
                    </form>
                </CardBody>
            </Card>
            
            
        </SimpleGrid>
    );
}

export default SignUpForm;