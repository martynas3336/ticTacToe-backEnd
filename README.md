# Tic Tac Toe Back-End

## Summary
This is the api of Tic Tac Toe game created with the help of `express`, `knex` and `mysql`. Its purpose is to save users game state, validate actions, log actions and return everything to the client side when needed. Api should never respond with an error code other than 404.

## Installation
1. Clone this repository with `git clone https://github.com/martynas3336/ticTacToe-backEnd.git`.
2. Cd into the cloned directory with `cd ticTacToe-backEnd`.
3. Edit `docker-compose.yml` and edit `ports` per your need.
4. Run docker.
```
docker-compose up -d
docker exec -it tictactoebackend_api_1 sh
```
5. Install dependencies with `npm install`.  
6. Start the application with `npm run start`.

## Endpoints

### Get tiles / create new tiles

- **URL**  
  /api/tiles
- **Method**  
  GET
- **Header Params**  
  **Optional:**  
  Auth=[string]
- **Success Response:**  
    - **Code:** 200  
    - **Content:** {id:'00334e11-7f95-4c00-abe6-f328bff22fcf', grid:[0,0,0,0,0,0,0,0,0]}  
    
### Reset tiles / create new tiles

- **URL**  
  /api/tiles/reset
- **Method**  
  POST
- **Header Params**  
  **Optional:**  
  Auth=[string]
- **Success Response:**  
    - **Code:** 200  
    - **Content:** {id:'00334e11-7f95-4c00-abe6-f328bff22fcf', grid:[0,0,0,0,0,0,0,0,0]}  

### Update single tile / create new tiles

- **URL**  
  /api/tiles/clickTile/:_i
- **Method**  
  POST
- **Header Params**  
  **Optional:**  
  Auth=[string]
- **URL Params**  
  **Optional:**  
  _i=[integer]
- **Success Response:**  
    - **Code:** 200  
    - **Content:** {id:'00334e11-7f95-4c00-abe6-f328bff22fcf', grid:[1,0,0,0,0,0,0,0,0]}  


### Get logs for tiles

- **URL**  
  /api/tiles/logs
- **Method**  
  GET
- **Header Params**  
  **Optional:**  
  Auth=[string]
- **Success Response:**  
    - **Code:** 200  
    - **Content:** [{id:'0180d048-1ad1-4117-a8f9-f8989c12375c', tileId:'00334e11-7f95-4c00-abe6-f328bff22fcf', main:'Initializing new game.', createdAt:'2020-04-26 14:25:26'}]  

## Tests
Tests are made using `mocha` and `chai`. Test file is located in `test` directory. To run the test, run `npm run test`.

## Additional actions
You may have to setup a higher level webserver, which would reverse proxy to this application.

Nginx example:
```
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    location /api {
        proxy_pass http://127.0.0.1:5020;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
