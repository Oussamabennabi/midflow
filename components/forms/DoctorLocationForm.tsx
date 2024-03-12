import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Formik } from "formik";
import { SPACING } from "@/constants/Spacing";
import Space from "../ui/Space";
import Button from "../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { DoctorPlaceDescription, DoctorPlaceName } from "../form-inputs";
import ErrorChip from "../ui/ErrorChip";
import LatLong from "../form-inputs/LatLong";
import Toast from "react-native-toast-message";
import { getToastOptions } from "@/utils/getToastOptions";
type DoctorLocationFormProps = {
  location: { latitude: number; longitude: number } | null;
};
const DoctorLocationForm = ({ location }: DoctorLocationFormProps) => {
  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    // if (!location || !location.latitude || !location.longitude) {
        Toast.show(getToastOptions({message1:"Please select a place in the map",type:"error",message2:"Tap on map and drag the blue icon"}))
        return 
    // }
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validate={(values) => {
          const errors = {} as any;

          if (!values.name) {
            errors.name = "required";
          }

          if (!values.description) {
            errors.description = "required";
          }
          return errors;
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={{ padding: SPACING.lg }}>
            {/* LanLat */}
            <>
              <LatLong location={location} />
            </>
            {/* name */}
            <>
              <DoctorPlaceName
                handleChange={handleChange}
                value={values.name}
              />
              {touched.name && errors.name && (
                <>
                  <Space />
                  <ErrorChip text={errors.name} />
                </>
              )}
            </>
            {/* description */}
            <>
              <DoctorPlaceDescription
                handleChange={handleChange}
                value={values.description}
              />
              {touched.description && errors.description && (
                <>
                  <Space />
                  <ErrorChip text={errors.description} />
                </>
              )}
            </>

            <Space space="lg" />
            <Button
              iconLeft={
                isSubmitting && <ActivityIndicator size="small" color="white" />
              }
              variant={isSubmitting ? "disabled" : ""}
              iconRight={<AntDesign name="swapright" size={24} color="white" />}
              disabled={isSubmitting}
              onPress={handleSubmit}
              label="Update"
            />
          </View>
        )}
      </Formik>
      <Toast/>
    </>
  );
};

export default DoctorLocationForm;
