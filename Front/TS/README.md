# Front/web

About web application with Typescript, I'm almost using the same approach than a .net application. I have a domain that contains the features with their logic. A handler uses a port to send data to external source and call an output port to notify the caller. I'm using typescript like a real OOP language, but I know it's not. We can found many ressources on clean architecture in web side. But most of them use an approach that does not fluent for me because it's using a FP approach or it's not seeing clean architecture like me. 

One of the good [ressource](https://github.com/Zenika/grenoble-hands-on-front-clean-architecture) I found is from Martin Choraine from Zenika. You can found a full presentation on youtube. I'm using this approach because it seems very logic for me, I can easily reuse my backend skills.

# Angular/VueJS 3

Angular and VueJS are framework/library to build web components. I see it like an implementation details of front application. My goal is to write a typescript application and make them use it to display web pages. 

So my components are pretty small, mapped to a viewmodel, manage only behaviors of html elements. Normally, each behavior of a component call a controller with the role of a proxy that call the good handler. The controller and all the controller use are outside the source code of ui project. The handler uses a outputPort (presenter) to notify the result of the handler. The output port implementation (presenter) is near the web component and has the responsability to update the viewmodel using by the component.
With this approach, I can easily using the same base code to switch from Angular to VueJS (or React if I wanted)

# Tests

My unit tests are focus on the handler and verify the output port content. With this approach, I can be sure that the presenter using by the component has the data or good information to be updated. 
I don't test components, I don't need it for the moment but if I would, I will not test html elements. It's so brittle, I will prefere test the way that I generate the viewmodel used by the component.