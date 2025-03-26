# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Comando para ejecutar el consumidor
CMD ["node", "index.js"]
