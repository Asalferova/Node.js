/*
Этот код создает веб-сервер на Node.js с использованием фреймворка Express и модулей fs и path для работы с файловой системой и путями. 
Он также использует библиотеку Joi для валидации входящих данных.
Сервер может обрабатывать CRUD операции (создание, чтение, обновление, удаление) над пользователями 
и сохраняет информацию о пользователях в файле users.json. 
Все входящие данные валидируются с использованием библиотеки Joi перед обработкой. 
Если данные не проходят валидацию, сервер отправляет ответ с кодом состояния 400 и деталями ошибки. 
Если запрос не может быть обработан, сервер отправляет ответ с кодом состояния 404.
*/
"use strict";
const express = require('express');
const fs = require('fs');
const path = require('path');
const { checkParams, checkBody } = require('./validation/validator')
const { userScheme, idScheme } = require('./validation/scheme');

const app = express();

app.use(express.json())

const pathToFile = path.join(__dirname, 'users.json');


// обработчик получения всех пользователей
app.get('/users', (req, res) => {
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'UTF-8'));
    res.send(usersData.users);
});


// Роут получения отдельного пользователя
app.get('/users/:id', checkParams(idScheme), (req, res) => {
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'UTF-8'));
    const user = usersData.users.find((user) => user.id === Number(req.params.id));
    if(user){
     res.send(user)
    } else {
     res.status(404);
     res.send({ user : null });
    }
 })


//роут создания пользователя
app.post('/users', checkBody(userScheme), (req, res) => {
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'UTF-8'));
    const newUser = {
        id:new Date().getTime(),
        ...req.body
    };
    usersData.users.push(newUser);
    fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));
    res.send(newUser);
});


//роут обновления пользователя
app.put('/users/:id', checkParams(idScheme), checkBody(userScheme), (req, res) => {
    const usersData = JSON.parse(fs.readFileSync(pathToFile, 'UTF-8'));
   const user = usersData.users.find((user) => user.id === Number(req.params.id));
   if(user){
    user.name = req.body.name;
    user.secondName = req.body.secondName;
    user.city = req.body.city;
    user.age = req.body.age;
    fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));
    res.send( user )
   } else {
    res.status(404);
    res.send({ user : null });
   }
})


// Роут удаления пользователя
app.delete('/users/:id', checkParams(idScheme), (req, res) => {
   const usersData = JSON.parse(fs.readFileSync(pathToFile, 'UTF-8'));
   const user = usersData.users.find((user) => user.id === Number(req.params.id));
   if(user){
    const userIndex = usersData.users.indexOf(user);
    usersData.users.splice(userIndex, 1);
    fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));
    res.send( user );
   } else {
    res.status(404);
    res.send({ user : null });
   }
})


app.use((req, res) => {
    res.status(404).send({
        message: 'URL not found!'
    });
});


app.listen(3000);
