import Header from "@/components/module/Header/Header";
import Archive from "@/components/templates/Archive/Archive";
import LevelTwoLayout from "../../components/layout/LevelTwoLayout";
export default function Page() {
  return (
    <LevelTwoLayout>
      <Header />
      <Archive />
    </LevelTwoLayout>
  );
}
