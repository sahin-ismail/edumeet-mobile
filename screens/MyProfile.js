import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Modal,
    Pressable
} from "react-native";
import { Icon, MyProfileItem } from "../components";
import DEMO from "../assets/data/demo";
import styles, { WHITE } from "../assets/styles";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import IMAGE_00 from "../assets/images/00.png";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase'
// import * as ImagePicker from "react-native-image-picker"


const MyProfile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [university, setUniversity] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(IMAGE_00);

    const [modalVisible, setModalVisible] = useState(false);

    UploadPhoto = () => {
        console.log("photo upload");
        // let options = {
        //     title: 'Select Image',
        //     customButtons: [
        //         { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        //     ],
        //     storageOptions: {
        //         skipBackup: true,
        //         path: 'images',
        //     },
        // };

        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //         const source = { uri: response.uri };

        //         this.setState({
        //             filePath: response,
        //             fileData: response.data,
        //             fileUri: response.uri
        //         });
        //     }
        // });
    }

    useEffect(async () => {
        const email = await SecureStore.getItemAsync('email');
        const uid = await SecureStore.getItemAsync('uid');
        //const token = await SecureStore.getItemAsync('idToken');
        let url = "http://edumeet-server.herokuapp.com/usr/user/" + email;

        const config =
        {
            headers: {
                Authorization: "Edumeet edumeet"
            }
        }

        await axios.get(url, config).then((res) => {
            if (res.data.status === "error") {
                throw res.data.message;
            }
            setName(res.data.data[0].name == (null || undefined) ? '' : res.data.data[0].name);
            setSurname(res.data.data[0].surname == (null || undefined) ? '' : res.data.data[0].surname);
            setUniversity(res.data.data[0].university);
            setLocation(res.data.data[0].location == (null || undefined) ? '' : res.data.data[0].location);
            setBio(res.data.data[0].bio == (null || undefined) ? '' : res.data.data[0].bio);
            setAge(res.data.data[0].age == (null || undefined) ? '' : res.data.data[0].age);
            setGender(res.data.data[0].gender == (null || undefined) ? '' : res.data.data[0].gender);
        })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                alert(err);
            });

        url = "http://edumeet-server.herokuapp.com/img/getimage/" + uid;

        await axios.get(url, config).then((res) => {
            if (res.data.status === "error") {
                throw res.data.message;
            }
            console.log(res.data.data);
            setImage({ uri: "http://edumeet-server.herokuapp.com/" + res.data.data });

        })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                alert(err);
            });

    }, [])

    return (
        <ImageBackground
            source={require("../assets/images/bg.png")}
            style={styles.bg}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalTop}>
                        <TouchableOpacity>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Icon
                                name="arrow-back"
                                size={20}
                                style={styles.topIconRight}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <Pressable style={styles.modalItems}>
                            <Text style={styles.modalText} onPress={() => {
                                this.UploadPhoto();
                            }}>Upload Profile Photo</Text>
                        </Pressable>
                        <Pressable style={styles.modalItems}>
                            <Text style={styles.modalText}>Edit Profile</Text>
                        </Pressable>
                        <Pressable style={styles.modalItems}>
                            <Text style={styles.modalText}>Settings</Text>
                        </Pressable>
                        <Pressable style={styles.modalItems} onPress={async () => {
                            try {
                                await signOut(auth);
                                await SecureStore.setItemAsync('idToken', '');
                                await SecureStore.setItemAsync('email', '');
                                await SecureStore.setItemAsync('uid', '');

                            }
                            catch (e) {
                                alert(e);
                            }
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            })
                        }
                        }>
                            <Text style={styles.modalText}>Logout</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.containerProfile}>
                <ImageBackground source={image} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Icon
                                name="ellipsis-vertical"
                                size={20}
                                color={WHITE}
                                style={styles.topIconRight}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <MyProfileItem
                    name={name}
                    surname={surname}
                    university={university}
                    location={location}
                    bio={bio}
                    age={age}
                    gender={gender}
                />

            </ScrollView>
        </ImageBackground >
    );
};

export default MyProfile;
