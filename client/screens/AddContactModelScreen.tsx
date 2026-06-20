import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface AddContactModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddContactModalScreen({ visible, onClose }: AddContactModalProps) {
  // states for inputs list data and feedback
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [savedContacts, setSavedContacts] = useState<Contact[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveContact = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill in both Name and Phone Number fields.');
      return;
    }

    // create new contact object
    const newContact: Contact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
    };

    setSavedContacts((prevContacts) => [newContact, ...prevContacts]);

    setSuccessMessage(`"${newContact.name}" saved to contacts successfully!`);

    setName('');
    setPhone('');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={26} color="#111B21" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Contact</Text>
          <View style={{ width: 26 }} /> {/* Visual balancing spacer */}
        </View>

        <View style={styles.content}>
          {successMessage ? (
            <View style={styles.successToast}>
              <Ionicons name="checkmark-circle" size={18} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={styles.successToastText}>{successMessage}</Text>
            </View>
          ) : null}

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Contact Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#667781" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter full name"
                placeholderTextColor="#96A6AF"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#667781" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. +92 300 1234567"
                placeholderTextColor="#96A6AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.saveButton} 
            activeOpacity={0.8}
            onPress={handleSaveContact}
          >
            <Text style={styles.saveButtonText}>Save Contact</Text>
          </TouchableOpacity>

          <View style={styles.listDivider} />

          <Text style={styles.savedSectionTitle}>Saved in Current Session</Text>
          
          <FlatList
            data={savedContacts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="journal-outline" size={40} color="#96A6AF" />
                <Text style={styles.emptyText}>No contacts added yet in this screen.</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.contactItemRow}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitial}>{item.name.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactNameText}>{item.name}</Text>
                  <Text style={styles.contactPhoneText}>{item.phone}</Text>
                </View>
                <Ionicons name="checkmark-done" size={18} color="#25D366" />
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  successToast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#128C7E', // WhatsApp dark teal accent confirmation shade
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  successToastText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: '#54656F',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9EDEF',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: 46,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#111B21',
  },
  saveButton: {
    backgroundColor: '#25D366', 
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  listDivider: {
    height: 1,
    backgroundColor: '#E9EDEF',
    marginVertical: 20,
  },
  savedSectionTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  emptyText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#8696A0',
    marginTop: 8,
    textAlign: 'center',
  },
  contactItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F2F5',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F9EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInitial: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#25D366',
  },
  contactDetails: {
    flex: 1,
  },
  contactNameText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#111B21',
  },
  contactPhoneText: {
    fontSize: 12,
    color: '#667781',
    fontFamily: 'Poppins_400Regular',
    marginTop: -1,
  },
});