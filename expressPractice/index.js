/*
Этот код создает HTTP сервер на Node.js с использованием фреймворка Express.
Он также использует модули fs и path для работы с файловой системой и путями.
Сервер отслеживает и сохраняет количество просмотров двух страниц в файле counter.json. 
Если пользователь переходит на одну из этих страниц, сервер обновляет счетчик в файле и отображает обновленное количество просмотров на странице.
*/

const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "counter.json");

const data = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

let counter = data["/"];
let counterAbout = data["/about"];

app.get("/", function (req, res) {
  res.send(
    `<h1>Корневая страница</h1><p>Просмотров: ${counter}</p><a href="/about">Ссылка на страницу /about</a>`
  );
  counter++;
  data["/"] = counter;
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
});

app.get("/about", function (req, res) {
  res.send(
    `<h1>Страница about</h1><p>Просмотров: ${counterAbout}</p><a href="/">Ссылка на страницу /</a>`
  );
  counterAbout++;
  data["/about"] = counterAbout;
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
});

app.listen(3000);
