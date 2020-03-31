# Desenvolver uma página web para consulta a API do [GitHub](https://github.com)

Criar um aplicativo Web para consultar a [API do GitHub](https://developer.github.com/v3/) e trazer os repositórios mais populares de Javascript.
### **Comandos úteis - { comando // o que é executado } ** ###
- yarn build // "gatsby build"
- yarn develop // "gatsby develop"
- yarn format // "prettier --write \"**/*.{js,jsx,json,md}\""
- yarn start // "npm run develop"
- yarn serve // "gatsby serve"
- yarn clean // "gatsby clean"

### **Deve conter** ###

- __Lista de repositórios__. Exemplo de chamada na API: `https://api.github.com/search/repositories?q=language:Javascript&sort=stars&page=1`
  - [x] Paginação na tela de lista, com endless scroll / scroll infinito (incrementando o parâmetro `page`).
  - [x] Input para texto da pesquisa e parâmetro de ordenação.
  - [x] Cada repositório deve exibir Nome do repositório, Descrição do Repositório, Nome / Foto do autor, Número de Stars, Número de Forks
  - [x] Ao clicar em um item, deve levar a lista de Pull Requests do repositório
- __Pull Requests de um repositório__. Exemplo de chamada na API: `https://api.github.com/repos/<criador>/<repositório>/pulls`
  - [x] Cada item da lista deve exibir Nome / Foto do autor do PR, Título do PR, Data do PR e Body do PR
  - [x] Ao clicar em um item, deve abrir no browser a página do Pull Request em questão

### **O projeto DEVE ** ##
- [x] Ser implementada em React/Redux ou Vue/Vuex
- [x] Ser responsiva (mobile-first)
- [x] Ter algum sistema de tipagem (TypeScript/Flow)

### **Ganha + pontos se conter** ###

- [ ] Testes E2E (que naveguem pelo aplicativo como casos de uso).
- [ ] Conter testes unitários
- [ ] Uso da [API GraphQL do Github](https://developer.github.com/v4/)