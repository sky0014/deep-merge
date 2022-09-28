declare type O = Record<string, any>;
/**
 * 将src合并到dst，类似Object.assign
 *
 * deepMerge会对对象执行深比较，消耗一定性能，当对象特别大时，可根据实际情况决定是否需要使用
 *
 * @param dst dst
 * @param src src
 * @param isReplace 是否直接替换，类似state.dst = src
 * @return dst
 */
declare function deepMerge<T extends O>(dst: T, src: Partial<T>, isReplace?: boolean): any;

export { deepMerge };
