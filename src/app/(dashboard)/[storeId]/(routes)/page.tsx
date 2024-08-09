import React from "react";
import { db } from "~/server/db";

interface DashboardPageProps {
  params: { storeId: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>active store: {store?.name}</div>;
}
