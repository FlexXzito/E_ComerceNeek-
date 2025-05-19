FROM node:18

WORKDIR /app

# 1. Copiamos package.json y package-lock.json (para instalar solo dependencias)
COPY package*.json ./
RUN npm install

# 2. Copimos TODO el código fuente (incluye prisma/schema.prisma)
COPY . .

# 3. Generamos el cliente de Prisma
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
