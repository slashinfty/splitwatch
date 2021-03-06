# Splitwatch

*Why do speedrunners call it a timer when it's really a stopwatch?*

Splitwatch is a multiplatform split "timer" for speedrunning. It uses the [Splits.io Exchange Format](https://github.com/glacials/splits-io/tree/master/public/schema) and can export runs to [Splits.io](https://splits.io/) and connect to races on [racetime.gg](https://racetime.gg/).

## Working with Source Code

```
git clone https://github.com/slashinfty/splitwatch.git
cd splitwatch
yarn
```

You can then run the following commands.

### `yarn start`

Runs the app in the development mode. Electron will start automatically when dev server is ready and [http://localhost:3000?Main](http://localhost:3000?Main) can be visited.

The page will reload if you make edits. You will also see any lint errors in the console. Electron will restart automatically when you modified files in `main` directory.

### `yarn dist:*`

Distribute application to the `dist` folder. `*` can be replace by `win`, `mac` or `linux`. It will build the renderer and main scripts, and then use [electron-builder](https://www.electron.build/) to package them into distributable.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using [cra-template-simple-electron](https://github.com/vixalie/cra-template-simple-electron) template.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
