FROM nodered/node-red

COPY ../package.json ../package-lock.json ./password-generator/
COPY ../dist ./password-generator/dist
RUN npm install ./password-generator --unsafe-perm --no-update-notifier --no-fund --only=production
