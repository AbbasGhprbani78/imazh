import React from "react";
import styles from "./User.module.css";
import LevelThreeLayout from "../../../components/layout/LevelThreeLayout";
import Header from "@/components/module/Header/Header";
import Home from "@/components/templates/Home/Home";
import UserArchive from "@/components/templates/CustomerArchive/CustomerArchive";
export default function User() {
  return (
    <LevelThreeLayout>
      <div className="container">
        <Header />
        <UserArchive />
      </div>
    </LevelThreeLayout>
  );
}
