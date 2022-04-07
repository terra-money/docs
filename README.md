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



## Creating pages
 
Pages can be written in markdown `.md` or restructured text `.rst`
 
Add new pages to the `/docs/` folder. Link pages to the navigation by inputting their relative filepath in the toctree located in `index.md`. Second-level pages can be made by adding a toctree to a parent file.
 
Markdown example:
 
To link a top-level page, insert a toctree and filepath into `index.md`:
 
````
```{toctree}
:hidden:
/docs/top-level-page
/docs/other-top-level-page
```
````
 
This will list top-level-page in the navigation.
 
To link a second-level page, add a filename's relative path to the toctree in the parent file.
 
In `top-level-page.md`, input the following toctree
 
````
```{toctree}
:hidden:
/docs/second-level-page
```
````
 
These two examples together will create the following navigation:
 
Top level page
- Second level page  
Other top level page
 
### Links
 
All links written in markdown are relative. Full URLs will render as external filepaths.
 
### Admonitions (note and warning boxes)
 
Admonitions are made in markdown with the following syntax:
 
```
:::{warning}
 
This is the body of my warning admonition.
 
:::
```
 
Custom admonition syntax:
 
```
:::{admonition} This is my custom admonition title
:class: warning
 
This is the body of my admonition
 
:::
```
 
For a list of all admonition types, visit https://sphinx-book-theme.readthedocs.io/en/latest/reference/kitchen-sink/paragraph-markup.html?highlight=admonition#admonitions
 
 
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


### For more info on configuring, visit:
 
- [Sphinx Book Theme](https://sphinx-book-theme.readthedocs.io/en/stable/) for theme elements.
- [Myst parser](https://myst-parser.readthedocs.io/en/latest/index.html) for markdown syntax.
- [Sphinx-design](https://sphinx-design.readthedocs.io/en/sbt-theme/index.html) for tabs, cards, grids, dropdowns, and classes.
 
## Extensions
 
Extensions should be added to `requirements.txt` and `conf.py`.
 
## Redirects
 
Redirects are listed in `conf.py`. Visit https://documatt.gitlab.io/sphinx-reredirects/ for more info.
 
## Theme
 
Built using [Sphinx Book Theme](https://sphinx-book-theme.readthedocs.io/en/stable/). Visit https://sphinx-book-theme.readthedocs.io/en/latest/customize/custom-css.html for CSS customization.
 

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2022 Terraform Labs, PTE.

<hr/>

<p>&nbsp;</p>
<p align="center">
    <a href="https://www.terra.money/"><img src="http://www.terra.money/logos/terra_logo.svg" align="center" width=200/></a>
</p>
<div align="center">
  <sub><em>Powering the innovation of money.</em> </sub>
</div>
