import { FlashList } from "@shopify/flash-list";
import DoctorSmallCard from "./DoctorSmallCard";
import {  View } from "@/components/Themed";
import { DoctorWithUserType } from "@/types";
import DoctorSmallCardSkeleton from "./DoktorSmallCard.skeleton";

type DoctorsListProps = {
  doctors?: DoctorWithUserType[];
};
const DoctorsList = ({ doctors }: DoctorsListProps) => {
  if (!doctors)
    return (
      <View>
        <FlashList
        data={[1,2,3]}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={() => <DoctorSmallCardSkeleton  />}
        estimatedItemSize={10}
        contentContainerStyle={{ paddingHorizontal: 10,paddingVertical:10 }}
      />
      </View>
    );
  return (
    <View style={{ minHeight:400 }}>
      <FlashList
        data={doctors}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item: doctor }) => <DoctorSmallCard doctor={doctor} />}
        estimatedItemSize={10}
        contentContainerStyle={{ paddingHorizontal: 10,paddingVertical:10 }}
      />
    </View>
  );
};

export default DoctorsList;
