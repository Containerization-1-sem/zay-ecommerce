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

3. **apply the netplan file**: 
   ```bash
   sudo netplan apply
   sudo reboot

4. **confirm**:
   ```bash
   ip a

## Hostname setup for nodes

1. **change hostname in /etc folder**: 
   ```bash
   sudo vim hostname
   <node-name>

   sudo vim hosts
   127.0.0.1 <node-name>

   sudo reboot

