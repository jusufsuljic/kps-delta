export const dynamic = "force-dynamic";
export const revalidate = 0;

import LowlightSignup from "@/app/components/lowlight/lowlightsignup";
import { getRowCountForSheet } from "@/app/lib/google";

export default async function LowlightPage() {
    const counts = await getRowCountForSheet('prijave_lowlight', 'E');
    return <LowlightSignup totalCount={counts} />;
}
