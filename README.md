# Time Tracker

This project uses node v.16.13.1 and npm v.8.1.2. It uses vite as a bundler with vue-ts template and tailwind css for styling. 
## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```
### Compiles and minifies for production

```
npm run build
```

## Testing

### Unit Testing
Unit testing is done using vitest. To run unit tests:
```
npm run test
```
To see the coverage of unit tests:
```
npm run coverage
```
### E2E Testing
E2E testing is done using cypress. To view the tests, we have to first serve our app in test mode. This is *important* because otherwise cypress will have issues with vue transitions. To avoid that, close existing running apps then run:
```
npm run serve:test
```
Then open cypress by running this command in another terminal:
```
npm run cy:open
```