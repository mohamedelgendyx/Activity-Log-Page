import React from "react";
import SearchBar from "./searchBar";
import HeaderButtons from "./headerButtons";

const Header: React.FC<any> = ({ loading, loadingMore }) => {
    return (
        <section className="bg-neutral-100 w-full pt-4">
            <section className="container p-4 flex text-[#575757]">
                <SearchBar />
                <HeaderButtons loading={loading} loadingMore={loadingMore} />
            </section>
        </section>
    );
};

export default Header;