This project is still being developed.
## Table of Contents
- [Backgroud](#background)
- [Introduction](#introduction)
- [Install](#install)
- [Quick Start](#quick-start)
- [Features](#features)

## Background
This is a management system related to esports, the esports club management system.
Esports is a super fast growing industry in the past few years, and it's also a field I am passionate about. Each team is becoming more and more complete, from small temas to large teams with operational team support. And a management system can help them handle their club efficiently.

## Introduction
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
It includes Ant Design components to construct interfaces. 
It uses a cloud database of MongoDB.
Also for quick browsing, you can access the deployed site directly. [Royal Never Give Up](https://)

## Install
Firstly, clone the repository from github.
The dependencies should all be included in `package.json` file, so just go [npm](https://npmjs.com) install if you don't have them locally installed. (Hint: `npm install` for both `react-client` and `react-server`.)
Then 
```sh
$ git clone https://github.com/AnthemLights64/FYPproject.git
$ cd react-client
$ npm install
$ cd ..
$ cd react-server
$ npm install
```
## Quick Start
Open two terminals, `react-client` and `react-server`. 
Go `npm start` at `react-server` firstly. (Don't close this terminal, keep it running.)
``` sh
npm start
```
And then go `npm start` at `react-client`.
``` sh
npm start
```
Now you can access localhost for this project.
``` sh
http://localhost:3000
```


## Features
- **Login**
An administrator account will be created when the project is first run. 
`Username:` `admin`
`Password:` `admin`
Administrator can create users after logging in the system.
- **Home Page**
This page displays 
- **Calendar**
This is a calendar where users can check the events of the club. Users who have management permissions can edit the calendar.
- **Members**
This page displays all the members of this club. If you click on the card of each member, you will see the details of this member. These details are designed by manager of this system. (There is a rich text editor in member information management, manager will edit the details.) Example:
- **Member Information Management**
Users who have permission to this page can do the CRUD operations of members. Example:
- **User Management**
Users who have permission to this page can create user, update user and delete user. Example:
- **Role Management**
Users who have permission to this page can create role, delete role and set role permission. Role permissions will determine which modules the user can access. When users are created, each user is given a role. Example: 

