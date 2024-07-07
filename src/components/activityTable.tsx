import React from "react";

const ActivityTable: React.FC<any> = () => {
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
            </table>
        </section>
    );
};

export default ActivityTable;