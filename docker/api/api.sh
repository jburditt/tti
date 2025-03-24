# docker network create fpo || true
# #docker build ../fpo-api/openshift/templates/django/ -t fpo-api-build
# s2i build '../fpo-api' 'centos/python-38-centos7' 'fpo-api'
# docker run --rm -d -p 8080:8080 --network fpo -v ./fpo-api/api:/opt/app-root/src/api -v ./fpo-api/templates:/opt/app-root/src/templates --name fpo-api fpo-api

# # from root dir
# docker build ./fpo-api/openshift/templates/django/ -t fpo-api-build
# s2i build './fpo-api' 'fpo-api-build' 'fpo-api' --image-scripts-url /usr/libexec/s2i
# docker run --rm -p 8080:8080 --network fpo -v ./fpo-api/api:/opt/app-root/src/api -v ./fpo-api/templates:/opt/app-root/src/templates --name fpo-api fpo-api

# docker build ./fpo-api/openshift/templates/django/ -t fpo-api
# s2i build './fpo-api' 'centos/python-36-centos7' 'fpo-api'
# docker run --rm -p 8080:8080 --network fpo -v ./fpo-api/api:/opt/app-root/src/api -v ./fpo-api/templates:/opt/app-root/src/templates --name fpo-api fpo-api


# runs server listenting to port 8000
# run this from the root directory
docker run --rm -it -d --name fpo-api --network fpo -p 8080:8080 -v ./fpo-api:/app -w /app python:3.11  sh -c "pip install -r requirements.txt && python manage.py runserver 0.0.0.0:8080" \
-e DATABASE_SERVICE_NAME="fpo-db" \
-e DATABASE_ENGINE="postgresql" \
-e DATABASE_NAME="FAMILY_PROTECTION_ORDER" \
-e DATABASE_USER="DB_USER" \
-e DATABASE_PASSWORD="DB_PASSWORD" \
-e PDF_SERVICE_URL="http://fpo-pdf:5001" \
-e DJANGO_SECRET_KEY="********" \
-e DJANGO_DEBUG=True \
-e FPO_DB_SERVICE_HOST="fpo-db" \
-e FPO_DB_SERVICE_PORT=5432

docker build --build-context src=../fpo-api/ requirements=../fpo-api/requirements.txt ./api/ -t fpo-api
#docker run -p 8080:8080 fpo-api 