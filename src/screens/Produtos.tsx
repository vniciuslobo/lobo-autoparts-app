import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur'; // O fundo embaçado
import { Ionicons } from '@expo/vector-icons'; // O ícone de X
import { listaProdutos } from '../mocks/ListaProdutos'; // Importando nossos dados

export default function Produtos() {
  // O Estado é como a memória da tela: ele lembra se o modal está aberto ou não, e qual produto foi clicado
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  // Função que roda ao clicar em um produto
  const abrirModal = (produto: any) => {
    setProdutoSelecionado(produto); // Salva qual produto foi clicado
    setModalVisivel(true); // Abre a janela
  };

  // Como cada produto deve ser desenhado na lista
  const renderizarProduto = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.cardProduto} onPress={() => abrirModal(item)}>
      <Image source={{ uri: item.imagem }} style={styles.imagemProduto} />
      {/* numberOfLines={2} evita que nomes muito grandes quebrem o visual */}
      <Text style={styles.nomeProduto} numberOfLines={2}>{item.nome}</Text> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tituloSecao}>Nossos Produtos</Text>
      
      {/* A Lista principal */}
      <FlatList
        data={listaProdutos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarProduto}
        numColumns={2} // Coloca 2 produtos por linha
        columnWrapperStyle={styles.linhaFlatlist}
        contentContainerStyle={styles.listaContainer}
      />

      {/* O Modal (A Janela Pop-up) */}
      <Modal animationType="fade" transparent={true} visible={modalVisivel}>
        {/* BlurView cria o fundo embaçado escuro por trás da janela */}
        <BlurView intensity={40} tint="dark" style={styles.containerBlur}>
          
          {/* Só tenta mostrar as informações se existir um produto selecionado */}
          {produtoSelecionado && (
            <View style={styles.conteudoModal}>
              
              {/* Botão de Fechar (O X no canto superior direito) */}
              <TouchableOpacity style={styles.botaoFechar} onPress={() => setModalVisivel(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>

              {/* Informações do Produto dentro da janela */}
              <Image source={{ uri: produtoSelecionado.imagem }} style={styles.imagemModal} />
              <Text style={styles.categoriaModal}>{produtoSelecionado.categoria}</Text>
              <Text style={styles.nomeModal}>{produtoSelecionado.nome}</Text>
              <Text style={styles.descricaoModal}>{produtoSelecionado.descricao}</Text>
              <Text style={styles.precoModal}>{produtoSelecionado.preco}</Text>

              {/* Botão de Compra Estético */}
              <TouchableOpacity style={styles.botaoComprar}>
                <Text style={styles.textoBotaoComprar}>Comprar Agora</Text>
              </TouchableOpacity>
              
            </View>
          )}
          
        </BlurView>
      </Modal>
    </View>
  );
}

// Estilização para deixar tudo no lugar certo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // Espaço para não bater na barra de status do celular
  },
  tituloSecao: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  listaContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  linhaFlatlist: {
    justifyContent: 'space-around', // Espalha os 2 itens igualmente na linha
    marginBottom: 15,
  },
  
  // Visual do Produto na Lista
  cardProduto: {
    width: '45%', // Pega quase metade da tela, deixando um respiro no meio
    alignItems: 'center',
  },
  imagemProduto: {
    width: '100%',
    aspectRatio: 1, // Essa é a mágica para a imagem ficar 1:1 (quadrada) independente da tela
    borderRadius: 10,
    marginBottom: 8,
  },
  nomeProduto: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: '#333',
  },

  // Visual do Modal (Janela Pop-up)
  containerBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoModal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    // Sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  botaoFechar: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1, // Garante que o botão fique clicável em cima das outras coisas
  },
  imagemModal: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  categoriaModal: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
  },
  nomeModal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  descricaoModal: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  precoModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57', // Um verde bonito para o preço
    marginBottom: 20,
  },
  botaoComprar: {
    backgroundColor: '#007AFF', // Cor azul do iOS
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
  },
  textoBotaoComprar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});