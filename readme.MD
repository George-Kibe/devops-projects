## Publishing adocker image

1. Login
   `docker login`
2. Publish
   Format
   `docker tag imageName username/imageName:tag`
   `docker push username/imageName`
   Example
   `docker tag devops-projects-api:latest georgekibe/devops-projects-api:latest `
   `docker push georgekibe/devops-projects-api:latest `

## Kubernetes Commands

1. To start minikube. This configures minikube
   `minikube start`
2. Get Nodes. You should get that minikube is running a control plane.
   `kubectl get nodes`
3. To check if your cluster is running. If its healthy, you should see the port where it is running.
   `kubectl cluster-info`
4. Deploying.
   `kubectl apply -f k8s/`
5. To get the Pods Status.
   `kubectl get pods -w`
6. To get the services.
   `kubectl get services`
7. See the service to inspect the Pods and the endpoints
   `minikube service devops-projects-api-service`
8. Get service details.
   `kubectl describe service devops-projects-api-service`

## Configuring Eslint

1. Install dependencies
   `npm install eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier -D`
2. Create an eslint.config file(alongside package.json)
   `touch eslint.config`
3. Create a .prettierrc file(alongside package.json)
   `touch .prettierrc`
4. Create a .prettierignore file(alongside package.json)
   `touch .prettierignore`
