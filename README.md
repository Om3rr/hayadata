## Build Setup

### npm run build --prod
will create "dist" folder which you should put under "app/dist" (to let flask to serve it)


### to debug it locally you should have flask running on localhost:80 and run npm start
### every call to "/api/endpoint" will go to localhost:80/api/endpoint <instead of localhost:8080...>


Code structure

API Definitions - src/plugins/api
MainPage Definition - src/components/Main.vue
Query(Header of the main page) Component - src/components/QueryController.vue
