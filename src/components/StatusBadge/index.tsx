import React from "react";
import { Badge } from "@mantine/core";

import { StatusBadgeProps } from "./types";

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge size="xl" variant="light">
      {status}
    </Badge>
  );
}

export default StatusBadge;
