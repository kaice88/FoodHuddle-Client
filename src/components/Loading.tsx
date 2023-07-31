import { LoadingOverlay } from '@mantine/core'

export function loadingShow() {
  return (
    <LoadingOverlay
      loaderProps={{ size: 'md', color: 'orange', variant: 'ovals' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      overlayBlur={2}
      visible
    />
  );
}
