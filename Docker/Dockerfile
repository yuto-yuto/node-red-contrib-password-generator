FROM nodered/node-red

# error without this
RUN mkdir -p ./password-generator/node_modules/

COPY ../package.json ../package-lock.json ./password-generator/
COPY ../dist ./password-generator/dist
RUN npm install ./password-generator --unsafe-perm --no-update-notifier --no-fund --only=production
