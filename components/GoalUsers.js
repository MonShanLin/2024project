import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllDocuments, writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers({ id }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const dataFromDB = await getAllDocuments(`goals/${id}/users`);
                if (dataFromDB.length) {
                    console.log('reading from db');
                    setUsers(
                        dataFromDB.map((user) => {
                            return user.name
                        }
                        ));
                    return;
                }
                console.log('fetching from api');
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/users'
                );
                if (!response.ok) {
                    throw new Error(`HTTP error with status ${response.status}`);
                };
                const data = await response.json();
                data.map((user) => {
                    writeToDB(user, `goals/${id}/users/`);
                });
                const names = data.map(user => {
                    return user.name;
                });
                setUsers(names);
            } catch (error) {
                console.error('fetch user data error', error);
            };
        }
        fetchData();
    }, []);

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => <Text>{item}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({})