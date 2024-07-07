import React from "react";

const HeaderButtons: React.FC<any> = ({ activities, loading, loadingMore }) => {
    const exportToCSV = () => {
        const csvData = activities.map((activity: any) => ({
            "Activity ID": activity.id,
            "Activity Object": activity.object,
            "Actor ID": activity.actor_id,
            "Actor Name": activity.actor_name,
            "Target ID": activity.target_id,
            "Target Name": activity.target_name,
            "Location": activity.location,
            "Date": activity.occurred_at.replace(",", " -"),
            "Action ID": activity.action.id,
            "Action Name": activity.action.name,
            "Action Object": activity.action.object,
            "Metadata Redirect": activity.metadata.redirect,
            "Metadata Description": activity.metadata.description,
            "Metadata Request ID": activity.metadata.x_request_id,
        }));
        const csvContent = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map((row: any) => Object.values(row).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        const a = document.createElement("a");
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `activity_log_${new Date().getTime()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <section className="flex bg-transparent text-xs">
            <button className="flex justify-center items-center gap-x-1.5 px-4 py-2 uppercase border hover:bg-[#e9e9e9]">
                <img src={require('../assets/filter.svg').default} />
                filter
            </button>
            <button
                className={`flex justify-center items-center gap-x-1.5 px-4 py-2 uppercase border rounded-r-md ${loading || loadingMore ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-[#e9e9e9] '}`}
                onClick={exportToCSV}
                disabled={loading || loadingMore}
            >
                <img src={require('../assets/export.svg').default} />
                export
            </button>
        </section>
    );
};

export default HeaderButtons;