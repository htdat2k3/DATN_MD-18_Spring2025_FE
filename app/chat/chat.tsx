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
    ActivityIndicator,
    RefreshControl,
    Keyboard,
} from "react-native";
import { io, Socket } from "socket.io-client";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from 'date-fns';
import axios from "axios";

type MessageStatus = "sent" | "delivered" | "read";

interface Message {
    message_id: number;
    conversation_id: number;
    sender_id: number;
    content: string;
    status: MessageStatus;
    created_at: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ChatResponse {
    success: boolean;
    message: string;
    data: {
        messages: Message[];
        pagination: PaginationData;
    };
}

const MESSAGES_PER_PAGE = 20;
const { width } = Dimensions.get('window');

const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        return format(date, 'HH:mm');
    }
    if (date.getFullYear() === now.getFullYear()) {
        return format(date, 'dd/MM HH:mm');
    }
    return format(date, 'dd/MM/yyyy HH:mm');
};

const ChatScreen = () => {
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const scrollViewRef = useRef<ScrollView>(null);
    const { user } = useGlobalState();
    const socketRef = useRef<Socket>();

    const fetchChatHistory = useCallback(async (pageNumber: number, isLoadMore = false) => {
        if (!user?.user_id) return;

        try {
            isLoadMore ? setIsLoadingMore(true) : setIsLoading(true);

            const response = await axios.get<ChatResponse>(
                `${BASE_URL}chat/history-paginated/${user.user_id}?page=${pageNumber}&limit=${MESSAGES_PER_PAGE}`
            );

            if (response.data?.success) {
                const { messages, pagination } = response.data.data;
                setMessageList(prev => isLoadMore ? [...prev, ...messages] : messages);
                setHasMore(pagination.page < pagination.totalPages);
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
            alert("Không thể tải lịch sử tin nhắn");
        } finally {
            setIsLoadingMore(false);
            setIsLoading(false);
            setRefreshing(false);
        }
    }, [user?.user_id]);

    useEffect(() => {
        fetchChatHistory(1);
    }, [fetchChatHistory]);

    const loadMoreMessages = useCallback(() => {
        if (isLoadingMore || !hasMore) return;
        setPage(prev => {
            const nextPage = prev + 1;
            fetchChatHistory(nextPage, true);
            return nextPage;
        });
    }, [isLoadingMore, hasMore, fetchChatHistory]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        fetchChatHistory(1);
    }, [fetchChatHistory]);

    const socketOptions = useMemo(() => ({
        query: { userId: user?.user_id, userRole: "user" }
    }), [user?.user_id]);

    useEffect(() => {
        socketRef.current = io(BASE_URL, socketOptions);
        const socket = socketRef.current;

        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            alert("Lỗi kết nối chat");
        });

        socket.on("new-message-from-admin", (data: { message: Message }) => {
            setMessageList(prev => [...prev, data.message]);
            scrollViewRef.current?.scrollToEnd({ animated: true });
        });

        return () => {
            socket.disconnect();
        };
    }, [socketOptions]);

    const handleSendMessage = useCallback(async () => {
        if (!message.trim() || !socketRef.current || !user?.user_id) return;

        try {
            const cloneMessage = {
                user_id: user.user_id,
                content: message,
                sender_id: user.user_id,
                created_at: new Date().toISOString()
            };

            const newMessage = {
                user_id: user.user_id,
                message: message,
                sender_id: user.user_id,
                date: new Date().toISOString()

            };


            socketRef.current.emit("send-message-to-admin", newMessage);

            //const response = await axios.post(`${BASE_URL}chat/send`, newMessage);

            //  if (response.data?.success) {
            setMessageList(prev => [...prev, cloneMessage]);
            setMessage("");
            scrollViewRef.current?.scrollToEnd({ animated: true });
            // }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Không thể gửi tin nhắn");
        }
    }, [message, user?.user_id]);

    const renderMessage = useCallback((item: Message, index: number) => (
        <View
            key={index}
            style={[
                styles.messageWrapper,
                item.sender_id === user?.user_id ? styles.rightMessage : styles.leftMessage
            ]}
        >
            <View style={styles.messageContainer}>
                <View
                    style={[
                        styles.message,
                        item.sender_id === user?.user_id ? styles.userMessage : styles.adminMessage
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            item.sender_id === user?.user_id ? styles.userMessageText : styles.adminMessageText
                        ]}
                    >
                        {item.content}
                    </Text>
                </View>
                <Text
                    style={[
                        styles.timeText,
                        item.sender_id === user?.user_id ? styles.timeTextRight : styles.timeTextLeft
                    ]}
                >
                    {formatMessageTime(item.created_at)}
                </Text>
            </View>
        </View>
    ), [user?.user_id]);
    const [keyboardHeight, setKeyboardHeight] = useState(31);

    // Thêm keyboard listeners
    useEffect(() => {
        const keyboardWillShow = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height / 2 - 100);
            }
        );

        const keyboardWillHide = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardWillShow.remove();
            keyboardWillHide.remove();
        };
    }, []);

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <View style={[styles.chatContainer, { paddingBottom: Platform.OS === 'android' ? 0 : 0 }]}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Đang tải tin nhắn...</Text>
                    </View>
                ) : (
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.messageList}
                        contentContainerStyle={styles.messageListContent}
                        onContentSizeChange={() => {
                            if (!isLoadingMore) {
                                scrollViewRef.current?.scrollToEnd({ animated: true });
                            }
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        onScroll={({ nativeEvent }) => {
                            if (nativeEvent.contentOffset.y === 0 && hasMore) {
                                loadMoreMessages();
                            }
                        }}
                        keyboardShouldPersistTaps="handled"
                        scrollEventThrottle={300}
                    >
                        {isLoadingMore && (
                            <View style={styles.loadingMoreContainer}>
                                <ActivityIndicator size="small" color="#007AFF" />
                                <Text style={styles.loadingMoreText}>
                                    Đang tải thêm tin nhắn...
                                </Text>
                            </View>
                        )}
                        {messageList.map(renderMessage)}
                    </ScrollView>
                )}

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
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
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
        padding: 32,
        marginBottom: 30,
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

    loadingMoreContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    loadingMoreText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    messageListContent: {
        padding: 16,
        paddingBottom: 32,
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
});

export default ChatScreen;
