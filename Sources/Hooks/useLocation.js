import Geolocation from '@react-native-community/geolocation';

const useLocation = () => {
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          console.error('Error getting location:', error);
          reject(error);
        },
        { timeout: 20000 },
      );
    });
  };

  return { getLocation };
};

export default useLocation;
