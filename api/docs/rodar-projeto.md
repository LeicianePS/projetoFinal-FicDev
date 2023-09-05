# Rodar o projeto
instalar dependências, na pasta do projeto rode
```bash
npm install
```
---

## Criar ou conectar com o banco:
Verifique no arquivo **src/database/config.js** se suas configurações do seu banco está correto, se não, faça os ajustes se necessário.
<br />
Caso queira criar o banco:
```bash
npx sequelize db:create
```
Caso já tenha o banco rode apenas as migrations:
```bash
npx sequelize db:migrate
```
---

## Popular o banco
Para adicionar alguns dados no banco, criei um script que faz isso para gente, rode:
```bash
npm run populate
```
Verifique no banco se foi adicionado os alimentos.

---
## Rode a API
para rodar nossa API rode o comando:
```bash
npm start
```
nossa API estará rodando localmente em <br />
http://localhost:8080

---
