import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  PanResponder,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

import {
  Feather,
  Ionicons,
} from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const SHEET_HEIGHT = height * 0.68;
const CLOSED_POSITION = SHEET_HEIGHT - 72;

export default function MapScreen({ onReport }) {

  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const mapRef = useRef(null);

  const sheetPosition = useRef(
    new Animated.Value(CLOSED_POSITION)
  ).current;

  const lastPosition = useRef(
    CLOSED_POSITION
  );

  const problems = [
    {
      id: 1,
      latitude: -23.6515,
      longitude: -46.7530,
      type: 'high',
      title: 'Risco de segurança',
    },
    {
      id: 2,
      latitude: -23.6525,
      longitude: -46.7505,
      type: 'medium',
      title: 'Trânsito intenso',
    },
    {
      id: 3,
      latitude: -23.6495,
      longitude: -46.7550,
      type: 'low',
      title: 'Coleta de lixo',
    },
    {
      id: 4,
      latitude: -23.6505,
      longitude: -46.7515,
      type: 'high',
      title: 'Alagamento',
    },
  ];

  const getPinColor = (type) => {

    if (type === 'high') {
      return '#E00000';
    }

    if (type === 'medium') {
      return '#FF8C00';
    }

    return '#F5C400';
  };

  
  const openSheet = () => {

    lastPosition.current = 0;

    Animated.spring(sheetPosition, {
      toValue: 0,
      useNativeDriver: true,
      tension: 70,
      friction: 11,
    }).start();
  };

  const closeSheet = () => {

    lastPosition.current =
      CLOSED_POSITION;

    Animated.spring(sheetPosition, {
      toValue: CLOSED_POSITION,
      useNativeDriver: true,
      tension: 70,
      friction: 11,
    }).start();
  };

  
  const panResponder = useRef(
    PanResponder.create({

      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 5;
      },

      onPanResponderMove: (_, gesture) => {

        let position =
          lastPosition.current +
          gesture.dy;

        if (position < 0) {
          position = 0;
        }

        if (position > CLOSED_POSITION) {
          position = CLOSED_POSITION;
        }

        sheetPosition.setValue(position);
      },

      onPanResponderRelease: (_, gesture) => {

        const current =
          lastPosition.current +
          gesture.dy;

        if (current < CLOSED_POSITION / 2) {
          openSheet();
        } else {
          closeSheet();
        }
      },

    })
  ).current;

 
  const handleLocation = async () => {

    try {

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {

        Alert.alert(
          'Localização',
          'Permita o acesso à localização.'
        );

        return;
      }

      const position =
        await Location.getCurrentPositionAsync({});

      mapRef.current?.animateToRegion(
        {
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

          latitudeDelta: 0.012,

          longitudeDelta: 0.012,
        },
        800
      );

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível encontrar sua localização.'
      );
    }
  };

  
  const handleSearch = () => {

    if (!search.trim()) {
      return;
    }

    Alert.alert(
      'Pesquisa',
      `Você pesquisou por: ${search}`
    );
  };

  return (
    <View style={styles.container}>

      {}

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -23.6510,
          longitude: -46.7525,
          latitudeDelta: 0.018,
          longitudeDelta: 0.018,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
      >

        {problems.map((problem) => (

          <Marker
            key={problem.id}
            coordinate={{
              latitude: problem.latitude,
              longitude: problem.longitude,
            }}
            title={problem.title}
          >

            <View
              style={[
                styles.pin,
                {
                  backgroundColor:
                    getPinColor(problem.type),
                },
              ]}
            >

              <Ionicons
                name="alert"
                size={13}
                color="#FFF"
              />

            </View>

          </Marker>

        ))}

      </MapView>

      {}

      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.8}
        onPress={() =>
          setMenuOpen(!menuOpen)
        }
      >

        <Feather
          name={
            menuOpen
              ? 'x'
              : 'menu'
          }
          size={21}
          color="#FFF"
        />

      </TouchableOpacity>

      {}

      <View style={styles.searchBox}>

        <Feather
          name="search"
          size={16}
          color="#999"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#999"
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
              size={16}
              color="#999"
            />

          </TouchableOpacity>

        )}

      </View>

      {/* ================================= */}
      {/* BOTÃO LOCALIZAÇÃO */}
      {/* ================================= */}

      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleLocation}
        activeOpacity={0.8}
      >

        <Ionicons
          name="compass-outline"
          size={25}
          color="#FFF"
        />

      </TouchableOpacity>

      {}

      <TouchableOpacity
        style={styles.reportFloating}
        onPress={onReport}
        activeOpacity={0.8}
      >

        <Feather
          name="alert-circle"
          size={18}
          color="#FFF"
        />

        <Text style={styles.reportFloatingText}>
          Relatar problema
        </Text>

      </TouchableOpacity>

      {}

      {menuOpen && (

        <View style={styles.menu}>

          <View style={styles.menuHeader}>

            <Text style={styles.menuLogo}>
              Urban-ze
            </Text>

            <TouchableOpacity
              onPress={() =>
                setMenuOpen(false)
              }
            >

              <Feather
                name="x"
                size={22}
                color="#5042A2"
              />

            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              setMenuOpen(false)
            }
          >

            <Feather
              name="map"
              size={20}
              color="#5042A2"
            />

            <Text style={styles.menuText}>
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

            <Text style={styles.menuText}>
              Relatar problema
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              Alert.alert(
                'Meus relatos',
                'Aqui aparecerão seus relatos.'
              )
            }
          >

            <Feather
              name="file-text"
              size={20}
              color="#5042A2"
            />

            <Text style={styles.menuText}>
              Meus relatos
            </Text>

          </TouchableOpacity>

        </View>

      )}

      {}

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: SHEET_HEIGHT,
            transform: [
              {
                translateY:
                  sheetPosition,
              },
            ],
          },
        ]}
      >

        {}

        <View
          style={styles.dragArea}
          {...panResponder.panHandlers}
        >

          <View style={styles.handle} />

          <Text style={styles.placeTitle}>
            Largo do Taboão
          </Text>

        </View>

        {}

        <View style={styles.sheetContent}>

          {}

          <Text style={styles.sectionTitle}>
            Local
          </Text>

          <View style={styles.photos}>

            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500',
              }}
              style={styles.photo}
            />

            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500',
              }}
              style={styles.photo}
            />

            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=500',
              }}
              style={styles.photo}
            />

          </View>

          {}

          <Text style={styles.sectionTitle}>
            Alertas Locais
          </Text>

          <View
            style={[
              styles.alert,
              {
                backgroundColor:
                  '#C90000',
              },
            ]}
          >

            <Text style={styles.alertTitle}>
              Risco de segurança
            </Text>

            <Text style={styles.alertText}>
              Alto índice de criminalidade registrado na região.
            </Text>

          </View>

          <View
            style={[
              styles.alert,
              {
                backgroundColor:
                  '#F4B400',
              },
            ]}
          >

            <Text style={styles.alertTitle}>
              Trânsito
            </Text>

            <Text style={styles.alertText}>
              Fluxo de trânsito intenso registrado na região.
            </Text>

          </View>

          {}

          <Text style={styles.sectionTitle}>
            Opiniões
          </Text>

          <View style={styles.opinions}>

            <View style={styles.opinion}>

              <View style={styles.userIcon}>
                <Ionicons
                  name="person"
                  size={12}
                  color="#FFF"
                />
              </View>

              <Text style={styles.userName}>
                USER
              </Text>

              <Text style={styles.opinionText}>
                Região com bastante movimento durante
                o dia.
              </Text>

            </View>

            <View style={styles.opinion}>

              <View style={styles.userIcon}>
                <Ionicons
                  name="person"
                  size={12}
                  color="#FFF"
                />
              </View>

              <Text style={styles.userName}>
                USER
              </Text>

              <Text style={styles.opinionText}>
                Atenção principalmente durante a noite.
              </Text>

            </View>

          </View>

          {}

          <TouchableOpacity
            style={styles.sheetReport}
            onPress={onReport}
            activeOpacity={0.8}
          >

            <Feather
              name="alert-circle"
              size={18}
              color="#FFF"
            />

            <Text style={styles.sheetReportText}>
              Relatar problema
            </Text>

          </TouchableOpacity>

        </View>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  
  menuButton: {
    position: 'absolute',
    top: 11,
    left: 15,
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: '#6A1B9A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    zIndex: 20,
  },

 

  searchBox: {
    position: 'absolute',
    top: 11,
    left: 59,
    right: 17,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 5,
    zIndex: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 7,
    fontSize: 12,
    color: '#333',
  },

  

  locationButton: {
    position: 'absolute',
    right: 18,
    bottom: 112,
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: '#6A1B9A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    zIndex: 10,
  },

  

  reportFloating: {
    position: 'absolute',
    right: 15,
    bottom: 165,
    height: 42,
    paddingHorizontal: 15,
    borderRadius: 22,
    backgroundColor: '#6A1B9A',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    zIndex: 10,
  },

  reportFloatingText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 6,
  },

  

  pin: {
    width: 27,
    height: 27,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  

  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    elevation: 15,
    zIndex: 30,
    overflow: 'hidden',
  },

  dragArea: {
    height: 72,
    width: '100%',
    alignItems: 'center',
    paddingTop: 9,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#D0D0D0',
    marginBottom: 11,
  },

  placeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },

  sheetContent: {
    paddingHorizontal: 16,
    paddingBottom: 25,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 7,
  },

  

  photos: {
    flexDirection: 'row',
    gap: 5,
  },

  photo: {
    flex: 1,
    height: 68,
    borderRadius: 5,
    backgroundColor: '#DDD',
  },

  

  alert: {
    width: '100%',
    borderRadius: 7,
    padding: 9,
    marginBottom: 6,
  },

  alertTitle: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },

  alertText: {
    color: '#FFF',
    fontSize: 9,
  },

  

  opinions: {
    flexDirection: 'row',
    gap: 6,
  },

  opinion: {
    flex: 1,
    minHeight: 85,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 7,
    padding: 8,
  },

  userIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userName: {
    position: 'absolute',
    left: 34,
    top: 11,
    fontSize: 8,
    color: '#888',
  },

  opinionText: {
    marginTop: 8,
    fontSize: 8,
    lineHeight: 11,
    color: '#888',
  },



  sheetReport: {
    height: 43,
    borderRadius: 22,
    backgroundColor: '#6A1B9A',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 14,
  },

  sheetReportText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 7,
  },

 

  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 270,
    backgroundColor: '#FFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 20,
    zIndex: 100,
  },

  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  menuLogo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  menuText: {
    marginLeft: 14,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

});