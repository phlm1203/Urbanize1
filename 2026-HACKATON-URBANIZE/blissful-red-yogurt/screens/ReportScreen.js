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
  Image,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import { supabase } from '../lib/supabase';

export default function ReportScreen({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [comment, setComment] = useState('');
  const [severity, setSeverity] = useState('');
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);

  const topics = [
    'Assaltos na região',
    'Trânsito intenso',
    'Coleta de lixo irregular',
    'Alagamentos',
    'Queda de energia',
  ];

  const handleOpenCamera = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'É preciso permitir o acesso à câmera.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSend = async () => {
    if (!selectedTopic) {
      Alert.alert(
        'Atenção',
        'Selecione o tipo de problema.'
      );
      return;
    }

    if (!severity) {
      Alert.alert(
        'Atenção',
        'Selecione a gravidade do problema.'
      );
      return;
    }

    try {
      setSending(true);

      const { error } = await supabase
        .from('reports')
        .insert({
          topic: selectedTopic,
          comment: comment,
          severity: severity,
          image_url: image,
        });

      if (error) {
        console.error(error);
        throw error;
      }

      Alert.alert(
        'Relato enviado',
        'Seu relato foi registrado com sucesso!'
      );

      setSelectedTopic('');
      setComment('');
      setSeverity('');
      setImage(null);

      if (onBack) {
        onBack();
      }

    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível enviar o relato.'
      );

    } finally {
      setSending(false);
    }
  };

  return (
    <LinearGradient
      colors={['#5042A2', '#8274CD', '#E8E4F8']}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        style={styles.container}
      >

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
            >
              <Feather
                name="arrow-left"
                size={22}
                color="#5042A2"
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Relatar um problema
            </Text>

            <Text style={styles.sectionTitle}>
              O que está acontecendo?
            </Text>

            <View style={styles.topicsContainer}>

              {topics.map((topic) => (
                <TouchableOpacity
                  key={topic}
                  style={[
                    styles.topicChip,
                    selectedTopic === topic &&
                      styles.topicChipSelected,
                  ]}
                  onPress={() =>
                    setSelectedTopic(topic)
                  }
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.topicText,
                      selectedTopic === topic &&
                        styles.topicTextSelected,
                    ]}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity>
                <Text style={styles.showMoreText}>
                  Mostrar mais
                </Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.sectionTitle}>
              Ou comente sobre:
            </Text>

            <View style={styles.commentContainer}>

              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
                placeholder="Escreva detalhes do ocorrido..."
                placeholderTextColor="#A0A0A0"
              />

              {image && (
                <View style={styles.imagePreviewContainer}>

                  <Image
                    source={{ uri: image }}
                    style={styles.imagePreview}
                  />

                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => setImage(null)}
                  >
                    <Feather
                      name="x"
                      size={16}
                      color="#FFF"
                    />
                  </TouchableOpacity>

                </View>
              )}

              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleOpenCamera}
                activeOpacity={0.7}
              >
                <Feather
                  name="camera"
                  size={18}
                  color="#5042A2"
                />

                <Text style={styles.cameraButtonText}>
                  Tirar foto do local
                </Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.sectionTitle}>
              Qual a gravidade do problema?
            </Text>

            <TouchableOpacity
              style={[
                styles.severityButton,
                { backgroundColor: '#C00000' },
                severity === 'high' &&
                  styles.severitySelected,
              ]}
              onPress={() => setSeverity('high')}
            >
              <Text style={styles.severityText}>
                Deve ser resolvido imediatamente!
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.severityButton,
                { backgroundColor: '#FF6600' },
                severity === 'medium' &&
                  styles.severitySelected,
              ]}
              onPress={() => setSeverity('medium')}
            >
              <Text style={styles.severityText}>
                Deve ser resolvido o quanto antes.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.severityButton,
                { backgroundColor: '#FFB000' },
                severity === 'low' &&
                  styles.severitySelected,
              ]}
              onPress={() => setSeverity('low')}
            >
              <Text style={styles.severityText}>
                Pode esperar, mas é importante.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={sending}
              activeOpacity={0.8}
            >
              <Text style={styles.sendButtonText}>
                {sending ? 'Enviando...' : 'Enviar'}
              </Text>
            </TouchableOpacity>

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
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: '100%',
    maxWidth: 380,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5042A2',
    marginBottom: 20,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 12,
    marginBottom: 10,
  },

  topicsContainer: {
    width: '100%',
    alignItems: 'center',
  },

  topicChip: {
    backgroundColor: '#F0F0F0',
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 6,
    width: '85%',
    alignItems: 'center',
  },

  topicChipSelected: {
    backgroundColor: '#8274CD',
    borderColor: '#5042A2',
  },

  topicText: {
    fontSize: 12,
    color: '#666666',
  },

  topicTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  showMoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5042A2',
    marginTop: 4,
    marginBottom: 10,
  },

  commentContainer: {
    width: '100%',
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    padding: 10,
  },

  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 13,
    color: '#333',
  },

  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
    marginTop: 6,
  },

  cameraButtonText: {
    fontSize: 12,
    color: '#5042A2',
    fontWeight: 'bold',
    marginLeft: 6,
  },

  imagePreviewContainer: {
    position: 'relative',
    marginVertical: 8,
  },

  imagePreview: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },

  removeImageButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#C00000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  severityButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 8,
  },

  severitySelected: {
    borderWidth: 2,
    borderColor: '#000',
  },

  severityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sendButton: {
    backgroundColor: '#5042A2',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});