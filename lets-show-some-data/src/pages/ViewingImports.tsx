import React, {useEffect} from 'react';
import {useDataApi} from "../hooks/useApi";
import {Link} from "react-router-dom";
import Loader from "../components/UI/Loader";

export interface AccountData {
    accountHolder: string;
    branchCode: string;
    accountNumber: string;
    accountType: string;
}


const ViewingImports = () => {
    const {data, error, isLoading, get} = useDataApi<AccountData[]>()

    useEffect(() => {
        try {
            get("/accounts")
        } catch (e) {
            console.log(e)
        }
    }, [])

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className={"container"}>
            <div className="flex flex-col md:flex-row">
                {/* Header and subtitles */}
                <div className="md:w-1/3 mb-4">
                    <h1 className="text-4xl font-bold text-center mb-4">Viewing Imports</h1>
                    <p className="mb-4 text-center">
                        This page displays the imported account data in a table.
                    </p>
                    <p className="mb-0 text-center">
                        Select a record in the table to see the payment details that belong to the record.
                    </p>
                </div>
                {/* Table */}
                <table className="table-auto md:w-2/3 mb-4 overflow-x-auto">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Account Holder</th>
                        <th className="px-4 py-2">Branch Code</th>
                        <th className="px-4 py-2">Account Number</th>
                        <th className="px-4 py-2">Account Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map(account => (
                        <tr key={account.accountNumber}>
                            <td className="border px-4 py-2">{account.accountHolder}</td>
                            <td className="border px-4 py-2">{account.branchCode}</td>
                            <td className="border px-4 py-2">{account.accountNumber}</td>
                            <td className="border px-4 py-2">{account.accountType}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/account/${account.accountNumber}`}>
                                    <button
                                        className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-700">
                                        View Transactions
                                    </button>
                                </Link>
                                <Link to={`/account/${account.accountNumber}/edit`}>
                                    <button
                                        className="ml-2 px-4 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-700">
                                        Edit
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewingImports;
