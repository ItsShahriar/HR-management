import React from 'react';

const Birthday = () => {
    const birthdaysThisMonth = [];  // Array for storing birthday data

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            {/* Page Title */}
            <div className="text-center py-4">
                <h4 className="text-2xl font-semibold text-gray-800">Birthdays in February</h4>
                <span className="text-sm text-gray-600" style={{ fontVariant: 'petite-caps' }}>
                    Total Birthdays This Month: {birthdaysThisMonth.length}
                </span>
            </div>

            {/* Birthday Table */}
            {birthdaysThisMonth.length === 0 ? (
                // No Birthdays Found
                <div className="text-center py-6">
                    <span className="text-gray-500">No Birthdays Found This Month.</span>
                </div>
            ) : (
                // Display Birthday Table (In case there are birthdays)
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace this with dynamic data */}
                        {birthdaysThisMonth.map((birthday, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-6 py-4 text-sm text-gray-800">{birthday.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{birthday.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Birthday;
