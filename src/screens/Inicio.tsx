import React from 'react';
import { View, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useNavigation } from '@react-navigation/native';
import Texto from '../components/Texto';

// Nossas categorias para o Slider
const categorias = [
  { id: '1', titulo: 'Performance', imagem: 'https://www.shutterstock.com/image-photo/dynamic-dramatic-visual-fastmoving-car-600nw-2661716411.jpg' },
  { id: '2', titulo: 'Manutenção', imagem: 'https://img.odcdn.com.br/wp-content/uploads/2024/12/oleo-motor-carro-1920x1080.jpg' },
  { id: '3', titulo: 'Elétrica', imagem: 'https://www.minutoseguros.com.br/blog/wp-content/uploads/2019/01/el%C3%A9trica-automotiva.jpg' }
];

export default function Inicio() {
  const navigation = useNavigation<any>();

  const player = useVideoPlayer(
    require('../../assets/video.mp4'),
    (player) => {
      player.loop = true;
      player.muted = true;
    }
  );

  return (
    <ScrollView style={styles.container}>
      {/* 1. Imagem Padrão do Topo */}
      <Image
        source={require('../../assets/logo1.png')}
        style={{ width: 280, height: 110, alignSelf: 'center', marginTop: 70, marginBottom: 25}}
        resizeMode="contain"
      />

      <View style={styles.containerTexto}>
        <Texto>
          Em nossa loja, motor não é só peça, é paixão. Somos especializados na venda de peças de preparação e manutenção automotiva, com foco em desempenho, confiabilidade que só quem tem aquela alma turbinada entende.
        </Texto>
        <Texto>
          Trabalhamos com carros de rua, pista e projetos personalizados. Gostamos de elevar o nível, aqui cada produto possui alma de entusiasta.
        </Texto>
      </View>

      {/* Vídeo */}
      <View style={styles.containerVideo}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
          nativeControls={true}
        />
      </View>

      {/* Slider de Categorias */}
      <Texto style={styles.tituloSlider}>Categorias</Texto>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categorias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sliderContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cardCategoria} onPress={() => navigation.navigate('Produtos')}>
            <Image source={{ uri: item.imagem }} style={styles.imagemCategoria} />
            <Texto style={styles.textoCategoria}>{item.titulo}</Texto>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerTexto: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  containerVideo: {
    alignItems: 'center',
    marginBottom: 25,
  },
  video: {
    width: 330,
    height: 187
  },
  tituloSlider: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 25,
    textAlign: 'center'
  },
  sliderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  cardCategoria: {
    alignItems: 'center',
    marginRight: 20
  },
  imagemCategoria: {
    width: 150,
    height: 110,
    borderRadius: 5,
    marginBottom: 5
  },
  textoCategoria: {
    fontSize: 16,
    fontWeight: '500'
  },
});