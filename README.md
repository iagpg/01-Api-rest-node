<h1>Projeto Node.js</h1> <p>Este projeto foi desenvolvido com o objetivo de aprofundar o conhecimento em <strong>APIs REST</strong> e manipulação de comandos SQL.
 Utilizando <strong>Node.js</strong> com <strong>TypeScript</strong> e o banco de dados serverless <strong>SQLite</strong>,
 ele se destaca pelo uso do query builder <strong>Knex</strong> para construção dinâmica de consultas SQL.

>[!NOTE]
>Para garantir a consistência do código, foi implementado o **ESLint**, responsável pela padronização e melhoria das práticas de desenvolvimento. utilize o comando "run lint" para formatar o projeto.

<h2>Novos Recursos</h2>
<h4>Adicionamos novos recursos e melhorias para facilitar o desenvolvimento:</h4>

- **Arquivo `env.example`**: Modelo de configuração para variáveis de ambiente.
- **Query Builder `Knex`**: Ferramenta para construir consultas SQL de forma intuitiva e flexível.
- **Biblioteca `dotenv`**: Agora é possível utilizar variáveis de ambiente via `process.env`.
- **Validação com `Zod`**: Implementamos a biblioteca `Zod` para garantir a validação das variáveis de ambiente.
- **Comandos de Migração**: Para executar migrações com TypeScript(com knex), utilize o comando:
```javascript
npm run knex -- migrate:make create-document-table
```

