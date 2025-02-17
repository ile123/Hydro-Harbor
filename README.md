 ### HYDRO HARBOR

### How to run

#### Local:
This is how to run the app on someone's local machine
- **Client:**
  1. `cd hydro-harbor-client`
  2. `npm install`
  3. `npm run dev`
- **Server:**
  1. `cd hydro-harbor-server`
  2. `npm install`
  3. `npm run dev`
- **Database:**
  - `sudo docker compose --profile local up`

#### Dockerized:
This is how to run the app with Docker(NOTE: This version of the app dose not work as of now, so please use only the local version)
- `sudo docker compose --profile dockerized up`
