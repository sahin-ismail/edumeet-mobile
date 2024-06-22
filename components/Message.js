import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../assets/styles";

const Message = ({ image, lastMessage, name }) => (
  <View style={styles.containerMessage}>
    <Image source={image} style={styles.avatar} />
    <View>
      <Text>{name}</Text>
      <Text style={styles.message}>{lastMessage}</Text>
    </View>
  </View>
);

export default Message;
