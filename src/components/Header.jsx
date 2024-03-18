import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

/**
 * El header debería solo de tener las opciones de cambiar entre tabs
 * Para ello creamos el arreglo Options
 */
const options = ["Pomodoro", "Shor Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime }) {
  // Función que me ayuda a validar el item que selecciono el usuario
  function handlePress(index) {
    // constante que contendra la cantidad de minutos dependiendo el item seleccionado.
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index); // Actualizo el valor del tiempo
    setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index && { borderColor: "transparent" },
          ]}
        >
          <Text style={{fontWeight:"bold", color:"white"}}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33.3%",
    borderWidth: 3,
    padding: 5,
    alignItems:"center",
    borderRadius:10,
    borderColor:"white",
    marginVertical:20
  },
});
