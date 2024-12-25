import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { EquipmentResults } from "../components/EquipmentResults";
import { homeScreenStyles as styles } from "../StyleSheet/HomeScreenStyles";


// Define the default equipment list just once
const defaultEquipment = [
  { name: "Oxygen Cylinder", quantity: 0 },
  { name: "Stretcher", quantity: 0 },
  { name: "Suction", quantity: 0 }
];


type PhotoAnalysis = {
  [className: string]: number[];
};

export default function HomeScreen() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [equipmentData, setEquipmentData] = useState([...defaultEquipment]);
  const [photosAnalysis, setPhotosAnalysis] = useState<PhotoAnalysis[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Take a photo and analyze it right away
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Alert", "Camera permission was not granted");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const photoUri = result.assets[0].uri;
      setPhotos((prev) => [...prev, photoUri]);
      setPhotosAnalysis((prev) => [...prev, {}]);
      await analyzeSinglePhoto(photoUri, photos.length);
    }
  };

  // Analyze a single photo after capturing
  const analyzeSinglePhoto = async (uri: string, index: number) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      const base64Image = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
        encoding: FileSystem.EncodingType.Base64
      });
      const res = await sendToRoboflow(base64Image);
      if (res && res.predictions) {
        const analysisObj: PhotoAnalysis = {};
        res.predictions.forEach((pred: any) => {
          if (!analysisObj[pred.class]) {
            analysisObj[pred.class] = [];
          }
          analysisObj[pred.class].push(pred.confidence);
        });
        setPhotosAnalysis((prev) => {
          const newArr = [...prev];
          newArr[index] = analysisObj;
          return newArr;
        });
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // Send the image to Roboflow
  const sendToRoboflow = async (base64Image: string) => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/ambulance-zyvqj/8",
        params: {
          api_key: "jmHytD92Pv6TykVwZEjB"
        },
        data: base64Image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      console.log("DATA", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Roboflow Error:", error.message);
      return null;
    }
  };

  // Remove a photo from the list
  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotosAnalysis((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Done button: analyze all photos again and show modal results
  const handleDone = async () => {
    if (photos.length === 0) {
      Alert.alert("Warning", "No photos captured yet!");
      return;
    }
    try {
      const resultsArray: any[] = [];
      for (const uri of photos) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 800 } }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
        const base64Image = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
          encoding: FileSystem.EncodingType.Base64
        });
        const res = await sendToRoboflow(base64Image);
        if (res) {
          resultsArray.push(res);
        }
      }
      const updatedData = parseRoboflowToEquipment(resultsArray);
      setEquipmentData(updatedData);
      setShowResults(true);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  // equipmentData from all results
  const parseRoboflowToEquipment = (resultsArray: any[]) => {
    const baseEquip = defaultEquipment.map((item) => ({ ...item }));
    resultsArray.forEach((res) => {
      if (res && res.predictions) {
        res.predictions.forEach((p: any) => {
          const foundItem = baseEquip.find((it) => it.name === p.class);
          if (foundItem) {
            foundItem.quantity += 1;
          }
        });
      }
    });
    return baseEquip;
  };

  const placeholderStyle =
    photos.length === 0
      ? [styles.placeholderContainer, styles.placeholderCenter]
      : [styles.placeholderContainer, styles.placeholderTop];

  return (
    <View style={styles.container}>
      <View style={placeholderStyle}>
        <TouchableOpacity onPress={takePhoto} style={styles.placeholderButton}>
          <Text style={styles.placeholderText}>
            Click here to take a picture of your Ambulance.
          </Text>
          <Ionicons name="camera-outline" size={40} color="#333" style={{ marginTop: 8 }} />
        </TouchableOpacity>
      </View>

      {photos.length > 0 && (
        <FlatList
          data={photos}
          keyExtractor={(uri, idx) => uri + idx}
          renderItem={({ item, index }) => {
            const analysisObj = photosAnalysis[index] || {};
            const classes = Object.keys(analysisObj);

            return (
              <View style={styles.imageItemContainer}>
                <Image source={{ uri: item }} style={styles.thumbnail} />
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => removePhoto(index)}
                >
                  <Ionicons name="trash" size={24} color="#333" />
                </TouchableOpacity>

                {classes.length > 0 && (
                  <View style={styles.analysisContainer}>
                    <Text style={styles.analysisTitle}>Image Analysis:</Text>
                    {classes.map((className) => {
                      const confArray = analysisObj[className];
                      const count = confArray.length;
                      const confText = confArray
                        .map((c) => c.toFixed(2))
                        .join(" - ");
                      return (
                        <Text key={className} style={styles.analysisText}>
                          {className} : {count} (Confidence: {confText})
                        </Text>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          }}
          style={styles.flatList}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>Result</Text>
      </TouchableOpacity>

      <EquipmentResults
        visible={showResults}
        onClose={() => setShowResults(false)}
        data={equipmentData}
      />
    </View>
  );
}


