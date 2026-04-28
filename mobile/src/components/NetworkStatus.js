import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Snackbar } from 'react-native-paper';

export default function NetworkStatus() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOffline(!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Snackbar visible={offline} duration={Snackbar.DURATION_MEDIUM} style={{ backgroundColor: 'red' }}>
      No internet connection
    </Snackbar>
  );
}
