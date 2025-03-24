docker network create fpo || true

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