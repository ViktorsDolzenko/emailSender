const sgMail = require('@sendgrid/mail');
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
sgMail.setApiKey(process.env.SGKEY);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

router.post('/', (req, res) => {
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

app.use("/", router);

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});


