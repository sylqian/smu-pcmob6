import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { lightStyles, darkStyles, commonStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_CREATE, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";

export default function EditScreen({ navigation, route }) {
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const post = route.params.post
    console.log(post)

    setTitle(post.title)
    setContent(post.content)
    setId(post.id)
  
    return () => {
    
    }
  }, [])
  
  async function editPost() {
    const post = {
      title: title,
      content: content,
    };

    try {
      console.log(token);
      const response = await axios.put(API + API_POSTS+'/'+id, post, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      navigation.navigate("Index", { post: post });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <Text style={[additionalStyles.label, styles.text]}>Enter Date</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>
          Enter Note
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={editPost}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },
});
