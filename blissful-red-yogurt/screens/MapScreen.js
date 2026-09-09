import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  Linking,
} from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';

export default function MapScreen({ onReport }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (!search.trim()) {
      Alert.alert('Pesquisar', 'Digite um local para pesquisar.');
      return;
    }

    const url = `https://www.openstreetmap.org/search?query=${encodeURIComponent(
      search
    )}`;

    Linking.openURL(url);
  };

  const handleLocation = () => {
    Alert.alert(
      'Localização',
      'A localização atual será utilizada para centralizar o mapa.'
    );
  };

  return (
    <View style={styles.container}>

      {/* MAPA */}
      <View style={styles.mapContainer}>
        <View style={styles.fakeMap}>

          <Text style={styles.mapLabel}>
            OpenStreetMap
          </Text>

          {/* MARCADORES */}
          <View style={[styles.marker, { top: '35%', left: '35%' }]}>
            <Ionicons
              name="location"
              size={34}
              color="#6A1B9A"
            />
          </View>

          <View style={[styles.marker, { top: '52%', left: '65%' }]}>
            <Ionicons
              name="location"
              size={34}
              color="#6A1B9A"
            />
          </View>

          <View style={[styles.marker, { top: '65%', left: '42%' }]}>
            <Ionicons
              name="location"
              size={34}
              color="#6A1B9A"
            />
          </View>

        </View>
      </View>

      {/* MENU */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(!menuOpen)}
        activeOpacity={0.8}
      >
        <Feather
          name={menuOpen ? 'x' : 'menu'}
          size={23}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* PESQUISA */}
      <View style={styles.searchContainer}>

        <Feather
          name="search"
          size={18}
          color="#888"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />

        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch('')}
          >
            <Feather
              name="x"
              size={17}
              color="#777"
            />
          </TouchableOpacity>
        )}

      </View>

      {/* BOTÃO DE LOCALIZAÇÃO */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleLocation}
        activeOpacity={0.8}
      >
        <Ionicons
          name="compass-outline"
          size={27}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* BOTÃO RELATAR */}
      <TouchableOpacity
        style={styles.reportButton}
        onPress={onReport}
        activeOpacity={0.85}
      >
        <Feather
          name="alert-circle"
          size={19}
          color="#FFFFFF"
        />

        <Text style={styles.reportText}>
          Relatar problema
        </Text>
      </TouchableOpacity>

      {/* PAINEL INFERIOR */}
      <View style={styles.bottomSheet}>

        <View style={styles.sheetHandle} />

        <Text style={styles.placeTitle}>
          Largo do Taboão
        </Text>

        <Text style={styles.placeSubtitle}>
          Problemas registrados nesta região
        </Text>

        <TouchableOpacity
          style={styles.sheetReportButton}
          onPress={onReport}
          activeOpacity={0.8}
        >
          <Feather
            name="plus"
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.sheetReportText}>
            Relatar problema
          </Text>
        </TouchableOpacity>

      </View>

      {/* MENU LATERAL */}
      {menuOpen && (
        <View style={styles.sideMenu}>

          <Text style={styles.menuTitle}>
            Urban-ze
          </Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuOpen(false);
            }}
          >
            <Feather
              name="map"
              size={20}
              color="#5042A2"
            />

            <Text style={styles.menuItemText}>
              Mapa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuOpen(false);
              onReport();
            }}
          >
            <Feather
              name="alert-circle"
              size={20}
              color="#5042A2"
            />

            <Text style={styles.menuItemText}>
              Relatar problema
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              Alert.alert(
                'Meus relatos',
                'Aqui aparecerão os problemas que você relatou.'
              );
            }}
          >
            <Feather
              name="file-text"
              size={20}
              color="#5042A2"
            />

            <Text style={styles.menuItemText}>
              Meus relatos
            </Text>
          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0EC',
  },

  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  fakeMap: {
    flex: 1,
    backgroundColor: '#EDEBE7',
    position: 'relative',
  },

  mapLabel: {
    position: 'absolute',
    bottom: 150,
    right: 10,
    fontSize: 10,
    color: '#777',
  },

  marker: {
    position: 'absolute',
  },

  menuButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: '#6A1B9A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 60,
    right: 25,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },

  locationButton: {
    position: 'absolute',
    right: 25,
    bottom: 118,
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: '#6A1B9A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  reportButton: {
    position: 'absolute',
    right: 20,
    bottom: 175,
    height: 45,
    paddingHorizontal: 18,
    borderRadius: 23,
    backgroundColor: '#6A1B9A',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  reportText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 7,
  },

  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    minHeight: 125,
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
    elevation: 10,
  },

  sheetHandle: {
    width: 42,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#D0D0D0',
    marginBottom: 12,
  },

  placeTitle: {
    color: '#6A1B9A',
    fontSize: 16,
    fontWeight: 'bold',
  },

  placeSubtitle: {
    color: '#777',
    fontSize: 11,
    marginTop: 4,
  },

  sheetReportButton: {
    marginTop: 10,
    backgroundColor: '#6A1B9A',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  sheetReportText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 6,
  },

  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 260,
    backgroundColor: '#FFFFFF',
    paddingTop: 75,
    paddingHorizontal: 20,
    elevation: 20,
  },

  menuTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 35,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  menuItemText: {
    marginLeft: 14,
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
});