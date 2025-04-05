import { ThemedView } from "@/components/common/ThemedView";
import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import {
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { io, Socket } from "socket.io-client";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

type MessageStatus = "sent" | "delivered" | "read";
type Message = {
    message_id: number;
    conversation_id: number;
    sender_id: number;
    content: string;
    status: MessageStatus;
    created_at: string;
};

export type Conversation = {
    conversation_id: number;
    customer_id: number;
    name: string;
    last_message: string | null;
    last_message_time: string;
};

export type NewMessageFromAdmin = {
    conversation: Conversation;
    message: Message;
};

// console.log("chatId = " + user?.user_id);

const { width } = Dimensions.get('window');

const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // Nếu là tin nhắn trong ngày hôm nay, chỉ hiện giờ:phút
    if (date.toDateString() === now.toDateString()) {
        return format(date, 'HH:mm');
    }

    // Nếu là tin nhắn trong năm nay, hiện ngày/tháng và giờ:phút
    if (date.getFullYear() === now.getFullYear()) {
        return format(date, 'dd/MM HH:mm');
    }

    // Nếu là tin nhắn năm trước, hiện đầy đủ ngày/tháng/năm và giờ:phút
    return format(date, 'dd/MM/yyyy HH:mm');
};

const ChatScreen = () => {
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const scrollViewRef = useRef<ScrollView>(null);
    const { user } = useGlobalState();
    const socketRef = useRef<Socket>();

    // Memoize socket connection options
    const socketOptions = useMemo(() => ({
        query: { userId: user?.user_id, userRole: "user" }
    }), [user?.user_id]);

    // Memoize event handlers
    const onConnectionError = useCallback((error: any) => {
        console.log(error);
        alert("Lỗi khi khởi tạo ứng dụng chat.");
    }, []);

    const onNewMessageFromAdmin = useCallback((data: NewMessageFromAdmin) => {
        console.log("dataMessage = " + JSON.stringify(data.message));

        setMessageList(prev => [...prev, data.message]);
    }, []);

    // Initialize socket connection
    useEffect(() => {
        socketRef.current = io(BASE_URL, socketOptions);

        const socket = socketRef.current;

        socket.on("connect_error", onConnectionError);
        socket.on("new-message-from-admin", onNewMessageFromAdmin);

        return () => {
            socket.off("connect_error", onConnectionError);
            socket.off("new-message-from-admin", onNewMessageFromAdmin);
            socket.disconnect();
        };
    }, [socketOptions, onConnectionError, onNewMessageFromAdmin]);

    const handleSendMessage = useCallback(() => {
        if (!message.trim() || !socketRef.current) return;

        socketRef.current.emit("send-message-to-admin", {
            message: message,
            date: new Date().toString(),
        });

        setMessageList(prev => [
            ...prev,
            {
                conversation_id: 0,
                message_id: 0,
                sender_id: user!.user_id,
                content: message,
                status: "sent",
                created_at: new Date().toString(),
            },
        ]);
        setMessage("");
    }, [message, user?.user_id]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <View style={styles.chatContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.messageList}
                        contentContainerStyle={styles.messageListContent}
                        onContentSizeChange={() => {
                            scrollViewRef.current?.scrollToEnd({ animated: true });
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {messageList.map((item, index) => {
                            const isUserMessage = item.sender_id === user?.user_id;
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.messageWrapper,
                                        isUserMessage ? styles.rightMessage : styles.leftMessage
                                    ]}
                                >
                                    <View style={styles.messageContainer}>
                                        <View
                                            style={[
                                                styles.message,
                                                isUserMessage ? styles.userMessage : styles.adminMessage
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.messageText,
                                                    isUserMessage ? styles.userMessageText : styles.adminMessageText
                                                ]}
                                            >
                                                {item.content}
                                            </Text>
                                        </View>
                                        <Text style={[
                                            styles.timeText,
                                            isUserMessage ? styles.timeTextRight : styles.timeTextLeft
                                        ]}>
                                            {formatMessageTime(item.created_at)}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Nhập tin nhắn..."
                            placeholderTextColor="#666"
                            multiline
                            maxLength={1000}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={handleSendMessage}
                            disabled={!message.trim()}
                        >
                            <ThemedView style={[
                                styles.sendButtonInner,
                                !message.trim() && styles.sendButtonDisabled
                            ]}>
                                <MaterialIcons
                                    name="send"
                                    size={24}
                                    color={message.trim() ? "#000" : "#666"}
                                />
                            </ThemedView>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    messageList: {
        flex: 1,
    },
    messageListContent: {
        padding: 16,
        paddingBottom: 32,
    },
    messageWrapper: {
        marginVertical: 4,
        maxWidth: '75%',
    },
    messageContainer: {
        flexDirection: 'column',
    },
    leftMessage: {
        alignSelf: 'flex-start',
    },
    rightMessage: {
        alignSelf: 'flex-end',
    },
    message: {
        padding: 12,
        borderRadius: 16,
        marginBottom: 4,
    },
    userMessage: {
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 4,
        marginLeft: 'auto',
    },
    adminMessage: {
        backgroundColor: '#E8E8E8',
        borderBottomLeftRadius: 4,
        marginRight: 'auto',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#FFFFFF',
    },
    adminMessageText: {
        color: '#000000',
    },
    timeText: {
        fontSize: 12,
        color: '#666666',
        marginTop: 2,
    },
    timeTextRight: {
        textAlign: 'right',
        marginLeft: 'auto',
    },
    timeTextLeft: {
        textAlign: 'left',
        marginRight: 'auto',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
    },
    input: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        fontSize: 16,
        maxHeight: 100,
        minHeight: 40,
    },
    sendButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonInner: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
});

export default ChatScreen;
