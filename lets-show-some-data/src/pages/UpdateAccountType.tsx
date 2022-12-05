import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDataApi} from "../hooks/useApi";
import {AccountData} from "./ViewingImports";
import Loader from "../components/UI/Loader";
import ResultPopup from "../components/UI/ResultPopup";

const UpdateAccountType = () => {
    const {accountNumber} = useParams();

    const {data, isLoading: dataLoading, get: getData, put, isSuccess, reset} = useDataApi<AccountData>()
    const {data: accountTypes, isLoading: typesLoading, get: getTypes} = useDataApi<string[]>()
    const [successMessage, setSuccessMessage] = useState<string | undefined>();

    const [accountType, setAccountType] = useState("");

    const isLoading = dataLoading || typesLoading;

    useEffect(() => {
        getData(`accounts/${accountNumber}`)
        getTypes("accounts/types")
    }, [])


    useEffect(() => {
        setAccountType(data?.accountType || "")
    }, [data])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await put(`accounts/${accountNumber}`, {accountType})
            await getData(`accounts/${accountNumber}`)
            setSuccessMessage("Account type updated successfully!");
            setTimeout(() => {
                setSuccessMessage(undefined);
            }, 2000);
        } catch (e) {
            console.log(e)
        }
    }


    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col">
                <div className="mb-4">
                    <div className="font-bold mb-2">Account Number:</div>
                    <div>{accountNumber}</div>
                </div>
                <div>
                    <form className="bg-white rounded shadow-md px-8 py-8 mb-4" onSubmit={handleSubmit}>
                        <label htmlFor="account-type" className="block font-bold mb-2">
                            Account Type:
                        </label>
                        <div className="form-row">
                            <div className="current-type">
                                Current Account Type: {data?.accountType}
                            </div>
                            <select
                                id="account-type"
                                className="border rounded px-4 py-2"
                                onChange={e => setAccountType(e.target.value)}
                            >
                                <option value="">Select an option</option>
                                {accountTypes?.map((type: string) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-row">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-700 mt-4"
                            >
                                Update Account Type
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ResultPopup
                show={!!successMessage}
                message={successMessage ?? ""}
                bgColor="bg-green-400"
            />
        </div>
    );


}

export default UpdateAccountType;
