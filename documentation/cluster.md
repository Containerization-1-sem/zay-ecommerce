### Cluster setup

## Wifi network, for initial setup

1. **Find wireless network adapter**: 
   ```bash
   ip add

2. **Navigate to netplan directory**
   ```bash
   cd /etc/netplan

3. **Change wifi netplan .yaml file in the /etc/netplan directory with vim**: 
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

2. **Change hostname in /etc folder**: 
   ```bash
   sudo vim hostname
   <node-name>

3. **Change hosts in /etc folder**
   ```bash
   sudo vim hosts
   127.0.0.1 <node-name>

4. **Reboot the node for changes to take effect**
   ```bash
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
   
