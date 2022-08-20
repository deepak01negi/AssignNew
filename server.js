const { app } = require("./app");

const PORT = 3929;

app.listen(PORT, () => {
    console.log('server is listening on ', PORT);
});