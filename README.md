# fly-io-nodejs-typescript

A sample NodeJS application that written in TypeScript and ready to deploy to fly.io

It comes with;

- [Axios](https://axios-http.com/?ref=github.com/nesimtunc/fly-io-nodejs-typescript)
- [PlaceHolder API for Todos](https://jsonplaceholder.typicode.com/)

Don't forget to setup `API_BASE_URL` in environment (for local) and as a secret on [fly.io](https://fly.io/?ref=github.com/nesimtunc/fly-io-nodejs-typescript) for production. Well, if you forget to set it, the app will tell you in the logs, and exit the process.

Check out the scripts in [package.json](package.json)

## How to deploy to fly.io

After creating an account on [fly.io](https://fly.io/?ref=github.com/nesimtunc/fly-io-nodejs-typescript) and install the [fly CLI tool](https://fly.io/docs/getting-started/installing-flyctl/?ref=github.com/nesimtunc/fly-io-nodejs-typescript)

`fly launch` for the first time

`fly deploy` for a new release

For more checkout the documentations [https://fly.io/docs](https://fly.io/docs/?ref=github.com/nesimtunc/fly-io-nodejs-typescript)

## ToDo

- [ ] Add some unit tests
