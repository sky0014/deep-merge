import { createPatch, applyPatch } from 'symmetry';

function isObject(o) {
    return o && typeof o === "object";
}
/**
 * 将dst替换为src，类似state.dst = src
 * @param dst dst
 * @param src src
 * @return dst
 */
function patchObject(dst, src) {
    var patch = createPatch(dst, src);
    if (patch === "none") {
        return dst;
    }
    if (patch === "reset") {
        return src;
    }
    return applyPatch.inPlace(dst, patch);
}
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
function deepMerge(dst, src, isReplace) {
    if (isReplace === void 0) { isReplace = false; }
    if (!isObject(dst) || !isObject(src)) {
        return src;
    }
    if (!dst)
        return src;
    if (!src)
        return dst;
    if (isReplace) {
        return patchObject(dst, src);
    }
    Object.keys(src).forEach(function (k) {
        var left = dst[k];
        var right = src[k];
        if (left && right && isObject(left) && isObject(right)) {
            // @ts-ignore
            // eslint-disable-next-line
            dst[k] = patchObject(left, right);
            return;
        }
        // @ts-ignore
        // eslint-disable-next-line
        dst[k] = right;
    });
    return dst;
}

export { deepMerge };
