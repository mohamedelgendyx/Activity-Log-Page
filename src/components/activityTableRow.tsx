const ActivityTableRow = ({ activity }: any) => {
    return (
        <>
            <tr className="hover:bg-[#FBFBFB] cursor-pointer">
                <td className="text-sm px-2 py-4 pl-4 flex items-center gap-x-3">
                    <div className={`w-6 h-6 rounded-full text-xs text-white font-semibold flex items-center justify-center`}>
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
        </>
    );
};

export default ActivityTableRow;