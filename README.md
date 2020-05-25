<p>&nbsp;</p>
<p align="center">
<img src="./img/docs_logo.svg" width=500>
</p>

<div align="center">
  <h4>
    <a href="https://docs.terra.money/">Documentation Website</a>
  </h4>
</div>

## Tutorial

### Getting the repo

If you are contributing to the repository, make sure to fork this repo, and then clone your own fork. You will need to do this to make creating pull requests easier.

```bash
$ git clone https://github.com/<your-username>/terra-docs
```

### Adding an article

All articles are markdown files, placed under the `/src/` directory. You can create folders underneath the `/src` directory, such as the following:

```
/src
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

To edit the navigation to include your new article, edit `/src/.vuepress/config.js` and add your new article in the appropriate section in `themeConfig.sidebar`, following the other paths as examples.

## Built With

- Vuepress
- MathJax
- Terra Docs custom theme

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2020 Terraform Labs, PTE.

<hr/>

<p>&nbsp;</p>
<p align="center">
    <a href="https://terra.money/"><img src="http://terra.money/logos/terra_logo.svg" align="center" width=200/></a>
</p>
<div align="center">
  <sub><em>Powering the innovation of money.</em></sub>
</div>
