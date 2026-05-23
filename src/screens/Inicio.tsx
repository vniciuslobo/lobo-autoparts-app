import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

// Nossas categorias para o Slider
const categorias = [
  { id: '1', titulo: 'Manutenção', imagem: 'https://picsum.photos/100?random=1' },
  { id: '2', titulo: 'Performance', imagem: 'https://picsum.photos/100?random=2' },
  { id: '3', titulo: 'Armazenamento', imagem: 'https://picsum.photos/100?random=3' },
  { id: '4', titulo: 'Memória', imagem: 'https://picsum.photos/100?random=4' },
];

export default function Inicio() {
  // Configurando um vídeo público da internet para testes
  const player = useVideoPlayer('https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', player => {
    player.loop = true;
  });

  return (
    <ScrollView style={styles.container}>
      {/* 1. Imagem Padrão do Topo */}
      <Image
        source={require('../../assets/icon.png')} // Pegando o ícone padrão do Expo
        style={styles.imagemTopo}
      />

      {/* 2. Texto Centralizado na tela, mas alinhado à esquerda/justificado */}
      <View style={styles.containerTexto}>
        <Text style={styles.texto}>
          Bem-vindo ao app! Encontre aqui os melhores componentes e serviços para extrair o máximo de velocidade e eficiência do seu equipamento, seja para o dia a dia ou tarefas pesadas.
        </Text>
      </View>

      {/* 3. Reprodutor de Vídeo */}
      <View style={styles.containerVideo}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>

      {/* 4. Slider de Categorias */}
      <Text style={styles.tituloSlider}>Categorias</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categorias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sliderContainer}
        renderItem={({ item }) => (
          <View style={styles.cardCategoria}>
            <Image source={{ uri: item.imagem }} style={styles.imagemCategoria} />
            <Text style={styles.textoCategoria}>{item.titulo}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

// Estilizações
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagemTopo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 20,
  },
  containerTexto: {
    paddingHorizontal: 30, // Isso "empurra" o texto para o centro
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    textAlign: 'justify', // Justificado, conforme você pediu
    color: '#333',
    lineHeight: 24,
  },
  containerVideo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  video: {
    width: 320,
    height: 200,
    borderRadius: 10,
  },
  tituloSlider: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  sliderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Espaço extra para não colar no menu inferior
  },
  cardCategoria: {
    alignItems: 'center',
    marginRight: 15,
  },
  imagemCategoria: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  textoCategoria: {
    fontSize: 14,
    fontWeight: '500',
  },
});