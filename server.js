let express = require("express");
let request = require("request");
let querystring = require("querystring");

let app = express();

let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8888/callback";

app.get("/login", function(req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id:
          process.env.SPOTIFY_CLIENT_ID || "738b217a874a4e3fbaf0d8975bc919f2",
        scope: "user-read-private user-read-email",
        redirect_uri
      })
  );
});

app.get("/callback", function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          (process.env.SPOTIFY_CLIENT_ID ||
            "738b217a874a4e3fbaf0d8975bc919f2") +
            ":" +
            (process.env.SPOTIFY_CLIENT_SECRET ||
              "cb77b5da4e4043138e905f1e42d60b57")
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    let uri = process.env.FRONTEND_URI || "http://localhost:3000/callback";
    res.redirect(
      uri +
        "?access_token=" +
        body.access_token +
        "&expires_in=" +
        body.expires_in
    );
  });
});

let port = process.env.PORT || 8888;
console.log(
  `Listening on port ${port}. Go /login to initiate authentication flow.`
);
app.listen(port);
