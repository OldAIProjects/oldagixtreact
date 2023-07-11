import { useSelector } from "react-redux";

import { AgentsLeft } from "@/components/agentsComponents/Agents";

export default function LeftComponent() {
  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );
  return <>{selectedContent === "Agents" && <AgentsLeft />}</>;
}
