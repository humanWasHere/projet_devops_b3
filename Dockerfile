# Utilisez une image officielle de Node.js pour construire votre application Angular
FROM node:18 as builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de configuration et les dépendances du package.json pour tirer parti du cache Docker
COPY package*.json ./

# Construisez l'application Angular
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Build the Angular app for production
RUN npm run build

# # Use a smaller, production-ready image as the final image
FROM nginx:alpine

# # Copy the production-ready Angular app to the Nginx webserver's root directory
COPY --from=builder /app/dist/fabrique_papier /usr/share/nginx/html

# # Exposez le port 80 pour accéder à l'application depuis l'extérieur du conteneur
EXPOSE 80

# La commande de démarrage par défaut pour l'image Nginx
CMD ["nginx", "-g", "daemon off;"]
