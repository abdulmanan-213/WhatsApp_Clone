import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Main Logo & Brand Section */}
      <Animated.View 
        style={[
          styles.logoContainer, 
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={styles.iconWrapper}>
          <FontAwesome name="whatsapp" size={85} color="#25D366" />
        </View>
        <Text style={styles.brandText}>WhatsApp</Text>
      </Animated.View>

      {/* Corporate Meta Footer Branding */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerSub}>from</Text>
        <Text style={styles.footerMain}>META</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 60, 
  },
  iconWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
  },
  brandText: {
    fontSize: 34,
    fontFamily: 'Poppins_700Bold', 
    fontWeight: '700',
    color: '#111B21', 
    marginTop: 16,
    letterSpacing: -0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    width: width,
  },
  footerSub: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#8696A0', 
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  footerMain: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#25D366', 
    letterSpacing: 2,
    marginTop: 4,
  },
});