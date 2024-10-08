import React from 'react';
import {usePage} from "@inertiajs/react";
import {Head} from "@inertiajs/react";

export default function Dashboard(props) {
    // return (
    //     <>
    //         <Head title="Admin Dashboard"/>
    //
    //         <div className="py-12">
    //             <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    //                 <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    //                     <div className="p-6 bg-white border-b border-gray-200">
    //                         Welcome to the admin dashboard!
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );

    const {auth} = usePage().props;

    console.log(auth.user);
    if (!auth.user || !auth.user.isAdmin) {
        return <div>You do not have permission to view this page.</div>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Admin content */}
        </div>
    );
}
