import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function RegisterScreen({ onLogin, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log({
      name,
      email,
      password,
      confirmPassword,
    });

    // Futuramente entra o cadastro no Supabase
    onRegister();
  };

  return (
    <LinearGradient
      colors={['#5042A2', '#8274CD', '#E8E4F8']}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>

            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                URBAN
                <Text style={styles.logoExclamation}>!</Text>
                ZE
              </Text>
            </View>

            <Text style={styles.title}>
              Cadastro
            </Text>

            <Text style={styles.subtitle}>
              Seja bem-vindo!
            </Text>

            <View style={styles.form}>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Nome
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  E-mail
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Senha
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />

                  <Feather
                    name="lock"
                    size={18}
                    color="#A9A9A9"
                    style={styles.icon}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Confirmação de Senha
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />

                  <Feather
                    name="lock"
                    size={18}
                    color="#A9A9A9"
                    style={styles.icon}
                  />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.loginLinkContainer}
                onPress={onLogin}
              >
                <Text style={styles.loginText}>
                  Já tem uma conta?{' '}
                  <Text style={styles.loginTextBold}>
                    Entre!
                  </Text>
                </Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegister}
                  activeOpacity={0.8}
                >
                  <Feather
                    name="arrow-right"
                    size={24}
                    color="#FFF"
                  />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    width: '100%',
    maxWidth: 380,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2B1B54',
    letterSpacing: 2,
  },

  logoExclamation: {
    color: '#8257E5',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },

  form: {
    width: '100%',
  },

  inputGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: '#FFFFFF',
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333333',
  },

  icon: {
    marginLeft: 8,
  },

  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },

  loginText: {
    fontSize: 12,
    color: '#444444',
  },

  loginTextBold: {
    fontWeight: 'bold',
  },

  buttonContainer: {
    alignItems: 'flex-end',
  },

  button: {
    backgroundColor: '#6C48B6',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
