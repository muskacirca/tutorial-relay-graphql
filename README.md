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
    "build": "babel src/server --out-dir build/server",
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

Then run the following command
````
npm start
````

That's it ! Go to localhost:3000


# Step 1
## Add react baby

It all start with a little npm install
````
npm i -S react react-dom
npm i --save-dev babel-loader
npm i --save-dev babel-preset-react
````

babel-preset-react will be used to understand react special syntax, we also need to modify our .babelrc file
````
{
  "presets": ["es2015", "react"],
  "ignore": ["/node_modules/"]
}
````

Create a frontend directory in in your src folder and add the following files :

*  src/frontend/components/LineViewer.js (our react component)

````
import React from 'react';
import ReactDOM from 'react-dom'

class LineViewer extends React.Component {

    render() {
        return  <div className="text-center">
                    <h1>Hello React World !</h1>
                </div>
    }
}

export default LineViewer
````

* src/frontend/App.js

````
import React from 'react'
import ReactDOM from 'react-dom'

import LineViewer from './components/LineViewer'

ReactDOM.render(<LineViewer />, document.getElementById('app'))
````

NB : This will add our LineViewer component to the html element with id app

* src/frontend/index.html

````
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Relay and GraphQL</title>
</head>
<body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
</body>
</html>
````

We also need to make a link between the index.html file and the javascript applicvation. We do that by adding a script a the end of the body tag.
For instance, we will use webpack to compile in es5 all our client code in a single file (bundle.js)

Here is the webpack config (**webpack.config.js**)
````
module.exports = {
  entry: "./src/frontend/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ]
  }
};
````

NB : it tells that our app client entry point is located in src/frontend/App.js. It also tells to transpile the code using babel
NB2 : run webpack using **webpack** or **webpack --watch** command line

you can also modify the build script of the **package.json** file :
````
"start": "babel src/server --out-dir build/server && webpack"
````
