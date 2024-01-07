// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.

// Подсказка:
// Вы можете сохранять файл в формате JOSN,
// где в объекте ключом будет являться URL страницы, а значением количество просмотров страницы

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