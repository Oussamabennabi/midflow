import ProfileForm from "@/components/(settings)/ProfileForm";
import SettingsHeader from "@/components/(settings)/settings-header";
import { ScrollView } from "@/components/Themed";

const ProfileSetup = () => {
  return (
    <ScrollView>
      <SettingsHeader title="Edit your profile" />

      <ProfileForm />
    </ScrollView>
  );
};

export default ProfileSetup;
