import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { equipmentResultsStyles  as styles } from "../StyleSheet/EquipmentResultsStyles";

type EquipmentItem = {
  name: string;
  quantity: number;
};

type EquipmentResultsProps = {
  visible: boolean;
  onClose: () => void;
  data: EquipmentItem[];
};

//list of equipment
export function EquipmentResults({
  visible,
  onClose,
  data
}: EquipmentResultsProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Ambulance Equipment Status</Text>

          {/* Display each equipment item */}
          {data.map((item) => {
            const hasItem = item.quantity > 0;
            return (
              <View key={item.name} style={styles.card}>
                <View style={styles.cardRow}>
                  <View>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemSubtitle}>
                      {item.quantity} piece{item.quantity > 1 ? "s" : ""}
                    </Text>
                  </View>
                  <Ionicons
                    name={hasItem ? "checkmark-circle" : "close-circle"}
                    size={28}
                    color={hasItem ? "green" : "red"}
                  />
                </View>
              </View>
            );
          })}

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
