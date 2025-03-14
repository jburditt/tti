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
docker run --rm -it -d --name fpo-api --network fpo -p 8080:8080 -v ./fpo-api:/app -w /app python:3.11  sh -c "pip install -r requirements.txt && python manage.py runserver 0.0.0.0:8080"

docker build --build-context src=../fpo-api/ requirements=../fpo-api/requirements.txt ./api/ -t fpo-api
#docker run -p 8080:8080 fpo-api 