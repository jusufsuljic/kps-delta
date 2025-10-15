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
  const total12 = (counts["1"] || 0) + (counts["2"] || 0);
  const total123 = total12 + (counts["3"] || 0);

  if (total12 >= 15) groups[2].visible = true;
  if (total123 >= 30) groups[3].visible = true;

  for (const group of groups) {
    if ((counts[group.id.toString()] || 0) >= 20) group.full = true;
  }

  return <Pistol1Signup groups={groups} />;
}
