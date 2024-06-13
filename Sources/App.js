import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import { useLocation, usePermissions } from './Hooks';

const App = () => {
  const { getLocation } = useLocation();
  const { checkPermission, requestPermission } = usePermissions();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const start = async () => {
    const permitted = await checkPermission();
    if (!permitted) {
      requestPermission();
      setIsRunning(false);
      return;
    }

    _BackgroundTimer.runBackgroundTimer(async () => {
      const location = await getLocation();
      console.log({ location });
    }, 5000);
  };

  const stop = () => _BackgroundTimer.stopBackgroundTimer();

  const toggle = () => {
    isRunning ? stop() : start();
    setIsRunning(!isRunning);
  };

  return (
    <View style={styles.container}>
      <Button
        title={
          isRunning
            ? 'Stop Background Location Task'
            : 'Start Background Location Task'
        }
        onPress={toggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
