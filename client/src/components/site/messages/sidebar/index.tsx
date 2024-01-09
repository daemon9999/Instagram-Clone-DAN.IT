import DirectUserList from "./direct-user-list";
interface SidebarProps {
    handleActiveDM:  (activeId: string) => void
}
export default function Sidebar({ handleActiveDM}: SidebarProps) {
    return (

        <aside className="w-1/3 flex-shrink-0 flex flex-col  border-r">
            
                <div className="flex items-center justify-center py-5 border-b">
                    <h4 className="text-xl font-semibold">Direct</h4>
                </div>


                <DirectUserList handleActiveDM={handleActiveDM}/>


        </aside>
    )
}