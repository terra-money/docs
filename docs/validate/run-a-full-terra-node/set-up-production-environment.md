# Set up a production environment

Use the following information to set up and manage your production-level full Terra node.  

For information about running a validator node, visit the [validator guide](/How-to/Manage-a-Terra-validator/Overview.md).


## Create a dedicated user

Although `terrad` does not require a super user account, during the setup process you'll need super user permission to create and modify some files. It is strongly recommended to use a normal user when running `terrad`.  

## Increase the maximum files `terrad` can open

`terrad` is set to open 1024 files by default. It is recommended that you increase this amount.

Modify `/etc/security/limits.conf`[*](https://linux.die.net/man/5/limits.conf) to increase the amount, where `nofile` is the number of files `terrad` can open.

```bash
# If you have never changed this system config or your system is fresh, most of this file will be commented
# ...
*                soft    nofile          65535   # Uncomment the following two lines at the bottom
*                hard    nofile          65535   # Change the default values to ~65535
# ...
```

# Running the server as a daemon

`terrad` must be running at all times. It is recommended that you register `terrad` as a `systemd` service so that it will be started automatically when the system reboots.

## Register terrad as a service

1. Create a service definition file in `/etc/systemd/system/terrad.service`, as shown in the following example:

   ```bash
   [Unit]
   Description=Terra Daemon
   After=network.target

   [Service]
   Type=simple
   User=<TERRA_USER>
   ExecStart=<PATH_TO_TERRAD>/terrad start  
   Restart=on-abort

   [Install]
   WantedBy=multi-user.target

   [Service]
   LimitNOFILE=65535  
   ```

2. Modify the `Service` section according to your environment:

   - Enter the user (likely your username, unless you created a user specifically for `terrad`)
   - Enter the path to the `terrad` executable. `<PATH_TO_TERRAD>` is likely `/home/<YOUR_USER>/go/bin/terrad` or `/usr/go/bin`. Confirm this with `whereis terrad`
   - Make sure you made the correct edits to /etc/security/limits.conf


3. Run `systemctl daemon-reload` followed by `systemctl enable terrad`. This will register `terrad` as a system service and turn it on upon startup.

4. Now start the serivce with `systemctl start terrad`.

:::details Controlling the service.

Use `systemctl` to start, stop, and restart the service.

```bash
# Check health
systemctl status terrad
# Start
systemctl start terrad
# Stop
systemctl stop terrad
# Restart
systemctl restart terrad
```

## Access logs

Use `journalctl -t` to access entire logs, entire logs in reverse, and the latest and continuous log.

```bash
# Entire log reversed
journalctl -t terrad -r
# Entire log
journalctl -t terrad
# Latest and continuous
journalctl -t terrad -f
```

:::
