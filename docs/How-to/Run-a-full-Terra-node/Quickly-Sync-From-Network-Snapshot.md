# Hardware requirements



# Stop Terra Daemon first

sudo apt-get update -y
sudo apt-get install wget liblz4-tool aria2 -y

sudo su - [terrauser]

cd ~/.terra/

# change network to default/pruned/archive and mirror to Netherlands/Singapore/SanFrancisco depending on your needs

URL=`curl https://quicksync.io/terra.json|jq -r '.[] |select(.file=="columbus-5-default")|select (.mirror=="Netherlands")|.url'`

aria2c -x5 $URL

wget -O - $URL | lz4 -d | tar -xvf -

wget https://raw.githubusercontent.com/chainlayer/quicksync-playbooks/master/roles/quicksync/files/checksum.sh

wget $URL.checksum

# Compare checksum with onchain version. Hash can be found at $URL.hash


curl -s https://lcd-cosmos.cosmostation.io/txs/$(curl -s $URL.hash) | jq -r '.tx.value.memo'|sha512sum -c


lz4 -d `basename $URL` | tar xf -

# Start Terra Daemon
