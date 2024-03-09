import { ScrollView } from "@/components/Themed";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DoctorsList from "@/components/doctor/DoctorsList";

export default function TabThreeScreen() {
  const docs = useQuery(api.doctors.get, {});

  return (
    <>
      <ScrollView>
        <DoctorsList doctors={docs} />
      </ScrollView>
      
    </>
  );
}
 