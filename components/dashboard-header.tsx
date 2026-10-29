"use client"; 

import React from "react";
import PatientsTable from "./patients-table";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col"> {/* Use flex-col to stack header and content */}
      {/* Dashboard Header - Now takes full width of the viewport */}
      {/* <DashboardHeader /> */}

      {/* Main Content Area - This remains constrained by container for layout */}
      <div className="container mx-auto w-full max-w-md sm:max-w-lg lg:max-w-3xl px-4 py-6 flex-grow"> {/* Added py-6 and flex-grow */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Dashboard</h2>
          <span className="text-sm text-gray-500">Dr Sanket Gidmare</span>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button variant="outline" className="bg-[#dcfbf8] text-[#2ec4b6] hover:bg-[#d3f7f3]">
            TODAY
          </Button>
          <Button variant="outline" className="text-gray-500 hover:bg-gray-100">
            DAILY
          </Button>
          <Button variant="outline" className="text-gray-500 hover:bg-gray-100">
            MONTHLY
          </Button>
        </div>
        <div className="w-full h-px bg-[#2ec4b6] mt-1" /> {/* Changed to w-full for the separator */}

        <div className="mt-4">
          <div className="bg-[#dcfbf8] py-2 px-4 rounded-md flex justify-between items-center">
            <span className="text-gray-600 text-sm">No.</span>
            <span className="text-gray-600 text-sm">Name</span>
            <span className="text-gray-600 text-sm">Time</span>
          </div>
          <PatientsTable />
        </div>

        <p className="mt-8 text-xs text-gray-500">*Click when patient enters doctor&apos;s cabin.</p>
        <Button className="bg-[rgba(0,0,0,0.69)] text-white font-bold rounded-full py-2 w-full mt-4 hover:bg-black transition-colors">
          Patient In
        </Button>
      </div>
    </div>
  );
}
