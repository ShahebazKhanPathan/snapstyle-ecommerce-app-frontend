import { Heading, SimpleGrid } from "@chakra-ui/react"
import { useForm } from "react-hook-form";

interface User{
    name: string;
    email: string;
    mobile: number;
    password: string;
}

const SignUpForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();

    return (
        <SimpleGrid padding={4} width="50%">
            <Heading size="lg">Create new account</Heading>
            <form onSubmit={handleSubmit((data) => { console.log(data); reset({ name: "", email: "", mobile: 0, password:"" }) })}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="label form-label">Name</label>
                        <input {...register("name", { required: "Name is required.", minLength: { value: 5, message: "Name must be at least 5 characters long."} })} id="name" type="text" className="form-control" placeholder="Enter name" />
                        {errors.name && <p className="text-danger">{errors.name?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="email" className="label form-label">Email</label>
                            <input {...register("email", { required: "Email is required.", minLength: { value: 5, message: "Email must be at least 5 characters long."} })} id="email" type="text" className="form-control" placeholder="Enter name" />
                            {errors.email && <p className="text-danger">{errors.email?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="mobile" className="label form-label">Mobile</label>
                            <input {...register("mobile", { required: "Mobile is required.", minLength: {value: 10, message: "Mobile no must be 10 digits."} })} id="mobile" type="number" className="form-control" placeholder="Enter name" />
                            {errors.mobile && <p className="text-danger">{errors.mobile?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="label form-label">Name</label>
                        <input {...register("password", { required: "Password is required.", minLength: { value: 8, message: "Password must be at least 8 characters long." } })} id="password" type="text" className="form-control" placeholder="Enter name" />
                        {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                    </div>
                    <button type="submit" className="btn btn-success">Sign up</button>
                </form>
        </SimpleGrid>
        
    );
}

export default SignUpForm;