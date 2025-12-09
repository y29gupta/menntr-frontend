FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy everything (Next.js needs source to run dev server)
COPY . .

# Expose dev server port
EXPOSE 3000

CMD ["npm", "run", "dev"]
