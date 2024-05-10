import { useStyles } from "react-native-unistyles";

export default function useColors() {
   const {theme: colors} = useStyles();

   return colors;
}