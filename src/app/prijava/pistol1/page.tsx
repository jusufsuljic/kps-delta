export const dynamic = "force-dynamic";
export const revalidate = 0;

import Pistol1Signup from "@/app/components/pistol1/pistol1signup";
import { getSheetGroupCounts } from "@/app/lib/google";

export default async function Pistol1Page() {
  const counts = await getSheetGroupCounts();

  // Default state
  const groups = [
    { id: 1, label: "11:00 - 12:00", visible: true, full: false },
    { id: 2, label: "12:00 - 13:00", visible: true, full: false },
    { id: 3, label: "13:00 - 14:00", visible: false, full: false },
    { id: 4, label: "14:00 - 15:00", visible: false, full: false },
  ];

  // --- Compute visibility and full status ---

  let fullGroups = 0;
  for (const group of groups) {
    if ((counts[group.id.toString()] || 0) >= 10){
        group.full = true;
        fullGroups++;
    } 
  }

  if(fullGroups >= 1){
    groups[2].visible = true;
  }
  
  if(fullGroups >= 2){
    groups[3].visible = true;
  }

  return <Pistol1Signup groups={groups} />;
}
