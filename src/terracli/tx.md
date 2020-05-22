# TX Search

## Matching a set of tags

You can use the transaction search command to query for transactions that match a specific set of `tags`, which are added on every transaction.

Each tag is conformed by a key-value pair in the form of `<tag>:<value>`. Tags can also be combined to query for a more specific result using the `&` symbol.

The command for querying transactions using a `tag` is the following:

```bash
$ terracli query txs --tags='<tag>:<value>'
```

And for using multiple `tags`:

```bash
$ terracli query txs --tags='<tag1>:<value1>&<tag2>:<value2>'
```

The pagination is supported as well via `page` and `limit`:

```bash
$ terracli query txs --tags='<tag>:<value>' --page=1 --limit=20
```

::: tip
The action tag always equals the message type returned by the `Type()` function of the relevant message.
You can find a list of available `tags` on each module by looking at the /tags directory of each module.
:::

## Matching a transaction's hash

You can also query a single transaction by its hash using the following command:

```bash
$ terracli query tx [hash]
```
