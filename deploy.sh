set -e #exit immediately if any command in this script fails (non-zero exit code).
NAME="devops-projects-api"
USERNAME="georgekibe"
IMAGE="$USERNAME/$NAME:latest"

echo "Building Docker image ... $IMAGE"
docker build -t $IMAGE .

echo "Pushing Docker image to Dockerhub ... $IMAGE"
docker push $IMAGE

echo "Applying Kubernetes Mainifests ..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "Getting all Pods"
kubectl get pods

echo "Getting all Services"
kubectl get services

echo "fetching the main Service"
#kubectl get services $NAME-service
kubectl get services

# echo "Running the minicube service"
# minikube service $NAME-service