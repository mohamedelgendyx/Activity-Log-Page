import React from "react";
import ActivityTableRow from "./activityTableRow";
import SkeletonRow from "./skeletonRow";

const ActivityTable: React.FC<any> = ({ activities, loading, loadingMore }) => {
    return (
        <section>
            <table className="container w-full">
                <thead>
                    <tr className="bg-neutral-100 uppercase text-sm text-left text-[#616161]">
                        <th className="text-inherit font-semibold p-2 pl-4">actor</th>
                        <th className="text-inherit font-semibold p-2">action</th>
                        <th className="text-inherit font-semibold p-2">date</th>
                        <th className="text-inherit font-semibold p-2 pr-4 w-[5%]"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? (
                            Array.from({ length: 5 }, (_, index) => <SkeletonRow key={index} />)
                        ) : (
                            <>
                                {activities.map((activity: any) => (<ActivityTableRow key={activity.id} activity={activity} />))}
                                {loadingMore && (Array.from({ length: 5 }, (_, index) => <SkeletonRow key={index} />))}
                            </>
                        )
                    }
                </tbody>
            </table>
        </section>
    );
};

export default ActivityTable;