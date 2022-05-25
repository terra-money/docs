# Install LocalTerra

## Prerequisites

- [Docker](https://www.docker.com/)
- [`docker-compose`](https://github.com/docker/compose)
- Supported known architecture: x86_64

::: {admonition} Terrain and LocalTerra
:class: tip
If you are using LocalTerra with Terrain, use the [Terrain and LocalTerra install guide](../terrain/using-terrain-localterra.md).
:::

## Installation

1. Run the following commands:

   ```sh
   $ git clone --depth 1 https://www.github.com/terra-money/LocalTerra
   $ cd LocalTerra
   ```

2. Make sure your Docker daemon is running in the background and [`docker-compose`](https://github.com/docker/compose) is installed.

## Using LocalTerra

### Start

```sh
$ docker-compose up
```

Your environment now contains:

- [terrad](http://github.com/terra-money/core) RPC node running on `tcp://localhost:26657`
- LCD running on http://localhost:1317
- [FCD](http://www.github.com/terra-money/fcd) running on http://localhost:3060

### Stop

```sh
$ docker-compose stop
```

### Reset

```sh
$ docker-compose rm
```
