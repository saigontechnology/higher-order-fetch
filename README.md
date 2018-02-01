# HIGHER-ORDER FETCH (HOF) EXAMPLE

See article here: https://medium.com/@rudy.huynh286/higher-order-fetch-a-clean-way-to-enhance-fetch-method-21fc2765f76

Despite being well tested and ready for production, this repo does not mean to be a library. It is a proof of concept for higher-order fetch, an idea that makes fetch enhancement elegent such as:
* Keep the simplicity of original fetch API after enhancement
* Easy to organize and manage multiple enhancement
* Easy to write test

To use this repo, it is recommended to clone the `src` directory into your project, then select the right HOFs in `./index.js` that suit for your application.

# Example usage:
```
import enhancedFetch from './src'

// use enhancedFetch() just like original fetch():
enhancedFetch('https://my.url').then(/* ... */)
```

# CLI
* npm install
* npm test

