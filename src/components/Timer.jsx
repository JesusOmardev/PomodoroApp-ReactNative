import { View, Text, StyleSheet } from "react-native";

export default function Timer({ time }) {
  /**
   * Varibale que contiene los minutos
   *  Math.floor redondea el resultado a entero
   *  toString convierte el entero a número
   *  padStart, coloca el sting "0"
   */

  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
  },
});
