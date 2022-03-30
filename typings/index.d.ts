import i18next, { StringMap, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';
import Vue, { PluginFunction } from "vue";

declare class VueI18Next {
  constructor(i18next: i18next.i18n, options?: VueI18NextOptions);
  i18next: i18next.i18n;
  t: i18next.TFunction;
  resetVm: ({  }: { i18nLoadedAt: Date }) => void;
  i18nLoadedAt: string;
  onI18nChanged: () => void;

  static install: PluginFunction<never>;
  static version: string;
}

export interface VueI18NextOptions extends i18next.TOptions {
  bindI18n?: string;
  bindStore?: string;
  loadComponentNamespace?: boolean;
}

export interface VueI18NextComponentOptions {
  namespaces?: string | Array<string>;
  lng?: string;
  keyPrefix?: string;
  messages?: { [x: string]: {} };
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    i18n?: VueI18Next;
    i18nOptions?: VueI18NextComponentOptions;
  }
}

export interface VueI18NextTFunction<TKeys extends TFunctionKeys = string> {
  // basic usage
  <
  TResult extends TFunctionResult = string,
  TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap> | string,
  ): TResult;
  // overloaded usage
  <
    TResult extends TFunctionResult = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string,
  ): TResult;
}
declare module "vue/types/vue" {
  interface Vue {
    readonly $i18n: VueI18Next;
    // $t: VueI18NextTFunction<string>;
  }
}

export default VueI18Next;
