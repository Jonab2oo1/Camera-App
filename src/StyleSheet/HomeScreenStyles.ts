import { StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  placeholderContainer: {
    width: "90%",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 24,
    alignSelf: "center"
  },
  placeholderCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  placeholderTop: {
    marginBottom: 10
  },
  placeholderButton: {
    justifyContent: "center",
    alignItems: "center"
  },
  placeholderText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center"
  },
  flatList: {
    marginVertical: 10,
    marginBottom: 100 
  },
  imageItemContainer: {
    position: "relative",
    marginBottom: 15,
    alignItems: "center"
  },
  thumbnail: {
    width: 360,
    height: 300,
    borderRadius: 8
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 30,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    padding: 6
  },
  button: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#FF3C3C",
    paddingVertical: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 14
  },
  analysisContainer: {
    marginTop: 8,
    width: 360,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 8
  },
  analysisTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16
  },
  analysisText: {
    fontSize: 14,
    color: "#333"
  }
});
