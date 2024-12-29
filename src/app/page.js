import Header from "@/components/module/Header/Header";
import Home from "@/components/templates/Home/Home";
import LevelTwoLayout from "@/components/layout/LevelTwoLayout";

export default function Page() {
  return (
    <LevelTwoLayout>
      <Header />
      <Home />
    </LevelTwoLayout>
  );
}
