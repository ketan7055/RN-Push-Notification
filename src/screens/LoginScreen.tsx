import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const COLORS = {
  primary: '#6C63FF',
  secondary: '#FF6584',
  background: '#F0F0FF',
  card: '#FFFFFF',
  text: '#2D2D3A',
  textLight: '#9E9EAF',
  inputBg: '#F5F5FC',
  inputBorder: '#E0E0F0',
  white: '#FFFFFF',
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Oops!', 'Please fill in both fields.');
      return;
    }
    Alert.alert('Login', `Logging in as ${email}`);
  };

  const handleSignup = () => {
    if (!email || !password) {
      Alert.alert('Oops!', 'Please fill in both fields.');
      return;
    }
    Alert.alert('Sign Up', `Creating account for ${email}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>P</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.85}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            activeOpacity={0.85}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms & Privacy Policy</Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  signupButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 24,
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
