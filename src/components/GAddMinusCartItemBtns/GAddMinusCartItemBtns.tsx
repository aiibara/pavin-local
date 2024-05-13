// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import PlusCircleIcon from "@/assets/svgs/PlusCircleIcon";
// import useStyles from "@/utils/styles/useStyles";
// import createStyle from "@/utils/styles/createStyle";
// import MinusCircleIcon from "@/assets/svgs/MinusCircleIcon";
// import { useEditCartItem } from "@/providers/redux/hooks/cartHooks";
// import { IProductCart } from "@/entities/interfaces/cart/ICart";

// export interface GAddCartItemBtnProps {
//    item: IProductCart
// }
// export const GAddCartItemBtn = ({ item }: GAddCartItemBtnProps) => {
//   const { styles, theme: colors } = useStyles(stylesheets);
//   const { editItemQty } = useEditCartItem();

//   const onPressAdd = () => {
//     editItemQty(item.productCode, item.productUnit, 1);
//   };

//   return (
//     <TouchableOpacity style={styles.addMinusBtns} onPress={onPressAdd}>
//       <PlusCircleIcon fill={colors.text_success} />
//     </TouchableOpacity>
//   );
// };

// export const GAddMinusItemBtn = () => {
//   const { styles, theme: colors } = useStyles(stylesheets);
//   return (
//     <TouchableOpacity style={styles.addMinusBtns} onPress={onPressMinus}>
//       <MinusCircleIcon fill={colors.text_danger} />
//     </TouchableOpacity>
//   );
// };

// // export default GAddMinusCartItemBtns;

// const stylesheets = createStyle((colors) => ({
//   cartRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   container: {},
//   addMinusBtns: {
//     flexDirection: 'row',
//     gap: 10,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
// }));
