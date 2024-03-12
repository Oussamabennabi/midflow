import ChatList from "@/components/(chat)/ChatList";
import { ScrollView, View } from "@/components/Themed";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function TabFourScreen() {
  const currentUser = useQuery(api.users.currentUser);
  console.log(currentUser)
  if (!currentUser) return <ScrollView />;
  
  return (
    <View style={{ flex: 1 }}>
      <ChatList isDoctor={currentUser.role==="Doctor"} uid={currentUser._id} />
    </View>
  );
}
