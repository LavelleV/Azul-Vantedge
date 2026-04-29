export const deviceModels = ['Home Model', 'Professional Model', 'Clinical Suite'] as const;

export type DeviceModel = (typeof deviceModels)[number];
