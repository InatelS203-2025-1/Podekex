<h1>
  <img src="https://icon-library.com/images/pokedex-icon/pokedex-icon-19.jpg" width="60" style="vertical-align: middle; margin-right: 15px;" />
  Podékex 
</h1>

 

Este projeto consiste em uma aplicação web para visualização e gerenciamento de uma Pokédex, desenvolvida com:

- Front-end: React + Tailwind CSS
- Back-end: FastAPI
- Banco de dados: JSON local com os 151 primeiros Pokémons
<br>

## Modelos Arquiteturais

1. Arquitetura do Frontend: **SPA** (Single Page Application)
Optamos pelo modelo SPA para garantir:

- Experiência fluida e rápida, sem recarregamento de páginas.
- Separação clara entre apresentação (frontend) e lógica de negócios (backend).
- Facilidade de manutenção e escalabilidade.

A aplicação React é responsável por:

- Gerenciar estado e interface.
- Fazer requisições HTTP à API backend para consumir e manipular os dados.
- Renderizar dinamicamente os componentes com base no estado global.

2. Arquitetura do Backend: **SOA** (Service-Oriented Architecture)
A API RESTful foi construída com FastAPI utilizando o padrão SOA, garantindo:

- Separação clara das responsabilidades por domínio.
- Serviços modulares e independentes.
- Facilidade para evolução e manutenção da aplicação.

O backend possui:

- Camada de API: expõe os endpoints.
- Camada de Service: contém a lógica de negócios (ex.: marcação de pokémons como vistos).
- Camada de Model: define a estrutura dos dados com Pydantic.
- Camada de Dados: simula persistência com um arquivo pokemons.json.
<br>

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com) (Menu)
- [Heroicons](https://heroicons.com)
- [FastAPI](https://fastapi.tiangolo.com)
- [Pydantic](https://docs.pydantic.dev/latest/)
- [Uvicorn](https://www.uvicorn.org)
- [Axios](https://axios-http.com/ptbr/)
<br>

## Estrutura das pastas

```
/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── data/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
├── docs/
│   ├── casos de uso/
│   ├── uml/
│   └── diagrama arquitetural/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Modal/
│   │   │   └── PokemonCard/
│   │   ├── Home/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
└── README.md
```
<br>

## Pré-requisitos

- Node.js (v18+)
- Python 3.9+
- pip
<br>

## Clone o repositório
```bash
git clone https://github.com/InatelS203-2025-1/Podekex.git
```
<br>

## Backend

1. Navegue até o diretório backend:
```bash
cd backend
```

2. (Opcional) Crie e ative um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Execute o servidor:
```bash
uvicorn app.main:app --reload
```
Por padrão, rodará em: http://localhost:8000
<br>
<br>

### Estrutura do backend

- 📁 api/: define rotas
- 📁 models/: define o schema com Pydantic
- 📁 services/: lógica de negócios
- 📁 data/: arquivo pokemons.json
- 📄 main.py: ponto de entrada da aplicação
<br>

### Endpoints principais

| Método | Rota                    | Descrição                    |
| ------ | ----------------------- | ---------------------------- |
| GET    | /api/pokemons           | Lista todos os pokémons      |
| GET    | /api/pokemons/seen      | Lista os pokémons vistos     |
| GET    | /api/pokemons/deck      | Lista os pokémons no baralho |
| POST   | /api/pokemons/{id}/seen | Marca como visto             |
| POST   | /api/pokemons/{id}/deck | Adiciona ao baralho          |
| DELETE | /api/pokemons/{id}/deck | Remove do baralho            |

Acesse http://localhost:8000/docs para a documentação interativa (Swagger UI).
<br>
<br>

## Frontend

1. Navegue até o diretório frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```
Por padrão, rodará em: http://localhost:5173
<br>
<br>

### Estrutura do frontend

- 📁 components/: Componentes reutilizáveis (Header, Modal, PokemonCard)
- 📁 Home/: Página principal
- 📁 api/: Configuração do Axios para consumir a API
- 📁 data/: (não mais usado, agora os dados vêm da API)
<br>

### Funcionalidades

- Busca de pokémons por nome ou ID.
- Filtros: Todos, Vistos, Baralho.
- Modal com informações detalhadas ao clicar.
- Marcar como visto ao interagir.
- Adicionar ou remover pokémons do baralho
<br>
<br>

## Integração Front ↔ Back

- O front consome os dados da API via Axios.
- As ações (marcar como visto, adicionar/remover do baralho) são feitas via requisições POST/DELETE.
- Middleware CORS configurado no FastAPI para permitir conexão com React (localhost:5173).
