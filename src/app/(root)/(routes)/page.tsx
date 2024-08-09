"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import Modal from "~/components/ui/modal";
import { useStoreModal } from "~/hooks/use-store-modal-store";

export default function HomePage() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);
  return <main>root</main>;
}
