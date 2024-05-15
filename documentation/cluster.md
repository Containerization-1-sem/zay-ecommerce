### Cluster setup

## Wifi network, for initia1 setup

1. **find wireless network adapter**: 
   ```bash
   ip add

2. **change wifi netplan yaml file in the /etc/netplan directory**: 
   ```bash
   sudo vim 00-installer-config-wifi.yaml

   network:
    version: 2
    wifis:
      <adapter-name>:
        dhcp4: yes
        dhcp6: yes
        access-points:
          <"SSID">:
            password: <"password">

3. **Apply the netplan file to apply changes**: 
   ```bash
   sudo netplan apply
   sudo reboot

4. **Confirm the network is running**:
   ```bash
   ip a

## Hostname setup for nodes

1. **Navigate to /etc folder**
   ```bash
   cd /etc

2. **change hostname in /etc folder**: 
   ```bash
   sudo vim hostname
   <node-name>

   sudo vim hosts
   127.0.0.1 <node-name>

   sudo reboot

## Docker Swarm setup

1. **ssh from pc/mac into nodes**: 
   ```bash
   ssh <username>@<ip-address> -p 22

2. **Install and enable docker on nodes (update is recommended)**:
   ```bash
   sudo apt update
   sudo apt install -y docker.io 
   sudo systemctl start docker
   sudo systemctl enable docker

3. **Initialize Docker Swarm on manager node**: 
   ```bash
   sudo docker swarm init

Save your token to use for setting up workers.

4. **Add workers to swarm**:
   ```bash
   docker swarm join --token <token> <manager ip-address>:2377

5. **Confirm swarm**:
   ```bash
   sudo docker node ls
   
