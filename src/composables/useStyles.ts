import { twMerge } from "tailwind-merge"
import { computed, useAttrs } from "vue"

export const useStyles = () => {
  const attrs = useAttrs()

  const mergeStyles = computed(() => {
    return (baseStyle: string) => twMerge(
      baseStyle,
      attrs.class as string || "",
    )
  })

  return {
    mergeStyles,
    attrs,
  }
}
