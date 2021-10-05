
![logo](https://user-images.githubusercontent.com/81958801/129763344-cd250502-7f54-4b62-961a-5604ea9520fb.png)

![Twitter Follow](https://img.shields.io/twitter/follow/symbldotai?style=social)


# Symbl Documentation

Welcome to the Symbl Documentation repository!

Our documentation site is built using [Docusaurus 2](https://v2.docusaurus.io/), a static site generator. 

## Table of Contents
- [Points to Note](#points-to-note)
- [How to Contribute](#how-to-contribute)
- [Setup Docs Locally](#set-up-docs-locally)
- [Installation](#installation)
- [Local Development](#local-development)

## Points to Note

- To submit Pull Requests (PRs), always use the `develop` as the base branch.
- We merge changes to master on a weekly basis.
- Go through our [Code of Conduct](https://github.com/symblai/symbl-docs/blob/develop/CODE_OF_CONDUCT.md) for general best practices to foster community. 
- We follow the writing guidelines of [Microsoft Styleguide](https://docs.microsoft.com/en-us/style-guide/welcome/) and [Google Developer Documentation Style guide](https://developers.google.com/style) so ensure you refer to the same for any editorial guidance for writing and syntax.

## How to Contribute
To contribute to our documentation, 

1. Add in your suggestions (by clicking on "Edit this page" button on our docs),
2. Enter the required details about the PR. This will give us additional context and a sense what is required of our team. 
3. Submit a Pull Request (PR).

The PR are reviewed every Thursdays by our team. 

If you wish to suggest a new topic, want to request for additional details or raise any other issues, you can [Open an Issue](https://github.com/symblai/symbl-docs/issues/new). The resolution time for Issues reported are the same as the PRs.  

## Setting up Docs locally

1. Clone the Symbl Docs Repo

- Using SSH:
  
```js
$ git clone git@github.com:symblai/symbl-docs.git
```
  
   OR 

- Using HTTPS:

```js
$ git clone https://github.com/symblai/symbl-docs.git
```

2. Open your local directory where you cloned the docs
  
```js
$ cd symbl-docs
```

3. Switch to develop branch to make changes

```js
$ git checkout develop
```
### Installation

```js
$ yarn
```

### Local Development

```js
$ yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```js
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```js
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch. 
