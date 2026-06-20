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
  Dimensions,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 60;
const INPUT_CONTAINER_HEIGHT = 68;

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

// Sub-Component for a realistic smooth pulsating typing dot animation
function TypingDot({ delay }: { delay: number }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -6,
          duration: 300,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.dot, { transform: [{ translateY: animatedValue }] }]} />
  );
}

export default function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();

  const { name = 'Ali Hamza', avatar } = route.params || {};

  const getInitials = (userName: string) => {
    return userName ? userName.charAt(0).toUpperCase() : 'U';
  };

  const [inputText, setInputText] = useState('');
  const [userStatus, setUserStatus] = useState<'online' | 'typing...'>('online');
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Assalam-o-Alaikum! Kia chal raha ha project ka?`,
      sender: 'other',
      time: '3:15 PM',
    },
    {
      id: '2',
      text: 'Walaikum Assalam, chal raha ha bas frontend complete kar raha hoon React Native pe.',
      sender: 'me',
      time: '3:17 PM',
      status: 'read',
    },
  ]);

  const autoReplies = [
    "Sahi zabardast yaar! Code deploy kab karna ha?",
    "Perfect! Final year project (FYP) ke hisab se ye layout best chal raha ha.",
    "Haan, design kafi clean ha. Text field ab rigid ho gayi ha keyboard ke sath.",
    "Bhai, thoda breaks bhi le liya karo, har waqt coding hi chalti rehti ha!",
    "Chalo shukur ha layout issue hal ho gaya, ab baqi routes wire-up karo.",
    "MERN stack backend pe controllers ban gaye hain ya abhi tak sirf setup hi ha?",
    "Hahaha sahi baat ha, debugging me time ka pata hi nahi chalta.",
    "Backend api testing Postman se kar li ha na check properly?",
    "Sunno, design responsive rakhna taaki choti screens par text crash na kare.",
    "Zabardast! Kal uni me milte hain phir baqi screens live verify karte hain.",
    "Walaikum Assalam bhai, node modules delete kar ke dobara npm install karo issue hal ho jaye ga."
  ];
  const scrollToBottom = () => {
    if (messages.length > 0 || isPeerTyping) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 80);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPeerTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentInput = inputText.trim();
    
    const myNewMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: 'me',
      time: currentTime,
      status: 'sent',
    };

    setMessages((prev) => [...prev, myNewMessage]);
    setInputText('');

    setTimeout(() => {
      setMessages((currentMessages) =>
        currentMessages.map((msg) =>
          msg.id === myNewMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setUserStatus('typing...');
      setIsPeerTyping(true); 

      setTimeout(() => {
        const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

        const peerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: randomReply,
          sender: 'other',
          time: responseTime,
        };

        setMessages((prev) => [...prev, peerResponse]);
        setUserStatus('online');
        setIsPeerTyping(false); 
      }, 2500);

    }, 1500); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} 
      >
        {/* Custom Header Layout */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#111B21" />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <View style={styles.userAvatarCircle}>
              <Text style={styles.avatarText}>{getInitials(name)}</Text>
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.headerTitle} numberOfLines={1}>{name}</Text>
              <Text style={[
                styles.headerSubtitle, 
                userStatus === 'typing...' ? styles.typingActiveColor : styles.onlineActiveColor
              ]}>
                {userStatus}
              </Text>
            </View>
          </View>

          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.headerIconTouch}>
              <Ionicons name="videocam-outline" size={24} color="#111B21" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconTouch}>
              <Ionicons name="call-outline" size={22} color="#111B21" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconTouch} onPress={() => setDropdownVisible(true)}>
              <Ionicons name="ellipsis-vertical" size={22} color="#111B21" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Three Dots Dropdown Modal Context Menu */}
        <Modal
          visible={dropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
            <View style={styles.dropdownOverlay}>
              <View style={styles.dropdownBox}>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => setDropdownVisible(false)}>
                  <Text style={styles.dropdownText}>View contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => setDropdownVisible(false)}>
                  <Text style={styles.dropdownText}>Media, links, and docs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => setDropdownVisible(false)}>
                  <Text style={styles.dropdownText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => setDropdownVisible(false)}>
                  <Text style={styles.dropdownText}>Mute notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => setDropdownVisible(false)}>
                  <Text style={styles.dropdownText}>Clear chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Main Viewport Content Thread */}
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContentContainer}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            renderItem={({ item }) => {
              const isMe = item.sender === 'me';
              return (
                <View style={[styles.messageRow, isMe ? styles.myRow : styles.otherRow]}>
                  <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                    
                    <View style={styles.metaDataContainer}>
                      <Text style={styles.timeText}>{item.time}</Text>
                      {isMe && (
                        <MaterialCommunityIcons 
                          name={item.status === 'read' ? "checkmark-all" : "checkmark"} 
                          size={16} 
                          color={item.status === 'read' ? "#53bdeb" : "#8696a0"} 
                          style={styles.tickIcon}
                        />
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={
              isPeerTyping ? (
                <View style={[styles.messageRow, styles.otherRow]}>
                  <View style={[styles.bubble, styles.otherBubble, styles.typingBubbleLayout]}>
                    <TypingDot delay={0} />
                    <TypingDot delay={150} />
                    <TypingDot delay={300} />
                  </View>
                </View>
              ) : null
            }
          />
        </View>

        {/* Messaging Bottom Control Toolbar Section */}
        <View style={styles.inputContainer}>
          <View style={styles.inputCard}>
            <TouchableOpacity style={styles.attachmentButton}>
              <Ionicons name="happy-outline" size={24} color="#667781" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.textInputStyle}
              placeholder="Message..."
              placeholderTextColor="#96A6AF"
              multiline
              value={inputText}
              onChangeText={setInputText}
              onFocus={scrollToBottom}
            />

            <TouchableOpacity style={styles.attachmentButton}>
              <Ionicons name="attach-outline" size={24} color="#667781" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentButton}>
              <Ionicons name="camera-outline" size={24} color="#667781" />
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
    backgroundColor: '#efeae2',
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
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  userAvatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#00a884',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  titleWrapper: {
    marginLeft: 10,
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginTop: -3,
  },
  onlineActiveColor: {
    color: '#25D366',
  },
  typingActiveColor: {
    color: '#00a884',
    fontFamily: 'Poppins_600SemiBold',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconTouch: {
    padding: 6,
    marginLeft: 6,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownBox: {
    position: 'absolute',
    top: 50,
    right: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 6,
    width: 190,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 14.5,
    color: '#111B21',
    fontFamily: 'Poppins_400Regular',
  },
  chatContainer: {
    height: SCREEN_HEIGHT - HEADER_HEIGHT - INPUT_CONTAINER_HEIGHT - 40,
    width: '100%',
  },
  chatContentContainer: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
    width: '100%', 
  },
  myRow: {
    justifyContent: 'flex-end',
  },
  otherRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    maxWidth: '85%',
    elevation: 1,
  },
  myBubble: {
    backgroundColor: '#D9FDD3',
    borderTopRightRadius: 2,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 2,
  },
  typingBubbleLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 35,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#8696a0',
    marginHorizontal: 2.5,
  },
  messageText: {
    fontSize: 14.5,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
    color: '#111B21',
  },
  metaDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 2,
    marginLeft: 12,
  },
  timeText: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#667781',
  },
  tickIcon: {
    marginLeft: 4,
    bottom: -1,
  },
  inputContainer: {
    height: INPUT_CONTAINER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  inputCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 8,
    marginRight: 6,
    height: 48,
    elevation: 1,
  },
  attachmentButton: {
    padding: 4,
    marginHorizontal: 1,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 15.5,
    fontFamily: 'Poppins_400Regular',
    color: '#111B21',
    paddingVertical: 0, 
    paddingHorizontal: 4,
  },
  sendActionCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00a884',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});