import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

// Colores de las Tabs
const colors = ["#F1DAC4", "#A69CAC", "#474973"];

export default function App() {
  // Variable de estado del cronometro
  const [isWorking, setIsWorking] = useState(false);
  // Varibale para el tiempo
  const [time, setTime] = useState(25 * 60);
  // Varible para conocer el tab en el que estamos.
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK"); // Toma el valor de pomo por defecto.
  // Variable que tiene el estado del botón para inciar o detener
  const [isActive, setIsActive] = useState(false);

  /**
   * UseEffect es un hook de react el cual permite acceder a los ciclos de vida de un componente.
   */

  useEffect(() => {
    let interval = null;
    if (isActive) {
      //Correr el cronometro
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      // Limpiar interval
      clearInterval(interval);
    }

    // Cuando el cronometro llegue a cero
    if (time === 0) {
      setIsActive(false);
      // Cambia el estado previo
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }
    // Limpiamos el interval
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Cambia el estado del boton stop o start
  function handleStartStop() {
    PlaySound();
    setIsActive(!isActive);
  }

  async function PlaySound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/interface-124464.mp3")
    );
    await sound.playAsync();
  }

  return (
    // <SafeAreaView style={styles.container}> // Componente solo para IOs, evita que la aplicacion aborde los iconos de una aplicacion.
    //  Platform ayuda a condicionar el estilo con forme al SO
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          borderWidth: 3,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 30,
          backgroundColor: colors[currentTime],
          height: "100%",
        }}
      >
        <Text style={styles.text}>Pomodoro App</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
