import React, { useState } from 'react'
import SearchInput from '../auctionList/children/SearchInput';
import AdminListTable from './table/AdminListTable';

function AdminList() {
    const [searchData, setSearchData] = useState("");
    return (
        <div className="">
            <div className="valign-wrapper space-between">
                <h4>Admin List</h4>
                <SearchInput searchData={searchData} setSearchData={setSearchData} />
            </div>
            <AdminListTable searchData={searchData} />
        </div>
    )
}

export default AdminList
