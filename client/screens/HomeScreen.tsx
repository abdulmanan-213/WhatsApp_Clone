import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import AddContactModalScreen from './AddContactModelScreen';

const chats = [
  { id: '1', name: 'Danial', message: 'Physics chap 1.docx', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=11', unread: 0 },
  { id: '2', name: 'Elexa', message: 'Yes', time: '10:56 AM', avatar: 'https://i.pravatar.cc/150?img=26', unread: 2 },
  { id: '3', name: 'Batch F23-SE', message: '~Affan UI Abidin', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=3', unread: 0 },
  { id: '4', name: 'Hassan', message: 'Bro assignment submit karni hai', time: '9:12 AM', avatar: 'https://i.pravatar.cc/150?img=12', unread: 1 },
  { id: '5', name: 'Sara Khan', message: 'Ok done 👍', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=23', unread: 0 },
  { id: '6', name: 'Usman Ali', message: 'Meeting at 5 PM today', time: '8:45 AM', avatar: 'https://i.pravatar.cc/150?img=14', unread: 0 },
  { id: '7', name: 'Project Team', message: 'Design final kar lo guys', time: 'Monday', avatar: 'https://i.pravatar.cc/150?img=57', unread: 3 },
  { id: '8', name: 'Ayesha', message: 'Sent you the file', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=28', unread: 0 },
  { id: '9', name: 'Ali Raza', message: 'Call me when free', time: '7:30 PM', avatar: 'https://i.pravatar.cc/150?img=51', unread: 0 },
  { id: '10', name: 'Class Group', message: 'Quiz postponed to Friday', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=60', unread: 5 },
  { id: '11', name: 'Hamza', message: 'Kal milte hain', time: '11:15 AM', avatar: 'https://i.pravatar.cc/150?img=8', unread: 0 },
  { id: '12', name: 'Zainab', message: 'Check your email', time: 'Today', avatar: 'https://i.pravatar.cc/150?img=30', unread: 1 },
  { id: '13', name: 'Software Lab', message: 'Lab report submit before 6 PM', time: 'Friday', avatar: 'https://i.pravatar.cc/150?img=68', unread: 4 },
  { id: '14', name: 'Bilal', message: 'Where are you?', time: '6:20 PM', avatar: 'https://i.pravatar.cc/150?img=33', unread: 0 },
  { id: '15', name: 'Nimra', message: 'Thanks!', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=32', unread: 0 },
  { id: '16', name: 'Semester Project', message: 'Deadline extended', time: 'Tuesday', avatar: 'https://i.pravatar.cc/150?img=15', unread: 6 },
  { id: '17', name: 'Ahmed Raza', message: 'Presentation bana li?', time: '9:40 AM', avatar: 'https://i.pravatar.cc/150?img=52', unread: 2 },
  { id: '18', name: 'Maha', message: 'I am on the way', time: '4:05 PM', avatar: 'https://i.pravatar.cc/150?img=34', unread: 0 },
  { id: '19', name: 'Faculty Group', message: 'Tomorrow will be off', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=25', unread: 8 },
  { id: '20', name: 'Daniyal', message: 'Send me notes please', time: '1:22 PM', avatar: 'https://i.pravatar.cc/150?img=59', unread: 0 },
  { id: '21', name: 'Hira', message: 'Done with the task', time: '10:10 PM', avatar: 'https://i.pravatar.cc/150?img=35', unread: 1 },
  { id: '22', name: 'CS-101 Group', message: 'Mid papers schedule announced', time: 'Thursday', avatar: 'https://i.pravatar.cc/150?img=10', unread: 7 },
  { id: '23', name: 'Farhan', message: 'Aaj class hai?', time: '8:00 AM', avatar: 'https://i.pravatar.cc/150?img=69', unread: 0 },
  { id: '24', name: 'Iqra', message: 'Please review the document', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=38', unread: 3 },
  { id: '25', name: 'Team Alpha', message: 'Meeting rescheduled to 3 PM', time: 'Sunday', avatar: 'https://i.pravatar.cc/150?img=47', unread: 2 },
  { id: '26', name: 'Saad', message: 'Can you call now?', time: '5:48 PM', avatar: 'https://i.pravatar.cc/150?img=54', unread: 0 },
  { id: '27', name: 'Maryam', message: 'File received', time: 'Monday', avatar: 'https://i.pravatar.cc/150?img=41', unread: 0 },
  { id: '28', name: 'Dev Circle', message: 'Push the latest code to GitHub', time: 'Today', avatar: 'https://i.pravatar.cc/150?img=16', unread: 5 },
  { id: '29', name: 'Taha', message: 'On my way bro', time: '2:35 PM', avatar: 'https://i.pravatar.cc/150?img=61', unread: 0 },
  { id: '30', name: 'Anaya', message: 'See you tomorrow', time: '7:50 PM', avatar: 'https://i.pravatar.cc/150?img=45', unread: 1 },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const navigation = useNavigation<any>();

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuAction = (route?: string) => {
    setMenuVisible(false);
    if (route) {
      navigation.navigate(route);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>WhatsApp</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="camera-outline" size={27} color="#111B21" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add-circle-outline" size={28} color="#111B21" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={25} color="#111B21" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Controlled Dropdown Menu Overlay */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction()}>
                <Ionicons name="person-add-outline" size={20} color="#111B21" style={styles.menuIcon} />
                <Text style={styles.menuText}>New group</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction()}>
                <Ionicons name="star-outline" size={20} color="#111B21" style={styles.menuIcon} />
                <Text style={styles.menuText}>Starred messages</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction()}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#111B21" style={styles.menuIcon} />
                <Text style={styles.menuText}>Select chats</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction()}>
                <Ionicons name="chatbox-ellipses-outline" size={20} color="#111B21" style={styles.menuIcon} />
                <Text style={styles.menuText}>Mark all as read</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction()}>
                <Ionicons name="lock-closed-outline" size={20} color="#111B21" style={styles.menuIcon} />
                <Text style={styles.menuText}>App lock</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction('Settings')}>
                <Ionicons name="settings-outline" size={20} color="#111B21" style={styles.menuIcon} />
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuAction()}>
                <Ionicons name="log-out-outline" size={20} color="#F15C6D" style={styles.menuIcon} />
                <Text style={[styles.menuText, { color: '#F15C6D' }]}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Controlled Input Search Bar Area */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#667781" />
        <TextInput
          placeholder="Search or start a new chat"
          placeholderTextColor="#999"
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#667781" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Chat Category Filters Row */}
      <View style={styles.filterContainer}>
        <Text style={styles.activeChip}>All</Text>
        <Text style={styles.chip}>Unread</Text>
        <Text style={styles.chip}>Favourites</Text>
        <Text style={styles.chip}>Groups</Text>
        <Text style={styles.chip}>+</Text>
      </View>

      {/* Main Chat List Thread */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredChats}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
          </View>
        }
        renderItem={({ item }) => (
          /* 🚀 LINKED: Trigger navigation routing when hitting any conversation index item */
          <TouchableOpacity
            style={styles.chatRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Chat')}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.chatInfo}>
              <View style={styles.topRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.message} numberOfLines={1}>
                  {item.message}
                </Text>

                {item.unread > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Buttons Layout Group */}
      <View style={styles.floatingContainer}>
        {/* Meta AI Circular Button */}
        <TouchableOpacity
          style={styles.metaButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MetaAi')}
        >
          <Ionicons name="sparkles" size={22} color="#A855F7" />
        </TouchableOpacity>

        {/* Squircle '+' Chat Action Button */}
        <TouchableOpacity
          style={styles.chatButton}
          activeOpacity={0.85}
          onPress={() => setContactModalVisible(true)}
        >
          <Ionicons name="add" size={28} color="#111B21" />
        </TouchableOpacity>
      </View>

      {/* Contact Model Layout Sheet Overlay */}
      <AddContactModalScreen
        visible={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins_700Bold',
    color: '#25D366',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 8,
    width: 210,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 14,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    color: '#111B21',
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#acafaf',
    marginVertical: 6,
    marginHorizontal: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 45,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#111B21',
  },
  clearIcon: {
    marginLeft: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 15,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#667781',
  },
  activeChip: {
    backgroundColor: '#D9FDD3',
    borderColor: '#25D366',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontFamily: 'Poppins_500Medium',
    color: '#008069',
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
    zIndex: 99,
  },
  metaButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#1F2C34',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  chatButton: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  chatRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#111B21',
  },
  time: {
    fontSize: 12,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#667781',
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
  },
  badge: {
    backgroundColor: '#25D366',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#667781',
    textAlign: 'center',
  },
});