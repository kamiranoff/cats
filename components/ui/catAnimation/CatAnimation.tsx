import React, { FC } from "react";

import catErrorOrange from "./cat-error-orange.json";
import LottieView, { LottieViewProps } from "lottie-react-native";
import { Box } from "@/components/ui/box";
import { StyleSheet } from "react-native";

type Props = Omit<LottieViewProps, "source">;

export const CatAnimation: FC<Props> = ({ ...rest }) => {
  return (
    <Box style={styles.container}>
      <LottieView
        source={catErrorOrange}
        autoPlay
        loop
        {...rest}
        style={styles.cat}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cat: {
    width: "100%",
    aspectRatio: 1,
    marginLeft: 50,
  },
});
