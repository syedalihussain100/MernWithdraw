import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeamStyle from "./Team.module.css";
import { getTeam } from '../../redux/features/Team/TeamSlice';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

const Team = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeam())
    }, [dispatch])

    const teamData = useSelector(state => state?.team?.teamData);
    const { isLoading } = useSelector(state => state?.team);
    console.log(teamData)

    return (
        <div>
            <h3 className={TeamStyle.team}>TEAM</h3>
            {
                isLoading ? <h1 style={{ textAlign: "center", fontSize: "2rem", color: "#fff" }}>LOADING...</h1> :
                <TableContainer className={TeamStyle.tableContainer}>
                    <Table variant='simple' className={TeamStyle.container}>
                        <Thead>
                            <Tr>
                                <Th className={TeamStyle.containerth}>ID</Th>
                                <Th className={TeamStyle.containerth}>Name</Th>
                                <Th className={TeamStyle.containerth}>Email</Th>
                                <Th className={TeamStyle.containerth}>Phone</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {teamData?.data.map((elm) => (
                                <Tr key={elm?.userId?._id}>
                                    <Td>{elm?.userId?._id}</Td>
                                    <Td>{elm?.userId?.username}</Td>
                                    <Td>{elm?.userId?.email}</Td>
                                    <Td>{elm?.userId?.phone}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            }
        </div>
    )
}

export default Team;
