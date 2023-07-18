import { useSelector } from "react-redux";

import { AgentsLeft } from "@/components/agentsComponents/Agents";

import { LeftButton } from "./LeftButton";

export default function LeftComponent() {
  const selectedContent = useSelector(
    (state) => state.environment.selectedContent
  );
  return <LeftButton />;
}
