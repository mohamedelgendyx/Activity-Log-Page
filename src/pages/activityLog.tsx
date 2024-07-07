import React, { useState } from "react";
import Header from "../components/header";
import ActivityTable from "../components/activityTable";

const ActivityLog: React.FC = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (event: any) => {
        event.preventDefault();
        setLoading(true);
        setPage(1);
        setSearchTerm(event.target.value);
        setActivities([]);
    };

    const loadMore = () => {
        setLoadingMore(true);
        setPage(prevPage => prevPage + 1);
    };

    return (
        <section className="container mx-auto my-4 border rounded-lg">
            <Header activities={activities} loading={loading} loadingMore={loadingMore} handleSearch={handleSearch} />
            <ActivityTable activities={activities} loading={loading} loadingMore={loadingMore} />
            {
                !activities.length && !loading ? (
                    <div className="uppercase text-sm py-5 w-full font-semibold text-[#616161] text-center">No activities found</div>
                ) : (
                    totalCount > activities.length ? (
                        <button
                            className={`bg-neutral-100 uppercase text-sm py-5 w-full font-semibold ${loading || loadingMore ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'text-[#616161] hover:bg-[#e9e9e9]'}`}
                            onClick={loadMore}
                            disabled={loadingMore || loading}
                        >
                            {loadingMore || loading ? 'Loading...' : 'Load more'}
                        </button>
                    ) : null
                )
            }
        </section>
    );
};

export default ActivityLog;