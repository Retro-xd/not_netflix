import React, { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

// Optionally, disable static prerendering:
// export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
