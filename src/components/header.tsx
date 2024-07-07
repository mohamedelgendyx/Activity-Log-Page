import React from "react";
import SearchBar from "./searchBar";
import HeaderButtons from "./headerButtons";

const Header: React.FC<any> = ({ activities, loading, loadingMore, handleSearch, filter, applyFilter }) => {
    return (
        <section className="bg-neutral-100 w-full pt-4">
            <section className="container p-4 flex text-[#575757]">
                <SearchBar handleSearch={handleSearch} />
                <HeaderButtons activities={activities} loading={loading} loadingMore={loadingMore} filter={filter} applyFilter={applyFilter} />
            </section>
        </section>
    );
};

export default Header;