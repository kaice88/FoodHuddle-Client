import React from "react";
import { Popover, Button } from "@mantine/core";

interface ReusablePopoverProps {
  buttonText: string;
  popoverContent: React.ReactNode;
}

function ReusablePopover({ buttonText, popoverContent }: ReusablePopoverProps) {
  return (
    <Popover width={200} position={"bottom"} withArrow shadow={"md"}>
      <Popover.Target>
        <Button>{buttonText}</Button>
      </Popover.Target>
      <Popover.Dropdown>{popoverContent}</Popover.Dropdown>
    </Popover>
  );
}

export default ReusablePopover;
