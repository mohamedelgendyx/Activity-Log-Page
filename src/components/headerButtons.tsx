import React from "react";

const HeaderButtons: React.FC<any> = () => {
    return (
        <section className="flex bg-transparent text-xs">
            <button className={`flex justify-center items-center gap-x-1.5 px-4 py-2 uppercase border rounded-r-md hover:bg-[#e9e9e9]`}>
                <img src={require('../assets/export.svg').default} />
                export
            </button>
        </section>
    );
};

export default HeaderButtons;