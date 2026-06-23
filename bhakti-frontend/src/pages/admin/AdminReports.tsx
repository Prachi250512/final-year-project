import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReports() {

    const [reports, setReports] = useState<any[]>([]);
    const [reportType, setReportType] = useState("weekly");

    const loadWeekly = () => {
        axios.get("http://localhost:8080/api/admin/reports?type=weekly")
            .then(res => {
                setReports(res.data)
                setReportType("weekly")
            })
    }

    const loadMonthly = () => {
        axios.get("http://localhost:8080/api/admin/reports?type=monthly")
            .then(res => {
                setReports(res.data)
                setReportType("monthly")
            })
    }

    const loadProductReport = () => {
        setReportType("product");
        axios.get("http://localhost:8080/api/admin/product-report")
            .then(res => {
                setReports(res.data);
                console.log("Product:", res.data);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        loadWeekly();
    }, []);

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">Sales Reports</h1>

            <div className="mb-4">
                <button
                    className="bg-blue-500 px-4 py-2 text-white mr-2 rounded"
                    onClick={loadWeekly}
                >
                    Weekly Report
                </button>

                <button
                    className="bg-green-500 px-4 py-2 text-white mr-2 rounded"
                    onClick={loadMonthly}
                >
                    Monthly Report
                </button>

                <button
                    className="bg-purple-500 px-4 py-2 text-white rounded"
                    onClick={loadProductReport}
                >
                    Product Report
                </button>
            </div>

            <table className="w-full border">

                <thead className="bg-gray-200">
                    {reportType === "product" ? (
                        <tr>
                            <th className="p-2">Product</th>
                            <th className="p-2">Customers</th>
                        </tr>
                    ) : (
                        <tr>
                            <th className="p-2">Customer</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Product</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Date</th>
                        </tr>
                    )}
                </thead>

                <tbody>
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center p-4">
                                No data found
                            </td>
                        </tr>
                    ) : (
                        reports.map((report, index) => (
                            reportType === "product" ? (
                                <tr key={index}>
                                    <td className="p-2">{report[0]}</td>
                                    <td className="p-2">{report[1]}</td>
                                </tr>
                            ) : (
                                <tr key={index}>
                                    <td className="p-2">{report[0]}</td>
                                    <td className="p-2">{report[1]}</td>
                                    <td className="p-2">{report[2]}</td>
                                    <td className="p-2">{report[3]}</td>
                                    <td className="p-2">{report[4]}</td>
                                    <td className="p-2">{report[5]}</td>
                                </tr>
                            )
                        ))
                    )}
                </tbody>

            </table>

        </div>
    );
}