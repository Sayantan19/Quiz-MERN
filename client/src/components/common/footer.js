import React from 'react';

//Footer component
export default function Footer() {
    return (
        <>
            <footer className="text-center" id="foot">
                <div className="text-white">
                    &#169;{new Date().getFullYear()} Department of CSBS. All rights Reserved.
                </div>
            </footer>
        </>
    );
}
