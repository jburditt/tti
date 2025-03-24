docker network create fpo || true
docker build ../fpo-db/openshift/templates/ -t fpo-db 
docker run --rm -d -p 5432:5432 --network fpo --name fpo-db fpo-db