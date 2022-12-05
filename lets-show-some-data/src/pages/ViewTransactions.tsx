import React, {useEffect} from 'react';
import {useDataApi} from "../hooks/useApi";
import {useParams} from "react-router";
import {BarLoader} from "react-spinners";
import {parseDate} from "../utils/date";
import {FormattedNumber} from "react-intl";
import {Link} from "react-router-dom";
import Loader from "../components/UI/Loader";

interface Transaction {
    paymentId: number;
    amount: number;
    status: string
    effectiveStatusDate: string;
    transactionDate: string;
    timeBreached: boolean;
}

const ViewTransactions = () => {
    const {accountNumber} = useParams();
    const {data, isLoading, error, get} = useDataApi<Transaction[]>()

    useEffect(() => {
        try {
            get(`transactions/${accountNumber}`);
        } catch (e) {
            console.log(e);
        }
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="flex flex-col md:flex-row">
            {/* Header and subtitles */}
            <div className="md:w-1/3 mb-4">
                <h1 className="text-4xl font-bold text-center mb-4">View Transactions</h1>
                <p className="mb-4 text-center">
                    This page displays the transactions for the selected account.
                </p>
            </div>
            {/* Table */}
            <div className="flex flex-col">
                <table className="table-auto md:w-2/3 mb-4 overflow-x-auto">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Transaction Date</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Effective Status Date</th>
                        <th className="px-4 py-2">Time Breached</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map(transaction => {
                        const effectiveStatus = parseDate(transaction.effectiveStatusDate);
                        const transactionDate = parseDate(transaction.transactionDate);
                        return (
                            <tr key={transaction.paymentId}>
                                <td className="border px-4 py-2">
                                    {transactionDate ? transactionDate.toLocaleDateString() : ''}
                                </td>
                                <td className={`border px-4 py-2 ${transaction.amount > 500 ? 'text-blue-600' : ''}`}>
                                    <FormattedNumber value={transaction.amount} style="currency" currency="ZAR"/>
                                </td>
                                <td className="border px-4 py-2"
                                    style={{ color: transaction.status === 'Failed' ? 'red' : '' }}>
                                    {transaction.status}
                                </td>
                                <td className="border px-4 py-2">
                                    {effectiveStatus ? effectiveStatus.toLocaleDateString() : ''}
                                </td>
                                <td className={`border px-4 py-2 ${transaction.timeBreached ? 'text-yellow-600' : 'text-green-600'}`}>
                                    {transaction.timeBreached ? "Yes" : "No"}
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
                <Link to="/view">
                    <button
                        className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-700">
                        Back to Viewing Imports
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ViewTransactions;
