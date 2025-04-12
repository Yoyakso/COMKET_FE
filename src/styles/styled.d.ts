import 'styled-components';
import { color } from './color';

type Theme = typeof color;
declare module 'styled-components' {
  export type DefaultTheme = Theme;
}
