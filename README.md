[![screenshot](https://user-images.githubusercontent.com/5546996/27979469-459bc2cc-63b1-11e7-9a49-764841fc7fde.png)](https://bestof.js.org/)

[![Join the chat at https://gitter.im/michaelrambeau/bestofjs-webui](https://badges.gitter.im/michaelrambeau/bestofjs-webui.svg)](https://gitter.im/michaelrambeau/bestofjs-webui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Concept

[bestof.js.org](https://bestof.js.org/) gathers the latest trends about open source projects related to node.js and the web platform: JavaScript of course (client and server side) but also html, css...

This is a place where front-end engineers and node.js developers can find the best components to build amazing web applications.

### Tags

Projects are classified using tags such as:

* [React](https://bestof.js.org/tags/react): Create React App, Material UI, React Router, React Starter Kit...
* [Frameworks](https://bestof.js.org/tags/framework): AngularJS, React, Vue...
* [Testing](https://bestof.js.org/tags/test): Mocha, Jasmine, AVA, Jest...
* [CSS toolkits](https://bestof.js.org/tags/css-lib): Bootstrap, SemanticUI, Foundation...
* [Chart](https://bestof.js.org/tags/chart): D3, ChartJS, echarts...
* [Animation](https://bestof.js.org/tags/animation): Animate.css, Velocity, anime.js

### Community-driven

Users can sign in with their GitHub account and contribute to the project by:

* Submitting requests to add new projects
* Adding "Reviews" to projects (by rating projects from 1 to 5 )
* Adding "Links" (blog entries, tutorials, videos...) related to projects

Anyone can contribute!

### The JavaScript Hall of Fame

A Hall of Fame has been created to gather the most amazing people of the community: developers, authors, speakers, mentors...

Click [here](https://bestof.js.org/hof) to visit the Hall of fame!

Logged-in users can request the induction of new members.

## How it works

We maintain a list of projects related to the web platform (JavaScript,HTML and CSS) in a database.

Every time we find a new project (or anytime a user submit a new request), we add it to the database.

Then everyday, an automatic task checks project data from GitHub, for every project stored and generates data consumed by the web application. This daily backend job is in an other repository: [bestofjs-batches](https://github.com/michaelrambeau/bestofjs-batches).

The web application displays the total number of stars and their variation over the last days, weeks and months.


## Technical overview

### Cloud services

#### Database: [mLab](https://mlab.com/)

Database-as-a-Service for MongoDB, free up to 500 MB.

#### CI Server: [SemaphoreCI](https://semaphoreci.com/)

There are a lot of good CI servers on the market but I needed a kind of "CRON system - job scheduler" feature to generate every day the application data.

I didn't want to manage a web server up-and-running all day long.
And then I found [SemaphoreCI](https://semaphoreci.com/) and their amazing "build scheduler" feature.

The "build scheduler" is used to generate every day at a given time the static JSON files consumed by the web UI application.

#### node.js microservices

bestof.js.org is a single-page application hosted on GitHub pages.
We used microservices for some dynamic tasks like:

* Loading the README.md related to a project and format the html code so that it can be embedded in in the application
* Managing the content generated by logged-in users (Create or Edit reviews and links)

We use 2 free services in the cloud:

* [webtask.io](https://webtask.io/)
* [zeit.co/now](https://zeit.co/now)

#### Authentication

[Auth0](https://auth0.com/): authentication as a service, used for GitHub login feature.

#### Static hosting

[Firebase](https://www.firebase.com/): used to serve json data used by the single-page application

### Libraries

This repository is the front-end application, a single-page application built with the following modules:

* [React](http://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [React router](https://github.com/rackt/react-router)
* [Webpack](http://webpack.github.io/)

Webpack is used to build the application in development and production mode.

### Repositories

bestof.js.org application is made of 5 repositories:

* [bestofjs-webui](https://github.com/michaelrambeau/bestofjs-webui) (this repo!): the single-page application for end users
* [bestofjs-admin](https://github.com/michaelrambeau/bestofjs-admin): the web application used by admin users to manage content (used to add projects, tags and hall of fame members for example). Built with [KeystoneJS](http://keystonejs.com/), a node.js CMS.
* [bestofjs-batches](https://github.com/michaelrambeau/bestofjs-batches): Scheduled tasks that generate every day data used by the web application.
* [bestofjs-webtasks](https://github.com/michaelrambeau/bestofjs-webtasks): microservices used to serve dynamic data: to read and write user-generated content (links and reviews), to get README.md from GitHub when a project is opened.
* [bestofjs](https://github.com/michaelrambeau/bestofjs): repository used to deploy content to GitHub pages, linked to js.org domain. Generated from bestofjs-webui repository, does not contain any source code.


## URLs and environments

https://bestof.js.org/ production version is hosted on GitHub pages, using `.js.org` domain provided by https://js.org/.

Other URLs, used to preview features:

* Netlify (automatically built from `staging` branch): http://bestofjs.netlify.com/
* Surge (deployed manually using `npm run surge` command): http://bestofjs.surge.sh/

## Commands

### Development workflow

Start the web server and watch for changes on the filesystem:

```
npm start
```

The application should be running at [localhost:8080/index.html](http://localhost:8080/index.html)

### Production deploy

Build the files for production (`index.html` rendered server-side, `build/app.css` and `build/bundle-app.js`):

```
npm run build
```

Push all files to GitHub pages
```
npm run gh-pages
```

Note: a specific repository [bestofjs](https://github.com/michaelrambeau/bestofjs), that contains only one branch `gh-pages`, has been created to host the content on GitHub pages.

These 2 commands can be combined into one single command:

```
npm run deploy
```

### Deploys to other static host services

Firebase (requires `firebase-tools` module to be installed)

```
npm run firebase
```

Surge.sh (requires `surge` module to be installed)

```
npm run surge
```

### Daily update

Data come from a static JSON file `projects.json` hosted on a CDN (Firebase).
Every day at 6:00 AM (Osaka time, 21:00 UTC), the JSON file is updated by a daily batch running in `bestofjs-batches` repository.

Then, 30 minutes later, `npm run daily` command is launched from this repository, in order to rebuild the html file, using React server-side rendering feature.

`npm run daily` is split into 2 tasks:

* `npm run build-html`: build `www/index.html` in local, requesting data by http from `projects.json`
* `npm run deploy-html`: commit `www/index.html` to `bestofjs` repository, using GitHub API.

### Testing

Run unit tests:

```
npm test
```

Run unit tests in debug mode, to be able to see console.log in the terminal window:

```
npm run test-debug
```

Run test from only one single file:

```
babel-node test/components/ProjectPageSpec.js
```

Unit tests run on TravisCI after every push to the repo. Current status: [![Build Status](https://travis-ci.org/michaelrambeau/bestofjs-webui.svg?branch=master)](https://travis-ci.org/michaelrambeau/bestofjs-webui)

## Show your support!

That's all, thank you for your attention, please **star** the repo to show your support...

...we are all made of stars ![star](https://bestof.js.org/images/star.png) !
