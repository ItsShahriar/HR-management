import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { getBaseUrl } from "../utils/baseURL";
const AllPayments = () => {
   
    const [paymentRequests, setemploye] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch employe from the API
        axios.get(`${getBaseUrl()}/api/payments/`) // Example API
            .then(response => {
                setemploye(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
               <Link to="createpayments" className="btn btn-primary">
               Create payment</Link>
            <div className="text-center py-4">
                <h4 className="text-2xl font-semibold text-[#60a0b3]" style={{ textShadow: '1px 0px rgba(0, 0, 0, 0.11)' }}>
                    ALL paymentS
                </h4>
             
            </div>

            <table className="min-w-full text-center table-auto border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">id</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">employee</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">payment_date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">tran_id</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentRequests.map((payment) => (
                        <tr key={payment.id} className="border-b">
                            <td className="px-6 py-4 text-sm text-gray-800">{payment.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{payment.employee.firstname}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{payment.payment_date}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{payment.status}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{payment.tran_id}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{payment.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllPayments;
