# Usa uma imagem do Node.js para construir a aplicação Vue.js
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY package*.json ./
COPY . .

# Instala as dependências e faz o build
RUN npm install --legacy-peer-deps && npm run build

# Usa uma imagem do Node.js para rodar a aplicação Vue.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Instala um servidor estático para servir o Vue.js
RUN npm install -g serve

# Copia os arquivos de build do estágio anterior
COPY --from=build /app/dist /app/dist

# Define a variável de ambiente PORT exigida pelo Cloud Run
ENV PORT=8080

# Expõe a porta 8080 para o Cloud Run
EXPOSE 8080

# Inicia o servidor estático na porta correta
CMD ["serve", "-s", "dist", "-l", "8080"]
