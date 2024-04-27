FROM node:14

# Set environment variables
ENV   DB_USERNAME=admin \
      DB_PASSWORD=letmein \
      DB_HOSTNAME=mysqldb \
      DB_NAME=apani_database \
      DB_DIALECT=mysql \
      DB_TIMEZONE=+07:00 \
      PORT=3000

# Create and set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Command to run Node.js application
CMD [ "npm","start" ]