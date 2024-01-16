import { Alert, AlertIcon, Button, Heading, Input, Select, SimpleGrid, Spinner } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product{
    title: String;
    category: String;
    price: Number;
    photo: String;
    description: String;
}

const Products = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>();
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/products")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, []);

    const onSubmit = (data: Product) => {
        setLoader(true);
        axios.post("http://localhost:3000/api/products", data)
            .then(() => {
                setLoader(false);              
                setAlert('Product added successfully!');
                reset({ title: "", category: "", price: 0, photo: "", description: "" });
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
            <Heading size="lg" mb={4}>Add new product</Heading>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <div className="form-group mb-3">
                        <Input type="text" id="title" {...register("title", { required: "Title is required", minLength: { value: 5, message: "Title must be at least 5 characters long."}})} placeholder="Title"/>
                        {errors.title && <p className="text-danger">{errors.title?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                        <Select {...register("category", { required: "Category is must"})} id="category" placeholder="Select category">
                            <option value="Fashion">Fashion</option>
                            <option value="Electronics">Electronics</option>
                        </Select>
                        {errors.category && <p className="text-danger">{errors.category?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                        <Input {...register("price", { required: "Price is required.", minLength: {value: 10, message: "Price must be at least $10"} })} id="price" type="number" placeholder="Price" />
                        {errors.price && <p className="text-danger">{errors.price?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                        <Input {...register("description", { required: "Description is required.", minLength: { value: 8, message: "Description must be at least 8 characters long." } })} id="description" type="text" placeholder="Description" />
                        {errors.description && <p className="text-danger">{errors.description?.message}</p>}
                    </div>
                    <div className="form-group mb-3">
                        <Input {...register("photo", { required: "Photo is required."})} className="form-control" id="photo" type="file" placeholder="Upload photo" />
                        {errors.photo && <p className="text-danger">{errors.photo?.message}</p>}
                    </div>
                    <Button colorScheme="green" type="submit" >Submit</Button>
                </form>
        </SimpleGrid>
    );
}

export default Products;