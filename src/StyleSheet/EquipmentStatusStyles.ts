import { StyleSheet } from "react-native";

export const equipmentStatusStyles = StyleSheet.create({

    overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    width: "80%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center"
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 2
  },

  cardInfo: {
    flexDirection: "column",
    flex: 1,
    marginRight: 12
  },

  itemName: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2
  },

  itemQuantity: {
    color: "#444",
    fontSize: 14
  },

  closeButton: {
    marginTop: 16,
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#333",
    borderRadius: 4
  },

  closeText: {
    color: "#fff"
  }
});
