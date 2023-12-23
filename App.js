import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

let timer = null
let ss = 0
let mm = 0
let hh = 0

export default function App() {
  const [numero, setNumero] = useState(0)
  const [botao, setBotao] = useState("INICIAR")
  const [ultimo, setUltimo] = useState(null)


  function iniciar() {
    if (timer !== null) {
      // AQUI VAI PARAR O TIMER
      clearInterval(timer)
      timer = null
      setBotao('INICIAR')
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0
          mm++
        }

        if (mm == 60) {
          mm = 0
          hh++
        }

        let format =
          (hh < 10 ? '0' + hh : hh) + ":"
          + (mm < 10 ? '0' + mm : mm) + ":"
          + (ss < 10 ? '0' + ss : ss);

        setNumero(format)

      }, 100);
      setBotao("PAUSAR")
    }

  }

  function limpar() {

    if (timer !== null) {
      // parar o timer!
      clearInterval(timer)
      timer = null;
    }
    setUltimo(numero)
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao("INICIAR");
    setNumero("00:00:00");
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}>{numero}</Text>

      {/* 2° VIEW PARTE DOS BOTÕES */}
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={iniciar}>
          <Text style={styles.btnTexto} >{botao}</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto} >LIMPAR</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.areaUltima} >
        <Text style={styles.textoCorrida} >{ultimo ? 'Ultimo tempo: ' + ultimo : ''}</Text>
      </View>


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00aeef',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 45,
    marginTop: -160,
    color: '#fff',
    fontWeight: 'bold',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
    color: 'black',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  areaUltima: {
    backgroundColor: 'black',
    width: 300,
    marginTop: 80,
  },
  textoCorrida: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 15,
  }
});
