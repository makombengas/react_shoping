# Typescript Mern Dorette

## Works infos

1. Introduction
2. Installations tools
3. Creation TypeScript React App by vite
4. Create Git Repository
   1. Add README.md
   2. Create github account
   3. Connect vscode to github
   4. Publish repository
5. List products first typeScript code
   1. create products type
   2. create products array
   3. add products image
   4. render product
6. Add page routing
   1. npm i react-router-dom
   2. create route for home page
   3. create router for product page
   4. add helmet for setting page title

# Create Node server with TypeScript

1. create backend folder
   cd backend
   npm init
2. config typeScript
   npm install --save-dev typeScript ts-node-dev
   create tsconfig.json

   ```json
   {
     "compilerOptions": {
       "target": "es2015",
       "outDir": "./build",
       "strict": true,
       "module": "commonjs",
       "esModuleInterop": true
     }
   }
   ```

   add dev and build command to package.json
   `"dev": "ts-node-dev --respawn --transpile-only --files src/index.ts"`

3. config eslint
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
   create .eslintrc.js

   ```js
   module.exports = {
     env: {
       es2016: true,
       node: true,
     },
     extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
     parser: '@typescript-eslint/parser',
     parserOptions: {
       ecmaVersion: 'es2016',
       sourceType: 'module',
     },
     plugins: ['@typescript-eslint'],
   };
   ```

4. create express server
   npm install express
   npm install --save-sev @types/server

5. create src/index.js
   copy data.ts and product.ts from frontend to backend

   ```js
   import express, { Request, Response } from 'express';
   import { sampleProducts } from './data';
   const app = express();
   app.get('/api/products', (req: Request, res: Response) => {
     res.json(sampleProducts);
   });
   const PORT = 4000;
   app.listen(PORT, () => {
     console.log(`server listed at http://localhost:${PORT}`);
   });
   ```

# Fetch Products Backend to frontend

1. npm install axios
   in main.tsx

   ```js
   axios.defaults.baseURL =
     process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/';
   ```

2. define types in Homepage

   ```js
   type State = {
      products: Product[],
      loading: boolean,
      error: string
   }

   type Action =
   | {type: 'FETCH_PRODUCT'}
   | {
      type: 'FETCH_SUCCESS'
      payload:  Product[]
   }
    | {
      type: 'FETCH_FAIL'
      payload: {products: payload: string}
   }
   const initialState = State ={
      products: [],
      loading: true,
      error: "",
   }
   ```

   ```js
   const reducer = (state: State, action: Action) => {
     switch (action.type) {
       case 'FETCH_REQUEST':
         return { ...state, loading: true };
       case 'FETCH_SUCCESS':
         return { ...state, products: action.payload, loading: false };
       case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload };
       default:
         return state;
     }
   };
   ```

3. define get error function
   create types/AiError.ts

   ```js
    export declare type ApiError ={
      message: string,
      response:{
         data:{message: string},
      }
    }

   ```

   create utils.ts

   ```js
   export const getError = (error: ApiError) => {
     return error.response && error.response.data.message
       ? error.response.data.message
       : error.message;
   };
   ```

5 fetch products

```js
const [{loading, error, products}, dispatch] = useReducer < React.Reducer<State, Action>(reducer, initialState)
const {featuredProducts, latestProducts} = products
   useEffect(()=>{
      const fetchData = async ()=>{
         dispatch({type: 'FETCH_REQUEST'})
         try{
            const result = await axios.get('/api/products')
            dispatch({type: 'FETCH_SUCCESS', payload: result.data})
         }
         catch(err) {
            dispatch({type: 'FETCH_FAIL', payload: getError(err as AppError)})
         }
      }
      fetchData()
   }, [])

```

6 refine return statement
replace sampleProducts with products
