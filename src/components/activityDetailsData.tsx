
const DetailedActivityRowDataSection = ({ headerTitle, metadata }: any) => {
    return (
        <div>
                <p className="mb-3 uppercase font-semibold">{headerTitle}</p>
                {
                    metadata.map(({ label, value }: any) => {
                        return (
                            <div key={`${headerTitle}-${label}`} className="grid grid-cols-[100px_1fr] gap-3 mb-2 items-center">
                                <span className="capitalize">{label}</span>
                                <span className="text-black">{value}</span>
                            </div>
                        )
                    })
                }
        </div>
    );
};

export default DetailedActivityRowDataSection;