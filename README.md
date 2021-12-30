# SoccerApp Manager

Projeto desenvolvido utilizando a plataforma **Expo** para criação de um aplicativo multiplataforma (Android & iOS) para gerenciar partidas de futebol entre amigos.

## Sobre o Expo

Expo é um framework e uma plataforma universal para aplicações React. É um conjunto de ferramentas e serviços criados em torno de plataformas React Native e nativas que ajudam a desenvolver, construir, implantar e iterar rapidamente em aplicativos iOS, Android e web a partir da mesma base de código JavaScript / TypeScript.

Para saber mais sobre o Expo e React Native, acessar:
- [Expo](https://expo.dev) 
- [React Native](https://reactnative.dev)


## Termos de uso

Não há. Todo o código está disponível para uso livre conforme necessidade. **Para melhor entendimento do funcionamento leia as instruções de uso e como instalar.**


## Instalação

1. Realizar a instalação do Node.js. Acessar o site oficial abaixo para realizar o download:
- [NodeJS](https://nodejs.org/en/)
2. Instalação da plataforma Expo.
```
$ npm install --global expo-cli
```
3. Dentro da pasta do projeto (SoccerApp Manager) realizar o seguinte comando para baixar as dependências utilizadas no projetos
```
$ cd SoccerApp Manager <--- Entrar com o terminal dentro da pasta do projeto
$ npm install
```

4. Após instalar todos os pacotes, realizar o comando abaixo para iniciar o projeto:
```
$ npm start
```

Após executar o comando ```npm start``` será aberta uma página web com um terminal e com opções para executar os emuladores.

**Importante lembrar que para rodar os  emuladores iOS e Android, você precisa ter instalado o Xcode e o Android Studio em sua máquina.**


## Funcionalidades

- Adicionar um jogador (necessário realizar login de adminstrador)
- Adicionar um goleiro (necessário realizar login de adminstrador)
- Desabilitar um jogador (necessário realizar login de adminstrador)
- Habilitar um jogador (necessário realizar login de adminstrador)
- Criar uma nova partida (necessário realizar login de adminstrador)
- Editar uma partida criada (necessário realizar login de adminstrador)

- Visualizar um ranking de gols (Ranking total de gols e gols contra, ranking por ano de gols e gols contra)
- Visualizar resultado das partidas
