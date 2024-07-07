import React from "react";

const SkeletonRow: React.FC = () => {
    return (
        <tr className="animate-pulse">
            <td className="px-2 py-4 pl-4 flex items-center gap-x-3">
                <div className="w-6 h-6 bg-[#F8F8F8] rounded-full"></div>
                <div className="h-4 bg-[#F8F8F8] rounded w-[35%]"></div>
            </td>
            <td className="px-2 py-4">
                <div className="h-4 bg-[#F8F8F8] rounded w-[40%]"></div>
            </td>
            <td className="px-2 py-4">
                <div className="h-4 bg-[#F8F8F8] rounded w-[38%]"></div>
            </td>
        </tr>
    );
};

export default SkeletonRow;