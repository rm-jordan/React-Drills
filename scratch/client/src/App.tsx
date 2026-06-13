/**
 * Uncomment components as you complete each session.
 * Session 2: import UpdatesPage
 */

import { UpdatesPage } from "./components/UpdatesPage";

export default function App() {
  return (
    <div>
      <div className="scratch-banner">
        <strong>Scratch mini-app</strong> — build piece by piece. Main app stays untouched at{" "}
        <code>:5173</code>. This app runs at <code>:5174</code>. See <code>scratch/README.md</code>.
      </div>

      <UpdatesPage />
    </div>
  );
}
