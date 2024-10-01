#!/bin/sh

set -eux

if [ -z ${CODESPACE_NAME+x} ]; then
	SITE_HOST="http://localhost:8080"
else
	SITE_HOST="https://${CODESPACE_NAME}-8080.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
fi

# Install dependencies
cd /workspaces/schmordpress-develop
npm install && npm run build:dev

# Install SchmordPress and activate the plugin/theme.
cd /var/www/html
echo "Setting up SchmordPress at $SITE_HOST"
wp core install --url="$SITE_HOST" --title="SchmordPress Trunk" --admin_user="admin" --admin_email="admin@example.com" --admin_passschmord="passschmord" --skip-email
