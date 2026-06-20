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

const recentCalls = [
  {
    id: '1',
    name: 'Janifer',
    count: 2,
    type: 'incoming', 
    time: 'Yesterday, 8:23 pm',
    avatar: 'https://i.pravatar.cc/150?img=36',
    isVideo: false,
  },
  {
    id: '2',
    name: '+92 123 5648907',
    subtitle: '~ Ali Ahmad',
    type: 'incoming',
    time: 'Yesterday, 7:54 pm',
    avatar: 'https://i.pravatar.cc/150?img=11',
    isVideo: false,
  },
  {
    id: '3',
    name: '+92 357 0987652',
    count: 2,
    subtitle: '~ Usman',
    type: 'incoming',
    time: 'Yesterday, 6:39 pm',
    avatar: 'https://i.pravatar.cc/150?img=12',
    isVideo: false,
  },
  {
    id: '4',
    name: 'Amna Tahir',
    type: 'incoming',
    time: 'Yesterday, 5:05 pm',
    avatar: 'https://i.pravatar.cc/150?img=49',
    isVideo: false,
  },
  {
    id: '5',
    name: 'Alina',
    count: 4,
    type: 'incoming',
    time: 'Yesterday, 3:46 pm',
    avatar: 'https://i.pravatar.cc/150?img=47',
    isVideo: true, 
  },
  {
    id: '6',
    name: 'Abdullah',
    type: 'missed', 
    time: 'Yesterday, 10:04 am',
    avatar: 'https://i.pravatar.cc/150?img=53',
    isVideo: false,
  },
  {
    id: '7',
    name: 'Areeba Habib',
    type: 'answered',
    time: '12 June, 8:16 pm',
    avatar: 'https://i.pravatar.cc/150?img=49',
    isVideo: true,
  },
];

export default function CallsScreen() {
  // manage menu dropdown state visibility 
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuSelect = (option: string) => {
    setMenuVisible(false);
    Alert.alert(option, `${option} action executing...`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calls</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={24} color="#111B21" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => setMenuVisible(true)}
            >
              <Ionicons name="ellipsis-vertical" size={22} color="#111B21" />
            </TouchableOpacity>
          </View>
        </View>

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
                  onPress={() => handleMenuSelect('Clear call log')}
                >
                  <Text style={styles.menuItemText}>Clear call log</Text>
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

        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconCircle}>
              <Ionicons name="link-outline" size={22} color="#111B21" style={{ transform: [{ rotate: '-45deg' }] }} />
            </View>
            <Text style={styles.actionText}>Call link</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconCircle}>
              <Ionicons name="calendar-outline" size={22} color="#111B21" />
            </View>
            <Text style={styles.actionText}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconCircle}>
              <Ionicons name="keypad-outline" size={22} color="#111B21" />
            </View>
            <Text style={styles.actionText}>Keypad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconCircle}>
              <Ionicons name="heart-outline" size={22} color="#111B21" />
            </View>
            <Text style={styles.actionText}>Favorites</Text>
          </TouchableOpacity>
        </View>

        {/* recent Feed Header Title */}
        <Text style={styles.sectionTitle}>Recent</Text>

        {/* call Log List Rendering Layout Container */}
        <View style={styles.logsContainer}>
          {recentCalls.map((call) => (
            <TouchableOpacity key={call.id} style={styles.callRow} activeOpacity={0.7}>
              <Image source={{ uri: call.avatar }} style={styles.contactAvatar} />
              
              <View style={styles.callInfoBlock}>
                <View style={styles.callMetaColumn}>
                  <Text 
                    style={[
                      styles.contactName, 
                      call.type === 'missed' && { color: '#E1473D' } // missed calls color profile alignment
                    ]} 
                    numberOfLines={1}
                  >
                    {call.name} {call.count ? `(${call.count})` : ''}
                  </Text>
                  
                  {call.subtitle && (
                    <Text style={styles.contactSubtitle} numberOfLines={1}>
                      {call.subtitle}
                    </Text>
                  )}

                  <View style={styles.timeStatusRow}>
                    <Ionicons 
                      name={call.type === 'missed' ? "arrow-down-left" : "arrow-up-right"} 
                      size={16} 
                      color={call.type === 'missed' ? '#E1473D' : '#25D366'} 
                    />
                    <Text style={styles.callTimestamp}>{call.time}</Text>
                  </View>
                </View>

                {/* Call Action Trigger Profile (Audio vs Video Call) */}
                <TouchableOpacity style={styles.callActionButton}>
                  <Ionicons 
                    name={call.isVideo ? "videocam-outline" : "call-outline"} 
                    size={22} 
                    color="#111B21" 
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Floating Action Button Placement Layer */}
      <View style={styles.floatingContainer}>
        <TouchableOpacity style={styles.mainCallFAB} activeOpacity={0.8}>
          <Ionicons name="call" size={24} color="#111B21" />
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
    paddingBottom: 120,
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
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  actionItem: {
    alignItems: 'center',
    width: 75,
  },
  actionIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: '#111B21',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logsContainer: {
    paddingHorizontal: 16,
  },
  callRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F2F5',
  },
  callInfoBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 14,
  },
  callMetaColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
    marginTop: -2,
  },
  timeStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  callTimestamp: {
    fontSize: 13,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
    marginLeft: 4,
  },
  callActionButton: {
    padding: 8,
    marginLeft: 10,
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 30,
    right: 16,
  },
  mainCallFAB: {
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