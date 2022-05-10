docker build -t octavianmitu/multi-client:latest -t octavianmitu/multi-client:$SHA ./client
docker build -t octavianmitu/multi-server:latest -t octavianmitu/multi-server:$SHA ./server
docker build -t octavianmitu/multi-worker:latest -t octavianmitu/multi-worker:$SHA ./worker

docker push octavianmitu/multi-client:latest 
docker push octavianmitu/multi-client:$SHA
docker push octavianmitu/multi-server:latest 
docker push octavianmitu/multi-server:$SHA
docker push octavianmitu/multi-worker:latest 
docker push octavianmitu/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=octavianmitu/multi-server:$SHA
kubectl set image deployments/client-deployment client=octavianmitu/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=octavianmitu/multi-worker:$SHA
