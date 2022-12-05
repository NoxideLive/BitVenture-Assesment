import React from "react";

const Improvements = () => {
    return (
        <div className={"container"}>
            <h1 className="text-2xl font-bold">Improvements</h1>
            <p className="my-4"></p>
            <ul className="list-disc pl-4 my-4">
                <li>
                    Add support for importing data from different file formats, such as CSV
                    and Excel.
                </li>
                <li>
                    Allow users to filter and sort the data in the "Viewing Imports"
                    section.
                </li>
                <li>
                    Add more report types to the "Reports" section, such as a pie chart that
                    shows the distribution of transactions by category.
                </li>
                <li>
                    Save reports generated to database and allow users to view them later.
                </li>
                <li>
                    Add the ability for users to export the reports as PDF or Excel files.
                </li>
                <li>
                    Use SignalR for async file uploads. SignalR is a real-time messaging
                    framework that allows the app to receive progress updates from the API
                    while the file is being uploaded and processed. This allows the app to
                    provide a better user experience by displaying real-time progress
                    information to the user.
                </li>
                <li>
                    Add error handling to the app to display clear and concise error messages to the user when something
                    goes wrong. This could include handling errors from the API, such as when a file fails to upload or
                    when there is a problem with the data in the file. In addition, the app could display a unique error
                    code for each error that occurs, which the user can provide to the development team for
                    investigating the issue. This would improve the user experience and make it easier for the
                    development team to diagnose and fix problems with the app.

                    For example, the app could display a message like "Error code: 1234 - Failed to upload file. Please
                    try again or contact support for assistance." This would provide the user with information about
                    what went wrong and a unique error code that the development team can use to identify and
                    troubleshoot the issue.
                </li>
                <li>
                    Make the app mobile friendly. This could involve using a responsive design, optimizing the app for
                    touch input, testing the app on a variety of mobile devices, and considering adding a native app for
                    mobile platforms. This would improve the user experience for users who access the app on their
                    mobile devices.
                </li>
            </ul>
        </div>
    );
};

export default Improvements;
