export const preventDefault = e => e.preventDefault(),

  stopPropagation = e => e.stopPropagation(),

  addEventListener = (listener, eventName, element, options = null) =>
    (element.addEventListener(eventName, listener, options), element),

  removeEventListener = (listener, eventName, element, options = null) =>
    (element.removeEventListener(eventName, listener, options), element),

  addEventListeners = (listenerEvNameOpsTuple, element) =>
    listenerEvNameOpsTuple.reduce((elm, [listener, evName, options]) =>
      addEventListener(listener, evName, elm, options), element),

  removeEventListeners = (listenerEvNameOpsTuple, element) =>
    listenerEvNameOpsTuple.reduce((elm, [listener, evName, options]) =>
      addEventListener(listener, evName, elm, options), element)
;
