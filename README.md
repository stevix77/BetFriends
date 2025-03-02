# BetFriend : Make bets between friends
Manage bets between friends

I am Steve VALENTIN, a software engineer interested about craftsmanship subjects. I'm doing this project to help anyone and show how I'm seeing clean architecture in differents languages/frameworks.  
It is my representation, learnt from differents persons, books, videos... Also, you will see how with clean architecture I can easily write tests. This project is my learning thread. In the future I would like to translate in others languages that I will learn.

# Languages/Frameworks

	Front : .NetMAUI, Angular, VueJS  
	Back : C# .Net, typescript NestJS
	Database : Sql server
	
	Next languages ? Maybe Php symfony/laravel, Java spring, React

# Usecases

- [x] add a friend
- [x] search people
- [x] list friends
- [x] make a bet
- [x] accept/reject a bet
- [x] give bet result
- [x] display bets list
- [x] display bet details
- [x] create an account
- [x] authenticate

Usually, the approach is to make all of usecases with a language and switch to an other after. I wanted to doing differently and change language after each usecase. I am a C# .net developer, so it's possible that I'm writing code with few languages that you have never seen elsewhere or that we could write better or differently.
I give you details in each project folder

# Backend

## Core (domain, application)
As a backend developer, I wanted to use the same approach regardless the language. I have the domain layer that contains my entities, events and business logic. Also, we can found ports to exit the hexagon. My application layer has the responsability to deal with domain layer to orchestrate and take decisions.  

I'm using a CQRS approach so I have commands to manage the system and deal with domain layer whereas my queries don't deal with domain layer and has a port in the same layer to retrieve data. 

## Commands/Queries

My commandhandlers, manage the system and return nothing. I use the output port to notify the caller about the handler result.  
My queries return data but I'm thinking about using the same approach that commands and notify caller. Actually, when a query request data but has nothing, I return null/undefined and my controller needs to check if has received a null object to respond 404 for example. Maybe I could using output port (presenter) to notify the controller directly, what is the result and prepare the http response.

## Infrastructure layer

The infrastructure layer as almost the same structure (physics) for each language. I have in this layer, adapters and few technicals code to manage events, messaging, behaviors, modules. 

## Presentation layer 

I have the api project (.Net, NestJS) with controllers to request application layer and the presenter adapter of output port to receive application layer notification and build http response.

## Testing

### Unit tests 

I have unit tests which targeting application layer. The goal is to call a handler and assert for the commands about side effects like the repository and presenter when I use it or assert the respond of the query. 

### Integration tests

Integration tests have to check if the code is running well with system outside of my code. So generally, I test that repositories in my infrastructure layer can communicate with a database. For that I'm using a docker container with a sql server image. To start docker image, you'll have to run the command 'docker compose up' at the root of the repo.

### E2E tests

I have one or two end2end tests to verify if the DI is correctly configured. If tests are successful so I can tell that the application will running "well" with a valid configuration. 

## Frameworks

I'm using NestJs as a framework for the NodeJs api and .net 8 for .net world. The content of these parts has not a lot of code and logic so because of that, I could update versions or use another tools like AdonisJs or .net Core 3. In the futur, I will go on this project by adding PHP with both Symfony and Laravel. So those interested by PHP, stay tuned.

## Getting started

For the NestJs project, you need to run 2 npm install : one at the NodeJS folder and the other at the api/nest folder. I don't have configured how to choose between real implems or fake. By default it's fake, so if you want to use sql repositories for example you should configure DI to use sql implems that you want to use. If you choose Sql repositories don't forget to start docker container with the sql server image.
Then run npm run start to the api/nest folder.

For the dotnet project, you can choose in the appsettings.json file if you want to use fake or not repositories. Your choice will decide what implems E2E tests will be using.

# Frontend

## Domain

Domain contains all frontend logic. The presentation layer send an action to the domain by calling a port and domain send the result by calling the output port (presenter). It communicate with infrastructure layer to save or get data by using a gateway port. This layer has no dependencies to a framework, it is simple typescript or C# code.

## Infrastructure layer

Infrastructure layer contains adapters that implements domain port. It uses technical code like http requests, or port routing to be use by presentation layer to manage redirection. We can also found presenter implementation that publish a notification to the presentation layer. With this notification, presentation can update the UI by the viewmodel.

## Presentation layer

In presentation layer you can found the UI. 
In TS folder, One of the good [ressource](https://github.com/Zenika/grenoble-hands-on-front-clean-architecture) I used to learn is from Martin Choraine from Zenika. You can found a full presentation on youtube. I'm using this approach because it seems very logic for me, I can easily reuse my backend skills. 
It is in the src/infrastructure/ui folder. Into this folder, there is an Angular folder, and VueJs folder. These 2 folders, contains components that using viewmodels. A ViewModel is the class responsible to contain the model mapped to the component view and the logic the send or retrieve data.  
  
In C# world, there are 2 projects, MAUI with xaml views and MAUI blazor hybrid with html/css views. These 2 projects share together 2 others projects. One for the domain and an other for the infrastructure. MAUI projects contain views and viewModels.  
  
I use the same idea in TS or C# world. views are linked to viewModels. ViewModels call Domain to handle a feature. Domain use OutputPort (presenter) to notify results to viewModels and update the view.  
  
It's not clear for me for the moment if I want to let viewModels and/or presenters in view project/folder or if I prefer to let them in infrastructure layer. I have to think about it again and again. You can found these two things in the projects to make your own point of view. 

## Testing

In frontend, my tests are focus on features and domain layer. The goal is to assert that data sent from viewmodels are good or not If not, check that the presenter contains the good error message. If it is, then data are not good for the right reason. 
Also, My viewModels are not tested but should be. Maybe my unit tests should be starting from viewModels and not feature from application layer but setup of viewmodels could be more complicated. I have to think about it too.

## Getting started

For .Net projects, like all .Net projects, you have to install SDK MAUI, open the solution and run (or dotnet clean/dotnet build/ dotnet run). 
For TS projects, you have many npm install to do. There are 3 package.json. 
- Front/TS folder (do it first)
- Front/TS/infrastructure/ui/Vue
- Front/TS/infrastructure/ui/Angular

# Database

To manage my sql server database, I'm using a sqlProj project, it's in visual studio template list. It represent all sql object like tables, schemas, stored procedures from sql format. So I can see and control the structure of the database with GIT.  
The build of this project generate a dacpac file representing an sql server instance. With this file, I can publish it to my sql server instance (local or remote or docker container).  

In my database visual studio solution, I have 3 projects.  
- BetFriends.Database, that representing the sqlproj to build and publish my sql source code.
- BetFriends.Database.Build, is a class library project that referencing sql files from sqlproj. For those who want to build and deploy database with CI/CD and a linux, we need this because sqlproj targeting .net framework but only windows can work with .net framework. With this .net standard project and a custom configuration, it will generate the dacpac from a linux agent.  
 So I need this project with the next one to build my database in my CI.
- BetFriends.Database.Deploy, is a console application that referencing Microsoft.SqlServer.DacFx nuget package to manage dacpac. So in my CI, I can run this project with the path argument that referencing the dacpac builded to load it and deploy it to an instance. The same work that the windows agent can make with a sqlproj

# Continious integration

I'm using azuredevops to build and test my work. So, I have a yml file that containing 2 jobs. One with a linux agent to back part (database + backend), and an other one with macOs agent. I separated in 2 jobs with 2 agents, because I didn't success using docker on a macOs agent to build the database part. And on the linux agent, I didn't success to build .net front (.net MAUI/Blazor hybrid) So I decided to separe in 2 parts.

# Contact 

I'm available, you can send me a message on LinkedIn [Steve Valentin](https://www.linkedin.com/in/steve-valentin-3687765a/) if you want some details or explications, don't hesitate, contact me

# UX/UI

I'm not a designer or interested to build awesome UI. For html/css world I tried to download existing template but sometimes setup is complicated... It's not the topic of this project so don't be shoked if you download and run web projects xD One day maybe I would like to learn and make awesome UI

# Thanks

Thanks to those that I learnt from last five years from different slack/discord servers, LinkedIn posts, youtube podcasts, books...  
Special thanks to my two friends that give me the subject of this project (bet with friends)