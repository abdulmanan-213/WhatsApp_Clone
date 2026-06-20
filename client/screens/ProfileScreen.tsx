import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Updated Header Layout */}
      <View style={styles.headerIcons}>
        <Text style={styles.header}>Jhon Doe</Text>
        
        <View style={styles.rightIconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="add-circle-outline"
              size={28}
              color="#111B21"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="ellipsis-vertical"
              size={25}
              color="#111B21"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#667781" />
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/250?img=1' }}
          style={styles.avatar}
        />
      </View>

      <MenuItem
        icon="person-outline"
        title="Profile"
        subtitle="Name, profile picture"
      />

      <MenuItem
        icon="key-outline"
        title="Account"
        subtitle="Security notifications"
      />

      <MenuItem
        icon="lock-closed-outline"
        title="Privacy"
        subtitle="Blocked contacts"
      />

      <MenuItem
        icon="chatbox-outline"
        title="Chats"
        subtitle="Theme, wallpaper"
      />

      <MenuItem
        icon="notifications-outline"
        title="Notifications"
        subtitle="Message alerts"
      />
    </ScrollView>
  );
}

const MenuItem = ({ icon, title, subtitle }: any) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#667781" />

    <View style={styles.menuText}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginTop: 45,
    paddingHorizontal: 20, 
  },

  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButton: {
    marginLeft: 18,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    margin: 16,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins_400Regular',
  },

  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
  },

  menuText: {
    marginLeft: 18,
  },

  menuTitle: {
    fontSize: 17,
    fontFamily: 'Poppins_500Medium',
    color: '#111B21',
  },

  menuSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#667781',
    marginTop: 3,
  },
});