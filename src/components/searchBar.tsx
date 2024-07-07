import React from "react";

const SearchBar: React.FC<any> = () => {
    return (
        <section className="flex-grow ">
            <input
                type="text"
                placeholder="Search name, email or action..."
                className="w-full p-2 text-sm border rounded-l-lg bg-transparent focus:outline-none"
            />
        </section>
    );
};

export default SearchBar;