import { DataModel } from "@/convex/_generated/dataModel";
import { FlashList } from "@shopify/flash-list";
import DoctorSmallCard from "./DoctorSmallCard";
import { Text, View } from "@/components/Themed";
import { DoctorWithUserType } from "@/types";

type DoctorsListProps = {
  doctors?: DoctorWithUserType[];
};
const DoctorsList = ({ doctors }: DoctorsListProps) => {
  if (!doctors)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <View style={{ minHeight:2 }}>
      <FlashList
        data={doctors}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item: doctor }) => <DoctorSmallCard doctor={doctor} />}
        estimatedItemSize={10}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default DoctorsList;
