# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'Terra Docs'
copyright = '2022, Terraform Labs'
html_show_copyright = False
#author = Terraform Labs

root_doc = "index"

# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ["myst_parser",
              "sphinx_panels",
              "sphinx_copybutton",
              "sphinx_design",
              'sphinx_tabs.tabs',
              'notfound.extension',
              'sphinx_reredirects',
              'sphinxcontrib.youtube'
    ]
myst_heading_anchors = 4
notfound_urls_prefix = None

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'node_modules']

# Copies files in these directories to the root of the build
html_extra_path = [
    'img/', 
    '.nojekyll', 
    'redirects',
]

# No reason to link to images.
html_scaled_image_link = False

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "sphinx_book_theme"
html_logo = "img/docs_logo.svg"
html_favicon = "img/docs_favicon.ico"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']
html_css_files = ['custom.css']

html_js_files = [
    'custom.js',
]

pygments_style = 'material'

myst_enable_extensions = [
    "dollarmath",
    "amsmath",
    "deflist",
    "fieldlist",
    "html_admonition",
    "html_image",
    "colon_fence",
    "smartquotes",
    "replacements",
    "linkify",
    "substitution",
    "tasklist",
    # "myst_nb", for python docs
]
myst_footnote_transition = True
myst_dmath_double_inline = True
myst_all_links_external = False
panels_add_bootstrap_css = True
nitpicky = True


# Theme options
html_theme_options = {
    "path_to_docs": "docs",
    "repository_url": "https://github.com/terra-money/docs",
    "use_repository_button": True,
    "use_edit_page_button": False,
    "use_issues_button": True,
    "use_repository_button": True,
    "use_download_button": True,
    "logo_only": True,
    "show_toc_level": 3,
    "extra_navbar": False,
}

# Redirects (visit https://documatt.gitlab.io/sphinx-reredirects/usage.html for more info)
# Absolute:"/<file>" 
# Ending in: "<file>"
redirects = {
    # "<source>": "<target>"
    
    # Terrain
    "docs/develop/dapp/quick-start/README.html": "/docs/develop/terrain/README.html",

    # Terra.js
    "docs/develop/sdks/terra-js/README.html": "/docs/develop/terra-js/README.html",

    # Wallet Provider
    "docs/develop/sdks/wallet-provider/README.html": "/docs/develop/wallet-provider/README.html",

    # Terra.py
    "docs/develop/sdks/get-started-py.md": "/docs/develop/terra-py/get-started-py.md",
}