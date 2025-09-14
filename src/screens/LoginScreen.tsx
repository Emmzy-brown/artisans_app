import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const { colors, spacing, typography } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    if (isLogin) {
      await login(email, password);
    } else {
      // Handle registration
      console.log('Register');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    gradient: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.xxl,
    },
    logo: {
      width: 80,
      height: 80,
      backgroundColor: colors.white,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    title: {
      fontSize: typography.sizes.xxxl,
      fontWeight: typography.weights.bold,
      color: colors.white,
      marginBottom: spacing.sm,
    },
    subtitle: {
      fontSize: typography.sizes.md,
      color: colors.white,
      opacity: 0.9,
      textAlign: 'center',
    },
    form: {
      marginBottom: spacing.xl,
    },
    inputContainer: {
      marginBottom: spacing.md,
    },
    input: {
      backgroundColor: colors.white,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: typography.sizes.md,
      color: colors.text.primary,
    },
    button: {
      backgroundColor: colors.secondary,
      borderRadius: 12,
      paddingVertical: spacing.md,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    buttonText: {
      color: colors.white,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    switchText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
    },
    switchButton: {
      marginLeft: spacing.xs,
    },
    switchButtonText: {
      color: colors.white,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
      textDecorationLine: 'underline',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <View style={styles.logo}>
              <Ionicons name="hammer" size={40} color={colors.primary} />
            </View>
            <Text style={styles.title}>Artisan Connect</Text>
            <Text style={styles.subtitle}>
              Connect with skilled artisans and showcase your craft
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchButtonText}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;