import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl font-bold">
                Hello, BitVenture developers!
            </h1>
            <p className="my-4">
                I have completed the task given to me and it's ready to import the data.
            </p>
            <p className="my-4">
                To import the data, you can use the "Import File" option in the sidebar.
                This will allow you to select a file to import and add the data to the
                app.
            </p>
            <p className="my-4">
                Note a secondary import will fail, if you want to re-import the data, restart the API.
            </p>
            <h2 className="text-xl font-bold mt-4">
                How the app functions
            </h2>
            <p className="my-4">
                The app imports data from a file and stores the information about the
                accounts and transactions in a .NET Core API. The app allows users to
                view the imported data and generate reports on the data.
            </p>
            <h2 className="text-xl font-bold mt-4">
                Suggestions for improving the app I would do if I had more time
            </h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <Link to="/improvements">View improvements</Link>
            </button>
        </div>
    );
};

export default Home;
