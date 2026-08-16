const XLXZ_EVENTS = (function () {
    const map = {};

    return {
        on(name, fn) {
            (map[name] = map[name] || []).push(fn);
        },
        emit(name, payload) {
            (map[name] || []).forEach(fn => fn(payload));
        }
    };
})();