import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window'); // for screen dimension so height should remain static
const HEADER_HEIGHT = 60;
const INPUT_CONTAINER_HEIGHT = 68;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  time: string;
}

function TypingLoader() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const createAnimation = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ])
      );
    };

    const anim1 = createAnimation(dot1, 0);
    const anim2 = createAnimation(dot2, 150);
    const anim3 = createAnimation(dot3, 300);

    Animated.parallel([anim1, anim2, anim3]).start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <View style={[styles.messageRow, styles.aiRow]}>
      <View style={styles.inlineAiAvatar}>
        <Ionicons name="sparkles" size={12} color="#ffffff" />
      </View>
      <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
        <Animated.View style={[styles.dot, { opacity: dot1 }]} />
        <Animated.View style={[styles.dot, { opacity: dot2 }]} />
        <Animated.View style={[styles.dot, { opacity: dot3 }]} />
      </View>
    </View>
  );
}

export default function MetaAiScreen() {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am Meta AI. Think of me like a super-smart assistant who is always ready to help you learn, plan, write, and create code. How can I help you today? ✨',
      sender: 'ai',
      time: '3:15 PM',
    },
  ]);

  const scrollToBottom = () => {
    if (messages.length > 0 || isTyping) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 80);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${userMessage.text}". I'm fine-tuning my modules to process this seamlessly! Please let me know if you need code generation assistance or logical breakdown. 🚀`,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} 
      >
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111B21" />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <View style={styles.aiAvatarCircle}>
              <Ionicons name="sparkles" size={16} color="#ffffff" />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.headerTitle}>Meta AI</Text>
              <Text style={styles.headerSubtitle}>
                {isTyping ? 'typing...' : 'with Llama 3'}
              </Text>
            </View>
          </View>

          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.headerIconTouch}>
              <Ionicons name="videocam-outline" size={24} color="#111B21" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconTouch}>
              <Ionicons name="ellipsis-vertical" size={22} color="#111B21" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContentContainer}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            ListFooterComponent={isTyping ? <TypingLoader /> : null}
            renderItem={({ item }) => {
              const isUser = item.sender === 'user';
              return (
                <View style={[styles.messageRow, isUser ? styles.userRow : styles.aiRow]}>
                  {!isUser && (
                    <View style={styles.inlineAiAvatar}>
                      <Ionicons name="sparkles" size={12} color="#ffffff" />
                    </View>
                  )}
                  <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
                    <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>
                      {item.text}
                    </Text>
                    <Text style={[styles.timeText, isUser ? styles.userTime : styles.aiTime]}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputCard}>
            <TouchableOpacity style={styles.attachmentButton}>
              <Ionicons name="happy-outline" size={24} color="#667781" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.textInputStyle}
              placeholder="Ask Meta AI anything..."
              placeholderTextColor="#96A6AF"
              multiline
              value={inputText}
              onChangeText={setInputText}
              onFocus={scrollToBottom}
            />

            <TouchableOpacity style={styles.attachmentButton}>
              <Ionicons name="attach-outline" size={24} color="#667781" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.sendActionCircle}
            activeOpacity={0.8}
            onPress={handleSendMessage}
          >
            <Ionicons 
              name={inputText.trim() ? 'send' : 'mic'} 
              size={20} 
              color="#ffffff" 
              style={inputText.trim() ? { marginLeft: 3 } : null}
            />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  aiAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A855F7', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#667781',
    marginTop: -2,
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconTouch: {
    padding: 6,
    marginLeft: 10,
  },
  chatContainer: {
    height: SCREEN_HEIGHT - HEADER_HEIGHT - INPUT_CONTAINER_HEIGHT - 40,
    width: '100%',
  },
  chatContentContainer: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-end',
    width: '100%', 
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  inlineAiAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 2,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxWidth: '80%', 
    flexDirection: 'column', 
  },
  userBubble: {
    backgroundColor: '#D9FDD3', 
    borderBottomRightRadius: 2,
  },
  aiBubble: {
    backgroundColor: '#ffffff', 
    borderBottomLeftRadius: 2,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingHorizontal: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#A855F7',
    marginHorizontal: 2.5,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
    color: '#111B21',
    flexWrap: 'wrap', 
  },
  userText: {
    color: '#111B21',
  },
  aiText: {
    color: '#111B21',
  },
  timeText: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    alignSelf: 'flex-end',
    marginTop: 4,
    minWidth: 45,
    textAlign: 'right',
  },
  userTime: {
    color: '#667781',
  },
  aiTime: {
    color: '#8696A0',
    },
  
  inputContainer: {
    height: INPUT_CONTAINER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F7F8FA', 
    alignItems: 'center',
    width: '100%',
  },
  inputCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ededed',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 8,
    height: 48,
  },
  attachmentButton: {
    padding: 6,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#111B21',
    paddingVertical: 0, 
    paddingHorizontal: 6,
    textAlignVertical: 'center',
  },
  sendActionCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});