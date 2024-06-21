import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const usePermissions = () => {
  const checkPermission = async () => {
    try {
      const permissionStatus = await check(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );
      return permissionStatus === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error checking location permission:', error);
      return false;
    }
  };

  const requestPermission = async () => {
    try {
      let permissionStatus;
      if (Platform.OS === 'ios') {
        permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else {
        await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
        permissionStatus = RESULTS.GRANTED;
      }
      console.log('DEV', permissionStatus);
      return permissionStatus === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  return { checkPermission, requestPermission };
};

export default usePermissions;
