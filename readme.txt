EXPRESS SUGGESTS: use express-generator

MANUAL SETUP **npm i -D means npm install --save-dev**
npm init -y
npm install -D typescript ts-node-dev dotenv eslint prettier rimraf @types/node @types/express @types/mongoose
npm i express mongoose cookie-parser 

create a tsconfig file (Look at config section)

ts-node-dev: Tweaked version of node-dev that uses ts-node under the hood.

body-parser not needed anymore since express4.16
app.use(bodyparser.json()); becomes app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); becomes app.use(express.urlencoded()); //Parse URL-encoded bodies

SCRIPTS
"scripts": {
    "dev": "ts-node-dev --respawn --transpileOnly -r dotenv/config --inspect -- ./src/index.ts",
    "dev:debug": "ts-node-dev --respawn --transpileOnly -r dotenv/config --inspect-brk -- ./src/index.ts",
    "prod": "rimraf ./dist/* && tsc && node ./dist/src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

*************************node project side by side with create-react-app*************************
If you have a node project side by side with create-react-app, have a separate tsconfig, maybe call it tsconfig.node.json
then point to it using --project
"ts-node-dev --project tsconfig.node.json --respawn ...

Also, your tsconfig should have different values than create-react-app
"module": "commonjs" ,
"target": "es6",
"sourceMap": true,

Create react app needs "module":"esnext" tp run and so react-scripts will rewrite the tsconfig file
to be in a runnable state

Then modify your original tsconfig that CRA uses
"include": ["src"],
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "bower_components",
    "jspm_packages ",
    "src/server"
  ]
*************************node project side by side with create-react-app END*********************

  if you have a script with "pre" before it, it will run that first
  prestart: 
  start: node ./dist/index.js 


RANDOM
async, axios, cookie-parser, debug, gulp, jest, lodash, memoize, moment, mongodb, mongoose, morgan, qs, shelljs, uuid, ws

CONFIG FILES

INITIALIZE TYPESCRIPT with node .\node_modules\.bin\tsc --init

**Will compile every ts file and put it in the dist folder
tsconfig.json.  
{
  "compilerOptions": {    
    "target": "es6" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,    
    "sourceMap": true /* Generates corresponding '.map' file. */,    
    "outDir": "dist" /* Redirect output structure to the directory. */,    
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* Raise error on expressions and declarations with an implied 'any' type. */,        
    "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,    
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */    
  },
  "include": ["src/**/*"]
}


LINTING: **ESLint is now better than tslint for typescript**

INITIALIZE TSLINT file 
./node_modules/.bin/tslint --init   
{
  "defaultSeverity": "error",
  "extends": ["tslint:recommended"],
  "jsRules": {},
  "rules": {
    "no-console": false
  },
  "rulesDirectory": []
}

npm i -D eslint

./node_modules/.bin/eslint --init
"@typescript-eslint/eslint-plugin": "^2.17.0",
"@typescript-eslint/parser": "^2.17.0",
"eslint-config-airbnb-base": "^14.0.0",
"eslint-plugin-import": "^2.20.0",

npm i -D prettier eslint-config-prettier eslint-plugin-prettier
create file .prettierrc.js
module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
};

modify eslintrc.js
{
  "extends": ["plugin:prettier/recommended"]
}