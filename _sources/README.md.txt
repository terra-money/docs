<p>&nbsp;</p>
<p align="center">
<img src="./img/docs_logo.svg" width=500>
</p>

<div align="center">
  <h4>
    <a href="https://docs.terra.money/">Documentation Website</a>
  </h4>
</div>



## Building

## Getting the repo

If you are contributing to the repository, make sure to fork this repo, and then clone your own fork. You will need to do this to make creating pull requests easier.

```bash
git clone https://github.com/<your-username>/terra-docs
```

## Test locally with Docker

Using Docker is easier than configuring your local machine to build `sphinx`:

First build the local Docker container:

```
make docker-make
```

Then you're ready to build the site:

```
make docker-build
```

You can view the site in your browser by navigating to `index.html` located in `<PATH_TO_CLONED_REPO>/_build/html/index.html`.

Make sure to run `make docker-build` each time you save your changes to view them live.

To auto-rebuild the site and refresh the browser use: 

```
make docker-watch
```

### Adding an article

All articles are markdown files, placed under the `/docs/` directory. You can create folders underneath the `/docs` directory, such as the following:

```
/docs
    /dev
        README.md
        spec-auth.md
        ...
    /node
        README.md
        installation.md
        ...
    README.md
```

Notice how `README.md` serves as the default root of the folder.

### Editing the navigation

To edit the navigation to include your new article, edit `/docs/.vuepress/config.js` and add your new article in the appropriate section in `themeConfig.sidebar`, following the other paths as examples.

## Organization

### Module Specs

Each module should be documented with the following subheaders:

1. Abstract (no header)

   Maximum 2 paragraphs to explain, in broad terms, the general purpose of the module, to provide a "big-picture" perspective of how the module provides functionality and organization to the Terra protocol, and how it interacts with other modules.

2. Concepts

   A section dedicated to the concepts that are required to understand how the module works. This may include:

   - layman primer
   - math formulas (formatted with LaTeX)
   - diagrams

3. Data

   A section that covers the various data structures used by the module.

4. State

   A section that covers the keeper state for that module key-value store

5. Messages

   A section that covers the various types of messages and gives a rough explanation on how they are handled.

6. Proposals

   A section that covers the related governance proposals

7. Transitions

   A section that covers the begin-blocker and end-blocker transition functions

8. Parameters

   A section that covers the chain parameters that can be modified by governance via the `params` module

## Built With

- Sphinx Book Theme

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2020 Terraform Labs, PTE.

<hr/>

<p>&nbsp;</p>
<p align="center">
    <a href="https://www.terra.money/"><img src="http://www.terra.money/logos/terra_logo.svg" align="center" width=200/></a>
</p>
<div align="center">
  <sub><em>Powering the innovation of money.</em> </sub>
</div>
