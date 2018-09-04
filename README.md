# spiffy-giphy

> A simple vue js application to display gifs using the Giphy API

# Client Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# Server Setup

> Navigate to the "server" directory then

``` bash
# install dependencies
npm install

# start server at localhost:8081
npm run start
```

# Manual & Feature Testing
To test this application manual and feature testing was used. This involved checking new functionality, updated functionality, and any new addition such as HTML or CSS components during and after it was added.

The intention was to ensure that functionality, design and application flow matched expected results.

Example: When a new route was added. Use a web browser to load that route making sure it pointed to the relevant page/component.

Example: When adding and updating the search feature. Using a web browser to make sure the items received were relevant to the search term. Postman was also used to carry out the same set of queries. These were then compared with the results in the application.

# Browser Testing
Testing on Chrome and Firefox was easy, fast and efficient. There were problems with performance on Firefox and Internet Explorer. This was resolved by using downsized images to minimise image sizes.

Internet Explorer 11 had an issue with loading the web application. This was due to the limitations of the browser when it comes to using new Javascript APIs for example promises. To resolve this "babel-polyfill" was used.