import * as Camera from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraError = (err) => {
    console.error('Camera error:', err);
    setError('Camera error occurred.');
  };

  if (hasPermission === null) {
    return <View />; // Loading state
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Camera
      style={{ flex: 1 }}
      type={type}
      ref={(ref) => setCameraRef(ref)}
      onCameraError={handleCameraError}      
    />
  );
};

export default CameraScreen;