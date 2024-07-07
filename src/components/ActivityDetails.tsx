import React from "react";
import DetailedActivityRowDataSection from "./activityDetailsData";

const DetailedActivityRow: React.FC<any> = ({ activity, expanded }) => {
    return (
        <tr>
            <td colSpan={4} className="p-0">
                <div className={`text-[#929292] w-[calc(100%+30px)] text-sm grid grid-cols-3 gap-6 rounded-lg bg-white mx-[-15px] drop-shadow overflow-hidden transition-all duration-250 ease-in-out ${expanded ? 'max-h-80 p-6 pl-7 border' : 'max-h-0 border-0 padding-0'}`}>
                    <DetailedActivityRowDataSection
                        headerTitle={'actor'}
                        metadata={[
                            { label: 'name', value: activity.actor_name },
                            { label: 'email', value: activity.target_name },
                            { label: 'ID', value: activity.actor_id },
                        ]}
                    />
                    <DetailedActivityRowDataSection
                        headerTitle={'action'}
                        metadata={[
                            { label: 'name', value: activity.action?.name },
                            { label: 'object', value: activity.action?.object },
                            { label: 'ID', value: activity.action?.id },
                        ]}
                    />
                    <DetailedActivityRowDataSection
                        headerTitle={'date'}
                        metadata={[
                            { label: 'readable', value: activity.occurred_at },
                        ]}
                    />
                    <DetailedActivityRowDataSection
                        headerTitle={'metadata'}
                        metadata={[
                            { label: 'redirect', value: activity.metadata?.redirect },
                            { label: 'description', value: activity.metadata?.description },
                            { label: 'request ID', value: activity.metadata?.x_request_id },
                        ]}
                    />
                    <DetailedActivityRowDataSection
                        headerTitle={'target'}
                        metadata={[
                            { label: 'name', value: activity.target_name },
                            { label: 'ID', value: activity.target_id },
                        ]}
                    />
                </div>
            </td>
        </tr>
    );
};

export default DetailedActivityRow;