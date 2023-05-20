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

# create-rating-productItem-component

1.  Rating.js

    ```js
    function Rating(props:{
       rating: Number
       numReviews?:Number
       captions?:String
    }){
       const {rating, numReviews, captions} = props
       return (
          <div className="rating" >
             <span>
                <i className={
                   rating >=1
                   ? 'fas fa-star'
                   : rating >=0.5
                   ? 'fas fa-star-half-alt'
                   : 'far fa-star'
                } >

             </span>

          </div>
       )
    }
    ```

# set page title

1. npm i react-helmet-async
2. main.tsx
   ```js
   import {HelmetProvider} from 'react-helmet-provider'
   ...
   <HelmetProvider>
      <RouterProvider router={router}>
   </HelmetProvider>
   ```

# Load-Products by React-query

1. npm i @tanstack/react-query @tanstack/react-query-devtools
2. main.tsx

   ```js
   //remove lines
   import axios from 'axios'
   axios.defaults.baseUrl =
   process.env.NODE_ENV === 'development' ? 'https://localhost:4000': '/'

   ...
      <HelmetProvider>
         <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
         <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </HelmetProvider>
   ```

3. apiClient.ts to src frontend apiClient

   ```js
   import axios from 'axios';
   const apiClient = axios.create({
     baseURL:
       process.env.NODE_ENV === 'development' ? 'https://localhost:5001' : '/',
     headers: { Content: 'application/json' },
   });

   export default apiClient;
   ```

4. hooks/productHook.ts to src frontend hook

   ```js
   export const useGetProductsQuery = ()=>{
      useQuery({
         queryKey: ['products'],
         queryFn: async ()=>
         (
            await apiClient.get<Product[]>(`api/products`)
         ).data,

      })
   }
   ```

# create product page

1. index.ts backend

   ```js
   app.get('/api/products/:slug', (req: Request, res: Response) => {
     res.json(sampleProducts.find((x) => x.slug === req.params.slug));
   });
   ```

2. productHooks.ts
   ```js
   export const useGetProductDetailsSlugQuery = (slug: string) => {
     useQuery({
       queryKey: ['products', slug],
       queryFn: async () =>
         ((await apiClient.get) < Product > `api/products/slug/${slug}`).data,
     });
   };
   ```

# create react context

1. Store.ts

   ```js
         type AppState = {
      model: string;
      };
      const initialState: AppState = {
      mode: localStorage.getItem('mode')
         ? localStorage.getItem('mode')!
         : window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
         ? 'dark'
         : 'light',
      };

      type Action = { type: 'SWITCH_MODE' };

      function reducer(state: AppState, action: Action): AppState {
      switch (action.type) {
         case 'SWITCH_MODE':
            return { mode: state.mode === 'dark' ? 'light' : 'dark' };

         default:
            state;
      }
      }

      const defaultDispatch: React.Dispatch<Action> = () => initialState;

      const Store = React.createContext({
      state: initialState,
      dispatch: defaultDispatch,
      });

      function StoreProvider(props: React.PropsWithChildren<{}>) {
      const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
         reducer,
         initialState
      );

      return <Store.Provider value={{ state, dispatch }} {...props} />;
      }

      export { Store, StoreProvider };
   ```

2. main.ts

   ```js
   <StoreProvider>
     <HelmetProvider>
       <QueryClientProvider client={queryClient}>
         <BrowserRouter>
           <App />
         </BrowserRouter>
         <ReactQueryDevtools initialIsOpen={false} />
       </QueryClientProvider>
     </HelmetProvider>
   </StoreProvider>
   ```

# Connect MongoDB

1. create mongodb database
2. npm install dotenv mongoose @typescript/typegoose
3. put mongodb uri in .env
4. MONGODB_URI=.........
5. index.ts

   ```js
   dotenv.config();
   const MONGODB_URI = process.env.MONGODB_URL || 'mongobd:.....';
   mongoose.set('strictQuery', true);
   mongoose
     .connect(MONGODB_URI)
     .then(() => {
       console.log('Connecting to MongoDB');
     })
     .catch(() => {
       console.log('error mongodb');
     });
   ```

6. product model

   ```js
   import {modelOptions, prop, getModelForClass} from '@typegoose/typegoose';
   @modelOptions({})
   @modelOptions({schemaOptions: {timestamps: true})
   export class Product{
      public _id!: string
      @prop({required: true}),

      public name!: string
      @prop({required: true, unique: true})

       public slug!: string
      @prop({required: true})

   }
   ```

7. npm i express-async-handler
8. product router.ts

   ```js
   export const productRouter = express.Router();
   productRouter.get(async (req, res) => {
     const product = await productModel.find();
     res.json(product);
   });
   ```
