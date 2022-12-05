import React from "react";

const Explanations = () => {
    return (
        <div className={"container"}>
            <h1 className="text-2xl font-bold">
                Explanations
            </h1>
            <p className="my-4">
                This page provides explanations for different concepts and features in the app.
            </p>
            <h2 className="text-xl font-bold mt-4">
                useDelayedApi hook
            </h2>
            <p className="my-4">
                The `useDelayedApi` hook is a custom hook that is used to artificially inflate the time taken for each
                API request in order to simulate loading and cancellation inside the app. This is useful in cases where
                you want to show a loading indicator or cancel a request in progress.
            </p>
            <p className="my-4">
                The `useDelayedApi` hook accepts the same parameters as the `useApi` hook, but it also takes a `delay`
                parameter which specifies the amount of time to wait before making the request. This delay is
                implemented using a JavaScript `setTimeout` function, which allows the hook to simulate the time taken
                for the request to complete.
            </p>
            <p className="my-4">
                The hook returns the same object as the `useApi` hook, but it has additional `delay` and `cancel`
                properties that can be used to update the delay time and cancel the in-progress request, respectively.
            </p>
            <p className="my-4">
                To use the `useDelayedApi` hook, you can import it from the `useDelayedApi` file and call it in your
                component like this:
            </p>
            <pre className="my-4 bg-gray-200 rounded p-4">
                {"const { data, isLoading, error, delay, cancel, get, post, put, remove } = useDelayedApi(axiosInstance, 500);"}
            </pre>
            <p className="my-4">
                This will create a `useDelayedApi` hook with a delay of 500 milliseconds and assign the returned object
                to the `const` declared above. You can then use the object to make API requests, update the delay time,
                and cancel in-progress requests.
            </p>

            <h2 className="text-xl font-bold mt-4">
                EF Core and InMemory mode
            </h2>
            <p className="my-4">
                The app uses EF Core in InMemory mode for development purposes. EF Core is the Entity Framework Core,
                which is an object-relational mapper (ORM) for .NET applications. It allows developers to work with a
                database using objects, making it easier to query and update data in the database. InMemory mode allows
                the app to use an in-memory database for development, which means that all database operations are
                performed in memory without actually making any changes to a persistent database.
            </p>
            <p className="my-4">
                Using InMemory mode is useful for development because it allows the app to run quickly and without the
                need for a separate database server. It also allows the app to be tested more easily by providing a
                consistent, known state for the in-memory database. When the app is ready to be deployed, it can be
                switched to use a different database provider, such as SQL Server, without having to change the database
                access code. This makes it easier to develop and test the app, and it also allows the app to be more
                easily scalable and maintainable in the long term.
            </p>

            <h2 className="text-xl font-bold mt-4">
                Splitting the React app and .NET Core API into separate projects
            </h2>
            <p className="my-4">
                Splitting the React app and the .NET Core API into separate projects can be a good idea for several
                reasons, including improved separation of concerns and greater flexibility in terms of hosting and
                deployment. By keeping the front-end and back-end components of the application separate, it is easier
                to maintain a clear separation between the different responsibilities and concerns of each component.
                This can make the code easier to understand, maintain, and modify over time.
            </p>
            <p className="my-4">
                Additionally, splitting the React app and the .NET Core API into separate projects can provide greater
                flexibility in terms of hosting and deployment. By keeping the front-end and back-end components of the
                application separate, they can be deployed to different servers or hosting services, which can allow for
                greater scalability and reliability. This can provide more flexibility and control over the deployment
                and scaling of the application.
            </p>

            <h2 className="text-xl font-bold mt-4">
                Splitting the code into multiple controllers
            </h2>
            <p className="my-4">
                It is not necessary to split the code into multiple controllers, and it is generally considered good
                practice to
                keep related functionality in a single controller. This makes it easier to manage and maintain the code,
                as well
                as making it more organized and easier to understand.
            </p>
            <p className="my-4">
                In the example code, all of the action methods are related to data management, so it makes sense to keep
                them in a
                single `DataController` class. Splitting them into multiple controllers would not provide any benefits
                and would
                make the code less readable and more difficult to manage.
            </p>
            <p className="my-4">
                However, if the codebase grows and becomes more complex, it might make sense to split the code into
                multiple
                controllers to keep related functionality separate and make it easier to manage. For example, if the
                codebase
                added additional functionality for managing accounts and transactions, it might make sense to create a
                separate
                `AccountsController` and `TransactionsController` to handle those specific tasks.
            </p>

        </div>
    );
};


export default Explanations;
