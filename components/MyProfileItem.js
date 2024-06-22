import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY, WHITE } from "../assets/styles";

const ProfileItem = ({
    name,
    surname,
    university,
    age,
    gender,
    bio,
    location,
}) => (
    <View style={styles.containerProfileItem}>

        <Text style={styles.name}>{name} {surname}</Text>

        <View style={styles.info}>
            <Text style={styles.iconProfile}>
                <Icon name="school" size={12} color={DARK_GRAY} />
            </Text>
            <Text style={styles.infoContent}>{university}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.iconProfile}>
                <Icon name="location" size={12} color={DARK_GRAY} />
            </Text>
            <Text style={styles.infoContent}>{location}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.iconProfile}>
                <Icon name="person" size={12} color={DARK_GRAY} />
            </Text>
            <Text style={styles.infoContent}>{bio}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.iconProfile}>
                <Icon name="arrow-forward-outline" size={12} color={DARK_GRAY} />
            </Text>
            <Text style={styles.infoContent}>{age}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.iconProfile}>
                <Icon name="md-transgender" size={12} color={DARK_GRAY} />
            </Text>
            <Text style={styles.infoContent}>{gender}</Text>
        </View>

    </View>
);

export default ProfileItem;
