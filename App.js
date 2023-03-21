import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

export default function App() {
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [resultado, setResultado] = useState(0);
  const [id, setId] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [datosEstudiantes, setDatosEstudiantes] = useState([]);

  const calcularNotaDefinitiva = () => {
    agregarEstudiante();

    if (!nota1 || !nota2 || !nota3 || !nombre || !asignatura) {
      setObservaciones('Todos los datos son obligatorios');
      return;
    }
    const notas = [parseFloat(nota1), parseFloat(nota2), parseFloat(nota3)];
    if (notas.some(nota => isNaN(nota) || nota < 0 || nota > 5)) {
      setObservaciones('Las notas deben estar entre 0 y 5');
      return;
    }
    const definitiva = notas.reduce((total, nota) => total + nota, 0) / notas.length;
    setResultado(+definitiva);

    if (definitiva >= 3) {
      setObservaciones('Aprueba');
    } else if (definitiva >= 2 && definitiva < 2.94) {
      setObservaciones('Habilita');
    } else {
      setObservaciones('Reprueba');
    }
  };
  const agregarEstudiante = () => {
    if (!id || !nombre || !asignatura || !nota1 || !nota2 || !nota3) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const estudiante = {
      id: id,
      nombre: nombre,
      asignatura: asignatura,
      nota1: nota1,
      nota2: nota2,
      nota3: nota3,
      notaFinal: resultado.toFixed(2),
      observaciones: observaciones
    };

    setDatosEstudiantes([...datosEstudiantes, estudiante]);
    alert('Estudiante agregado correctamente');
  };
  const limpiarCampos = () => {
    setId('');
    setNota1('');
    setNota2('');
    setNota3('');
    setNombre('');
    setAsignatura('');
    setResultado(0);
    setObservaciones('');
  };




  const buscarEstudiante = () => {
    const estudianteEncontrado = datosEstudiantes.find(
      estudiante => estudiante.id === id || estudiante.nombre === nombre
    );
    if (estudianteEncontrado) {
      setId(estudianteEncontrado.id);
      setNombre(estudianteEncontrado.nombre);
      setAsignatura(estudianteEncontrado.asignatura);
      setNota1(estudianteEncontrado.nota1);
      setNota2(estudianteEncontrado.nota2);
      setNota3(estudianteEncontrado.nota3);
      setResultado(parseFloat(estudianteEncontrado.notaFinal));
      setObservaciones(estudianteEncontrado.observaciones);
    } else {
      alert('No se encontró al estudiante');
    }
  };
  return (

    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Notas</Text>
      <Text style={styles.label}>Identificación:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
      />
      <Text style={styles.label}>Nombres:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.label}>Asignatura:</Text>
      <TextInput
        style={styles.input}
        value={asignatura}
        onChangeText={setAsignatura}
      />
      <Text style={styles.label}>Nota Momento 1 (20%):</Text>
      <TextInput
        style={styles.input}
        value={nota1}
        onChangeText={setNota1}
      />
      <Text style={styles.label}>Nota Momento 2 (35%):</Text>
      <TextInput
        style={styles.input}
        value={nota2}
        onChangeText={setNota2}
      />
      <Text style={styles.label}>Nota Momento 3 (35%):</Text>
      <TextInput
        style={styles.input}
        value={nota3}
        onChangeText={setNota3}
      />
      <Text style={styles.label}>Definitiva:</Text>
      <Text>{resultado.toFixed(2)}</Text>
      <Text style={styles.label}>Observaciones:</Text>
      <Text>{observaciones}</Text>
      <View style={styles.botones}>
        <Button title="Calcular" onPress={calcularNotaDefinitiva} />
        <Button title="Limpiar" onPress={limpiarCampos} />
        <Button title="Buscar" onPress={() => buscarEstudiante(id, nombre)} />

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
});

