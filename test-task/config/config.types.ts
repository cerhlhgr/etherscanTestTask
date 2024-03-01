export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

export interface ConfigModuleOptions {
  path: string;

  entities: any[];
}

export type ConfigEnv = { [key: string]: any };
