import { useSelector } from "react-redux";

import { AgentsRight } from "@/components/agentsComponents/Agents";

export default function RightComponent() {
  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );
  return <>{selectedContent === "agents" && <AgentsRight />}</>;
}
