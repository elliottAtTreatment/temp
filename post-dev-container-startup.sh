curl https://sdk.cloud.google.com > install.sh
bash install.sh
gcloud auth login
gcloud auth application-default login
gcloud config set project trmt-dev
gcloud auth configure-docker us-central1-docker.pkg.dev