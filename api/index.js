const express = require("express");
const app = express();
const port = 3000;

const itemsRouter = require("./routes/items");

app.use('/api/items', itemsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
