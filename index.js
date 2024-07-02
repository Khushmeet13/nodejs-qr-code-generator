const express = require("express");
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
  });

  app.post('/generate', (req, res) => {
    const { text } = req.body;
  
    QRCode.toDataURL(text, (err, url) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to generate QR code' });
      }
      res.render('index', { qrcodeUrl: url });
    });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})