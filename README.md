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


# Step 2
## Init a GraphQL server

First of all we need to install new packages

````
npm i -S graphql graphql-relay express-graphql graphiql
npm i --save-dev babel-preset-stage-0
````

NB : graphiql is a tool that provide a nice interface to test graphql query
NB 2 : babel-preset-stage-0 is used to understand the updateSchema.js 

Then create a file called schema.js in src/server/data/

````
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql'

import {
    globalIdField
} from 'graphql-relay'

var LineType = new GraphQLObjectType({
    name: 'LineType',
    description: 'This represents a Line'
    fields: {
        id: globalIdField('LineType'),
        iccId: {
            type: GraphQLString,
            resolve: (obj) => obj.iccId
        },
        ...
    }
});

var GraphQLQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query'
    fields: {
        line: {
            type: LineType,
            resolve: () => { // Here retrieve data }
        }
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLQuery
});
````

We need to execute a tool, that will parse our schema and create two files schema.json and schema.graphql
The schema.json file will be used later by Babel Relay Plugin

Create a new directory **tools** and add the following file :

````
import fs from 'fs';
import path from 'path';
import { Schema }  from '../src/server/data/schema';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
    var result = await (graphql(Schema, introspectionQuery));
    if (result.errors) {
        console.error(
            'ERROR introspecting schema: ',
            JSON.stringify(result.errors, null, 2)
        );
    } else {
        fs.writeFileSync(
            path.join(__dirname, '../src/server/data/schema.json'),
            JSON.stringify(result, null, 2)
        );
    }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
    path.join(__dirname, '../src/server/data/schema.graphql'),
    printSchema(Schema)
);

````

and modify the script part of the package.json file

````
"update-schema": "babel-node tools/updateSchema.js"
````

