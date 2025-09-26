## Summary notes and reference commands

1. Build a docker image from dockerfile
   `docker build -t react-docker .`
2. Run the created docker image mapping it to the host machine
   `docker run -p 5173:5173 react-docker`
3. Run the created docker image mapping it to the host machine with mount of the app directory
   `docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules react-docker`

## Publishing adocker image

1. Login
   `docker login`
2. Publish
   `docker tag react-docker georgekibe/react-docker`
   `docker push georgekibe/react-docker`

## Running Tests with Jest

1. Install jest as a dev dependency
   `npm install jest -D`
2. Generate a basic configuration file for the tests.
   `npm init jest@latest` and follow the prompts and get the jest.config.mjs.
