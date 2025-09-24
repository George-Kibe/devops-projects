# set the base image to create the image for the react project
FROM node:22.19.0-alpine
# create a user with permissions only to run the app
# -S --> create a system user
# -G --> add the user to a group
# This is done to avoid running the app as root
# If the app is run as root, any vulnerability in the app can be exploited to gain access to the host system
# It is a good practice to run the app as a non-root user

RUN addgroup app && adduser -S -G app app

# set the user to run the app

USER app

# set the working directory to /app
WORKDIR /app

# copy package.json and package-lock.json to the working directory
# This is done before copying the rest of the files to take advantage of docker's cache
# if the package.json and package-lock.json files haven't been changed, docker will use the cached dependencies
COPY package*.json ./

# sometimes the ownership of the files in the working directory is changed to root. 
# and thus the app can't access the files and throws an error -> EACCES: Permission denied
# To avoid this, change the ownership of the files to the root user

USER root
# change the ownership of the /app directory to the user
# chown -R <user>:<group> <directory>
# chown command changes the user and/or group ownership of a given file

RUN chown -R app:app .

# change the user back to the app user
USER app

#Install dependencies
RUN npm install
# copy the rest of the files to the working directory
COPY . .

# Expose port 5173 to tell docker that the container listens on the specified network
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]
