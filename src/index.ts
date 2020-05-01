import * as express from 'express'

const app = express()
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  `Server listening on port ${PORT}.`
});