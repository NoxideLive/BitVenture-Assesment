# Running the Website and API Projects

To open and run the Website and API projects in Visual Code, Visual Studio, or JetBrains Rider, follow these steps:

1. Open the Website Project in Visual Code, Visual Studio, or JetBrains Rider.

2. In a terminal window, navigate to the root directory of the Website Project and run the command `yarn install` to install any necessary dependencies.

3. Once the dependencies are installed, start the webserver by running the command `yarn start`.

4. Open the API project in Visual Code, Visual Studio, or JetBrains Rider.

5. In Visual Code, Visual Studio, or JetBrains Rider, build the API project by clicking on the "Build" menu and selecting "Build Solution" or by pressing the "Ctrl + Shift + B" keys on your keyboard.

6. Once the build is complete, run the API project by clicking on the "Debug" menu and selecting "Start Without Debugging" or by pressing the "Ctrl + F5" keys on your keyboard. Note that I am running the API project in memory mode for EF Core.

7. Open a web browser and navigate to http://localhost:3000 to access the Website Project.

Note: I attempted to set up a local development environment using Docker and NGINX, but was unable to get the ASP.NET Core app working in Docker.
