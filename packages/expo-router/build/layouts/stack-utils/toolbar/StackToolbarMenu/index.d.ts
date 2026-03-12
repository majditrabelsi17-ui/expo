import type { NativeStackHeaderItemMenu, NativeStackHeaderItemMenuAction } from '@react-navigation/native-stack';
import { type ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { PlatformIconIOS } from 'react-native-screens';
import type { StackToolbarMenuProps, StackToolbarMenuActionProps } from './types';
export type { StackToolbarMenuProps, NativeToolbarMenuProps, StackToolbarMenuActionProps, NativeToolbarMenuActionProps, } from './types';
/**
 * Computes the label and menu title from children and title prop.
 *
 * - If only `title` prop is provided, it is used for both the label (button text) and menu title
 * - If only `.Label` child is provided, it is used for the label and the menu title is an empty string
 * - If both `.Label` child and `title` prop are provided. `.Label` is used for the label, and `title` is used for the menu title
 */
export declare function computeMenuLabelAndTitle(children: ReactNode, title: string | undefined): {
    label: string;
    menuTitle: string;
};
/**
 * Use as `Stack.Toolbar.Menu` to provide menus in iOS toolbar.
 * It accepts `Stack.Toolbar.MenuAction` and nested `Stack.Toolbar.Menu`
 * elements. Menu can be configured using both component props and child
 * elements.
 *
 * @example
 * ```tsx
 * import { Stack } from 'expo-router';
 * import { Alert } from 'react-native';
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <Stack.Toolbar placement="right">
 *         <Stack.Toolbar.Menu icon="ellipsis.circle">
 *           <Stack.Toolbar.MenuAction onPress={() => Alert.alert('Action pressed!')}>
 *             Action 1
 *           </Stack.Toolbar.MenuAction>
 *         </Stack.Toolbar.Menu>
 *       </Stack.Toolbar>
 *       <ScreenContent />
 *     </>
 *   );
 * }
 * ```
 *
 * @see [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/menus) for more information about menus on iOS.
 *
 * @platform ios
 */
export declare const StackToolbarMenu: React.FC<StackToolbarMenuProps>;
export declare function convertStackToolbarMenuPropsToRNHeaderItem(props: StackToolbarMenuProps, isBottomPlacement?: boolean): NativeStackHeaderItemMenu | undefined;
export declare function convertImageIconToPlatformIcon(icon: {
    source: ImageSourcePropType;
    tinted?: boolean;
}): PlatformIconIOS;
/**
 * An action item for a `Stack.Toolbar.Menu`.
 *
 * @example
 * ```tsx
 * import { Stack } from 'expo-router';
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <Stack.Toolbar placement="right">
 *         <Stack.Toolbar.Menu icon="ellipsis.circle">
 *           <Stack.Toolbar.MenuAction onPress={() => alert('Action pressed!')}>
 *             Action 1
 *           </Stack.Toolbar.MenuAction>
 *         </Stack.Toolbar.Menu>
 *       </Stack.Toolbar>
 *       <ScreenContent />
 *     </>
 *   );
 * }
 * ```
 *
 * @platform ios
 */
export declare const StackToolbarMenuAction: React.FC<StackToolbarMenuActionProps>;
export declare function convertStackToolbarMenuActionPropsToRNHeaderItem(props: StackToolbarMenuActionProps): NativeStackHeaderItemMenuAction;
export declare const ALLOWED_CHILDREN: (import("react").FC<import("../toolbar-primitives").StackToolbarIconProps> | import("react").FC<import("../toolbar-primitives").StackToolbarBadgeProps> | import("react").FC<import("./types").NativeToolbarMenuProps> | ((_props: Record<string, unknown>) => null) | import("react").FC<StackToolbarMenuProps> | import("react").FC<StackToolbarMenuActionProps>)[];
//# sourceMappingURL=index.d.ts.map