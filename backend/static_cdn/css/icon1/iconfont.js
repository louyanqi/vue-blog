;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-delete" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768zM416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768zM928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160zM736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-baocun" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M819.8144 968.064 204.1856 968.064C119.8336 968.064 51.2 899.4816 51.2 815.104L51.2 208.9216c0-84.3776 68.6336-153.0112 152.9856-153.0112l615.6544 0C904.1664 55.936 972.8 124.544 972.8 208.9216L972.8 815.104C972.8 899.4816 904.192 968.064 819.8144 968.064L819.8144 968.064zM204.1856 115.6352c-51.456 0-93.312 41.8304-93.312 93.312L110.8736 815.104c0 51.456 41.856 93.3376 93.312 93.3376l615.6544 0c51.456 0 93.312-41.8816 93.312-93.3376L913.152 208.9216c0-51.4816-41.856-93.312-93.312-93.312L204.1856 115.6096 204.1856 115.6352zM807.04 513.4336 216.96 513.4336 216.96 55.936l590.1056 0L807.0656 513.4336 807.04 513.4336zM276.608 453.7344l470.784 0L747.392 115.6352l-470.784 0L276.608 453.7344 276.608 453.7344zM599.8592 203.4432l59.648 0 0 198.9376-59.648 0L599.8592 203.4432 599.8592 203.4432zM599.8592 203.4432"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-write" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M151.007153 942.267769C128.013885 963.528445 86.413281 1006.950675 107.626494 906.756096 144.844165 743.232334 555.501811 114.238761 901.629542 53.894737 998.682268 53.894737 721.170389 286.205673 721.170389 286.205673 721.170389 286.205673 816.508427 298.051442 879.132672 231.909329 841.59972 427.727174 664.222569 427.0579 618.413525 442.637841 672.003196 450.52789 711.854231 474.231682 794.792518 450.006262 774.570232 505.525339 694.717246 573.845623 407.617084 641.459852 280.697363 687.077058 174.00042 921.007099 151.007153 942.267769Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)