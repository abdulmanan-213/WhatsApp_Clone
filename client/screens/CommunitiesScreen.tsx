import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const communityGroups = [
  {
    id: 'c1',
    parentName: 'Online Earning Opportunities',
    parentAvatar: 'https://i.pravatar.cc/150?img=12',
    subChannels: [
      {
        id: 'sub1_1',
        title: 'Announcements',
        icon: 'megaphone',
        isAnnouncements: true,
        lastMessage: '+92 343 3296215: URGENTLY HIRING: Female Remote Content Editors needed...',
        time: 'Yesterday',
      },
      {
        id: 'sub1_2',
        title: 'Career Opportunities',
        icon: 'briefcase-outline',
        isAnnouncements: false,
        lastMessage: '+92 326 0636446: 📷 Photo shared',
        time: '1:10 pm',
      }
    ]
  },
  {
    id: 'c2',
    parentName: 'Microsoft Learn Student Ambassadors - UCP',
    parentAvatar: 'https://i.pravatar.cc/150?img=60',
    subChannels: [
      {
        id: 'sub2_1',
        title: 'Announcements',
        icon: 'megaphone',
        isAnnouncements: true,
        lastMessage: '+92 312 4947375: 📄 Dr. Hammad Naveed shared the Azure Cloud bootcamp details...',
        time: '11/06/2026',
      },
      {
        id: 'sub2_2',
        title: 'MLSA UCP - General',
        icon: 'chatbubbles-outline',
        isAnnouncements: false,
        lastMessage: '+92 312 4947375: 📄 Dr. Hammad Naveed: Please submit your GitHub repository links before...',
        time: '11/06/2026',
      }
    ]
  },
  {
    id: 'c3',
    parentName: 'FAST NUCES Computing Society',
    parentAvatar: 'https://i.pravatar.cc/150?img=68',
    subChannels: [
      {
        id: 'sub3_1',
        title: 'Announcements',
        icon: 'megaphone',
        isAnnouncements: true,
        lastMessage: 'President: Speed Programming Competition registrations close tonight at 11:59 PM!',
        time: '09/06/2026',
      }
    ]
  }
];

export default function CommunitiesScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuSelect = (option: string) => {
    setMenuVisible(false);
    Alert.alert(option, `${option} context module routing soon!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Communities</Text>
          <View style={styles.headerIcons}>
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
                  onPress={() => handleMenuSelect('New community')}
                >
                  <Text style={styles.menuItemText}>New community</Text>
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

        <TouchableOpacity style={styles.newCommunityRow} activeOpacity={0.7}>
          <View style={styles.newCommunityAvatarContainer}>
            <View style={styles.communityIconPlaceholder}>
              <Ionicons name="people" size={28} color="#96A6AF" />
            </View>
            <View style={styles.addCommunityBadge}>
              <Ionicons name="add" size={14} color="#fff" />
            </View>
          </View>
          <Text style={styles.newCommunityText}>New community</Text>
        </TouchableOpacity>

        {communityGroups.map((group) => (
          <View key={group.id} style={styles.communityBlockContainer}>
            
            <TouchableOpacity style={styles.parentGroupRow} activeOpacity={0.8}>
              <Image source={{ uri: group.parentAvatar }} style={styles.parentGroupAvatar} />
              <Text style={styles.parentGroupName} numberOfLines={1}>
                {group.parentName}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerLine} />

            {group.subChannels.map((subChannel) => (
              <TouchableOpacity key={subChannel.id} style={styles.subChannelRow} activeOpacity={0.7}>
                <View 
                  style={[
                    styles.subChannelIconCircle,
                    subChannel.isAnnouncements && { backgroundColor: '#E8F9EE' } // highlight announcements section tint background
                  ]}
                >
                  <Ionicons 
                    name={subChannel.icon as any} 
                    size={20} 
                    color={subChannel.isAnnouncements ? '#25D366' : '#54656F'} 
                  />
                </View>

                <View style={styles.subChannelContentBlock}>
                  <View style={styles.subChannelTopLine}>
                    <Text style={styles.subChannelTitle} numberOfLines={1}>
                      {subChannel.title}
                    </Text>
                    <Text style={styles.subChannelTimeText}>{subChannel.time}</Text>
                  </View>
                  <Text style={styles.subChannelMessageText} numberOfLines={1}>
                    {subChannel.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.viewAllRow} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={18} color="#667781" style={styles.chevronMargin} />
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>

          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 40,
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
    shadowOpacity: 0.12,
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
  newCommunityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 12,
    borderBottomColor: '#F7F8FA', // native thick separation row layout spacer banner
  },
  newCommunityAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  communityIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E9EDEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCommunityBadge: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    backgroundColor: '#25D366',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  newCommunityText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },
  communityBlockContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 12,
    borderBottomColor: '#F7F8FA', // segmentation block grouping layout divider standard
  },
  parentGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  parentGroupAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
  },
  parentGroupName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
    flex: 1,
    marginLeft: 14,
  },
  dividerLine: {
    height: 0.5,
    backgroundColor: '#E9EDEF',
    marginLeft: 74,
  },
  subChannelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  subChannelIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subChannelContentBlock: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  subChannelTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subChannelTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
    flex: 1,
    marginRight: 8,
  },
  subChannelTimeText: {
    fontSize: 12,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
  },
  subChannelMessageText: {
    fontSize: 13,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 14,
    borderTopWidth: 0.5,
    borderTopColor: '#E9EDEF',
  },
  chevronMargin: {
    marginRight: 24,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#667781',
  },
});