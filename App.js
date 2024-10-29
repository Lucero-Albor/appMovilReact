import React, { useEffect, useState, useRef } from 'react';
import {ImageBackground, Text, SafeAreaView, Button, StyleSheet, Image, View, Alert, FlatList, Animated} from 'react-native';
import { Card } from 'react-native-paper';
//Para poder pasar de ventana, se importan estas dos librerías, las de Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//fondos de pantalla
import background1 from './assets/fondoApp.png';
import background2 from './assets/fondoApp2.png';

const DATA = [
  {
    id: '1',
    title: 'Logos', 
    imagen: require('./assets/logos.png'),
    descripcion: 'Diseño imagen corporativa', 
    precio: '$500' ,
  },
  {
    id: '2',
    title: 'Carteles', 
    imagen: require('./assets/carteles.png'),
    descripcion: 'Lamina diseña con información', 
    precio: '$200' ,
  },
  {
    id: '3',
    title: 'Tarjetas presentación', 
    imagen: require('./assets/tarjeta.png'),
    descripcion: 'Diseño de tarjeta personal', 
    precio: '$150' ,
  },
  {
    id: '4',
    title: 'Folletos', 
    imagen: require('./assets/folletos.png'),
    descripcion: 'Diseño para hoja impresa para doblado', 
    precio: '$100' ,
  },
  {
    id: '5',
    title: 'Invitaciones', 
    imagen: require('./assets/invitaciones.png'),
    descripcion: 'Diseño de plantilla para tus reuniones', 
    precio: '$150' ,
  },  
];

const productos = ({ item }) => (
  <Card style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
    <Image source={item.imagen} style={styles.imagenC} />
    <Text style={styles.textoT}>{item.descripcion}</Text>
    <Text style={styles.textoT}>{item.precio}</Text>
  </Card>
);

const contacto = ({ item }) => (
  <Card style={styles.contact}>
    <Text style={styles.text_cont}>{item.title}</Text>
    <Image source={item.imagen} style={styles.img_cont} />
  </Card>
);

const Info = [
{
    id: '1',
    title: 'Chrisalis Design',
    imagen: require('./assets/facebook.png'),
  },
  {
    id: '2',
    title: '@Chrisalis_Design',
    imagen: require('./assets/x.png'),
  },
  {
    id: '3',
    title: '@Chrisalis_Design_oficial',
    imagen: require('./assets/insta.jpg'),
  },
  {
    id: '4',
    title: '(+52) 473-111-2233',
    imagen: require('./assets/guasap.jpg'),
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
  
);

// or any files within the Snack
import AssetExample from './components/AssetExample';

const image = {uri: background1};
//Esta es la parte principal del código, aquí está la página principal

function Principal({ navigation }) {
  const [texto, setTexto] = useState('');
  const [info, setinfo] = useState('');
  
  const Datos  = (texto, info) => {
    setTexto(texto);
    setinfo(info);
  };

  const animacion = useRef(new Animated.Value(0)).current;

  const translateX = animacion.interpolate({
    inputRange: [0, 1],
    outputRange: [-90, 250],
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animacion, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animacion, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animacion]);

  return (
    <ImageBackground source={background1} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Animated.View style={[styles.cuadro, { transform: [{ translateX }] }]} />
          <Button 
            color="#020202"
            title="Misión" 
            onPress={() => Datos
            (
              'Misión', 
              'Nuestra misión es brindar un enfoque personalizado, con atención al detalle a las empresas a través del diseño digital por medio el uso de herramientas y tecnologías de vanguardia para garantizar resultados de alta calidad.'
            )}
          />

          <Button 
            color="#020202"
            title="Visión" 
            onPress={() => Datos
            (
              'Visión', 
              'Transformar la experiencia digital a través de la creatividad y el diseño, ofreciendo soluciones visuales que conecten de manera significativa con nuestros clientes y audiencias. Formar un lugar de trabajo, en donde nuestro personal se inspire para dar lo mejor de sí. '
            )} 
          />

          <Button 
            color="#020202"
            title="Valores" 
            onPress={() => Datos
            (
              'Valores', 
              'Prueba, donde la responsabilidad y la dedicación son parte de nosotros.' 
            )} 
          />

          <Button  
            title="Informacion de contacto" 
            color="#020202" 
            onPress={() => navigation.navigate('Información')} 
          />

          <Button  
            title="Catálogo de producto" 
            color="#020202" 
            onPress={() => navigation.navigate('Catálogo')} 
          />

          <Text>{texto}</Text>
          <Text>{info}</Text>
        </Card>     
      </SafeAreaView>
    </ImageBackground>
  );
}

function Informacion({ navigation }){
  return(
    <ImageBackground source={background2} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph1}>Contáctanos</Text>
        <FlatList style={styles.flatListR}
          data={Info}
          renderItem={contacto}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

function CatalogoPro({ navigation }) {
  return (
    <ImageBackground source={background2} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph1}>Conoce nuestros productos</Text>
        <FlatList
          data={DATA}
          renderItem={productos}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

//Aquí se crea el como se van a estar direccionando las funciones gracias a Navigator
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      Alert.alert( '¡Bienvenido! :D', 'Visite nuestros productos');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <ImageBackground source={background1} style={styles.image}>
          <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Chrisalis Design" component={Principal} />
            <Stack.Screen name="Información" component={Informacion} />
            <Stack.Screen name="Catálogo" component={CatalogoPro} />
        </Stack.Navigator>
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    textAlign:'center',
  },

 image: {
    flex: 1,
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
    width:360,
    height:800,
  },

  imagenC:{
    flex: 1,
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
    width:300,
    height:200,
  },

  card:{
    backgroundColor: '#fffff',
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center', 
  },

  contact:{
    backgroundColor: '#e3e3e3',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },

  img_cont:{
    marginTop:-30,
    width: 60,
    height: 50,
    justifyContent: 'left',
  },

  text_cont:{
    marginTop:15,
    marginLeft: 80,
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },

  item: {
    backgroundColor: '#CCCCCC',
    padding: 20,
    marginVertical:8,
    marginHorizontal: 40,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
  },

  textoT: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center',
  },

  paragraph1: {
    marginTop: 10,    
    fontSize: 45,
    fontWeight: 'bold',
    color:'#ffffff',
   textAlign:'center',
  },

  flatListR:{
    marginTop:50,
  },

  cuadro: {
    width: 20,
    height: 20,
    backgroundColor: 'yellow',
  },
});
