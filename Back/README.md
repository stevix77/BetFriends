# Backend

# Core (domain, application)
As a backend developer, I wanted to use the same approach regardless the language. I have the domain layer that contains my entities, events and business logic. Also, we can found ports to exit the hexagon. My application layer has the responsability to deal with domain layer to orchestrate and take decisions. I'm using a CQRS approach so I have commands to manage the system and deal with domain layer whereas my queries don't deal with domain layer and has a port in the same layer to retrieve data. 

# Commands/Queries

My commandhandlers, manage the system and return nothing. I use the output port to notify the caller about the handle result. My queries return data but I'm thinking about using the same approach that commands and notify caller. Actually, when a query request data but has nothing, I return null/undefined and my controller needs to check if has received a null object to respond 404 for example. Maybe I could using output port (presenter) to notify the controller directly, what is the result and prepare the http response.

# Infrastructure layer
The infrastructure layer as almost the same structure (physics) for each language. I have in this layer, adapters and few technicals code to manage events, messaging, behaviors, modules. Also, I have the api project (.Net, NestJS) with controllers to request application layer and the presenter adapter of output port to receive application layer notification and build http response.

# Testing

For the moment, I only have unit tests which targeting application layer. The goal is to call a handler and assert for the commands about side effects like the repository and presenter when I use it or assert the respond of the query. 