import { DataModel } from "@/convex/_generated/dataModel";
import { FlashList } from "@shopify/flash-list";
import DoctorSmallCard from "./DoctorSmallCard";
import { Text, View } from "@/components/Themed";

type DoctorsListProps = {
  doctors?: DataModel["doctors"]["document"][];
};
const DoctorsList = ({ doctors }: DoctorsListProps) => {
  if (!doctors)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <FlashList
      data={doctors}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item: doctor }) => <DoctorSmallCard doctor={doctor} />}
      estimatedItemSize={10}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    />
  );
};

export default DoctorsList;
