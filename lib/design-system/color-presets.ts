import type { ColorPreset } from '@/components/Admin/Ui/ColorField';
import { DS_COLORS } from './tokens';

export const DS_BACKGROUND_PRESETS: readonly ColorPreset[] = [
  { value: '', label: 'None' },
  { value: DS_COLORS.white, label: 'White' },
  { value: '#fff2ea', label: 'Peach' },
  { value: '#f6e9ef', label: 'Blush' },
  { value: '#fff5f5', label: 'Rose wash' },
  { value: DS_COLORS.raspberry[100], label: 'Raspberry 100' },
  { value: DS_COLORS.raspberry[200], label: 'Raspberry 200' },
  { value: DS_COLORS.grey[100], label: 'Grey 100' },
  { value: DS_COLORS.grey[200], label: 'Grey 200' },
  { value: DS_COLORS.successScale[100], label: 'Success 100' },
  { value: DS_COLORS.warningScale[100], label: 'Warning 100' },
  { value: DS_COLORS.errorScale[100], label: 'Error 100' },
  { value: DS_COLORS.grey[900], label: 'Grey 900' },
];

export const DS_TEXT_PRESETS: readonly ColorPreset[] = [
  { value: '', label: 'Default' },
  { value: DS_COLORS.grey[1000], label: 'Grey 1000' },
  { value: DS_COLORS.grey[800], label: 'Grey 800' },
  { value: DS_COLORS.grey[700], label: 'Grey 700' },
  { value: DS_COLORS.primary, label: 'Primary' },
  { value: DS_COLORS.raspberry[600], label: 'Raspberry 600' },
  { value: DS_COLORS.white, label: 'White' },
  { value: DS_COLORS.successScale[300], label: 'Success 300' },
  { value: DS_COLORS.errorScale[200], label: 'Error 200' },
];

export const DS_BRAND_PRESETS: readonly ColorPreset[] = [
  { value: DS_COLORS.primary, label: 'Primary' },
  { value: DS_COLORS.raspberry[400], label: 'Raspberry 400' },
  { value: DS_COLORS.raspberry[500], label: 'Raspberry 500' },
  { value: DS_COLORS.raspberry[600], label: 'Raspberry 600' },
  { value: DS_COLORS.raspberry[700], label: 'Raspberry 700' },
];

export const DS_STATUS_PRESETS: readonly ColorPreset[] = [
  { value: DS_COLORS.success, label: 'Success' },
  { value: DS_COLORS.warning, label: 'Warning' },
  { value: DS_COLORS.error, label: 'Error' },
];

export const DS_BORDER_PRESETS: readonly ColorPreset[] = [
  { value: '', label: 'Default' },
  { value: DS_COLORS.grey[300], label: 'Grey 300' },
  { value: DS_COLORS.grey[400], label: 'Grey 400' },
  { value: DS_COLORS.raspberry[200], label: 'Raspberry 200' },
  { value: DS_COLORS.raspberry[400], label: 'Raspberry 400' },
  { value: DS_COLORS.primary, label: 'Primary' },
  { value: DS_COLORS.grey[800], label: 'Grey 800' },
];
