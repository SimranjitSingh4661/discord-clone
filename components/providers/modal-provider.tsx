"use client";

import React, { Fragment, useState, useEffect } from "react";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteServerModal } from "@/components/modals/invite-server-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";

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
      <EditServerModal />
      <MembersModal />
    </Fragment>
  );
};
