import { StyleSheet } from "react-native";

export const equipmentResultsStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#555"
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 16,
    backgroundColor: "#333",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
