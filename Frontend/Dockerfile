FROM node:18

WORKDIR /app

# 1. Copiamos package.json + package-lock.json (si existe)
COPY package*.json ./

# 2. Instalamos todas las dependencias (incluye devDependencies: vite, eslint, etc.)
RUN npm install

# 3. Copiamos el resto del código al contenedor
COPY . .

# 4. Exponemos el puerto 5173 (Vite dev server)
EXPOSE 5173

# 5. CMD para desarrollo: arranca Vite en modo "dev"
CMD ["npm", "run", "dev"]
