import React, { useState } from 'react';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MapScreen from '../screens/MapScreen';
import ReportScreen from '../screens/ReportScreen';

export default function RootNavigator() {
  const [screen, setScreen] = useState('login');

  if (screen === 'login') {
    return (
      <LoginScreen
        onRegister={() => setScreen('register')}
        onLogin={() => setScreen('map')}
      />
    );
  }

  if (screen === 'register') {
    return (
      <RegisterScreen
        onLogin={() => setScreen('login')}
        onRegister={() => setScreen('map')}
      />
    );
  }

  if (screen === 'map') {
    return (
      <MapScreen
        onReport={() => setScreen('report')}
      />
    );
  }

  if (screen === 'report') {
    return (
      <ReportScreen
        onBack={() => setScreen('map')}
      />
    );
  }

  return null;
}