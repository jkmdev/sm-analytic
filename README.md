<p align="center">
  <img src ="https://i.imgur.com/sdLrKkn.png" />
  <br>
  An application for tracking social media statstics and follower sentiment.
  <br>
</p>


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them:

- ASP.NET Core 2.1
- [angular cli](https://angular.io/guide/quickstart) 
- [Node.js](https://nodejs.org/en/)

### Running App Locally

To run a local version of the project:

```
cd ClientApp
npm install
npm start
```
Then visit `localhost:4200` to view and interact with the application.

### Adding new npm packages

```
cd ClientApp
npm install --save <package_name>
```

### Running ng commands 

Used when generating new components, modules, etc.

```
cd ClientApp
ng <command-name>
```

## Running the tests

Run `ng test` from root to run front-end tests.

## Deployment


TBD

We could probably use this [guide](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/index?view=aspnetcore-2.2) for deploying and hosting this sort of application. And/or maybe [this one](https://docs.microsoft.com/en-us/aspnet/core/tutorials/publish-to-azure-webapp-using-vs?view=aspnetcore-2.2) for publishing to Azure?

The process might be something like:

1. Run `dotnet publish` to compile app code and copy the files required to run the app to the `dist` or `publish` folder.
2. Set up an appropriate process manager on the VM (I think we have Nginx right now, but we might need to switch to IIS or Windows Service)
3. Copy the output of `dotnet publish` to the VM/server.

We might want to automate our deployments, so that we don't need to assign a single person to it. IMO it'd be ideal if we deployed every time our master branch was updated. We might be able to use Travis CI for this...? Or maybe Azure? Somehow.


## Built With

* [.NET Core](https://dotnet.microsoft.com/download) - backend framework
* [Angular](https://angular.io/) - frontend framework
* [Bootstrap 3](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - css framework

More should be added here later.

## Authors

- [Manuel Fernandez](https://github.com/PurpleBooth)
- [Vladimir Rozin](https://github.com/PurpleBooth)
- [Julia McGeoghan](https://github.com/PurpleBooth)

## References

This app was bootstrapped using [this](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?view=aspnetcore-2.2&tabs=visual-studio) guide.

