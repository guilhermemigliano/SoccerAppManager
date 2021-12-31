# SoccerApp Manager

Projeto desenvolvido utilizando a plataforma **Expo** para criação de um aplicativo multiplataforma (Android & iOS) para gerenciar partidas de futebol entre amigos.

## Sobre o Expo

Expo é um framework e uma plataforma universal para aplicações React. É um conjunto de ferramentas e serviços criados em torno de plataformas React Native e nativas que ajudam a desenvolver, construir, implantar e iterar rapidamente em aplicativos iOS, Android e web a partir da mesma base de código JavaScript / TypeScript.

Para saber mais sobre o Expo e React Native, acessar:
- [Expo](https://expo.dev) 
- [React Native](https://reactnative.dev)


## Termos de uso

Não há. Todo o código está disponível para uso livre conforme necessidade. **Para melhor entendimento do funcionamento leia as instruções de uso e como instalar.**

**Todas as imagens do aplicativo foram retiradas da internet e seu uso não pode ser comercializado**


## Instalação

1. Realizar a instalação do Node.js. Acessar o site oficial abaixo para realizar o download:
- [NodeJS](https://nodejs.org/en/)
2. Instalação da plataforma Expo.
```bash
$ npm install --global expo-cli
```
3. Dentro da pasta do projeto (SoccerApp Manager) realizar o seguinte comando para baixar as dependências utilizadas no projetos
```bash
$ cd SoccerApp Manager <--- Entrar com o terminal dentro da pasta do projeto
$ npm install
```

4. Após instalar todos os pacotes, realizar o comando abaixo para iniciar o projeto:
```bash
$ npm start
```

Após executar o comando ``npm start`` será aberta uma página web com um terminal e com opções para executar os emuladores.

**Importante lembrar que para rodar os  emuladores iOS e Android, você precisa ter instalado o Xcode e o Android Studio em sua máquina.**


## Instruções de uso

O aplicativo utiliza o banco de dados do ``Firebase`` para armazenar os dados das partidas dentre outros dados necessários para funcionamento do aplicativo. Abaixo é mostrado onde é necessário colocar as configurações do firebase e como criar um banco de dados.

### Firebase 
1. Acessar o site do [Firebase](https://console.firebase.google.com/)
2. Após efetuar o login, clique em ``Criar um Projeto``
3. Dê um nome para seu projeto e clique em continuar
4. Desative a opção de ``Ativar o Google Analytics nesse projeto`` e clique em ``criar projeto``
5. Após criar o projeto, clique em ``Firestore Database`` e, em seguida, ``criar banco de dados``
6. Deixe em ``modo de produção`` e selecione a localidade como ``SouthAmerica-east1`` ou qualquer outra que desejar.
7. Após ativar seu banco de dados, altere na aba ``Regras`` para o seguinte código:
```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
8. Na aba dados, crie duas coleções com os seguintes nome (**Ambas as coleções com o código do documento automático**):
- Matches
- Players

9. Feito isso, seu banco de dados para o aplicativo está pronto! Agora siga os passos abaixo para inserir seus dados do firebase no aplicativo. 

### Adicionando configuração do firebase no Aplicativo

1. Na página do firebase, clique em configurações do projeto. Esta opção pode ser encontrada clicando no ícone de engrenagem. 
2. Copie o código gerado conforme mostrado abaixo (este é um código exemplo):
```bash
const firebaseConfig = {
  apiKey: "AIdghtTAO-8123zdn-dcgNQnquYtFDssC8usL0",
  authDomain: "nome-do-projeto.firebaseapp.com",
  databaseURL: "https://nome-do-projeto-default-rtdb.firebaseio.com",
  projectId: "nome-do-projeto",
  storageBucket: "nome-do-projeto.appspot.com",
  messagingSenderId: "18234234235",
  appId: "1:185312311235:web:3d9513123e01230366576"
};
```



3. Dentro da pasta do aplicativo, procure pela pasta ``config``e abra o arquivo firebase.js.
4. Altere o código:
```bash
const firebaseApp = initializeApp({})
```
para o seu código de configuração.



### Alterando usuário e senha para acesso de administrador 

1. No arquivo ``AuthContext.js`` localizado na pasta config do aplicativo, possui o seguinte trecho de código:
```bash
const USER = 123
const PASSWORD = 123
```

Altera as ``const`` para o valor que desejar 

**Após realizar as configurações, reinicie o aplicativo caso ele esteja rodando. Utilize ``ctrl + c `` para parar a aplicação e, em seguida, o comando ``npm start``para rodar novamente.** 

## Funcionalidades

- Adicionar um jogador (necessário realizar login de adminstrador)
- Adicionar um goleiro (necessário realizar login de adminstrador)
- Desabilitar um jogador (necessário realizar login de adminstrador)
- Habilitar um jogador (necessário realizar login de adminstrador)
- Criar uma nova partida (necessário realizar login de adminstrador)
- Editar uma partida criada (necessário realizar login de adminstrador)

- Visualizar um ranking de gols (Ranking total de gols e gols contra, ranking por ano de gols e gols contra)
- Visualizar resultado das partidas

## Gif (Demonstração do aplicativo)

Adicionando um jogador           |  Selecionando jogadores de uma partida | Adicionando gols na partida | Criando uma partida          
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif1.gif?raw=true)  |  ![](https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif2.gif?raw=trueg) | ![](https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif3.gif?raw=true) |![](https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif4.gif?raw=true)

<img src="https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif1.gif?raw=true" width="300" height="649" />
<img src="https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif2.gif?raw=true" width="300" height="649" />
<img src="https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif3.gif?raw=true" width="300" height="649" />
<img src="https://github.com/guilhermemigliano/SoccerAppManager/blob/main/assets/gifs/gif4.gif?raw=true" width="300" height="649" />

