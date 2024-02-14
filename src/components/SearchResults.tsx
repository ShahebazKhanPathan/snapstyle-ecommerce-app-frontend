import { Button, Card, CardBody, Heading, Image, Progress, SimpleGrid, Text } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Search{
    _id: string;
    title: string;
    price: number;
    photo: { name: string }
}

const SearchResults = () => {
      
    const [searchLoader, setLoader] = useState(false);
    const [params] = useSearchParams();
    const [products, setProducts] = useState<Search[]>([]);
    const noResults = searchLoader ? "" : "Sorry! No search results found";
    const buttonSizes = { base: 'xs', sm: 'xs', md: 'sm', lg: 'sm' };

    useEffect(() => {
        setLoader(true);
        setProducts([]);
        apiClient.get("/api/product/search/" + params.get("query"))
            .then(({ data }) => {
                setLoader(false);
                setProducts(data);
                console.log(data)
            })
            .catch((err) => {
                setLoader(false);
                console.log(err);
            });
    }, [params]);

    return (
        <>
            {searchLoader && <Progress colorScheme="green" size="xs" isIndeterminate />}
            {products.length > 0
                ?
                <SimpleGrid>
                    <Heading size="sm" mb={5}>Search results ({products.length}) </Heading>
                    {products.map((product) => 
                        <Card direction="row" p={3} mb={4}>
                            <Image p={{base: 1, sm: 1, md: 2, lg: 3, xl: 4}} boxSize={{base: "120px", sm: "140px", md: "160px", lg: "160px", xl: "180px"}} objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/" + product.photo.name} />
                            <CardBody>
                                <Heading size={buttonSizes} mb={4}>{product.title}</Heading>
                                <Heading color="green" size={buttonSizes} mb={5}>${product.price}</Heading>
                                <Link to={"/product?pid="+product._id}><Button colorScheme="green" variant="solid" size={buttonSizes}>View</Button></Link>
                            </CardBody>
                        </Card>
                    )}
                </SimpleGrid>
                :
                <Text fontSize={buttonSizes}>{noResults}</Text>
            }
        </> 
    );
}

export default SearchResults;