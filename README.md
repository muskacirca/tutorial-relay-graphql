# Step 0
## init simple node application

We're gonna add a simple node server using express that will listen on the 3000 port

````
npm install -S express
````

We're gonna use babel to transpile our es6 javascript code to es5
````
npm install --save-dev babel-cli babel-preset-es2015
````

We need to create a .babelrc file that is the configuration file for babel. We tell him to use the es2015 presets and to ignore all files in the node_modules directory.
````
{
  "presets": ["es2015"],
  "ignore": ["/node_modules/"]
}
````

We will need to modify the package.json file to add a new script that will build our application
````
{
  "name": "graphql_relay_app",
    ...
  "scripts": {
    "build": "babel src --out-dir build",
    ...
  },
  "dependencies": {
    ...
  }
}
````

Then just run the following command
````
npm run build
````

Modify the package.json file again to add a new script that will start our application
````
{
  "name": "graphql_relay_app",
    ...
  "scripts": {
    "start": "node build/server/server.js",
    ...
  },
  "dependencies": {
    ...
  }
}
````

Then run the follwinf command
````
npm start
````

That's it ! Go to localhost:3000