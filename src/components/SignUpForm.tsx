import { Alert, AlertIcon, Button, Card, CardBody, CardHeader, Input, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { useState } from "react";
import commonStyles from "../utils/commonCSS";

interface User{
    name: string;
    email: string;
    mobile: number;
    password: string;
}

const SignUpForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);

    const onSubmit = (data: User) => {
        setLoader(true);
        setError('');
        apiClient.post("/api/users", data)
            .then(({ data }) => {
                setLoader(false);
                localStorage.setItem("auth-token", data);               
                location.href = "/";
                reset();
            })
            .catch(({ response }) => {
                setLoader(false);
                setError('Password: '+response.data);
            });
    }

    return (
        <SimpleGrid paddingX={5} columns={commonStyles.signIn.gridColumns}>
            <Card py={4}>
                <CardHeader pt={1} pb={0}>
                    {loader && <Spinner fontSize={commonStyles.fontSizes} className="mb-3"/>}
                    {error && <Alert status="warning" mb={4} fontSize={commonStyles.fontSizes} className="mb-3">
                        <AlertIcon />
                        {error}
                    </Alert>}
                    <Text fontSize={commonStyles.signIn.headingSizes} fontWeight={600} mb={4}>Create new account</Text>
                </CardHeader>
                <CardBody py={0}>
                    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="label form-label">Name</label>
                            <Input {...register("name", { required: "Name is required.", minLength: { value: 5, message: "Name must be at least 5 characters long."} })} id="name" type="text" size={commonStyles.signIn.buttonSizes} placeholder="Enter name" />
                            {errors.name && <Text fontSize={commonStyles.fontSizes} color="red">{errors.name?.message}</Text>}
                        </div>
                        <div className="form-group mb-3">
                                <label htmlFor="email" className="label form-label">Email</label>
                                <Input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} id="email" type="text" size={commonStyles.signIn.buttonSizes} placeholder="Enter email" />
                                {errors.email && <Text fontSize={commonStyles.fontSizes} color="red">{errors.email?.message}</Text>}
                        </div>
                        <div className="form-group mb-3">
                                <label htmlFor="mobile" className="label form-label">Mobile</label>
                                <Input {...register("mobile", { required: "Mobile is required.", minLength: {value: 10, message: "Mobile no must be 10 digits."} })} id="mobile" type="number" size={commonStyles.signIn.buttonSizes} placeholder="Enter mobile" />
                                {errors.mobile && <Text fontSize={commonStyles.fontSizes} color="red">{errors.mobile?.message}</Text>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="label form-label">Password</label>
                            <Input {...register("password", { required: "Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters long." } })} id="password" type="password" size={commonStyles.signIn.buttonSizes} placeholder="Enter password" />
                            {errors.password && <Text fontSize={commonStyles.fontSizes} color="red">{errors.password?.message}</Text>}
                        </div>
                        <Button size={commonStyles.signIn.buttonSizes} colorScheme="green" type="submit" >Sign up</Button>
                    </form>
                </CardBody>
            </Card>
            
            
        </SimpleGrid>
    );
}

export default SignUpForm;