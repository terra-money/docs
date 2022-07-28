# Terra Docs

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Setup

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


## Syntax

### Admonitions

You can use admonitions by importing them and using the following syntax:

```
import Admonition from '@theme/Admonition';

<Admonition type="note" title="Your Title">

Some **content** with _markdown_ `syntax`.

</Admonition>

```

Admonition types:

```
note
tip
info
caution
danger
```

### Details

For dropdown details, use standard HTML syntax:

<details> 
<summary> example </summary>
<p>

````
hidden content
````
</p>
</details>

````
<details> 
<summary> Title </summary>
<p>

```
hidden content
```
</p>
</details>
````

### Comments

```

{/*
this is a comment in mdx
*/}

```

## Rebass

A bootstrap-style UI components library. 

Usage:

https://rebassjs.org/

