fetch("http://localhost:3000/api/v1/players")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let index = Math.floor(Math.random() * data.length);
  })
  .catch((err) => console.log(err));
