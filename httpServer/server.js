/*Здесь реализован простой веб-сервер на Node.js с использованием модуля http.
Сервер отслеживает и отображает количество просмотров двух страниц. 
Если пользователь попытается перейти на любую другую страницу, сервер вернет сообщение об ошибке 404.
*/
"use strict";

const http = require("http");
let counter = 0;
let counterAbout = 0;

const server = http.createServer((req, res) => {
  console.log("запрос получен");
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    counter++;
    res.end(`<h1>Корневая страница</h1>
    <br>
    <p>просмотров: ${counter}</p>
    <br>
    <a href="/about">Ссылка на страницу /about</a>
    `);
  } else if (req.url === "/about") {
    counterAbout++;
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Страница About</h1>
    <br>
    <p>просмотров: ${counterAbout}</p>
    <br>
    <a href="/">Ссылка на страницу /</a>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
    res.end("<h1>Страница не найдена</h1>");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Сервер загружен на порту ${port}`);
});
