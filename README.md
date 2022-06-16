<div align="center">
<h2 align="center">WilderTrace</h2>
  <p align="center">
    View the migration paths of animals.
    <br />
    <small><i>Bitcamp 2022 Hackathon (Best Educational Hack)</i></small>
    <br />
    <a href="https://andrewzh.com/Bitcamp2022">Live Demo</a> | 
    <a href="https://devpost.com/software/wild-stats">Devpost</a>
  </p>
</div>

<div align="center">
    <img src="https://user-images.githubusercontent.com/33373459/174143727-3dd50f2f-e343-47e2-bd19-fc91201a8798.png" alt="App picture" width="1000px"/>
</div>

## Inspiration

Thinking about this year's Bitcamp theme "Adventure Awaits" was a calling card to the wild. We also knew that we wanted to work with databases and data visualization. After stumbling upon movebank.org, we had an awakening to visualize animal migration paths because of the importance of animals in our ecosystems. We realized the exponential growth of urbanization and the drastic effects of climate change would greatly impact these animals and their migration patterns and decided that this is an important path to take. In the future, such a project could actually visualize the impact of construction projects or climate disasters on our ecosystems to better understand how to protect animals.

## Technical Details

Our app consists of three parts:
1) Client: Visualizes the animals' tracks by chronologically displaying GPS locations.
2) API: Acts as a middle layer between the client and the database. Exposes endpoints that the client uses to query data.
3) Utilities: Used to add/modify/delete data from the database.

### Built with
-   Server: Node.js/Express, Vercel Serverless Functions, JS, Mongoose
-   UI: React.js, Redux Toolkit, react-map-gl, MUI, JS, HTML, CSS 
-   Database: MongoDB

## Contribute:

### Prerequisites
1. NPM is required to run this project.
    ```sh
    npm install npm@latest -g
    ```
2. Vercel CLI:
    ```sh
    npm i -g vercel
    ```

### Installation
1. Clone the repo
    ```sh
    git clone https://github.com/pillious/Bitcamp2022.git
    ```
2. Install NPM packages (api & client)
    ```sh
    cd Bitcamp2022/api
    npm install

    cd ..

    cd client
    npm install
    ```
3. Run application (api & client):
    - open two seperate terminals. <br />

    In first terminal: <br />
    ```sh
    <!-- Navigate to api directory. -->
    npm start
    ```

    In second terminal: <br />
    ```sh
    <!-- Navigate to client directory. -->
    npm start
    ```

4. View client on localhost:3000.

<hr />

## Additional Notes:

### Deployment: <br />
API: 
```sh
vercel
vercel --prod
```
Client:

```sh
<!-- uses the gh-pages package -->
npm run deploy
```

Client issue: react-map-gl not working on production build. Transpilation issue w/ babel + create-react-app. <br />
Solution: https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling

-   change browserlist config in package.json.
-   for some reason, this doesn't work if you split the browser list into prod and dev.
