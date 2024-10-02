<h1>Projeto Node.js</h1> <p>Este projeto foi desenvolvido com o objetivo de aprofundar o conhecimento em <strong>APIs REST</strong> e manipulação de comandos SQL.
 Utilizando <strong>Node.js</strong> com <strong>TypeScript</strong> e o banco de dados serverless <strong>SQLite</strong>,
 ele se destaca pelo uso do query builder <strong>Knex</strong> para construção dinâmica de consultas SQL.

>[!NOTE]
>Para garantir a consistência do código, foi implementado o **ESLint**, responsável pela padronização e melhoria das práticas de desenvolvimento. utilize o comando `run lint` para formatar o projeto.


<h4>O projeto tem como objetivo facilitar o controle de dieta. Cada usuário pode criar, deletar e visualizar suas refeições cadastradas.</h4>

<h3> Requisitos Funcionais </h3>

- [x] O usuário pode criar uma nova refeição contendo nome, descrição e definir se a refeição está dentro ou fora da dieta.
- [x] O usuário deve poder listar todas as refeições criadas
- [x] o usuário pode visualizar uma refeição específica
- [x] O usuário deve obter um resumo das refeições:


<h3> Regras de Negócio </h3>

- [x] O usuário so pode visualizar refeições que pertence a ele.
- [x] Deve ser possível identificar os usuários entre as requisições.
 
  </br>
<h2>Novos Recursos (23/09)</h2>
<h4>Adicionamos novos recursos e melhorias para facilitar o desenvolvimento:</h4>

- **Arquivo `env.example`**: Modelo de configuração para variáveis de ambiente.
- **Biblioteca `dotenv`**: Agora é possível utilizar variáveis de ambiente via `process.env`.
- **Validação com `Zod`**: Implementamos a biblioteca `Zod` para garantir a validação das variáveis de ambiente.
- **Comandos de Migração**: Para executar migrações com TypeScript(com knex), utilize o comando:
```javascript
npm run knex -- migrate:make create-document-table
```
</br>
<h2> ✨ Updates! (24/09) </h2> 
</br>

- adicionado cookies e sessionId para identificar e autorizar a gerenciamento das refeições
- tratativa de erro caso o acesso seja negado quando é feita uma requisição sem a session_id
- middlewares adicionados
- apis com o connceito crud foram adicionadas
- teste unitário: testes 2n2 criado

</br>
<h2> 🔔 última atualização  (2/10) </h2>
</br>

- foi adicionado um summário onde mostra algumas métricas para o acompanhamento mais detalhado das refeições
- Quantidade total de refeições registradas
- Quantidade total de refeições dentro da dieta e fora da dieta
- Melhor sequência de refeições dentro da dieta
- consumo total de refeições totais, fora e dentro da dieta.
- O projeto foi apartado em dois ambientes, desenvolvedor e produção(produção usa Postgre, e o desenvolvimento Sqlite)
- Deploy do projeto em produção usando o PaS, o [Render](https://www.render.com)

  
