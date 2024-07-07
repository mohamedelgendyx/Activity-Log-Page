import React from "react";

const SearchBar: React.FC<any> = ({ handleSearch }) => {
    return (
        <section className="flex-grow ">
            <input
                type="text"
                placeholder="Search name, email or action..."
                className="w-full p-2 text-sm border rounded-l-lg bg-transparent focus:outline-none"
                onChange={(e) => handleSearch(e)}
            />
        </section>
    );
};

export default SearchBar;