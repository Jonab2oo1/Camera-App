import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { equipmentStatusStyles  as styles } from "../StyleSheet/EquipmentStatusStyles";


type EquipmentItem = {
  name: string;
  quantity: number;
};

type EquipmentStatusProps = {
  visible: boolean;
  onClose: () => void;
  data: EquipmentItem[];
};

//  modal listing equipment items & availability
export function EquipmentStatus({
  visible,
  onClose,
  data
}: EquipmentStatusProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>Ambulance Equipment Status</Text>

          {data.map((item) => {
            const isAvailable = item.quantity > 0;
            return (
              <View key={item.name} style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>
                    {item.quantity} piece{item.quantity > 1 ? "s" : ""}
                  </Text>
                </View>
                <Ionicons
                  name={isAvailable ? "checkmark-circle" : "close-circle"}
                  size={24}
                  color={isAvailable ? "green" : "red"}
                />
              </View>
            );
          })}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
