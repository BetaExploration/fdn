import axios from "axios";
var querystring = require("querystring");

export default async function handler(req, res) {
    const fragment = new URLSearchParams(req.url.slice(1));
    const [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];
    console.log(accessToken);
    res.redirect('/')
}