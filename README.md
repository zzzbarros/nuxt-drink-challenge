# Desafio Front-end - Faster

## Requisitos técnicos
- [x] Criar documentação para a execução e apresentação do projeto no README
- [x] Utilizar typescript;
- [x] Criar nome para aplicação;
- [x] Tratamento básicos de erros da API
- [x] Fácil de buildar e executar a aplicação para testes (Instruções ao final do readme).

### Features Obrigatórias
- [x] Dado que sou um usuário eu quero visualizar as categorias de bebidas:
    - [x] Ao escolher uma categoria eu devo visualizar a lista das bebidas dessa categoria.
- [x] Dado que sou um usuário eu quero ver os detalhes da bebida: 
  - [x] Apresentar a imagem da bebida escolhida.
  - [x] Apresentar a instrução da bebida escolhida.
- [x] Dado que sou um usuário eu quero pesquisar uma bebida específica através de um campo de busca.
- [x] Dado que sou um usuário eu quero pesquisar uma bebida específica e filtrar por categoria.
  - Obs: devido a indisponibilida de combinar queries via api, foi feito a categoria e apartir dos resultados é feito um filtro no front-end pela palavra chave.
     

### Features Incrementais (Bônus)
  - [x] Apresentar os ingredientes da bebida escolhida.
      - [x] Apresentar medida dos ingredientes    
  - [x] Apresentar a categoria da bebida escolhida. 
  - [x] Apresentar modal.
    - [x] Fechar modal ao apertar o 'ESC' no teclado. 
    - [x] Fechar modal clicando no overlay (fora do modal).
  - [x] Filtrar resultados 5 segundos após usuário parar de digitar. 
    - [x] Criado utilitário de debounce para ser reutilizado na aplicação.
  - [x] Limpar campo de pesquisa via botão de lixeira 
  - [x] Dado que sou um usuário esperando a lista de bebidas carregar, quero ver um esqueleto do card durante o carreamento.
  - [x] Dado que sou um usuário acessando a lista de bebidas e ocorre um erro ao carregar um imagem, vejo a mensagem 'imagem não encontrada'.


### Opcionais
- [x] Aplicação deve ser responsiva;
- [ ] Escrever testes
    - [x] Testar debounce composable
    - [ ] Testar componentes de UI

### Observação
#### UX/ UI
- [x] Por se tratar de um desafio envolvendo drink's o design foi inspirado em bares e modo noturno.  
- [x] Paleta de cores escolhida com base na Faster, acresentado apenas alguns tons de cinza.
- [x] Criação de váriaveis da paleta de cores, tokens de espaçamento, mixins de breakpoint e utilitários de estilo.

# Instruções para iniciar o Projeto:
Saiba mais em: [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Faça a instalação das dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Inicie o servidor de desenvolvimento em `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

