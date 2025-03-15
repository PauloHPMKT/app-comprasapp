import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CheckBox, CheckBoxProps } from "react-native-elements";

interface CustomCheckBoxProps extends TouchableOpacityProps, CheckBoxProps {
  children: string | ReactNode;
}

export function CustomCheckBox({ children, ...props }: CustomCheckBoxProps) {
  return (
    <TouchableOpacity
      style={styles.touchableLabel}
      activeOpacity={0.7}
      {...props}
    >
      <CheckBox
        containerStyle={styles.checkboxContainer}
        size={22}
        {...props}
      />
      <Text style={styles.checkboxText}>
        { children }
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: "400",
  },
});
