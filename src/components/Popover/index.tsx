import React from "react";
import { Popover, Button } from "@mantine/core";

interface ReusablePopoverProps {
  title: string;
  popoverContent: React.ReactNode;
}

function ReusablePopover({ title, popoverContent }: ReusablePopoverProps) {
  return (
    <Popover
      width={300}
      zIndex={1000000}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Button>{title}</Button>
      </Popover.Target>
      <Popover.Dropdown>{popoverContent}</Popover.Dropdown>
    </Popover>
  );
}

export default ReusablePopover;
