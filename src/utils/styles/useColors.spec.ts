import colors from "@/assets/colors/colors";
import { renderHook } from "@testing-library/react-native";
import * as unistyles from "react-native-unistyles";
import useColors from "./useColors";

describe('useColors', () => {
   jest.spyOn(unistyles, 'useStyles').mockReturnValueOnce({
      theme: colors.light,
      breakpoint: "landscape",
      styles: {}
   })

   it('should render hook', () => {
    const { result } = renderHook(() => useColors());
    expect(result.current).toStrictEqual(colors.light)
  });
})