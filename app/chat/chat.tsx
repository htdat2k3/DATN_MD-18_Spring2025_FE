import React, { useState, useEffect, useRef } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    View,
    Button,
    StyleSheet,
    FlatList,
    Text,
} from 'react-native';
import { io, Socket } from 'socket.io-client';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BASE_URL } from '@/constants/Colors';

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(BASE_URL, { query: { userId: 4 } });

        socketRef.current.on("connect-error", (err) => {
            console.log("Đã xảy ra lỗi khi khởi tạo ứng dụng chat.");
        });

        socketRef.current.on("new-message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the socket connection
        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        }
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            if (socketRef.current) socketRef.current.emit("send-message", message);
            setMessage('');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='position'
        >
            <KeyboardAwareScrollView
                contentContainerStyle={styles.chatContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Chat Messages */}
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>{item}</Text>
                        </View>
                    )}
                />

                {/* Input Section */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type your message"
                        value={message}
                        onChangeText={setMessage}
                        onSubmitEditing={sendMessage}
                    />
                    <Button title="Send" onPress={sendMessage} />
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },
    messageBubble: {
        backgroundColor: '#007bff',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 10,
    },
});

export default ChatApp;
