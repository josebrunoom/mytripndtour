# Etapa de build usando Node.js
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências primeiro (para cache eficiente)
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia os demais arquivos
COPY . .

# Gera o build para produção
RUN npm run build

# Usa uma imagem menor para servir os arquivos estáticos
FROM node:18 AS runtime

# Define o diretório de trabalho
WORKDIR /app

# Instala o servidor estático
RUN npm install -g serve

# Copia os arquivos de build do estágio anterior
COPY --from=build /app/dist /app/dist

# Define a variável de ambiente PORT exigida pelo Cloud Run
ENV PORT=8080

# Expõe a porta 8080
EXPOSE 8080

# Inicia o servidor estático
CMD ["serve", "-s", "dist", "-l", "8080"]