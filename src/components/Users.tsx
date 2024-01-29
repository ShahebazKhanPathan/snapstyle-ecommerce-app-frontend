import { Heading, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface User{
    _id: String;
    name: String;
    email: String;
    mobile: String;
}

const Users = () => {

    const token = localStorage.getItem("admin-auth-token");
    if (!token) return <Navigate to={"/"} />;
    
    const [users, setUsers] = useState<User[]>([]);
    let srNo = 0;

    const getUsers = () => {
        axios.get("http://localhost:3000/api/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <SimpleGrid paddingX={5}>
            <Heading size="md">Users ({users.length})</Heading>
            {users.length>0 ? 
                <TableContainer padding={5}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Sr. no.</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Mobile</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user) => {
                                srNo+=1;
                                return (
                                    <Tr key={srNo}>
                                        <Td>{srNo}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.mobile}</Td>
                                    </Tr>);
                                }
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
                :
                <Text>No users yet.</Text>
            }
        </SimpleGrid>
    );
}

export default Users;