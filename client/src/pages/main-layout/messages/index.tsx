import Content from "src/components/site/messages/content";
import Sidebar from "src/components/site/messages/sidebar";
import { useState, useCallback } from "react";
export default function Messages() {
  const [activeDM, setActiveDM] = useState<string | null>(null);

  const handleActiveDM = useCallback((activeId: string) => {
    setActiveDM(activeId);
  }, []);
  return (
    <div className="flex w-full h-[80vh] bg-white my-8 rounded border">
      <Sidebar handleActiveDM={handleActiveDM}/>
      <Content activeDM={activeDM}/>
    </div>
  );
}
