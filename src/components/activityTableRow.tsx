import React, { useState } from "react";
import DetailedActivityRow from "./ActivityDetails";

const ActivityTableRow: React.FC<any> = ({ activity }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const getGradientClass = (name: string) => {
        const hash = name.charCodeAt(0);
        const gradients = [
            'from-red-400 to-pink-500',
            'from-pink-500 to-purple-500',
            'from-red-400 to-gray-500',
            'from-purple-400 to-indigo-500',
            'from-indigo-500 to-blue-500',
            'from-green-500 to-cyan-400',
            'from-[#8947FE] to-[#B319FE]',
            'from-red-500 to-orange-500',
            'from-green-400 to-blue-500',
            'from-pink-400 to-red-500',
            'from-green-500 to-teal-400',
            'from-purple-500 to-pink-500',
            'from-sky-500 to-indigo-500',
            'from-[#F3994A] to-[#B325E2]',
            'from-blue-400 to-teal-500',
            'from-teal-400 to-blue-400',
            'from-orange-400 to-pink-400',
            'from-indigo-400 to-purple-500',
            'from-yellow-300 to-orange-400',
            'from-red-500 to-purple-500',
            'from-cyan-300 to-indigo-400'
        ];
        return gradients[hash % gradients.length];
    };
    return (
        <>
            <tr className="hover:bg-[#FBFBFB] cursor-pointer" onClick={toggleExpanded}>
                <td className="text-sm px-2 py-4 pl-4 flex items-center gap-x-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-b ${getGradientClass(activity.target_name)} text-xs text-white font-semibold flex items-center justify-center`}>
                        {activity.target_name[0].toUpperCase()}
                    </div>
                    {activity.target_name}
                </td>
                <td className="text-sm px-2 py-4">
                    {activity.action?.name}
                </td>
                <td className="text-sm px-2 py-4">
                    {activity.occurred_at}
                </td>
                <td className="text-sm px-2 py-4 pr-4 flex justify-center items-center">
                    <img src={require('../assets/expand.svg').default} />
                </td>
            </tr>
            <DetailedActivityRow activity={activity} expanded={expanded} />
        </>
    );
};

export default ActivityTableRow;