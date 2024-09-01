"use client";
import React from "react";

function NFTPage({ params }: { params: { id: string } }) {
  return <div>NFTPage {params.id}</div>;
}

export default NFTPage;
