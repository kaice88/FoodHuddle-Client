import React, { ReactNode } from "react"
import { modals } from "@mantine/modals"

const useModal = (
  title: string | ReactNode = "",
  modalContent: React.ReactElement | null = null
) => {
  const openModal = () => {
    if (title && modalContent) {
      modals.open({
        title,
        children: modalContent,
      })
    }
  }

  const closeModal = (cb?: () => void) => {
    if (typeof cb === "function") {
      cb()
    }
    modals.closeAll()
  }

  return { openModal, closeModal }
}

export default useModal
