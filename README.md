<br />
<div align="center">
   <a href="https://docs.terra.money/">
      <img src="./img/docs_logo.svg" alt="Terra Docs" width=500>
   </a>
</div>
<br />

# Building

## Contributing to the Repository

If you would like to contribute to this repository, make sure to fork this repo and then clone the forked repo. You will need to do this to make creating pull requests easier.

```bash
git clone https://github.com/<your-username>/docs.git
```

## Local Development with Docker

You can utilize make commands in order to execute Docker and Sphinx commands that will build and generate the documentation site.

First, build the local Docker container:
```
make docker-make
```

Then, build the documentation site:
```
make docker-build
```

You can view the site in your browser by navigating to the `index.html` file located in the following directory: `<PATH_TO_CLONED_REPO>/_build/html/index.html`.

Make sure to run `make docker-build` each time you save your changes in order to view your new changes on the site.

To enable an auto-rebuild and refresh of the documentation site when changes are implemented, execute the following command in your terminal:
```
make docker-watch
```

## Creating Pages
 
Documentation pages can be written in Markdown (`.md`) or reStructuredText (`.rst`).
 
New pages can be added to the `docs/` folder and linked to the navigation by inputting their relative filepath in the toctree located in `index.md`. Second level pages can be created by adding a toctree to a parent file.
 
To link a top level page, insert a toctree and filepath into `index.md`:
 
````
```{toctree}
:hidden:
/docs/top-level-page
/docs/other-top-level-page
```
````
 
This will list `top-level-page` in the navigation.
 
To link a second level page, add the corresponding filename's relative path to the toctree in the parent file.
 
In `top-level-page.md`, insert the following toctree:
 
````
```{toctree}
:hidden:
/docs/second-level-page
```
````
 
Carrying out the above examples will result in the following navigation:
 
Top level page  
~ Second level page  
Other top level page
 
## Links
 
All links written in Markdown are relative. Full URLs will render as external filepaths.
 
## Admonitions (Note and Warning Boxes)
 
Admonitions are created in Markdown with the following syntax:
 
```
:::{warning}
 
This is the body of my warning admonition.
 
:::
```
 
You can also create custom admonitions with the following syntax:
 
```
:::{admonition} This is my custom admonition title
:class: warning
 
This is the body of my admonition
 
:::
```
 
For a list of all admonition types, visit https://sphinx-book-theme.readthedocs.io/en/latest/reference/kitchen-sink/paragraph-markup.html?highlight=admonition#admonitions
 
 
# Organization

## Module Specs

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
- [Myst parser](https://myst-parser.readthedocs.io/en/latest/index.html) for Markdown syntax.
- [Sphinx-design](https://sphinx-design.readthedocs.io/en/sbt-theme/index.html) for tabs, cards, grids, dropdowns, and classes.
 
## Extensions
 
Extensions should be added to `requirements.txt` and `conf.py`.
 
## Redirects
 
Redirects are listed in `conf.py`. Visit https://documatt.gitlab.io/sphinx-reredirects/ for more info.
 
## Theme
 
Built using [Sphinx Book Theme](https://sphinx-book-theme.readthedocs.io/en/stable/). Visit https://sphinx-book-theme.readthedocs.io/en/latest/customize/custom-css.html for CSS customization.
 

## License

This software is licensed under the Apache License 2.0. See [LICENSE](./LICENSE.txt) for full disclosure.

<hr/>

<p>&nbsp;</p>
<p align="center">
    <a href="https://www.terra.money/"><img src="https://assets.website-files.com/611153e7af981472d8da199c/6179663e7e24c93e8051c74f_symbol-terra-alone-dark.svg" align="center" width=200/></a>
</p>
