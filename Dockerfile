FROM node:20-alpine

WORKDIR /usr/src/app

# Instalar OpenSSL 3.x para Prisma
RUN apk add --no-cache openssl

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm install

# Generar el cliente de Prisma
RUN npx prisma generate

# Copiar el resto del código
COPY . .

EXPOSE 3000

# Esperar a que la base de datos esté lista y ejecutar migraciones
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
