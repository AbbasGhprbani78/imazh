import React from "react";
import LevelThreeLayout from "../../../components/layout/LevelThreeLayout";
import Header from "@/components/module/Header/Header";
import UserArchive from "@/components/templates/CustomerArchive/CustomerArchive";
export default function User({ searchParams }) {
  const { id } = searchParams;
  return (
    <LevelThreeLayout>
      <div className="container">
        <Header />
        <UserArchive id={id} />
      </div>
    </LevelThreeLayout>
  );
}
