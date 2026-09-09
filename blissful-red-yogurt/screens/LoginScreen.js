
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Imagens da pasta Assets do Snack
const LOGO_GRANDE = require('../assets/baixados.png');
const LOGO_TEXTO = require('../assets/logo.png');
const PREDIOS = require('../assets/predios.png');

export default function LoginScreen({ onRegister, onLogin }) {
  const [tela, setTela] = useState('splash');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTela('login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    try {
      console.log('Login com:', email, senha);

      // Aqui futuramente entra o Supabase
      onLogin();
    } catch (error) {
      console.log('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  if (tela === 'splash') {
    return (
      <LinearGradient
        colors={['#4A2E8C', '#8A6DC9', '#E8E2F5']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={LOGO_GRANDE}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Image
          source={PREDIOS}
          style={styles.prediosSplash}
          resizeMode="contain"
        />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#4A2E8C', '#8A6DC9', '#E8E2F5']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Image
        source={PREDIOS}
        style={styles.prediosLogin}
        resizeMode="contain"
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Image
            source={LOGO_TEXTO}
            style={styles.logoTexto}
            resizeMode="contain"
          />

          <Text style={styles.boasVindas}>
            Seja bem-vindo de volta!
          </Text>

          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#B3A6E0"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <Text style={styles.label}>
            Senha
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#B3A6E0"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.footerRow}>
            <TouchableOpacity
              onPress={onRegister}
              activeOpacity={0.7}
            >
              <Text style={styles.link}>
                Não tem uma conta?{' '}
                <Text style={styles.linkDestaque}>
                  Cadastre-se!
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCircular}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.seta}>
                →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },

  logo: {
    width: 200,
    height: 200,
  },

  prediosSplash: {
    width: width,
    height: 180,
    position: 'absolute',
    bottom: 0,
  },

  prediosLogin: {
    width: width,
    height: 180,
    position: 'absolute',
    bottom: 0,
  },

  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,

    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,

    elevation: 8,
  },

  logoTexto: {
    width: 160,
    height: 40,
    alignSelf: 'center',
    marginBottom: 18,
  },

  boasVindas: {
    fontSize: 14,
    color: '#4A3B6B',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B2478',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#3B2478',

    borderWidth: 1,
    borderColor: '#D9CFF0',

    marginBottom: 20,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  link: {
    fontSize: 12,
    color: '#6B5B95',
    maxWidth: '70%',
  },

  linkDestaque: {
    color: '#6C3EF4',
    fontWeight: '700',
  },

  botaoCircular: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6C3EF4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  seta: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
