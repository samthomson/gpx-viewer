# GPX viewer

![Alt text](/screenshot.png?raw=true "GPX Viewer")

This is a simple app for viewing GPX files. It aims to visualise the GPX tracks on a map.

It's built using Electron and ReactJS, and also uses Webpack and Sass. The Javascript is actually Typescript.

## Run

- clone the project, cd in
- `yarn` to install deps
- open two terminals - in one: `yarn dev` this starts a webpack watch task to build all assets. - in the other: `yarn start` this starts the electron app.

## notes

- built with - react typescript - electron - webpack
- making use of - react leaflet https://react-leaflet.js.org/ - clustering package https://github.com/YUzhva/react-leaflet-markercluster - chart https://github.com/reactjs/react-chartjs

## todo

- loading
- actions as enums
- selector functions
- consistent notation
- lint against unused
- dep vs dev deps are correct