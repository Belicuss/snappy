import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { FetchAllUser } from '../services/allusers';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


export default function Auth({ navigation }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        FetchAllUser(setUsers);
    }, []);

    return (
        <View style={styles.principal}>
            <Button
                title="Take a Snap"
                onPress={() => navigation.navigate('Snap')}
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/lv.jpg')}
                    />
                    <Text style={styles.name}>Snappy</Text>
                    <View style={styles.setting}>
                        <View style={styles.settingContainer}>
                            <Image
                                style={styles.settingIcon}
                                source={require('../assets/setting.png')}
                            />
                        </View>
                        <View style={styles.dialogContainer}>
                            <Image
                                style={styles.newTchat}
                                source={require('../assets/dialog.png')}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.allDialog}>
                    <View style={styles.oneDialog}>
                        <View style={styles.principal}>
                            <FlatList
                                data={users}
                                renderItem={({ item }) => <Text style={styles.friend}>{item.email}</Text>}
                            />
                            <View style={styles.reception}>
                                <Image
                                    style={styles.triangle}
                                    source={require('../assets/triangle.png')}
                                />
                                <Text style={styles.message}>Reçu il y a </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: '#353535',
        width: vw(100),
        // position: 'fixed',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        zIndex: 1000
    },
    logo: {
        width: vw(14),
        height: vw(14),
        borderRadius: 50,
        margin: 30
    },
    name: {
        color: '#ffc900',
        marginTop: 38,
        fontSize: vw(8),
        fontWeight: 'bold',
        width: vw(50),
        marginLeft: vw(7)
    },
    settingContainer: {
        // position: 'absolute',
        top: vh(1.5),
        left: '100%',
        width: vw(10),
        height: vw(10),
        borderRadius: 50,
        backgroundColor: 'white',
        padding: 6,
        justifyContent: 'center'
    },
    settingIcon: {
        width: vw(7),
        height: vw(7),
    },
    dialogContainer: {
        // position: 'absolute',
        top: vh(10),
        left: '100%',
        width: vw(8),
        height: vw(8),
        borderRadius: 50,
        backgroundColor: '#ffc900',
        justifyContent: 'center',
        padding: 3
    },
    newTchat: {
        width: vw(6.5),
        height: vw(6.5),
    },
    allDialog: {
        // overflow: scroll,
        marginTop: vw(30)
    },
    oneDialog: {
        backgroundColor: '#909090',
        width: vw(100),
        display: 'flex',
        flexDirection: 'row',
        margin: 2,
    },
    friend: {
        color: '#353535',
        marginTop: 25,
        fontSize: vw(6),
        fontWeight: 'bold',
        width: vw(50),
        marginLeft: vw(3)
    },
    reception: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
    },
    triangle: {
        marginTop: vh(1),
        marginLeft: vw(4),
        width: vw(3),
        height: vw(3),
        transform: [{ rotate: "90deg" }]
    },
    message: {
        marginTop: vh(1),
        marginLeft: 25,
        fontStyle: 'italic',
        color: '#ffc900',
    }

});


