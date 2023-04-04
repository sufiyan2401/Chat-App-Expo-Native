import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      if (querySnapshot) {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      }
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat?.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  console.log(...messages);
  console.log(messages, "checking");
  //  console.log(onSend(messages))
  if (messages.length == 0) {
    console.log("wait");
    return (
      <>
        <ActivityIndicator size="large" color="#00ff00" />
      </>
    );
  } else {
    console.log("agaya");

    return (
      <>
        <GiftedChat
          messages={messages}
          renderUsernameOnMessage={true}
          isTyping={true}
          // renderBubble={true}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={(messages) => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: "#fff",
          }}
          textInputStyle={{
            backgroundColor: "#fff",
            borderRadius: 0,
          }}
          user={{
            _id: auth?.currentUser?.email,
            name: auth?.currentUser?.email,
            avatar: "https://i.pravatar.cc/300",
          }}
        />
      </>
    );
  }
}

//       // <>
//       //   {messages.map(message => (
//       //     <Text key={message._id}>{message.text}</Text>
//       //   ))}
//       // </>
