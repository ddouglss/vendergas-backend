<h1>🔐 VenderGas - Backend API</h1>

<p>API RESTful para gestão de empresas, produtos, clientes e pedidos, desenvolvida em <strong>Node.js</strong>, com autenticação JWT e autorização baseada em papéis (<code>user</code>, <code>admin</code> e <code>superadmin</code>).</p>

<hr />

<h2>🧰 Tecnologias Utilizadas</h2>
<ul>
  <li>Node.js + Express</li>
  <li>MongoDB + Mongoose</li>
  <li>JWT para autenticação</li>
  <li>Controle de acesso baseado em papéis (RBAC)</li>
  <li>Jest + Supertest para testes</li>
  <li>Docker + Docker Compose</li>
  <li>Railway (Deploy)</li>
</ul>

<hr />

<h2>⚙️ Instalação</h2>

<h3>📁 Clone o Repositório</h3>
<pre><code>git clone https://github.com/ddouglss/vendergas-backend.git
cd vendergas-backend
</code></pre>

<h3>📦 Instale as Dependências</h3>
<pre><code>npm install</code></pre>

<h3>🔑 Configure o <code>.env</code></h3>
<pre><code>JWT_SECRET=VENDERGAS
MONGO_URI=mongodb://localhost:27017/desafio-db
FRONTEND_URL=https://localhost:3000
</code></pre>

<hr />

<h2>🐳 Docker</h2>

<h4>Iniciar com Docker:</h4>
<pre><code>docker-compose up --build</code></pre>

<h4>Ambiente de Produção (exemplo Railway):</h4>
<pre><code>MONGO_URI=mongodb://usuario:senha@host:porta/database?authSource=admin</code></pre>

<hr />

<h2>🔐 Autenticação e Autorização</h2>

<p>O projeto usa <strong>JWT</strong> para autenticação e <strong>middleware de autorização</strong> baseado em <strong>roles</strong>.</p>

<h4>Roles disponíveis:</h4>
<ul>
  <li><code>user</code>: acesso básico</li>
  <li><code>admin</code>: pode criar, editar e excluir recursos da empresa</li>
  <li><code>superadmin</code>: acesso total ao sistema</li>
</ul>

<h4>Middleware de proteção:</h4>
<pre><code>auth        // verifica se o token JWT é válido
authorize('admin') // permite apenas admins
authorize('admin', 'superadmin') // múltiplas permissões
</code></pre>

<p><strong>⚠️ Todas as rotas protegidas exigem envio do JWT no header:</strong></p>
<pre><code>Authorization: Bearer &lt;token&gt;</code></pre>

<hr />

<h2>📡 Endpoints Principais</h2>

<table>
  <thead>
    <tr><th>Método</th><th>Endpoint</th><th>Descrição</th></tr>
  </thead>
  <tbody>
    <tr><td>POST</td><td>/api/auth/register</td><td>Registrar novo usuário</td></tr>
    <tr><td>POST</td><td>/api/auth/login</td><td>Login e geração de token JWT</td></tr>
    <tr><td>POST</td><td>/api/empresas</td><td>Cadastrar empresa</td></tr>
    <tr><td>GET</td><td>/api/empresas</td><td>Listar empresas do usuário</td></tr>
    <tr><td>POST</td><td>/api/produtos</td><td>Criar produto (admin/superadmin)</td></tr>
    <tr><td>PUT</td><td>/api/produtos/:id</td><td>Editar produto</td></tr>
    <tr><td>DELETE</td><td>/api/usuarios/:id?cascade=true</td><td>Excluir usuário e seus dados</td></tr>
  </tbody>
</table>

<hr />

<h2>🧪 Testes com Jest</h2>
<ul>
  <li><strong>Todos:</strong> <code>npm test</code></li>
  <li><strong>Unitários:</strong> <code>npm run test:unit</code></li>
  <li><strong>Integração:</strong> <code>npm run test:integration</code></li>
  <li><strong>Coverage:</strong> <code>npm run test:cov</code></li>
</ul>

<hr />

<h2>🗂️ Estrutura de Pastas</h2>
<pre><code>src/
├── config/        # Configuração, seed e env
├── controllers/   # Controllers das rotas
├── middlewares/   # JWT auth e authorization
├── models/        # Schemas Mongoose
├── routes/        # Arquivos de rotas
├── services/      # Regras de negócio
└── server.js      # Inicialização do app
</code></pre>

<hr />

<h2>🚀 Deploy no Railway</h2>

<p>O projeto está publicado via Docker no Railway.</p>

<h4>Variáveis de ambiente configuradas no painel:</h4>
<ul>
  <li><code>MONGO_URI</code></li>
  <li><code>JWT_SECRET</code></li>
  <li><code>FRONTEND_URL</code></li>
</ul>

<p><strong>Observação:</strong> Railway automaticamente detecta e sobe com <code>start</code> do <code>package.json</code>.</p>

<hr />

<h2>👨‍💻 Autor</h2>
<p>Desenvolvido por <strong><a href="https://github.com/ddouglss" target="_blank">Douglas Souza</a></strong> 🚀</p>
