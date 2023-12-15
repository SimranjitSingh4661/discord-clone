"use client";

import React, { Fragment, useState, useEffect } from "react";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteServerModal } from "@/components/modals/invite-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Fragment>
      <CreateServerModal />
      <InviteServerModal />
    </Fragment>
  );
};
