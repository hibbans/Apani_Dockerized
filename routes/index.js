var express = require('express');
var router = express.Router();
// const { httpRequestCounter } = require('./metrics'); // Import counter dari metrics.js
const client = require('prom-client');

// Buat registry baru
const register = new client.Registry();
// Mendaftarkan default metrics
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

// Registrasi counter ke registry
register.registerMetric(httpRequestCounter);

// Middleware untuk menghitung semua permintaan
router.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode
    });
  });
  next();
});

/* GET home page. */
router.get('/', async (req, res, next) =>{
   res.status(200).render('index', { title: 'Express' });
   res.send( await register.metrics());

  //  // Tambahkan hitungan permintaan
  // httpRequestCounter.inc({
  //   method: req.method,
  //   route: '/', 
  //   status_code: res.statusCode
  // });
});

router.get('/index', (req, res) => {
    res.status(200).json({    
    message: 'ok' 
    });
    // httpRequestCounter.inc({
    //     method: req.method,
    //     route: '/',
    //     status_code: res.statusCode
    // });
});

// Endpoint /metrics untuk Prometheus
router.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send( await register.metrics());
});

module.exports = router;
