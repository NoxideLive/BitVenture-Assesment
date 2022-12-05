import React, {useEffect} from 'react';
import {useDataApi} from '../hooks/useApi';
import Loader from "../components/UI/Loader";
import {FormattedNumber} from "react-intl";

interface ReportItem {
    branchCode: string;
    accountType: string;
    status: string;
    amountSum: number;
    paymentCount: number;
}

const Reports = () => {
    const {data, isLoading, error, get, fileDownload} = useDataApi<ReportItem[]>();

    useEffect(() => {
        try {
            get('report');
        } catch (e) {
            console.log(e);
        }
    }, []);

    if (isLoading) {
        return (
            <div>
                <Loader/>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row">
            {/* Header and subtitles */}
            <div className="md:w-1/3 mb-4">
                <h1 className="text-4xl font-bold text-center mb-4">Report</h1>
                <p className="mb-4 text-center">
                    This page displays a report of transactions grouped by account branch code, account type, and
                    status.
                </p>

            </div>

            {/* Table */}
            <table className="table-auto md:w-2/3 mb-4 overflow-x-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">Branch Code</th>
                    <th className="px-4 py-2">Account Type</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Amount Sum</th>
                    <th className="px-4 py-2">Payment Count</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((item) => (
                    <tr key={`${item.branchCode}-${item.accountType}-${item.status}`}>
                        <td className="border px-4 py-2">{item.branchCode}</td>
                        <td className="border px-4 py-2">{item.accountType}</td>
                        <td className="border px-4 py-2">{item.status}</td>
                        <td className={`border px-4 py-2`}>
                            <FormattedNumber value={item.amountSum} style="currency" currency="ZAR"/>
                        </td>
                        <td className="border px-4 py-2">{item.paymentCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
