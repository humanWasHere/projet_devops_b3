#!/bin/bash

# URL de votre application Angular
ANGULAR_APP_URL="http://localhost:4200"

# Adresse email pour les notifications
EMAIL="votre_adresse_email@example.com"

# Fonction pour envoyer un email de notification
send_email() {
    subject=$1
    message=$2
    echo "$message" | mail -s "$subject" "$EMAIL"
}

# Boucle infinie pour surveiller l'application en continu
while true; do
    # Vérifier si l'application est accessible
    response=$(curl -s -o /dev/null -w "%{http_code}" "$ANGULAR_APP_URL")

    if [ $response -eq 200 ]; then
        echo "L'application Angular est en cours d'exécution."
    else
        echo "Problème avec l'application Angular. Code HTTP: $response"
        send_email "Problème avec l'application Angular" "L'application Angular n'est pas accessible. Code HTTP: $response"
    fi

    # Attendre pendant un certain temps avant de vérifier à nouveau
    sleep 3  # Attendre 60 secondes avant de vérifier à nouveau
done