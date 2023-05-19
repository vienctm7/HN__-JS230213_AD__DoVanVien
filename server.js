const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

// server.get("/api/v1/players", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(`${__dirname}/public/homepage.html`);
// });

server.get("/api/v1/scores", (req, res) => {
  res.sendFile(`${__dirname}/public/createGame.html`);
});

//lấy ra list players
server.get("/api/v1/players", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./dev-data/players.json"));
    res.json(data)
    console.log(data);
  } catch (error) {
      res.json({
        error,
      });
  }
})
 
// thêm mới player
 server.post("/api/v1/player", (req, res) =>{
  const { player1, player2, player3, player4 } = req.body;
  try {
    const players = JSON.parse(fs.readFileSync("./dev-data/players.json", "utf8" ))
    const id = players[players.leng -1].id + 1;
    const newplayer = {
      id: id,
      player1: player1,
      player2: player2,
      player3: player3,
      player4: player4
    }
    players.push(newplayer)
    fs.writeFileSync("./dev-data/todos.json", JSON.stringify(players));
    return res.status(200).send({
      status: "success",
      message: "players added successfully",
    });
  }catch (error) {
    res.send({ error });
  };
 });



server.get("*", (req, res) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
