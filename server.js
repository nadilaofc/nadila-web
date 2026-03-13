const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// database produk (contoh)
const products = [
  { id: 1, name: "script bot wa", price: "50.000", link: "https://mediafire.com/file1" },
  { id: 2, name: "panel pterodactyl", price: "25.000", link: "https://mediafire.com/file2" }
];

app.get('/', (req, res) => {
  res.render('index', { products });
});

// setup upload bukti
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, 'bukti-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post('/bayar', upload.single('bukti'), (req, res) => {
  // logic: admin cek manual/auto (disini simulasi auto approve)
  const product = products.find(p => p.id == req.body.productId);
  res.send(`pembayaran diproses! silakan ambil file anda: <a href="${product.link}">klik disini</a>`);
});

app.listen(3000, () => console.log('nadila ofc running on port 3000'));
