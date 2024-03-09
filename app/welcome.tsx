import React, { useState,  useMemo } from "react";
import { View, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import WelcomeSvg1 from "@/assets/welcom/WelcomeSvg1";
import WelcomeSvg2 from "@/assets/welcom/WelcomeSvg2";
import WelcomeSvg3 from "@/assets/welcom/WelcomeSvg3";
import WelcomeSvg4 from "@/assets/welcom/WelcomeSvg4";
import { Bar } from "react-native-progress";
import Button from "@/components/ui/Button";
import { COLOR_SHADES } from "@/constants/Colors";
import IconButton from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";

const WelcomeScreen = () => {
  const [prevButtonHidden, setPrevButtonHidden] = useState(true);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0.25);
  const [fadeInAnimation] = useState(new Animated.Value(1));

  const WelcomeData = useMemo(
    () => [
      {
        title: "Personalize Your Health with Smart AI.",
        subTitle:
          "Achieve your wellness goals with our AI-powered platform tailored to your unique needs.",
        image: <WelcomeSvg1  />,
      },
      {
        title: "Intelligent Fitness Tracker At Your Fingertips.",
        subTitle:
          "Track your calorie & fitness nutrition with AI and get special recommendations.",
        image: <WelcomeSvg2 />,
      },
      {
        title: "Empathic Wellness Chatbot For All.",
        subTitle:
          "Experience compassionate and personalized care with our AI chatbot.",
        image: <WelcomeSvg3 />,
      },
      {
        title: "Intuitive Medication Tracker with AI",
        subTitle:
          "Easily track your medication & nutrition with the power of AI.",
        image: <WelcomeSvg4 />,
      },
    ],
    []
  );

  const currentWelcomeItem = useMemo(() => WelcomeData[index], [index]);

  const handleNext = () => {
    if (index < WelcomeData.length - 1) {
      fadeInAnimation.setValue(0);
      setProgress((prev) => prev + 0.25);
      Animated.timing(fadeInAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        setIndex((prevIndex) => prevIndex + 1);
      });
      setPrevButtonHidden(false);
    } else {
      // Handle reaching the end of the WelcomeData array
      // You can navigate to the next screen or perform any other action
    }
  };

  const handlePrevious = () => {
    if (index + 1 !== 0) {
      fadeInAnimation.setValue(0);
      setProgress((prev) => prev - 0.25);
      Animated.timing(fadeInAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        setIndex((prevIndex) => prevIndex - 1);
      });
      setPrevButtonHidden(index - 1 === 0);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ height: "100%", paddingTop: 50 }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Bar
            progress={progress}
            height={12}
            borderWidth={0}
            unfilledColor={COLOR_SHADES.gray.shade1}
            color={COLOR_SHADES.gray.primary}
            width={250}
          />
          <Button label="Skip" onPress={handleNext} variant="inline" />
        </View>

        <Animated.View
          style={{
            marginBottom: "auto",
            padding: 10,
            opacity: fadeInAnimation,
          }}
        >
          <Typography text={currentWelcomeItem.title} size="xxl" />
          <Typography
            text={currentWelcomeItem.subTitle}
            variant="secondary"
            font="SemiBold"
            size="md"
          />
        </Animated.View>
        <Animated.View style={{ opacity: fadeInAnimation, marginTop: "auto" }}>
          <View style={{ marginBottom: 0 }}>
            {currentWelcomeItem.image}</View>
        </Animated.View>

        {/* Previous Button */}
        {!prevButtonHidden && (
          <IconButton
            icon={<AntDesign name="swapleft" size={24} color="white" />}
            bgColor={COLOR_SHADES.gray.shade7}
            style={{
              borderRadius: 17,
              width: 70,
              borderWidth: 0,
              position: "absolute",
              bottom: 15,
              left: 15,
            }}
            onPress={handlePrevious}
          />
        )}

        {/* Next Button */}
        <IconButton
          icon={<AntDesign name="swapright" size={24} color="white" />}
          bgColor={COLOR_SHADES.gray.shade7}
          style={{
            borderRadius: 17,
            width: 70,
            borderWidth: 0,
            position: "absolute",
            bottom: 15,
            right: 15,
          }}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
