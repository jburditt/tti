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
  ${S2I_EXE} build \
    -e "NPM_CONFIG_COLOR=always" \
    -e "NPM_CONFIG_LOGLEVEL=timing" \
#    -e "HTTP_PROXY=${HTTP_PROXY}" \
#    -e "HTTPS_PROXY=${HTTPS_PROXY}" \
    -v "fpo_fpo-npm-cache:/opt/app-root/src/.npm" \
    --runtime-image nginx-runtime \
    -a /opt/app-root/src/dist:app \
    '../fpo-web' \
    'nodejs-build' \
    'fpo-angular-on-nginx'


#------------------------------

docker build ../fpo-web/openshift/templates/ -t fpo-web
docker run --rm -p 8080:8080 --network fpo --name fpo-web fpo-web

