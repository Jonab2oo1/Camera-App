
# Ambulance Camera App

This React Native (Expo) app allows you to:
1. Take multiple photos of an ambulance (using the mobile camera).
2. Automatically analyze each photo via Roboflow’s API.
3. Display an "Image Analysis" section beneath each photo, showing which items were detected and their confidence values.
4. Tap Result to get an overall equipment summary in a modal (e.g., Oxygen Cylinder, Stretcher, Suction, etc.)

--------------------------------------------------------------------------

# Files Explanation

1. screens/HomeScreen.tsx
- Main screen where the user captures photos and sees immediate analysis.
- Shows a FlatList of photos with their respective analyses.
- Has a Result button that triggers further aggregated analysis via EquipmentResults or EquipmentStatus.

2. components/EquipmentResults/EquipmentResults.tsx
- A modal component that displays the overall equipment items with availability (green check) or missing (red close).

3. components/EquipmentStatus/EquipmentStatus.tsx
- Another modal for listing equipment items in a different style or usage scenario.

4. StyleSheet/HomeScreenStyles.ts & StyleSheet/EquipmentStatusStyles.ts
- External style files that keep styles separate from the component logic.

5. navigation/RootNavigator.tsx
- Sets up stack navigation (or any other navigation strategy).

6. App.tsx
- The root of the app.

--------------------------------------------------------------------------

# How to Run?

1. Install Dependencies:
   npm install 

2. Start the App:
   npx expo start 

3. Update your dependencies and clear caches:
   rm -rf node_modules
   npm install
   npx expo start -c

Scan the QR code with the Expo Go app (on Android/iOS) or run on an emulator.

