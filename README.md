<h1>
  <img src="https://icon-library.com/images/pokedex-icon/pokedex-icon-19.jpg" width="60" style="vertical-align: middle; margin-right: 15px;" />
  Podékex 
</h1>

 

Este projeto consiste em uma aplicação web para visualização e gerenciamento de uma Pokédex, desenvolvida com:

- Front-end: React + Tailwind CSS
- Back-end: FastAPI
- Banco de dados: JSON local com os 386 Pokémons
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

## Design Patterns

1. Singleton

```javascript
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getPokemons = () => api.get('/pokemons');
```
Utilizamos o padrão Singleton no frontend ao criar uma única instância da API com axios. Isso garante que todas as requisições HTTP da aplicação utilizem a mesma configuração de baseURL e facilita a manutenção e extensão.

2. Facade

```javascript
// PokemonService.js
import API from "../api/api";

const PokemonService = {
  async getAllPokemons() {
    const response = await API.get("/pokemons");
    return response.data;
  },

  async markAsSeen(id) {
    return API.post(`/pokemons/${id}/seen`);
  },

  async toggleDeck(id, inDeck) {
    const method = inDeck ? "delete" : "post";
    return API[method](`/pokemons/${id}/deck`);
  }
};

export default PokemonService;
```
Criamos um arquivo chamado **PokemonService.js**, que atua como uma fachada para todas as operações assíncronas da aplicação relacionadas a pokémons, como:
- Buscar todos os pokémons (**getAllPokemons**)
- Marcar como visto (**markAsSeen**)
- Adicionar ou remover do baralho (**toggleDeck**)

3. Observer (implícito)

```javascript
// No componente Home.jsx, usamos o useState para armazenar a lista de pokémons:
const [pokemons, setPokemons] = useState([]);

// E usamos useEffect para "observar" mudanças no ciclo de vida do componente e buscar os dados:
useEffect(() => {
  PokemonService.getAllPokemons()
    .then(data =>
      setPokemons(data.map(p => ({
        ...p,
        image: `https://img.pokemondb.net/sprites/home/normal/${p.name.toLowerCase()}.png`,
      })))
    )
    .catch(err => console.error("Erro ao carregar pokémons", err));
}, []);
```

Embora o React não implemente explicitamente o padrão Observer como em bibliotecas como RxJS, seu funcionamento interno segue esse padrão de forma implícita, especialmente com o uso de **useState** e **useEffect**.

4. Strategy

```javascript
const filterStrategies = {
  todos: () => true,
  vistos: (p) => p.viewed,
  baralho: (p) => p.on_deck,
};

const filtered = pokemons
  .filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pokemon.id.toString().includes(searchTerm);
    return matchesSearch && filterStrategies[filter](pokemon);
  });

```  

Na tela principal da Pokédex, o usuário pode filtrar os pokémons exibidos por três critérios: Todos, Vistos e Baralho. Antes, essa lógica de filtragem estava acoplada diretamente ao método de filter(), o que tornava o código menos legível e difícil de expandir.

Solução aplicada:
Refatoramos o código utilizando o padrão de projeto **Strategy**, que encapsula diferentes estratégias de filtragem em funções independentes, facilitando a manutenção e expansão.

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
