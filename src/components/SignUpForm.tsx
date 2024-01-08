import { Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid } from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form";

interface User{
    name: string;
    email: string;
    mobile: number;
    password: string;
}

const SignUpForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    console.log(errors);

    return (
        <SimpleGrid padding={4} width="50%">
            <Heading size="lg">Create new account</Heading>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="label form-label">Name</label>
                        <input {...register("name", { required: "Name is required." })} id="name" type="text" className="form-control" placeholder="Enter name" />
                        {errors.name && <p className="text-danger">{errors.name?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="email" className="label form-label">Email</label>
                            <input {...register("email", { required: "Email is required." })} id="email" type="text" className="form-control" placeholder="Enter name" />
                            {errors.name && <p className="text-danger">{errors.email?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="mobile" className="label form-label">Mobile</label>
                            <input {...register("mobile", { required: "Mobile is required.", minLength: 10 })} id="mobile" type="number" className="form-control" placeholder="Enter name" />
                            {errors.name && <p className="text-danger">{errors.mobile?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="label form-label">Name</label>
                        <input {...register("password", { required: "Password is required." })} id="password" type="text" className="form-control" placeholder="Enter name" />
                        {errors.name && <p className="text-danger">{errors.password?.message}</p>}
                    </div>
                    <button type="submit" className="btn btn-success">Sign up</button>
                </form>
        </SimpleGrid>
        
    );
}

export default SignUpForm;