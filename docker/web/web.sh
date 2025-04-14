# build
echo -e "\nBuilding nginx-runtime image ..."
  docker build -q \
    -t 'nginx-runtime' \
    -f '../fpo-web/openshift/templates/nginx-runtime/Dockerfile' '../fpo-web/openshift/templates/nginx-runtime/'

  # This image only exists to pre-create the npm cache directory
  # so it can be properly used as a volume, it doesn't apply to openshift
  echo -e "\nBuilding nodejs-build image ..."
  docker build -q \
    -t 'nodejs-build' \
    -f '../fpo-web/openshift/templates/nodejs-build/Dockerfile' '../fpo-web/openshift/templates/nodejs-build/'

echo -e "\nBuilding angular-on-nginx image ..."

# run this to build the image with latest code changes
s2i build -e "NPM_CONFIG_COLOR=always" -e "NPM_CONFIG_LOGLEVEL=timing" -v "fpo_fpo-npm-cache:/opt/app-root/src/.npm" --runtime-image nginx-runtime -a /opt/app-root/src/dist:app '../fpo-web' 'nodejs-build' 'fpo-angular-on-nginx'

# run from docker folder
docker build ./web/ -t fpo-web
docker run --rm -p 80:8080 --network fpo --name fpo-web fpo-web
