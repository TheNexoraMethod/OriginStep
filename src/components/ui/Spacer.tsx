import { spacing } from '@/theme';
import { View } from 'react-native';

interface SpacerProps {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
}

export function Spacer({ size }: SpacerProps): React.JSX.Element {
  return <View style={{ height: spacing[size] }} />;
}
