import * as express from 'express'
import { Request, Response } from 'express'
import * as path from 'path'

const app = express();
const {
  PORT = 3000
} = process.env;

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

app.get('*', (req: Request, res: any) => {
  res.redirect('/')
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT);
  });
}

export default app;