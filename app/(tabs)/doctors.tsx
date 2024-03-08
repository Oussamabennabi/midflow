import { ScrollView } from "@/components/Themed";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DoctorsList from "@/components/doctor/DoctorsList";
import PostDoctorReviewBottomSheet from "@/components/bottom-sheets/PostDoctorReviewBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";

export default function TabThreeScreen() {
  const docs = useQuery(api.doctors.get, {});

  const bottomSheetRef = useRef<BottomSheet>(null);
  
  return (
    <>
      <ScrollView>
        <DoctorsList doctors={docs} />
      </ScrollView>
      {docs && docs?.length > 0 && (
        <PostDoctorReviewBottomSheet ref={bottomSheetRef} doctor={docs[0]} />
      )}
    </>
  );
}
 