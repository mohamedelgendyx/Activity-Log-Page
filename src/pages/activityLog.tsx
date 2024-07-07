import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Header from "../components/header";
import ActivityTable from "../components/activityTable";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ActivityLog: React.FC = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filter, setFilter] = useState<any>({});

    const mapDate = (dateToBeMapped: any) => {
        return new Date(dateToBeMapped).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    const { data, error } = useSWR(
        `${process.env.REACT_APP_BACKEND_API_URL}?page=${page}&limit=5&search=${searchTerm}&filter=${JSON.stringify(filter)}`,
        fetcher
    );

    useEffect(() => {
        if (data) {
            data.events = data.events.map((event: any) => {
                return {
                    ...event,
                    occurred_at: mapDate(event.occurred_at)
                };
            });
            setActivities(prevActivities => page === 1 ? data.events : [...prevActivities, ...data.events]);
            setTotalCount(data.totalCount);
            setLoading(false);
            setLoadingMore(false);
        }
    }, [data, page]);

    const handleSearch = (event: any) => {
        event.preventDefault();
        setLoading(true);
        setPage(1);
        setSearchTerm(event.target.value.trim());
        setActivities([]);
    };

    const loadMore = () => {
        setLoadingMore(true);
        setPage(prevPage => prevPage + 1);
    };

    if (error) return <div>Failed to load activities</div>;

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