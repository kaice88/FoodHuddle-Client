import React from "react";

import { SessionStatuses } from "@/enums";
import { ActionIcon } from "@mantine/core";
import { IconLink, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import StatusBadge from "../../StatusBadge";
import type { SessionProps } from "./types";

const getStatusClassName = (status: SessionStatuses): string => {
  if (status === SessionStatuses.OPEN) {
    return "open";
  }

  if (status === SessionStatuses.LOCKED) {
    return "locked";
  }

  if (status === SessionStatuses.FINISHED) {
    return "finished";
  }

  if (status === SessionStatuses.PENDING_PAYMENTS) {
    return "pending";
  }
};

function Session({ session }: SessionProps) {
  return (
    <div className="sessionWrapper">
      <div className="session">
        {" "}
        <div className="session__info">
          <Link className="session__title" to={`/sesions-day/${session.id}`}>
            {session.title}
          </Link>
          <div className="session__host">{session.host}</div>
        </div>
        <div
          className={`session__status-${getStatusClassName(session.status)}`}
        >
          <StatusBadge status={session.status} />
        </div>
        <div className="session__link">
          <div className="session__joiners">
            <IconUsers color="orange" size="1rem" />
            {session.number_of_joiners}
          </div>
          <ActionIcon color="dark">
            <IconLink size="1rem" />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}

export default Session;
