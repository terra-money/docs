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
copyright = '2021, Terraform Labs'
author = 'Terraform Labs'

root_doc = "index"

# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ["myst_parser",
              "sphinx_panels",
              "sphinx_copybutton",
              "sphinx_design",
    ]
myst_heading_anchors = 3

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'node_modules']


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
]
myst_footnote_transition = True
myst_dmath_double_inline = True
myst_all_links_external = True
panels_add_bootstrap_css = True

theme_extra_footer = """<div class="logos"><a href="https://discord.gg/e29HWwC2Mz" rel="noopener" target="_blank"><img src="https://docs.terra.money/img/discord.svg" alt="link to Terra discord room"></a> <a href="https://medium.com/terra-money" rel="noopener" target="_blank"><img src="https://docs.terra.money/img/medium.svg" alt="link to Terra medium"></a> <a href="https://twitter.com/terra_money" rel="noopener" target="_blank"><img src="https://docs.terra.money/img/twitter.svg" alt="link to Terra twitter"></a> <a href="https://www.youtube.com/channel/UCoV1RXZ9ZBGcuu_PMTTlM0g" rel="noopener" target="_blank"><img src="https://docs.terra.money/img/icon_youtube.png" alt="link to Terra youtube"></a> <a href="https://t.me/terra_announcements" rel="noopener" target="_blank"><img src="https://docs.terra.money/img/icon_telegram.png" alt="link to Terra telegram room"></a></div>"""

# Theme options
html_theme_options = {
    "path_to_docs": "docs",
    "repository_url": "https://github.com/terra-money/docs",
    "use_repository_button": True,
    "use_edit_page_button": True,
    "use_issues_button": True,
    "use_repository_button": True,
    "use_download_button": True,
    "logo_only": True,
    "show_toc_level": 2,
    "extra_navbar": False,
    "extra_footer": theme_extra_footer,
}