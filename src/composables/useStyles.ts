import { twMerge } from "tailwind-merge"
import { useAttrs } from "vue"

export const useStyles = () => {
  const attrs = useAttrs()

  function mergeStyles(...styles: (string | undefined | null)[]) {
    return twMerge(
      ...styles.filter(Boolean),
      attrs.class as string || "",
    )
  }

  return {
    mergeStyles,
    attrs,
  }
}
