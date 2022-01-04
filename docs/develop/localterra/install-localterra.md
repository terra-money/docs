# Install LocalTerra

## Prerequisites

- [Docker](https://www.docker.com/)
- [`docker-compose`](https://github.com/docker/compose)
- Supported known architecture: x86_64

1. Run the following commands::

```sh
$ git clone --depth 1 https://www.github.com/terra-money/LocalTerra
$ cd LocalTerra
```

2. Make sure your Docker daemon is running in the background and [`docker-compose`](https://github.com/docker/compose) is installed.

## Start, stop, and reset LocalTerra

- Start LocalTerra:

```sh
$ docker-compose up
```

Your environment now contains:

- [terrad](http://github.com/terra-money/core) RPC node running on `tcp://localhost:26657`
- LCD running on http://localhost:1317
- [FCD](http://www.github.com/terra-money/fcd) running on http://localhost:3060
- An oracle feeder feeding live prices from mainnet, trailing by one vote period



Stop LocalTerra:

```sh
$ docker-compose stop
```

Reset the world state:

```sh
$ docker-compose rm
```
