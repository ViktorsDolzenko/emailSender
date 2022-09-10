const sgMail = require('@sendgrid/mail');
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const serverless = require('serverless-http');
const cors = require('cors');
sgMail.setApiKey(process.env.SGKEY);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


router.post('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
  res.status(201);
  const name = req.body.name;
  const tel = req.body.tel;
  const msg = {
    to: 'vitja1234@gmail.com',
    from: 'vitja1234@gmail.com',
    subject: 'Заявка на обучение',
    text: name + ' ' + tel,
    html: `<strong>Имя: ${name}, Телефон ${tel} </strong>`,
  };

  sgMail
      .send(msg)
      .then(() => {
        console.log(req.body.msg)
        res.end();
      })
      .catch((error) => {
        console.error(error)
      })
})

app.use(cors())

app.use("/.netlify/functions/app", router);

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});

module.exports = app;
module.exports.handler = serverless(app)

