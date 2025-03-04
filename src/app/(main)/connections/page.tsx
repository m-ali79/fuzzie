import React from "react";
import AllConnections from "@/components/all-connections";

function page() {
  return (
    <div className="flex flex-col">
      <div className="bg-gray-600">Connections</div>
      <AllConnections />
    </div>
  );
}

export default page;
