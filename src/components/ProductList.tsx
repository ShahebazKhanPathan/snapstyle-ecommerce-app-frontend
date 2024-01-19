import { Card, CardBody, Center, Image, SimpleGrid, Text } from "@chakra-ui/react"

const ProductList = () => {

    const products = [1, 2, 3, 4, 5, 6, 7, 8];
    const imageHeight = { base: "100px", md: "150px", lg: "160px", xl: "250px" };
    const gridColumns = { base: 2, sm: 3, md: 3, lg: 3, xl: 4 };

    return (
        <>
            <SimpleGrid spacing={4} columns={gridColumns}>
                {products.map((product) =>
                <Card key={product}>
                    <CardBody>
                        <Center>
                            <Image height={imageHeight} src="https://file-upload-practice-bucket.s3.ap-south-1.amazonaws.com/waiting%20for%20someone%20special.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCmV1LW5vcnRoLTEiRzBFAiBeutM6cyMI7E2jKCep%2BmTLfxyTalWKhL0Mh6y61tZwAwIhAOrVzJnwOYqACSXBp1AE8llh%2F4IwdKBRkkoCLvn9AuubKu0CCOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjc4MDQ3MzY4Njc0Igz%2F6DRNCd94JfMOZhMqwQKV%2Bvz5lFgQz6Fwkuen%2F9z6YLwO2StCe%2BaSEqMor9bH5RpmVXdovsZOmyGuV%2Bv2QWigGk9rle%2BLuMWgHs%2FIz9VWhcOO2XOvbHYGYd%2Bkb6tGSgo1deQO%2BzLeKGifEj2C02%2F5YwASe8AUUyFS5xFETp9qONBv58227Uk2JulYKC1nfbPk6aUyF45Y1dubOcFpFRVphnndlPS4J1X%2BOd6A72iMZr40%2Fr2flxRsSv7oV66N8sFNbF0VNOO0lbvFP9x9d1ZwAOqp30HkFLrsavT77O%2F626LAMH90aFrvqnzE6Xjq132PovK1IbcTxh%2B%2BWk3JJSrk7faXqkNs3txGXUnNLgfFtQS9kQSIVzAJ%2BsVqDmA9owZyu4z52ugoUwcFsTThF7fJizsvQa0nOqWE90Bp7rc7ovdlYdXySZtjZ%2Bh0MAkXrwkwgv%2BnrQY6swI4%2BC1wGJhVmytgH6ziKtQkGj%2FV1CRLLZ9cU1kZRmnEXhX2ze25PlkfqRc3A0NABtmbaUJAZ0sG0uY2003cTZWzRS26ZsdZlBolk8yvsIRJa2lUzo5%2F6jRQPPRWz%2B1ht%2FKSzIjozoGhorqDAfXzwMSaqJuAZQYZze%2BUl2%2FwJ5b83QXoL0%2F%2BJKd%2FOl7CiboDTiBNMTXTagJFq6U06CuoVIZ7qZpfGRpc9DyMXd8ANclSTfo4L99oVcJUy9466EPgmY54Nv5nMLnmTrc6UxdVw9M5tPtgm8gtRBNFekWU%2BhCcoTwJLRTR6ExdEFXeiewQ7ra0OimJFC%2FWiKxprs2gcOoASdlFvHb2r1yUOuUmW3iVN253igyMbxQzJQXcYZ%2BY7Ppe8gU%2FkYBxWgpOl4U19XNSSOpk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240119T090742Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZ3XWFYXRHAMBYJMQ%2F20240119%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=9b6a93e0751b63c1f141e5370c306ae38c158a9324a71a098eab148a1dfb8b60" />
                        </Center>                        
                        <Text mt={2} fontSize={{base: "10px", md: "12px", lg: "16px", xl: "16px" }}>Men Solid Cotton T-Shirt</Text>
                        <Text>Rs. 499/-</Text>
                    </CardBody>
                </Card>
            )}
            </SimpleGrid>
        </>
    );
}

export default ProductList;