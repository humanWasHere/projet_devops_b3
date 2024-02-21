# Utilisez une image officielle de Node.js pour construire votre application Angular
FROM node:18 as builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de configuration et les dépendances du package.json pour tirer parti du cache Docker
COPY package*.json ./
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application Angular
RUN npm run build --prod

# Utilisez une image légère basée sur Nginx pour servir l'application construite
FROM nginx:alpine

# Copiez les fichiers de l'application Angular construite vers le répertoire d'accueil de Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Exposez le port 80 pour accéder à l'application depuis l'extérieur du conteneur
EXPOSE 80

# La commande de démarrage par défaut pour l'image Nginx
CMD ["nginx", "-g", "daemon off;"]
