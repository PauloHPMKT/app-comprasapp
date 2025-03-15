import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";


interface MainButtonProps extends TouchableOpacityProps {
  children: string | ReactNode;
}

export function MainButton({ children, ...props }: MainButtonProps) {
  return (
     <TouchableOpacity
      style={styles.createListButton}
      {...props}
    >
      <Text style={styles.createListButtonText}>
        { children }
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  createListButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee2626',
    width: '90%',
    height: 50,
    borderRadius: 26,
  },
  createListButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})
