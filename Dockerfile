# Step 1: Use a Node image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy files
COPY package*.json ./
RUN npm install
COPY . .

# Step 4: Build TypeScript
RUN npm run build

# Step 5: Start the app
CMD ["npm", "run", "start"]