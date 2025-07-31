import { Suspense } from "react";
import SessionClientPage from "./SessionClientPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading session...</div>}>
      <SessionClientPage />
    </Suspense>
  );
}
