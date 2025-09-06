let monitoringInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Simulates AI danger detection by randomly triggering a callback.
 * In a real-world application, this service would use a native module
 * (like expo-av or react-native-voice) to:
 * 1. Request microphone permissions.
 * 2. Capture chunks of ambient audio.
 * 3. Encode the audio to a suitable format (e.g., base64).
 * 4. Send the audio data to the Gemini API with a prompt asking it
 *    to analyze for sounds of distress (shouting, glass breaking, etc.).
 * 5. Call onDangerDetected() if the model's response indicates danger.
 *
 * @param onDangerDetected - The callback function to execute when "danger" is detected.
 */
export const startMonitoring = (onDangerDetected: () => void) => {
  if (monitoringInterval) {
    return;
  }
  console.log('Starting simulated danger detection monitoring...');
  monitoringInterval = setInterval(() => {
    // Randomly simulate a danger detection event (e.g., ~5% chance every 10 seconds)
    if (Math.random() < 0.05) {
      console.log('Simulated danger detected!');
      onDangerDetected();
    }
  }, 10000); // Check every 10 seconds
};

/**
 * Stops the simulated danger detection monitoring.
 */
export const stopMonitoring = () => {
  if (monitoringInterval) {
    console.log('Stopping danger detection monitoring.');
    clearInterval(monitoringInterval);
    monitoringInterval = null;
  }
};
