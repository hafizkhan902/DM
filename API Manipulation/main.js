const fs = require("fs");
const http = require("http");
const url = require("url");

const html = fs.readFileSync("./templates/index.html", "utf-8");
const productpage = fs.readFileSync("./templates/product.html", "utf-8");
const data = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));

const productarray = data.map((prod) => {
  let output = productpage.replace("{{%IMAGE%}}", prod.productImage);
  output = output.replace("{{%PRICE%}}", prod.price);
  output = output.replace("{{%NAME%}}", prod.name);
  output = output.replace("{{%MODELNO%}}", prod.modelNumber);
  output = output.replace("{{%CAMERA%}}", prod.camera);
  output = output.replace("{{%SIZE%}}", prod.size);
  output = output.replace("{{%ROM%}}", prod.rom);
  output = output.replace("{{%DESCRIPTION%}}", prod.Description);
  output = output.replace("{{%ID%}}", prod.id);
  return output;
});

const server = http.createServer((req, res) => {  //handling server request and response 
let {query,pathname:path}= url.parse(req.url,true)
  // let path = req.url;

  if (path === "/" || path === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html.replace("{{%CONTENT%}}", "You are in home page"));
  }
  
  else if (path === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      html.replace(
        "{{%CONTENT%}}",
        "You are on the About page\n To know more please visit: \nwww.facebook.com/ethun.01645"
      )
    );
  } 
  
  else if (path === "/product") {
    if(!query.id){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html.replace("{{%CONTENT%}}", productarray));
  }
  else{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(`You are in ${query.id} no id`);
  }
  }
});

server.listen(3000, () => {
  console.log("server has started");
});
