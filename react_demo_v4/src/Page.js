import React from "react";

function Page({nextPage, prevPage}) {
    return (
        <div>
            {/* condtional statement within a React component
            if we have a prev page, display it, if not then dont */}
            {prevPage && <button onClick = {prevPage}>Previous</button>}
            {nextPage && <button onClick = {nextPage}>Next</button>}
        </div>
    )
}

export default Page;