import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settings = [
  { icon: 'person-outline', title: 'Account' },
  { icon: 'lock-closed-outline', title: 'Privacy' },
  { icon: 'chatbox-outline', title: 'Chats' },
  { icon: 'notifications-outline', title: 'Notifications' },
  { icon: 'folder-outline', title: 'Storage and Data' },
  { icon: 'help-circle-outline', title: 'Help' },
  { icon: 'information-circle-outline', title: 'About' },
];

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {settings.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
          <Ionicons name={item.icon as any} size={22} color="#667781" />

          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 30,
    marginBottom: 25,
    marginHorizontal: 20,
    color: '#111B21',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },

  itemText: {
    marginLeft: 18,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular', 
    color: '#111B21',
  },

  logout: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
});