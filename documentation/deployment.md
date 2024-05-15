# How to deploy GUIDE

## Complete setup from dockerfile to swarm services

### Docker images

1. **Create a docker file**:

create dockerfiles, and place it in the root folder of the applications.

See ours:
./backend/Dockerfile
./frontend/Dockerfile

2. **Create a docker compose file**:

create a docker-compose.yml file in the root folder of the repositpory

See ours:
./docker-compose.yml

3. **Clone repository on manager node**
   ```bash
   ssh <username>@<ip-address of manager node> -p 22
   git clone <repository path>

4. **build images from dockerfiles**
   ```bash
   sudo docker build -t bast38900/zay-ecommerce-frontend:latest ./frontend

5. **tag image**
   ```bash
   sudo docker tag bast38900/zay-ecommerce-frontend:latest bast38900/zay-ecommerce-frontend:latest

6. **push to docker hub**
   ```bash
   sudo docker push bast38900/zay-ecommerce-frontend:latest

7. **Repeat for second image**
   repeat step 4-6 for backend image

8. **Confirm images**
   sudo docker images

   check on [dockerhub](https://hub.docker.com/)

### Docker stack

1.  **Create stack**
   ```bash
   docker stack deploy -c docker-compose.yml zstack

2.  **Confirm stack**
   ```bash
   # See stack
   sudo docker stack ls
   
   # See services
   sudo docker service ls

   # See containers
   sudo docker stack ps zaystack

3. **See info about a container (ex. ip addres)**
   ```bash
   sudo docker inspect node02

4. **interactive terminal into a container**
   ```bash
   sudo docker exec -it zukj2k6chfbj /bin/bash


