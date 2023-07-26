import React from "react";
import { SessionsListProps } from "./types";
import Session from "./SessionCard";

import { useId as mantineUseId } from "@mantine/hooks";

function SessionList({ sessionsList }: SessionsListProps) {
  return (
    <div className="sessionList">
      {sessionsList.map((session) => (
        <Session key={mantineUseId()} session={session} />
      ))}
    </div>
  );
}

export default SessionList;
