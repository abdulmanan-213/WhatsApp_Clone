import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const statuses = [
  { id: '2', name: 'Subhan', avatar: 'https://i.pravatar.cc/150?img=11', thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300' },
  { id: '3', name: 'Sharukh', avatar: 'https://i.pravatar.cc/150?img=12', thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=300' },
  { id: '4', name: 'Mohsin', avatar: 'https://i.pravatar.cc/150?img=53', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300' },
  { id: '5', name: 'Zain',    avatar: 'https://i.pravatar.cc/150?img=33', thumbnail: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300' },
  { id: '6', name: 'Kashif',  avatar: 'https://i.pravatar.cc/150?img=67', thumbnail: 'https://images.unsplash.com/photo-1472214222541-d510753a8707?w=300' },
  { id: '7', name: 'Hamza',   avatar: 'https://i.pravatar.cc/150?img=68', thumbnail: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=300' },
  { id: '8', name: 'Fatima',  avatar: 'https://i.pravatar.cc/150?img=49', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300' },
];
const channels = [
  {
    id: '1',
    name: 'Pakistan Jobs Daily',
    message: '🌞 Summer Scholarship 2026 | Batch 4 Open Now. Apply before closing...',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?img=60',
  },
  {
    id: '2',
    name: 'Geo News Alerts 🇵🇰',
    message: '🔴 Breaking: Higher Education Commission announces laptop distribution scheme update...',
    time: '2:15 PM',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '3',
    name: 'IGN Gaming News',
    message: '🎮 Play Station 6 devkits rumored to be arriving at key studio headquarters...',
    time: '1:40 PM',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Tech & IT Guild',
    message: '🚀 React Native 0.85 architecture benchmarks show up to a 40% render boost...',
    time: '11:05 AM',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    name: 'WhatsApp Official',
    message: '📹 Trading race cars for tractors 🚜 Check out our latest community spotlight...',
    time: '12/06/2026',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  },
  {
    id: '6',
    name: 'Lahore Jobs - HRPP',
    message: 'Hi new followers, for software development internships pl...',
    time: '11/06/2026',
    avatar: 'https://i.pravatar.cc/150?img=57',
  },
  {
    id: '7',
    name: 'Esports Pakistan Hub',
    message: '🏆 Registration for the Nationals Summer Tournament goes live this Friday at 6pm...',
    time: '10/06/2026',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
];

export default function UpdatesScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuSelect = (option: string) => {
    setMenuVisible(false);
    Alert.alert(option, `${option} settings feature coming soon!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Bar Area */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Updates</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={25} color="#111B21" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => setMenuVisible(true)}
            >
              <Ionicons name="ellipsis-vertical" size={25} color="#111B21" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal-Based Popover Dropdown */}
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.dropdownMenu}>
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => handleMenuSelect('Status privacy')}
                >
                  <Text style={styles.menuItemText}>Status privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => handleMenuSelect('Create channel')}
                >
                  <Text style={styles.menuItemText}>Create channel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.menuItem, { borderBottomWidth: 0 }]} 
                  onPress={() => handleMenuSelect('Settings')}
                >
                  <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Status Section */}
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusSection}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={statuses}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.statusListPadding}
            ListHeaderComponent={
              <TouchableOpacity style={styles.myStatusCard} activeOpacity={0.9}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }} 
                  style={styles.statusImageBackground} 
                />
                <View style={styles.darkOverlay} />
                <View style={styles.addStatusBadge}>
                  <Ionicons name="add" size={16} color="#fff" />
                </View>
                <Text style={styles.myStatusName} numberOfLines={1}>Add status</Text>
              </TouchableOpacity>
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.statusCard} activeOpacity={0.9}>
                <Image source={{ uri: item.thumbnail }} style={styles.statusImageBackground} />
                <View style={styles.darkOverlay} />
                <View style={styles.statusRingProfileContainer}>
                  <Image source={{ uri: item.avatar }} style={styles.miniProfileAvatar} />
                </View>
                <Text style={styles.statusNameText} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Channels Section Header */}
        <View style={styles.channelsHeaderRow}>
          <Text style={styles.sectionTitle}>Channels</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Channels Row Item Loop Rendering Block */}
        <View style={styles.channelsContainer}>
          {channels.map((channel) => (
            <TouchableOpacity key={channel.id} style={styles.channelRow} activeOpacity={0.7}>
              <Image source={{ uri: channel.avatar }} style={styles.channelAvatar} />
              <View style={styles.channelInfo}>
                <View style={styles.channelTopRow}>
                  <Text style={styles.channelName} numberOfLines={1}>{channel.name}</Text>
                  <Text style={styles.channelTime}>{channel.time}</Text>
                </View>
                <Text style={styles.channelMessage} numberOfLines={1}>
                  {channel.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Floating Buttons */}
      <View style={styles.floatingContainer}>
        <TouchableOpacity style={styles.pencilButton} activeOpacity={0.8}>
          <Ionicons name="pencil" size={20} color="#111B21" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
          <Ionicons name="camera" size={24} color="#111B21" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 130,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 90,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: 170,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F2F5',
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#111B21',
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 14,
  },
  statusSection: {
    height: 125,
    marginBottom: 10,
  },
  statusListPadding: {
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: 'center',
  },
  myStatusCard: {
    width: 82,
    height: 114,
    borderRadius: 16,
    marginRight: 12,
    position: 'relative',
    backgroundColor: '#F0F2F5',
    overflow: 'hidden',
  },
  statusCard: {
    width: 82,
    height: 114,
    borderRadius: 16,
    marginRight: 12,
    position: 'relative',
    backgroundColor: '#F0F2F5',
    overflow: 'hidden',
  },
  statusImageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  addStatusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#25D366',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  statusRingProfileContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderWidth: 2,
    borderColor: '#25D366',
    borderRadius: 15,
    padding: 1.5,
  },
  miniProfileAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  myStatusName: {
    position: 'absolute',
    bottom: 8,
    left: 6,
    right: 6,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#ffffff',
  },
  statusNameText: {
    position: 'absolute',
    bottom: 8,
    left: 6,
    right: 6,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#ffffff',
  },
  channelsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    marginTop: 10,
  },
  exploreButton: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  exploreButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: '#111B21',
  },
  channelsContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  channelAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F2F5',
  },
  channelInfo: {
    flex: 1,
    marginLeft: 14,
  },
  channelTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelName: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
    flex: 1,
    marginRight: 10,
  },
  channelTime: {
    fontSize: 12,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
  },
  channelMessage: {
    fontSize: 13,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    alignItems: 'center',
  },
  pencilButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  cameraButton: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
});
