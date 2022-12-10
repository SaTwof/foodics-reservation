# Restaurant Reservation System

## Proxy service
I had a problem getting the API work with `vue.config.js` file, I tried to set `devServer.proxy` to `https://api.foodics.dev/v5/` along with many options but in vain. so, I built a small proxy service to overcome the CORS issue. Please open a new CMD and run `yarn proxy` and your `.env` file values should be like:
```
API_BASE_URL=http://localhost:3000
API_TOKEN=YOUR_TOKEN!
```

If you don't have any issues with with CORS, then your `.env` file should be like:
```
API_BASE_URL=https://api.foodics.dev/v5
API_TOKEN=YOUR_TOKEN!
```

## Project setup
```
cp .env.example .env
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
