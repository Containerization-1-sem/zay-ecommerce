# Zay eCommerce

This is a demo project for Containerization & Linux elective at [UCL University College](https://ucl.dk)

The frontend is based on the following template:

* https://github.com/mosaadaldeen/zay-shop

1. [Cluster Setup](#cluster-setup)
   - [Wifi Network for Initial Setup](#wifi-network-for-initial-setup)
   - [Hostname Setup for Nodes](#hostname-setup-for-nodes)
   - [Docker Swarm Setup](#docker-swarm-setup)
2. [Deployment Guide](#Deployment-guide)
   - [Complete Setup from Dockerfile to Swarm Services](#complete-setup-from-dockerfile-to-swarm-services)
   - [Docker Images](#docker-images)
   - [Docker Stack](#docker-stack)
3. [Testing](#testing)
4. [Frontend](#frontend)
5. [Backend](#backend)

### Cluster setup

## Wifi network, for initial setup

1. **Find wireless network adapter**: 
   ```bash
   ip add
   ```

2. **Navigate to netplan directory**
   ```bash
   cd /etc/netplan
   ```

3. **Change wifi netplan .yaml file in the /etc/netplan directory with vim**: 
   ```bash
   sudo vim 00-installer-config-wifi.yaml
   ```

   network:
    version: 2
    wifis:
      <adapter-name>:
        dhcp4: yes
        dhcp6: yes
        access-points:
          <"SSID">:
            password: <"password">

4. **Apply the netplan file to apply changes**: 
   ```bash
   sudo netplan apply
   sudo reboot
   ```

5. **Confirm the network is running**:
   ```bash
   ip a
   ```


## Hostname setup for nodes

1. **Navigate to /etc folder**
   ```bash
   cd /etc
   ```

2. **Change hostname in /etc folder**: 
   ```bash
   sudo vim hostname
   ```
   change <node-name>

3. **Change hosts in /etc folder**
   ```bash
   sudo vim hosts
   ```
   change 127.0.0.1 <node-name>

4. **Reboot the node for changes to take effect**
   ```bash
   sudo reboot
   ```


## Docker Swarm setup

1. **ssh from pc/mac into nodes**: 
   ```bash
   ssh <username>@<ip-address> -p 22
   ```

2. **Install and enable docker on nodes (update is recommended)**:
   ```bash
   sudo apt update
   sudo apt install -y docker.io 
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. **Initialize Docker Swarm on manager node**: 
   ```bash
   sudo docker swarm init
   ```

Save your token to use for setting up workers.

4. **Add workers to swarm**:
   ```bash
   docker swarm join --token <token> <manager ip-address>:2377
   ```

5. **Confirm swarm exists**:
   ```bash
   sudo docker node ls
   ```



# Deployment Guide

### Complete setup from dockerfile to swarm services

## Creating docker images

1. **Create a docker file**:

Create the dockerfiles, and place them in the root folder of the applications.

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
   ```

4. **build images from dockerfiles**
   ```bash
   sudo docker build -t bast38900/zay-ecommerce-frontend:latest ./frontend
   ```

5. **tag image**
   ```bash
   sudo docker tag bast38900/zay-ecommerce-frontend:latest bast38900/zay-ecommerce-frontend:latest
   ```

6. **push to docker hub**
   ```bash
   sudo docker push bast38900/zay-ecommerce-frontend:latest
   ```

7. **Repeat for second image**
   repeat step 4-6 for backend image

8. **Confirm images**
   ```bash
   sudo docker images
   ```

   check on [dockerhub](https://hub.docker.com/)

## Creating docker stack

1.  **Create stack**
   ```bash
   docker stack deploy -c docker-compose.yml zstack
   ```

2.  **Confirm stack**
   ```bash
   # See stack
   sudo docker stack ls
   
   # See services
   sudo docker service ls

   # See containers
   sudo docker stack ps zaystack
   ```

3. **See info about a container (ex. ip addres)**
   ```bash
   sudo docker inspect node02
   ```

4. **interactive terminal into a container**
   ```bash
   sudo docker exec -it zukj2k6chfbj /bin/bash
   ```

## Testing

1. **Confirm that the frontend applikation is running**

http://192.168.47.217:3001/shop => maybe changed after swarm restart

2. **Test backend and database is working**

Via Postman, send a GET request to create a test product

request: http://192.168.47.217:3000/test => maybe changed after swarm restart

response: created

3. **Access the PostGreSQL db from manager**
   ```bash
   sudo apt-get install postgresql-client
   sudo psql -h 192.168.10.31 -p 5432 -U youruser -d yourdatabase
   ```

type in supersecret password and do your stuff...

## Frontend

There is a specific README.md file in the frontend project

## Backend

There is a specific README.md file in the backend project
