import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import React, { useCallback } from "react";
import { StyleProp, ViewStyle } from "react-native";

export function useCustomToast() {
  const { show } = useToast();

  const showNewToast = useCallback(
    ({
      title,
      description,
      customStyle,
    }: {
      title: string;
      description: string;
      customStyle: StyleProp<ViewStyle>;
    }) => {
      const newId = Math.random().toString();
      show({
        id: newId,
        placement: "top",
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast
              nativeID={uniqueToastId}
              action="muted"
              variant="solid"
              style={customStyle}
            >
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </Toast>
          );
        },
      });
    },
    [show],
  );

  return {
    showNewToast,
  };
}
