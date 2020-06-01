import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { register, login } from "../services/auth"
import { storeData, getData } from "../services/localStorage";

export default function Auth({ navigation }) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState("");
    const [err, setErr] = useState("");

    const handleRegister = async (event) => {
        try {
            const reg = await register(email, password);
            console.log(reg)
            handleLogin()
        } catch (e) {
            console.log(e.response.data.data)
            setErr(e.response.data.data);
        }
        // register(email, password).then(data => console.log(data)).then(handleLogin()).catch(err => console.error(err));
    }
    const handleLogin = async (event) => {
        try {
            const log = await login(email, password);
            console.log(log)
            storeData(log.data.data.token);
            navigation.navigate('Home');
        } catch (e) {
            console.log(e.response.data.data)
            setError(e.response.data.data);
        }
    }
    const handleEmailChange = (value) => {
        setEmail(value);
        console.log("mail " + email)
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
        console.log("pass " + password)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bar}></View>
            <View style={styles.header}>
                <Text style={styles.title}>SNAPPY</Text>
            </View>

            <View style={styles.topContainer}>
                <View>
                    <TextInput style={styles.input} placeholder='EMAIL' onChangeText={handleEmailChange} />
                    <TextInput secureTextEntry={true} style={styles.input} placeholder='PASSWORD' onChangeText={handlePasswordChange} />
                    <Text style={styles.agree}> By logging in you accepts the terms of nudes</Text>
                </View>
                {error != "" && <Text style={styles.error}>{error}</Text>}
                {err != "" && <Text style={styles.error}>{err}</Text>}
                <View style={styles.buttons}>
                    <Button style={styles.register} title="REGISTER" buttonStyle={{ backgroundColor: '#ffd800', borderRadius: 15, padding: 10 }} titleStyle={{ color: '#000', fontSize: 14 }} onPress={handleRegister} />
                    <Button style={styles.login} title="LOGIN" buttonStyle={{ backgroundColor: '#151515', borderRadius: 15, padding: 10 }} titleStyle={{ color: '#FFF', fontSize: 14 }} onPress={handleLogin} />
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    header: {
        backgroundColor: '#353535',
        width: '100vw',
        position: 'absolute',
        top: 0
    },
    title: {
        marginTop: 100,
        marginBottom: 100,
        color: '#bdbdbd',
        fontWeight: 'bold',
        fontSize: '14vw',
        width: '100%',
        textAlign: 'center',
        color: '#F7F7F7'
    },
    topContainer: {
        marginTop: '50%',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#555555',
        color: '#121212',
        marginTop: 25,
        padding: 15,
        width: '100%',
        height: 40,
        borderRadius: 20
    },
    buttons: {
        position: 'relative',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center'
    },
    register: {
        width: '25vw',
        marginRight: '20px'
    },
    login: {
        width: '25vw'
    },
    agree: {
        color: '#808080',
        marginTop: 15,
        fontSize: 10,
        textAlign: 'center'
    },
    bar: {
        display: 'flex',
        width: '12px',
        height: '100%',
        backgroundColor: '#ffd800',
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        top: 0
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
