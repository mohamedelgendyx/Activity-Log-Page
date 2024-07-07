import React, { useEffect, useRef, useState } from "react";

const HeaderButtons: React.FC<any> = ({ activities, loading, loadingMore, filter, applyFilter }) => {
    const [filterOpened, setFilterOpened] = useState<boolean>(false);
    const filterDropdownRef = useRef<any>(null);
    const filterRef = useRef<any>(null);

    const onFilterClick = () => {
        setFilterOpened(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target) && !filterRef.current.contains(event.target)) {
                setFilterOpened(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
        <section className="flex bg-transparent text-xs relative">
            <button
                ref={filterRef}
                onClick={onFilterClick}
                className="flex justify-center items-center gap-x-1.5 px-4 py-2 uppercase border hover:bg-[#e9e9e9]"
            >
                <img src={require('../assets/filter.svg').default} />
                filter
            </button>
            {
                <div
                    ref={filterDropdownRef}
                    className={`flex flex-col gap-y-2 absolute right-[-10px] top-[42px] z-10 rounded-lg bg-white text-black px-4 drop-shadow overflow-hidden  transition-all duration-250 ease-in-out ${filterOpened ? 'max-h-60 py-4 border' : 'max-h-0 border-0 padding-0'}`}
                >
                    {Object.entries(filter).map(([field, value]: any) => (
                        <div key={field} className="flex gap-x-2 items-center">
                            <p className="text-xs w-[100px]">{field.replace('_', ' ').replace(/\b\w/g, (l: any) => l.toUpperCase())}</p>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => applyFilter(e, field)}
                                className="p-1 pl-2 text-xs border rounded-md focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            }
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