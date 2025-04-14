"# openshift-intake" 

See folders for README.md for each particular project
See folder docker for scripts and Dockerfiles to run each project

# NOTES
All Jenkins code is irrelevant and should be deleted
The docker-compose.yml does not seem to work, recommend using the scripts in the docker folder, see below 'RUN'
Comment out line 9 from main.ts, so the console.logs work locally

# RUN
To run everything, see the /docker folder. Run the following on WSL:
/docker/api/api.sh
/docker/db/db.sh
/docker/web/web.sh
