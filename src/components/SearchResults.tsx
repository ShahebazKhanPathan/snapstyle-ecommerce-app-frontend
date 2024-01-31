import { Button, Card, CardBody, Heading, Image, Progress, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
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
    const noResults = searchLoader ? "" : "No results found.";

    useEffect(() => {
        setLoader(true);
        setProducts([]);
        axios.get("https://3wgfbd5j22b67sjhebcjvhmpku0hnlrq.lambda-url.ap-south-1.on.aws/api/product/search/" + params.get("query"))
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
                    <Heading size="md" mb={5}>Search results ({products.length}) </Heading>
                    {products.map((product) => 
                        <Card direction="row" p={5} mb={4}>
                            <Image boxSize="150px" objectFit="contain" src={"https://snapstyle.s3.us-west-1.amazonaws.com/" + product.photo.name} />
                            <Stack>
                                <CardBody>
                                    <Heading size="sm" mb={5}>{product.title}</Heading>
                                    <Heading color="green" size="sm">${product.price}</Heading>
                                    <Link to={"/product?pid="+product._id}><Button mt={3} colorScheme="green" variant="solid" size="sm">View</Button></Link>
                                </CardBody>
                            </Stack>
                        </Card>
                    )}
                </SimpleGrid>
                :
                <Text>{noResults}</Text>
            }
        </> 
    );
}

export default SearchResults;