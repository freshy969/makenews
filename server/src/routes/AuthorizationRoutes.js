import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Session from '../session';

export default function authorizationRoutes(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());

  app.post('/login', (req, res) => {
    if(req.body.username === "" || req.body.password === "") {
      res.status(401).json({"status":"error", "message": "cannot be blank"});
    }
    Session.login(req.body.username, req.body.password)
      .then((token) => {
        res.status(200).append('Set-Cookie', token).json({"status":"success", "message": ""});
      })
      .catch(() => {
        res.status(401).json({"status":"error", "message": "unauthorized"});
      });
  });

  app.use((req, res, next) => {
    var allowedUrls = ['/', '/login', '/app.js', '/app.css', '/images/newspaper.jpg'];
    if(allowedUrls.indexOf(req.originalUrl) !== -1) {
      next();
    } else if (req.cookies.AuthSession) {
      Session.currentUser(req.cookies.AuthSession)
        .then(() => {
          next();
        }).catch(unAuthorisedError);
    } else {
      unAuthorisedError();
    }
    var unAuthorisedError = () => {
      var error = new Error();
      error.status = 401;
      next(error);
    };
  });

  app.use((err, req, res, next) => {
    if (err.status !== 401) {
      next();
    }
    res.status(401);
    res.send("Unauthorised");
  });

}