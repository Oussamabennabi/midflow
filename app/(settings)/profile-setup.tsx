import ProfileForm from "@/components/forms/ProfileForm";
import SettingsHeader from "@/components/(settings)/settings-header";
import { ScrollView } from "@/components/Themed";
const ProfileSetup = () => {
  
  return (
    <ScrollView style={{position:"relative",}}>
      <SettingsHeader paddingBottom title="Edit your profile" />

      <ProfileForm  />
    </ScrollView>
  );
};

export default ProfileSetup;
