function BlockGrid() {
  $(".items").block({
    message: "Getting Results..",
    css: {
      border: "3px solid #a00",
      centerY: !1,
    },
  });
}
function UnBlockGrid() {
  $(".items").unblock(), bindApprovalItems();
}
function addAllRequired() {
  addRequired("input[type=text][data-val-required]"),
    addRequired("input[type=password][data-val-required]"),
    addRequired("input[type=number][data-val-required]"),
    addRequired("textarea[data-val-required]"),
    addRequired("select[data-val-required]");
}
function addRequired(n) {
  $(n).each(function () {
    $(this).attr("disabled") ||
      $(this).hasClass("highlight") ||
      ($(this).addClass("highlight"),
      $(this).after(
        "<span class='help-inline field-validation-error'> * </span>"
      ));
  });
}
function redirectIfAboveWidth(n) {
  window.innerWidth > _editRedirectWidth && (location.href = n);
}
function filterActiveToggle(n) {
  var t = $(n).closest(".k-grid").data("kendoGrid");
  $(n).is(":checked")
    ? t.dataSource.filter({
        field: "Status",
        operator: "neq",
        value: "Inactive",
      })
    : t.dataSource.filter({});
}
function tb_init(n) {
  $(n).click(function () {
    var i = this.title || this.name || null,
      t = this.href || this.alt,
      n = this.rel || !1;
    return tb_show(i, t, n), this.blur(), !1;
  });
}
function tb_show(n, t, i) {
  var f, e, u, s, o, r;
  try {
    if (
      (typeof document.body.style.maxHeight == "undefined"
        ? ($("body", "html").css({
            height: "100%",
            width: "100%",
          }),
          $("html").css("overflow", "hidden"),
          document.getElementById("TB_HideSelect") === null &&
            ($("body").append(
              "<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>"
            ),
            $("#TB_overlay").click(tb_remove)))
        : document.getElementById("TB_overlay") === null &&
          ($("body").append(
            "<div id='TB_overlay'></div><div id='TB_window'></div>"
          ),
          $("#TB_overlay").click(tb_remove)),
      tb_detectMacXFF()
        ? $("#TB_overlay").addClass("TB_overlayMacFFBGHack")
        : $("#TB_overlay").addClass("TB_overlayBG"),
      n === null && (n = ""),
      $("body").append(
        "<div id='TB_load'><img src='" + imgLoader.src + "' /></div>"
      ),
      $("#TB_load").show(),
      (f = t.indexOf("?") !== -1 ? t.substr(0, t.indexOf("?")) : t),
      (e = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/),
      (u = f.toLowerCase().match(e)),
      u == ".jpg" || u == ".jpeg" || u == ".png" || u == ".gif" || u == ".bmp")
    ) {
      if (
        ((TB_PrevCaption = ""),
        (TB_PrevURL = ""),
        (TB_PrevHTML = ""),
        (TB_NextCaption = ""),
        (TB_NextURL = ""),
        (TB_NextHTML = ""),
        (TB_imageCount = ""),
        (TB_FoundURL = !1),
        i)
      )
        for (
          TB_TempArray = $("a[@rel=" + i + "]").get(), TB_Counter = 0;
          TB_Counter < TB_TempArray.length && TB_NextHTML === "";
          TB_Counter++
        )
          (s = TB_TempArray[TB_Counter].href.toLowerCase().match(e)),
            TB_TempArray[TB_Counter].href == t
              ? ((TB_FoundURL = !0),
                (TB_imageCount =
                  "Image " + (TB_Counter + 1) + " of " + TB_TempArray.length))
              : TB_FoundURL
              ? ((TB_NextCaption = TB_TempArray[TB_Counter].title),
                (TB_NextURL = TB_TempArray[TB_Counter].href),
                (TB_NextHTML =
                  "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>"))
              : ((TB_PrevCaption = TB_TempArray[TB_Counter].title),
                (TB_PrevURL = TB_TempArray[TB_Counter].href),
                (TB_PrevHTML =
                  "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>"));
      (imgPreloader = new Image()),
        (imgPreloader.onload = function () {
          imgPreloader.onload = null;
          var h = tb_getPageSize(),
            e = h[0] - 150,
            f = h[1] - 150,
            u = imgPreloader.width,
            r = imgPreloader.height;
          if (
            (u > e
              ? ((r = r * (e / u)),
                (u = e),
                r > f && ((u = u * (f / r)), (r = f)))
              : r > f &&
                ((u = u * (f / r)),
                (r = f),
                u > e && ((r = r * (e / u)), (u = e))),
            (TB_WIDTH = u + 30),
            (TB_HEIGHT = r + 60),
            $("#TB_window").append(
              "<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='" +
                t +
                "' width='" +
                u +
                "' height='" +
                r +
                "' alt='" +
                n +
                "'/></a><div id='TB_caption'>" +
                n +
                "<div id='TB_secondLine'>" +
                TB_imageCount +
                TB_PrevHTML +
                TB_NextHTML +
                "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div>"
            ),
            $("#TB_closeWindowButton").click(tb_remove),
            !(TB_PrevHTML === ""))
          ) {
            function o() {
              return (
                $(document).unbind("click", o) &&
                  $(document).unbind("click", o),
                $("#TB_window").remove(),
                $("body").append("<div id='TB_window'></div>"),
                tb_show(TB_PrevCaption, TB_PrevURL, i),
                !1
              );
            }
            $("#TB_prev").click(o);
          }
          if (!(TB_NextHTML === "")) {
            function s() {
              return (
                $("#TB_window").remove(),
                $("body").append("<div id='TB_window'></div>"),
                tb_show(TB_NextCaption, TB_NextURL, i),
                !1
              );
            }
            $("#TB_next").click(s);
          }
          (document.onkeydown = function (n) {
            (keycode = n == null ? event.keyCode : n.which),
              keycode == 27
                ? tb_remove()
                : keycode == 190
                ? TB_NextHTML == "" || ((document.onkeydown = ""), s())
                : keycode == 188 &&
                  (TB_PrevHTML == "" || ((document.onkeydown = ""), o()));
          }),
            tb_position(),
            $("#TB_load").remove(),
            $("#TB_ImageOff").click(tb_remove),
            $("#TB_window").css({
              display: "block",
            });
        }),
        (imgPreloader.src = t);
    } else
      (o = t.replace(/^[^\?]+\??/, "")),
        (r = tb_parseQuery(o)),
        (TB_WIDTH = r.width * 1 + 30 || 630),
        (TB_HEIGHT = r.height * 1 + 40 || 440),
        (ajaxContentW = TB_WIDTH - 30),
        (ajaxContentH = TB_HEIGHT - 45),
        t.indexOf("TB_iframe") != -1
          ? ((urlNoQuery = t.split("TB_")),
            $("#TB_iframeContent").remove(),
            r.modal != "true"
              ? $("#TB_window").append(
                  "<div id='TB_title'><div id='TB_ajaxWindowTitle'>" +
                    n +
                    "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div></div><iframe frameborder='0' hspace='0' src='" +
                    urlNoQuery[0] +
                    "' id='TB_iframeContent' name='TB_iframeContent" +
                    Math.round(Math.random() * 1000) +
                    "' onload='tb_showIframe()' style='width:" +
                    (ajaxContentW + 29) +
                    "px;height:" +
                    (ajaxContentH + 17) +
                    "px;' > </iframe>"
                )
              : ($("#TB_overlay").unbind(),
                $("#TB_window").append(
                  "<iframe frameborder='0' hspace='0' src='" +
                    urlNoQuery[0] +
                    "' id='TB_iframeContent' name='TB_iframeContent" +
                    Math.round(Math.random() * 1000) +
                    "' onload='tb_showIframe()' style='width:" +
                    (ajaxContentW + 29) +
                    "px;height:" +
                    (ajaxContentH + 17) +
                    "px;'> </iframe>"
                )))
          : $("#TB_window").css("display") != "block"
          ? r.modal != "true"
            ? $("#TB_window").append(
                "<div id='TB_title'><div id='TB_ajaxWindowTitle'>" +
                  n +
                  "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a></div></div><div id='TB_ajaxContent' style='width:" +
                  ajaxContentW +
                  "px;height:" +
                  ajaxContentH +
                  "px'></div>"
              )
            : ($("#TB_overlay").unbind(),
              $("#TB_window").append(
                "<div id='TB_ajaxContent' class='TB_modal' style='width:" +
                  ajaxContentW +
                  "px;height:" +
                  ajaxContentH +
                  "px;'></div>"
              ))
          : (($("#TB_ajaxContent")[0].style.width = ajaxContentW + "px"),
            ($("#TB_ajaxContent")[0].style.height = ajaxContentH + "px"),
            ($("#TB_ajaxContent")[0].scrollTop = 0),
            $("#TB_ajaxWindowTitle").html(n)),
        $("#TB_closeWindowButton").click(tb_remove),
        t.indexOf("TB_inline") != -1
          ? ($("#TB_ajaxContent").append($("#" + r.inlineId).children()),
            $("#TB_window").unload(function () {
              $("#" + r.inlineId).append($("#TB_ajaxContent").children());
            }),
            tb_position(),
            $("#TB_load").remove(),
            $("#TB_window").css({
              display: "block",
            }))
          : t.indexOf("TB_iframe") != -1
          ? (tb_position(),
            $.browser.safari &&
              ($("#TB_load").remove(),
              $("#TB_window").css({
                display: "block",
              })))
          : $("#TB_ajaxContent").load(
              (t += "&random=" + +new Date()),
              function () {
                tb_position(),
                  $("#TB_load").remove(),
                  tb_init("#TB_ajaxContent a.thickbox"),
                  $("#TB_window").css({
                    display: "block",
                  });
              }
            );
    r.modal ||
      (document.onkeyup = function (n) {
        (keycode = n == null ? event.keyCode : n.which),
          keycode == 27 && tb_remove();
      });
  } catch (h) {}
}
function tb_showIframe() {
  $("#TB_load").remove(),
    $("#TB_window").css({
      display: "block",
    });
}
function tb_remove() {
  return (
    $("#TB_imageOff").unbind("click"),
    $("#TB_closeWindowButton").unbind("click"),
    $("#TB_window").fadeOut("fast", function () {
      $("#TB_window,#TB_overlay,#TB_HideSelect")
        .trigger("unload")
        .unbind()
        .remove();
    }),
    $("#TB_load").remove(),
    typeof document.body.style.maxHeight == "undefined" &&
      ($("body", "html").css({
        height: "auto",
        width: "auto",
      }),
      $("html").css("overflow", "")),
    (document.onkeydown = ""),
    (document.onkeyup = ""),
    !1
  );
}
function tb_position() {
  $("#TB_window").css({
    marginLeft: "-" + parseInt(TB_WIDTH / 2, 10) + "px",
    width: TB_WIDTH + "px",
  }),
    (jQuery.browser.msie && jQuery.browser.version < 7) ||
      $("#TB_window").css({
        marginTop: "-" + parseInt(TB_HEIGHT / 2, 10) + "px",
      });
}
function tb_parseQuery(n) {
  var u = {},
    f,
    r,
    t,
    e,
    i;
  if (!n) return u;
  for (f = n.split(/[;&]/), r = 0; r < f.length; r++)
    ((t = f[r].split("=")), t && t.length == 2) &&
      ((e = unescape(t[0])),
      (i = unescape(t[1])),
      (i = i.replace(/\+/g, " ")),
      (u[e] = i));
  return u;
}
function tb_getPageSize() {
  var n = document.documentElement,
    i =
      window.innerWidth ||
      self.innerWidth ||
      (n && n.clientWidth) ||
      document.body.clientWidth,
    t =
      window.innerHeight ||
      self.innerHeight ||
      (n && n.clientHeight) ||
      document.body.clientHeight;
  return (arrayPageSize = [i, t]);
}
function tb_detectMacXFF() {
  var n = navigator.userAgent.toLowerCase();
  if (n.indexOf("mac") != -1 && n.indexOf("firefox") != -1) return !0;
}
var _editRedirectWidth, tb_pathToImage;
(function (n, t) {
  function r(t, r) {
    var e,
      o,
      u,
      f = t.nodeName.toLowerCase();
    return "area" === f
      ? ((e = t.parentNode),
        (o = e.name),
        t.href && o && "map" === e.nodeName.toLowerCase()
          ? ((u = n("img[usemap=#" + o + "]")[0]), !!u && i(u))
          : !1)
      : (/input|select|textarea|button|object/.test(f)
          ? !t.disabled
          : "a" === f
          ? t.href || r
          : r) && i(t);
  }
  function i(t) {
    return (
      n.expr.filters.visible(t) &&
      !n(t)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === n.css(this, "visibility");
        }).length
    );
  }
  var f = 0,
    u = /^ui-id-\d+$/;
  (n.ui = n.ui || {}),
    n.extend(n.ui, {
      version: "1.10.3",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    n.fn.extend({
      focus: (function (t) {
        return function (i, r) {
          return "number" == typeof i
            ? this.each(function () {
                var t = this;
                setTimeout(function () {
                  n(t).focus(), r && r.call(t);
                }, i);
              })
            : t.apply(this, arguments);
        };
      })(n.fn.focus),
      scrollParent: function () {
        var t;
        return (
          (t =
            (n.ui.ie && /(static|relative)/.test(this.css("position"))) ||
            /absolute/.test(this.css("position"))
              ? this.parents()
                  .filter(function () {
                    return (
                      /(relative|absolute|fixed)/.test(
                        n.css(this, "position")
                      ) &&
                      /(auto|scroll)/.test(
                        n.css(this, "overflow") +
                          n.css(this, "overflow-y") +
                          n.css(this, "overflow-x")
                      )
                    );
                  })
                  .eq(0)
              : this.parents()
                  .filter(function () {
                    return /(auto|scroll)/.test(
                      n.css(this, "overflow") +
                        n.css(this, "overflow-y") +
                        n.css(this, "overflow-x")
                    );
                  })
                  .eq(0)),
          /fixed/.test(this.css("position")) || !t.length ? n(document) : t
        );
      },
      zIndex: function (i) {
        if (i !== t) return this.css("zIndex", i);
        if (this.length)
          for (var u, f, r = n(this[0]); r.length && r[0] !== document; ) {
            if (
              ((u = r.css("position")),
              ("absolute" === u || "relative" === u || "fixed" === u) &&
                ((f = parseInt(r.css("zIndex"), 10)), !isNaN(f) && 0 !== f))
            )
              return f;
            r = r.parent();
          }
        return 0;
      },
      uniqueId: function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++f);
        });
      },
      removeUniqueId: function () {
        return this.each(function () {
          u.test(this.id) && n(this).removeAttr("id");
        });
      },
    }),
    n.extend(n.expr[":"], {
      data: n.expr.createPseudo
        ? n.expr.createPseudo(function (t) {
            return function (i) {
              return !!n.data(i, t);
            };
          })
        : function (t, i, r) {
            return !!n.data(t, r[3]);
          },
      focusable: function (t) {
        return r(t, !isNaN(n.attr(t, "tabindex")));
      },
      tabbable: function (t) {
        var u = n.attr(t, "tabindex"),
          i = isNaN(u);
        return (i || u >= 0) && r(t, !i);
      },
    }),
    n("<a>").outerWidth(1).jquery ||
      n.each(["Width", "Height"], function (i, r) {
        function e(t, i, r, u) {
          return (
            n.each(o, function () {
              (i -= parseFloat(n.css(t, "padding" + this)) || 0),
                r &&
                  (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0),
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0);
            }),
            i
          );
        }
        var o = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
          u = r.toLowerCase(),
          f = {
            innerWidth: n.fn.innerWidth,
            innerHeight: n.fn.innerHeight,
            outerWidth: n.fn.outerWidth,
            outerHeight: n.fn.outerHeight,
          };
        (n.fn["inner" + r] = function (i) {
          return i === t
            ? f["inner" + r].call(this)
            : this.each(function () {
                n(this).css(u, e(this, i) + "px");
              });
        }),
          (n.fn["outer" + r] = function (t, i) {
            return "number" != typeof t
              ? f["outer" + r].call(this, t)
              : this.each(function () {
                  n(this).css(u, e(this, t, !0, i) + "px");
                });
          });
      }),
    n.fn.addBack ||
      (n.fn.addBack = function (n) {
        return this.add(
          null == n ? this.prevObject : this.prevObject.filter(n)
        );
      }),
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (n.fn.removeData = (function (t) {
        return function (i) {
          return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this);
        };
      })(n.fn.removeData)),
    (n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    (n.support.selectstart = "onselectstart" in document.createElement("div")),
    n.fn.extend({
      disableSelection: function () {
        return this.bind(
          (n.support.selectstart ? "selectstart" : "mousedown") +
            ".ui-disableSelection",
          function (n) {
            n.preventDefault();
          }
        );
      },
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
    }),
    n.extend(n.ui, {
      plugin: {
        add: function (t, i, r) {
          var u,
            f = n.ui[t].prototype;
          for (u in r)
            (f.plugins[u] = f.plugins[u] || []), f.plugins[u].push([i, r[u]]);
        },
        call: function (n, t, i) {
          var r,
            u = n.plugins[t];
          if (
            u &&
            n.element[0].parentNode &&
            11 !== n.element[0].parentNode.nodeType
          )
            for (r = 0; u.length > r; r++)
              n.options[u[r][0]] && u[r][1].apply(n.element, i);
        },
      },
      hasScroll: function (t, i) {
        if ("hidden" === n(t).css("overflow")) return !1;
        var r = i && "left" === i ? "scrollLeft" : "scrollTop",
          u = !1;
        return t[r] > 0 ? !0 : ((t[r] = 1), (u = t[r] > 0), (t[r] = 0), u);
      },
    });
})(jQuery),
  (function (n, t) {
    var u = 0,
      i = Array.prototype.slice,
      r = n.cleanData;
    (n.cleanData = function (t) {
      for (var u, i = 0; null != (u = t[i]); i++)
        try {
          n(u).triggerHandler("remove");
        } catch (f) {}
      r(t);
    }),
      (n.widget = function (i, r, u) {
        var h,
          o,
          f,
          s,
          c = {},
          e = i.split(".")[0];
        (i = i.split(".")[1]),
          (h = e + "-" + i),
          u || ((u = r), (r = n.Widget)),
          (n.expr[":"][h.toLowerCase()] = function (t) {
            return !!n.data(t, h);
          }),
          (n[e] = n[e] || {}),
          (o = n[e][i]),
          (f = n[e][i] = function (n, i) {
            return this._createWidget
              ? (arguments.length && this._createWidget(n, i), t)
              : new f(n, i);
          }),
          n.extend(f, o, {
            version: u.version,
            _proto: n.extend({}, u),
            _childConstructors: [],
          }),
          (s = new r()),
          (s.options = n.widget.extend({}, s.options)),
          n.each(u, function (i, u) {
            return n.isFunction(u)
              ? ((c[i] = (function () {
                  var t = function () {
                      return r.prototype[i].apply(this, arguments);
                    },
                    n = function (n) {
                      return r.prototype[i].apply(this, n);
                    };
                  return function () {
                    var i,
                      f = this._super,
                      r = this._superApply;
                    return (
                      (this._super = t),
                      (this._superApply = n),
                      (i = u.apply(this, arguments)),
                      (this._super = f),
                      (this._superApply = r),
                      i
                    );
                  };
                })()),
                t)
              : ((c[i] = u), t);
          }),
          (f.prototype = n.widget.extend(
            s,
            {
              widgetEventPrefix: o ? s.widgetEventPrefix : i,
            },
            c,
            {
              constructor: f,
              namespace: e,
              widgetName: i,
              widgetFullName: h,
            }
          )),
          o
            ? (n.each(o._childConstructors, function (t, i) {
                var r = i.prototype;
                n.widget(r.namespace + "." + r.widgetName, f, i._proto);
              }),
              delete o._childConstructors)
            : r._childConstructors.push(f),
          n.widget.bridge(i, f);
      }),
      (n.widget.extend = function (r) {
        for (
          var f, u, o = i.call(arguments, 1), e = 0, s = o.length;
          s > e;
          e++
        )
          for (f in o[e])
            (u = o[e][f]),
              o[e].hasOwnProperty(f) &&
                u !== t &&
                (r[f] = n.isPlainObject(u)
                  ? n.isPlainObject(r[f])
                    ? n.widget.extend({}, r[f], u)
                    : n.widget.extend({}, u)
                  : u);
        return r;
      }),
      (n.widget.bridge = function (r, u) {
        var f = u.prototype.widgetFullName || r;
        n.fn[r] = function (e) {
          var h = "string" == typeof e,
            o = i.call(arguments, 1),
            s = this;
          return (
            (e =
              !h && o.length ? n.widget.extend.apply(null, [e].concat(o)) : e),
            h
              ? this.each(function () {
                  var i,
                    u = n.data(this, f);
                  return u
                    ? n.isFunction(u[e]) && "_" !== e.charAt(0)
                      ? ((i = u[e].apply(u, o)),
                        i !== u && i !== t
                          ? ((s = i && i.jquery ? s.pushStack(i.get()) : i), !1)
                          : t)
                      : n.error(
                          "no such method '" +
                            e +
                            "' for " +
                            r +
                            " widget instance"
                        )
                    : n.error(
                        "cannot call methods on " +
                          r +
                          " prior to initialization; attempted to call method '" +
                          e +
                          "'"
                      );
                })
              : this.each(function () {
                  var t = n.data(this, f);
                  t
                    ? t.option(e || {})._init()
                    : n.data(this, f, new u(e, this));
                }),
            s
          );
        };
      }),
      (n.Widget = function () {}),
      (n.Widget._childConstructors = []),
      (n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
          disabled: !1,
          create: null,
        },
        _createWidget: function (t, i) {
          (i = n(i || this.defaultElement || this)[0]),
            (this.element = n(i)),
            (this.uuid = u++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.options = n.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              t
            )),
            (this.bindings = n()),
            (this.hoverable = n()),
            (this.focusable = n()),
            i !== this &&
              (n.data(i, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (n) {
                  n.target === i && this.destroy();
                },
              }),
              (this.document = n(i.style ? i.ownerDocument : i.document || i)),
              (this.window = n(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: n.noop,
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function () {
          this._destroy(),
            this.element
              .unbind(this.eventNamespace)
              .removeData(this.widgetName)
              .removeData(this.widgetFullName)
              .removeData(n.camelCase(this.widgetFullName)),
            this.widget()
              .unbind(this.eventNamespace)
              .removeAttr("aria-disabled")
              .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: n.noop,
        widget: function () {
          return this.element;
        },
        option: function (i, r) {
          var f,
            u,
            e,
            o = i;
          if (0 === arguments.length) return n.widget.extend({}, this.options);
          if ("string" == typeof i)
            if (((o = {}), (f = i.split(".")), (i = f.shift()), f.length)) {
              for (
                u = o[i] = n.widget.extend({}, this.options[i]), e = 0;
                f.length - 1 > e;
                e++
              )
                (u[f[e]] = u[f[e]] || {}), (u = u[f[e]]);
              if (((i = f.pop()), r === t)) return u[i] === t ? null : u[i];
              u[i] = r;
            } else {
              if (r === t)
                return this.options[i] === t ? null : this.options[i];
              o[i] = r;
            }
          return this._setOptions(o), this;
        },
        _setOptions: function (n) {
          var t;
          for (t in n) this._setOption(t, n[t]);
          return this;
        },
        _setOption: function (n, t) {
          return (
            (this.options[n] = t),
            "disabled" === n &&
              (this.widget()
                .toggleClass(
                  this.widgetFullName + "-disabled ui-state-disabled",
                  !!t
                )
                .attr("aria-disabled", t),
              this.hoverable.removeClass("ui-state-hover"),
              this.focusable.removeClass("ui-state-focus")),
            this
          );
        },
        enable: function () {
          return this._setOption("disabled", !1);
        },
        disable: function () {
          return this._setOption("disabled", !0);
        },
        _on: function (i, r, u) {
          var e,
            f = this;
          "boolean" != typeof i && ((u = r), (r = i), (i = !1)),
            u
              ? ((r = e = n(r)), (this.bindings = this.bindings.add(r)))
              : ((u = r), (r = this.element), (e = this.widget())),
            n.each(u, function (u, o) {
              function s() {
                return i ||
                  (f.options.disabled !== !0 &&
                    !n(this).hasClass("ui-state-disabled"))
                  ? ("string" == typeof o ? f[o] : o).apply(f, arguments)
                  : t;
              }
              "string" != typeof o &&
                (s.guid = o.guid = o.guid || s.guid || n.guid++);
              var l = u.match(/^(\w+)\s*(.*)$/),
                c = l[1] + f.eventNamespace,
                h = l[2];
              h ? e.delegate(h, c, s) : r.bind(c, s);
            });
        },
        _off: function (n, t) {
          (t =
            (t || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            n.unbind(t).undelegate(t);
        },
        _delay: function (n, t) {
          function r() {
            return ("string" == typeof n ? i[n] : n).apply(i, arguments);
          }
          var i = this;
          return setTimeout(r, t || 0);
        },
        _hoverable: function (t) {
          (this.hoverable = this.hoverable.add(t)),
            this._on(t, {
              mouseenter: function (t) {
                n(t.currentTarget).addClass("ui-state-hover");
              },
              mouseleave: function (t) {
                n(t.currentTarget).removeClass("ui-state-hover");
              },
            });
        },
        _focusable: function (t) {
          (this.focusable = this.focusable.add(t)),
            this._on(t, {
              focusin: function (t) {
                n(t.currentTarget).addClass("ui-state-focus");
              },
              focusout: function (t) {
                n(t.currentTarget).removeClass("ui-state-focus");
              },
            });
        },
        _trigger: function (t, i, r) {
          var u,
            f,
            e = this.options[t];
          if (
            ((r = r || {}),
            (i = n.Event(i)),
            (i.type = (t === this.widgetEventPrefix
              ? t
              : this.widgetEventPrefix + t
            ).toLowerCase()),
            (i.target = this.element[0]),
            (f = i.originalEvent))
          )
            for (u in f) u in i || (i[u] = f[u]);
          return (
            this.element.trigger(i, r),
            !(
              (n.isFunction(e) &&
                e.apply(this.element[0], [i].concat(r)) === !1) ||
              i.isDefaultPrevented()
            )
          );
        },
      }),
      n.each(
        {
          show: "fadeIn",
          hide: "fadeOut",
        },
        function (t, i) {
          n.Widget.prototype["_" + t] = function (r, u, f) {
            "string" == typeof u &&
              (u = {
                effect: u,
              });
            var o,
              e = u
                ? u === !0 || "number" == typeof u
                  ? i
                  : u.effect || i
                : t;
            (u = u || {}),
              "number" == typeof u &&
                (u = {
                  duration: u,
                }),
              (o = !n.isEmptyObject(u)),
              (u.complete = f),
              u.delay && r.delay(u.delay),
              o && n.effects && n.effects.effect[e]
                ? r[t](u)
                : e !== t && r[e]
                ? r[e](u.duration, u.easing, f)
                : r.queue(function (i) {
                    n(this)[t](), f && f.call(r[0]), i();
                  });
          };
        }
      );
  })(jQuery),
  (function (n) {
    var t = !1;
    n(document).mouseup(function () {
      t = !1;
    }),
      n.widget("ui.mouse", {
        version: "1.10.3",
        options: {
          cancel: "input,textarea,button,select,option",
          distance: 1,
          delay: 0,
        },
        _mouseInit: function () {
          var t = this;
          this.element
            .bind("mousedown." + this.widgetName, function (n) {
              return t._mouseDown(n);
            })
            .bind("click." + this.widgetName, function (i) {
              return !0 ===
                n.data(i.target, t.widgetName + ".preventClickEvent")
                ? (n.removeData(i.target, t.widgetName + ".preventClickEvent"),
                  i.stopImmediatePropagation(),
                  !1)
                : undefined;
            }),
            (this.started = !1);
        },
        _mouseDestroy: function () {
          this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate &&
              n(document)
                .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function (i) {
          if (!t) {
            this._mouseStarted && this._mouseUp(i), (this._mouseDownEvent = i);
            var r = this,
              f = 1 === i.which,
              u =
                "string" == typeof this.options.cancel && i.target.nodeName
                  ? n(i.target).closest(this.options.cancel).length
                  : !1;
            return f && !u && this._mouseCapture(i)
              ? ((this.mouseDelayMet = !this.options.delay),
                this.mouseDelayMet ||
                  (this._mouseDelayTimer = setTimeout(function () {
                    r.mouseDelayMet = !0;
                  }, this.options.delay)),
                this._mouseDistanceMet(i) &&
                this._mouseDelayMet(i) &&
                ((this._mouseStarted = this._mouseStart(i) !== !1),
                !this._mouseStarted)
                  ? (i.preventDefault(), !0)
                  : (!0 ===
                      n.data(
                        i.target,
                        this.widgetName + ".preventClickEvent"
                      ) &&
                      n.removeData(
                        i.target,
                        this.widgetName + ".preventClickEvent"
                      ),
                    (this._mouseMoveDelegate = function (n) {
                      return r._mouseMove(n);
                    }),
                    (this._mouseUpDelegate = function (n) {
                      return r._mouseUp(n);
                    }),
                    n(document)
                      .bind(
                        "mousemove." + this.widgetName,
                        this._mouseMoveDelegate
                      )
                      .bind(
                        "mouseup." + this.widgetName,
                        this._mouseUpDelegate
                      ),
                    i.preventDefault(),
                    (t = !0),
                    !0))
              : !0;
          }
        },
        _mouseMove: function (t) {
          return n.ui.ie &&
            (!document.documentMode || 9 > document.documentMode) &&
            !t.button
            ? this._mouseUp(t)
            : this._mouseStarted
            ? (this._mouseDrag(t), t.preventDefault())
            : (this._mouseDistanceMet(t) &&
                this._mouseDelayMet(t) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, t) !== !1),
                this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
              !this._mouseStarted);
        },
        _mouseUp: function (t) {
          return (
            n(document)
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted &&
              ((this._mouseStarted = !1),
              t.target === this._mouseDownEvent.target &&
                n.data(t.target, this.widgetName + ".preventClickEvent", !0),
              this._mouseStop(t)),
            !1
          );
        },
        _mouseDistanceMet: function (n) {
          return (
            Math.max(
              Math.abs(this._mouseDownEvent.pageX - n.pageX),
              Math.abs(this._mouseDownEvent.pageY - n.pageY)
            ) >= this.options.distance
          );
        },
        _mouseDelayMet: function () {
          return this.mouseDelayMet;
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
          return !0;
        },
      });
  })(jQuery),
  (function (n) {
    n.widget("ui.draggable", n.ui.mouse, {
      version: "1.10.3",
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
        drag: null,
        start: null,
        stop: null,
      },
      _create: function () {
        "original" !== this.options.helper ||
          /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative"),
          this.options.addClasses && this.element.addClass("ui-draggable"),
          this.options.disabled &&
            this.element.addClass("ui-draggable-disabled"),
          this._mouseInit();
      },
      _destroy: function () {
        this.element.removeClass(
          "ui-draggable ui-draggable-dragging ui-draggable-disabled"
        ),
          this._mouseDestroy();
      },
      _mouseCapture: function (t) {
        var i = this.options;
        return this.helper ||
          i.disabled ||
          n(t.target).closest(".ui-resizable-handle").length > 0
          ? !1
          : ((this.handle = this._getHandle(t)),
            this.handle
              ? (n(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(
                  function () {
                    n(
                      "<div class='ui-draggable-iframeFix' style='background: #fff;'></div>"
                    )
                      .css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1000,
                      })
                      .css(n(this).offset())
                      .appendTo("body");
                  }
                ),
                !0)
              : !1);
      },
      _mouseStart: function (t) {
        var i = this.options;
        return (
          (this.helper = this._createHelper(t)),
          this.helper.addClass("ui-draggable-dragging"),
          this._cacheHelperProportions(),
          n.ui.ddmanager && (n.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offsetParent = this.helper.offsetParent()),
          (this.offsetParentCssPosition = this.offsetParent.css("position")),
          (this.offset = this.positionAbs = this.element.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          (this.offset.scroll = !1),
          n.extend(this.offset, {
            click: {
              left: t.pageX - this.offset.left,
              top: t.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          (this.originalPosition = this.position = this._generatePosition(t)),
          (this.originalPageX = t.pageX),
          (this.originalPageY = t.pageY),
          i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
          this._setContainment(),
          this._trigger("start", t) === !1
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              n.ui.ddmanager &&
                !i.dropBehaviour &&
                n.ui.ddmanager.prepareOffsets(this, t),
              this._mouseDrag(t, !0),
              n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t),
              !0)
        );
      },
      _mouseDrag: function (t, i) {
        if (
          ("fixed" === this.offsetParentCssPosition &&
            (this.offset.parent = this._getParentOffset()),
          (this.position = this._generatePosition(t)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !i)
        ) {
          var r = this._uiHash();
          if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
          this.position = r.position;
        }
        return (
          (this.options.axis && "y" === this.options.axis) ||
            (this.helper[0].style.left = this.position.left + "px"),
          (this.options.axis && "x" === this.options.axis) ||
            (this.helper[0].style.top = this.position.top + "px"),
          n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
          !1
        );
      },
      _mouseStop: function (t) {
        var r = this,
          i = !1;
        return (
          n.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (i = n.ui.ddmanager.drop(this, t)),
          this.dropped && ((i = this.dropped), (this.dropped = !1)),
          "original" !== this.options.helper ||
          n.contains(this.element[0].ownerDocument, this.element[0])
            ? (("invalid" === this.options.revert && !i) ||
              ("valid" === this.options.revert && i) ||
              this.options.revert === !0 ||
              (n.isFunction(this.options.revert) &&
                this.options.revert.call(this.element, i))
                ? n(this.helper).animate(
                    this.originalPosition,
                    parseInt(this.options.revertDuration, 10),
                    function () {
                      r._trigger("stop", t) !== !1 && r._clear();
                    }
                  )
                : this._trigger("stop", t) !== !1 && this._clear(),
              !1)
            : !1
        );
      },
      _mouseUp: function (t) {
        return (
          n("div.ui-draggable-iframeFix").each(function () {
            this.parentNode.removeChild(this);
          }),
          n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t),
          n.ui.mouse.prototype._mouseUp.call(this, t)
        );
      },
      cancel: function () {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp({})
            : this._clear(),
          this
        );
      },
      _getHandle: function (t) {
        return this.options.handle
          ? !!n(t.target).closest(this.element.find(this.options.handle)).length
          : !0;
      },
      _createHelper: function (t) {
        var r = this.options,
          i = n.isFunction(r.helper)
            ? n(r.helper.apply(this.element[0], [t]))
            : "clone" === r.helper
            ? this.element.clone().removeAttr("id")
            : this.element;
        return (
          i.parents("body").length ||
            i.appendTo(
              "parent" === r.appendTo ? this.element[0].parentNode : r.appendTo
            ),
          i[0] === this.element[0] ||
            /(fixed|absolute)/.test(i.css("position")) ||
            i.css("position", "absolute"),
          i
        );
      },
      _adjustOffsetFromHelper: function (t) {
        "string" == typeof t && (t = t.split(" ")),
          n.isArray(t) &&
            (t = {
              left: +t[0],
              top: +t[1] || 0,
            }),
          "left" in t && (this.offset.click.left = t.left + this.margins.left),
          "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
          "top" in t && (this.offset.click.top = t.top + this.margins.top),
          "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        var t = this.offsetParent.offset();
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== document &&
            n.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
            (t.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] === document.body ||
            (this.offsetParent[0].tagName &&
              "html" === this.offsetParent[0].tagName.toLowerCase() &&
              n.ui.ie)) &&
            (t = {
              top: 0,
              left: 0,
            }),
          {
            top:
              t.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              t.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
          var n = this.element.position();
          return {
            top:
              n.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              n.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        }
        return {
          top: 0,
          left: 0,
        };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var u,
          t,
          i,
          r = this.options;
        return r.containment
          ? "window" === r.containment
            ? ((this.containment = [
                n(window).scrollLeft() -
                  this.offset.relative.left -
                  this.offset.parent.left,
                n(window).scrollTop() -
                  this.offset.relative.top -
                  this.offset.parent.top,
                n(window).scrollLeft() +
                  n(window).width() -
                  this.helperProportions.width -
                  this.margins.left,
                n(window).scrollTop() +
                  (n(window).height() ||
                    document.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
              undefined)
            : "document" === r.containment
            ? ((this.containment = [
                0,
                0,
                n(document).width() -
                  this.helperProportions.width -
                  this.margins.left,
                (n(document).height() ||
                  document.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
              undefined)
            : r.containment.constructor === Array
            ? ((this.containment = r.containment), undefined)
            : ("parent" === r.containment &&
                (r.containment = this.helper[0].parentNode),
              (t = n(r.containment)),
              (i = t[0]),
              i &&
                ((u = "hidden" !== t.css("overflow")),
                (this.containment = [
                  (parseInt(t.css("borderLeftWidth"), 10) || 0) +
                    (parseInt(t.css("paddingLeft"), 10) || 0),
                  (parseInt(t.css("borderTopWidth"), 10) || 0) +
                    (parseInt(t.css("paddingTop"), 10) || 0),
                  (u ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) -
                    (parseInt(t.css("borderRightWidth"), 10) || 0) -
                    (parseInt(t.css("paddingRight"), 10) || 0) -
                    this.helperProportions.width -
                    this.margins.left -
                    this.margins.right,
                  (u
                    ? Math.max(i.scrollHeight, i.offsetHeight)
                    : i.offsetHeight) -
                    (parseInt(t.css("borderBottomWidth"), 10) || 0) -
                    (parseInt(t.css("paddingBottom"), 10) || 0) -
                    this.helperProportions.height -
                    this.margins.top -
                    this.margins.bottom,
                ]),
                (this.relative_container = t)),
              undefined)
          : ((this.containment = null), undefined);
      },
      _convertPositionTo: function (t, i) {
        i || (i = this.position);
        var r = "absolute" === t ? 1 : -1,
          u =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              n.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent;
        return (
          this.offset.scroll ||
            (this.offset.scroll = {
              top: u.scrollTop(),
              left: u.scrollLeft(),
            }),
          {
            top:
              i.top +
              this.offset.relative.top * r +
              this.offset.parent.top * r -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : this.offset.scroll.top) *
                r,
            left:
              i.left +
              this.offset.relative.left * r +
              this.offset.parent.left * r -
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : this.offset.scroll.left) *
                r,
          }
        );
      },
      _generatePosition: function (t) {
        var i,
          s,
          f,
          u,
          r = this.options,
          h =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              n.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          e = t.pageX,
          o = t.pageY;
        return (
          this.offset.scroll ||
            (this.offset.scroll = {
              top: h.scrollTop(),
              left: h.scrollLeft(),
            }),
          this.originalPosition &&
            (this.containment &&
              (this.relative_container
                ? ((s = this.relative_container.offset()),
                  (i = [
                    this.containment[0] + s.left,
                    this.containment[1] + s.top,
                    this.containment[2] + s.left,
                    this.containment[3] + s.top,
                  ]))
                : (i = this.containment),
              t.pageX - this.offset.click.left < i[0] &&
                (e = i[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < i[1] &&
                (o = i[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > i[2] &&
                (e = i[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > i[3] &&
                (o = i[3] + this.offset.click.top)),
            r.grid &&
              ((f = r.grid[1]
                ? this.originalPageY +
                  Math.round((o - this.originalPageY) / r.grid[1]) * r.grid[1]
                : this.originalPageY),
              (o = i
                ? f - this.offset.click.top >= i[1] ||
                  f - this.offset.click.top > i[3]
                  ? f
                  : f - this.offset.click.top >= i[1]
                  ? f - r.grid[1]
                  : f + r.grid[1]
                : f),
              (u = r.grid[0]
                ? this.originalPageX +
                  Math.round((e - this.originalPageX) / r.grid[0]) * r.grid[0]
                : this.originalPageX),
              (e = i
                ? u - this.offset.click.left >= i[0] ||
                  u - this.offset.click.left > i[2]
                  ? u
                  : u - this.offset.click.left >= i[0]
                  ? u - r.grid[0]
                  : u + r.grid[0]
                : u))),
          {
            top:
              o -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : this.offset.scroll.top),
            left:
              e -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : this.offset.scroll.left),
          }
        );
      },
      _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"),
          this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1);
      },
      _trigger: function (t, i, r) {
        return (
          (r = r || this._uiHash()),
          n.ui.plugin.call(this, t, [i, r]),
          "drag" === t &&
            (this.positionAbs = this._convertPositionTo("absolute")),
          n.Widget.prototype._trigger.call(this, t, i, r)
        );
      },
      plugins: {},
      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs,
        };
      },
    }),
      n.ui.plugin.add("draggable", "connectToSortable", {
        start: function (t, i) {
          var r = n(this).data("ui-draggable"),
            f = r.options,
            u = n.extend({}, i, {
              item: r.element,
            });
          (r.sortables = []),
            n(f.connectToSortable).each(function () {
              var i = n.data(this, "ui-sortable");
              i &&
                !i.options.disabled &&
                (r.sortables.push({
                  instance: i,
                  shouldRevert: i.options.revert,
                }),
                i.refreshPositions(),
                i._trigger("activate", t, u));
            });
        },
        stop: function (t, i) {
          var r = n(this).data("ui-draggable"),
            u = n.extend({}, i, {
              item: r.element,
            });
          n.each(r.sortables, function () {
            this.instance.isOver
              ? ((this.instance.isOver = 0),
                (r.cancelHelperRemoval = !0),
                (this.instance.cancelHelperRemoval = !1),
                this.shouldRevert &&
                  (this.instance.options.revert = this.shouldRevert),
                this.instance._mouseStop(t),
                (this.instance.options.helper = this.instance.options._helper),
                "original" === r.options.helper &&
                  this.instance.currentItem.css({
                    top: "auto",
                    left: "auto",
                  }))
              : ((this.instance.cancelHelperRemoval = !1),
                this.instance._trigger("deactivate", t, u));
          });
        },
        drag: function (t, i) {
          var r = n(this).data("ui-draggable"),
            u = this;
          n.each(r.sortables, function () {
            var f = !1,
              e = this;
            (this.instance.positionAbs = r.positionAbs),
              (this.instance.helperProportions = r.helperProportions),
              (this.instance.offset.click = r.offset.click),
              this.instance._intersectsWith(this.instance.containerCache) &&
                ((f = !0),
                n.each(r.sortables, function () {
                  return (
                    (this.instance.positionAbs = r.positionAbs),
                    (this.instance.helperProportions = r.helperProportions),
                    (this.instance.offset.click = r.offset.click),
                    this !== e &&
                      this.instance._intersectsWith(
                        this.instance.containerCache
                      ) &&
                      n.contains(
                        e.instance.element[0],
                        this.instance.element[0]
                      ) &&
                      (f = !1),
                    f
                  );
                })),
              f
                ? (this.instance.isOver ||
                    ((this.instance.isOver = 1),
                    (this.instance.currentItem = n(u)
                      .clone()
                      .removeAttr("id")
                      .appendTo(this.instance.element)
                      .data("ui-sortable-item", !0)),
                    (this.instance.options._helper = this.instance.options.helper),
                    (this.instance.options.helper = function () {
                      return i.helper[0];
                    }),
                    (t.target = this.instance.currentItem[0]),
                    this.instance._mouseCapture(t, !0),
                    this.instance._mouseStart(t, !0, !0),
                    (this.instance.offset.click.top = r.offset.click.top),
                    (this.instance.offset.click.left = r.offset.click.left),
                    (this.instance.offset.parent.left -=
                      r.offset.parent.left - this.instance.offset.parent.left),
                    (this.instance.offset.parent.top -=
                      r.offset.parent.top - this.instance.offset.parent.top),
                    r._trigger("toSortable", t),
                    (r.dropped = this.instance.element),
                    (r.currentItem = r.element),
                    (this.instance.fromOutside = r)),
                  this.instance.currentItem && this.instance._mouseDrag(t))
                : this.instance.isOver &&
                  ((this.instance.isOver = 0),
                  (this.instance.cancelHelperRemoval = !0),
                  (this.instance.options.revert = !1),
                  this.instance._trigger(
                    "out",
                    t,
                    this.instance._uiHash(this.instance)
                  ),
                  this.instance._mouseStop(t, !0),
                  (this.instance.options.helper = this.instance.options._helper),
                  this.instance.currentItem.remove(),
                  this.instance.placeholder &&
                    this.instance.placeholder.remove(),
                  r._trigger("fromSortable", t),
                  (r.dropped = !1));
          });
        },
      }),
      n.ui.plugin.add("draggable", "cursor", {
        start: function () {
          var t = n("body"),
            i = n(this).data("ui-draggable").options;
          t.css("cursor") && (i._cursor = t.css("cursor")),
            t.css("cursor", i.cursor);
        },
        stop: function () {
          var t = n(this).data("ui-draggable").options;
          t._cursor && n("body").css("cursor", t._cursor);
        },
      }),
      n.ui.plugin.add("draggable", "opacity", {
        start: function (t, i) {
          var r = n(i.helper),
            u = n(this).data("ui-draggable").options;
          r.css("opacity") && (u._opacity = r.css("opacity")),
            r.css("opacity", u.opacity);
        },
        stop: function (t, i) {
          var r = n(this).data("ui-draggable").options;
          r._opacity && n(i.helper).css("opacity", r._opacity);
        },
      }),
      n.ui.plugin.add("draggable", "scroll", {
        start: function () {
          var t = n(this).data("ui-draggable");
          t.scrollParent[0] !== document &&
            "HTML" !== t.scrollParent[0].tagName &&
            (t.overflowOffset = t.scrollParent.offset());
        },
        drag: function (t) {
          var r = n(this).data("ui-draggable"),
            i = r.options,
            u = !1;
          r.scrollParent[0] !== document && "HTML" !== r.scrollParent[0].tagName
            ? ((i.axis && "x" === i.axis) ||
                (r.overflowOffset.top +
                  r.scrollParent[0].offsetHeight -
                  t.pageY <
                i.scrollSensitivity
                  ? (r.scrollParent[0].scrollTop = u =
                      r.scrollParent[0].scrollTop + i.scrollSpeed)
                  : t.pageY - r.overflowOffset.top < i.scrollSensitivity &&
                    (r.scrollParent[0].scrollTop = u =
                      r.scrollParent[0].scrollTop - i.scrollSpeed)),
              (i.axis && "y" === i.axis) ||
                (r.overflowOffset.left +
                  r.scrollParent[0].offsetWidth -
                  t.pageX <
                i.scrollSensitivity
                  ? (r.scrollParent[0].scrollLeft = u =
                      r.scrollParent[0].scrollLeft + i.scrollSpeed)
                  : t.pageX - r.overflowOffset.left < i.scrollSensitivity &&
                    (r.scrollParent[0].scrollLeft = u =
                      r.scrollParent[0].scrollLeft - i.scrollSpeed)))
            : ((i.axis && "x" === i.axis) ||
                (t.pageY - n(document).scrollTop() < i.scrollSensitivity
                  ? (u = n(document).scrollTop(
                      n(document).scrollTop() - i.scrollSpeed
                    ))
                  : n(window).height() - (t.pageY - n(document).scrollTop()) <
                      i.scrollSensitivity &&
                    (u = n(document).scrollTop(
                      n(document).scrollTop() + i.scrollSpeed
                    ))),
              (i.axis && "y" === i.axis) ||
                (t.pageX - n(document).scrollLeft() < i.scrollSensitivity
                  ? (u = n(document).scrollLeft(
                      n(document).scrollLeft() - i.scrollSpeed
                    ))
                  : n(window).width() - (t.pageX - n(document).scrollLeft()) <
                      i.scrollSensitivity &&
                    (u = n(document).scrollLeft(
                      n(document).scrollLeft() + i.scrollSpeed
                    )))),
            u !== !1 &&
              n.ui.ddmanager &&
              !i.dropBehaviour &&
              n.ui.ddmanager.prepareOffsets(r, t);
        },
      }),
      n.ui.plugin.add("draggable", "snap", {
        start: function () {
          var t = n(this).data("ui-draggable"),
            i = t.options;
          (t.snapElements = []),
            n(
              i.snap.constructor !== String
                ? i.snap.items || ":data(ui-draggable)"
                : i.snap
            ).each(function () {
              var i = n(this),
                r = i.offset();
              this !== t.element[0] &&
                t.snapElements.push({
                  item: this,
                  width: i.outerWidth(),
                  height: i.outerHeight(),
                  top: r.top,
                  left: r.left,
                });
            });
        },
        drag: function (t, i) {
          for (
            var o,
              h,
              l,
              s,
              c,
              v,
              e,
              a,
              d,
              r = n(this).data("ui-draggable"),
              k = r.options,
              f = k.snapTolerance,
              p = i.offset.left,
              b = p + r.helperProportions.width,
              y = i.offset.top,
              w = y + r.helperProportions.height,
              u = r.snapElements.length - 1;
            u >= 0;
            u--
          )
            (c = r.snapElements[u].left),
              (v = c + r.snapElements[u].width),
              (e = r.snapElements[u].top),
              (a = e + r.snapElements[u].height),
              c - f > b ||
              p > v + f ||
              e - f > w ||
              y > a + f ||
              !n.contains(
                r.snapElements[u].item.ownerDocument,
                r.snapElements[u].item
              )
                ? (r.snapElements[u].snapping &&
                    r.options.snap.release &&
                    r.options.snap.release.call(
                      r.element,
                      t,
                      n.extend(r._uiHash(), {
                        snapItem: r.snapElements[u].item,
                      })
                    ),
                  (r.snapElements[u].snapping = !1))
                : ("inner" !== k.snapMode &&
                    ((o = f >= Math.abs(e - w)),
                    (h = f >= Math.abs(a - y)),
                    (l = f >= Math.abs(c - b)),
                    (s = f >= Math.abs(v - p)),
                    o &&
                      (i.position.top =
                        r._convertPositionTo("relative", {
                          top: e - r.helperProportions.height,
                          left: 0,
                        }).top - r.margins.top),
                    h &&
                      (i.position.top =
                        r._convertPositionTo("relative", {
                          top: a,
                          left: 0,
                        }).top - r.margins.top),
                    l &&
                      (i.position.left =
                        r._convertPositionTo("relative", {
                          top: 0,
                          left: c - r.helperProportions.width,
                        }).left - r.margins.left),
                    s &&
                      (i.position.left =
                        r._convertPositionTo("relative", {
                          top: 0,
                          left: v,
                        }).left - r.margins.left)),
                  (d = o || h || l || s),
                  "outer" !== k.snapMode &&
                    ((o = f >= Math.abs(e - y)),
                    (h = f >= Math.abs(a - w)),
                    (l = f >= Math.abs(c - p)),
                    (s = f >= Math.abs(v - b)),
                    o &&
                      (i.position.top =
                        r._convertPositionTo("relative", {
                          top: e,
                          left: 0,
                        }).top - r.margins.top),
                    h &&
                      (i.position.top =
                        r._convertPositionTo("relative", {
                          top: a - r.helperProportions.height,
                          left: 0,
                        }).top - r.margins.top),
                    l &&
                      (i.position.left =
                        r._convertPositionTo("relative", {
                          top: 0,
                          left: c,
                        }).left - r.margins.left),
                    s &&
                      (i.position.left =
                        r._convertPositionTo("relative", {
                          top: 0,
                          left: v - r.helperProportions.width,
                        }).left - r.margins.left)),
                  !r.snapElements[u].snapping &&
                    (o || h || l || s || d) &&
                    r.options.snap.snap &&
                    r.options.snap.snap.call(
                      r.element,
                      t,
                      n.extend(r._uiHash(), {
                        snapItem: r.snapElements[u].item,
                      })
                    ),
                  (r.snapElements[u].snapping = o || h || l || s || d));
        },
      }),
      n.ui.plugin.add("draggable", "stack", {
        start: function () {
          var i,
            r = this.data("ui-draggable").options,
            t = n.makeArray(n(r.stack)).sort(function (t, i) {
              return (
                (parseInt(n(t).css("zIndex"), 10) || 0) -
                (parseInt(n(i).css("zIndex"), 10) || 0)
              );
            });
          t.length &&
            ((i = parseInt(n(t[0]).css("zIndex"), 10) || 0),
            n(t).each(function (t) {
              n(this).css("zIndex", i + t);
            }),
            this.css("zIndex", i + t.length));
        },
      }),
      n.ui.plugin.add("draggable", "zIndex", {
        start: function (t, i) {
          var r = n(i.helper),
            u = n(this).data("ui-draggable").options;
          r.css("zIndex") && (u._zIndex = r.css("zIndex")),
            r.css("zIndex", u.zIndex);
        },
        stop: function (t, i) {
          var r = n(this).data("ui-draggable").options;
          r._zIndex && n(i.helper).css("zIndex", r._zIndex);
        },
      });
  })(jQuery),
  (function (n) {
    function t(n, t, i) {
      return n > t && t + i > n;
    }
    n.widget("ui.droppable", {
      version: "1.10.3",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        activeClass: !1,
        addClasses: !0,
        greedy: !1,
        hoverClass: !1,
        scope: "default",
        tolerance: "intersect",
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null,
      },
      _create: function () {
        var t = this.options,
          i = t.accept;
        (this.isover = !1),
          (this.isout = !0),
          (this.accept = n.isFunction(i)
            ? i
            : function (n) {
                return n.is(i);
              }),
          (this.proportions = {
            width: this.element[0].offsetWidth,
            height: this.element[0].offsetHeight,
          }),
          (n.ui.ddmanager.droppables[t.scope] =
            n.ui.ddmanager.droppables[t.scope] || []),
          n.ui.ddmanager.droppables[t.scope].push(this),
          t.addClasses && this.element.addClass("ui-droppable");
      },
      _destroy: function () {
        for (
          var t = 0, i = n.ui.ddmanager.droppables[this.options.scope];
          i.length > t;
          t++
        )
          i[t] === this && i.splice(t, 1);
        this.element.removeClass("ui-droppable ui-droppable-disabled");
      },
      _setOption: function (t, i) {
        "accept" === t &&
          (this.accept = n.isFunction(i)
            ? i
            : function (n) {
                return n.is(i);
              }),
          n.Widget.prototype._setOption.apply(this, arguments);
      },
      _activate: function (t) {
        var i = n.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.addClass(this.options.activeClass),
          i && this._trigger("activate", t, this.ui(i));
      },
      _deactivate: function (t) {
        var i = n.ui.ddmanager.current;
        this.options.activeClass &&
          this.element.removeClass(this.options.activeClass),
          i && this._trigger("deactivate", t, this.ui(i));
      },
      _over: function (t) {
        var i = n.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass),
          this._trigger("over", t, this.ui(i)));
      },
      _out: function (t) {
        var i = n.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger("out", t, this.ui(i)));
      },
      _drop: function (t, i) {
        var r = i || n.ui.ddmanager.current,
          u = !1;
        return r && (r.currentItem || r.element)[0] !== this.element[0]
          ? (this.element
              .find(":data(ui-droppable)")
              .not(".ui-draggable-dragging")
              .each(function () {
                var t = n.data(this, "ui-droppable");
                return t.options.greedy &&
                  !t.options.disabled &&
                  t.options.scope === r.options.scope &&
                  t.accept.call(t.element[0], r.currentItem || r.element) &&
                  n.ui.intersect(
                    r,
                    n.extend(t, {
                      offset: t.element.offset(),
                    }),
                    t.options.tolerance
                  )
                  ? ((u = !0), !1)
                  : undefined;
              }),
            u
              ? !1
              : this.accept.call(this.element[0], r.currentItem || r.element)
              ? (this.options.activeClass &&
                  this.element.removeClass(this.options.activeClass),
                this.options.hoverClass &&
                  this.element.removeClass(this.options.hoverClass),
                this._trigger("drop", t, this.ui(r)),
                this.element)
              : !1)
          : !1;
      },
      ui: function (n) {
        return {
          draggable: n.currentItem || n.element,
          helper: n.helper,
          position: n.position,
          offset: n.positionAbs,
        };
      },
    }),
      (n.ui.intersect = function (n, i, r) {
        if (!i.offset) return !1;
        var a,
          v,
          o = (n.positionAbs || n.position.absolute).left,
          c = o + n.helperProportions.width,
          e = (n.positionAbs || n.position.absolute).top,
          l = e + n.helperProportions.height,
          u = i.offset.left,
          h = u + i.proportions.width,
          f = i.offset.top,
          s = f + i.proportions.height;
        switch (r) {
          case "fit":
            return o >= u && h >= c && e >= f && s >= l;
          case "intersect":
            return (
              o + n.helperProportions.width / 2 > u &&
              h > c - n.helperProportions.width / 2 &&
              e + n.helperProportions.height / 2 > f &&
              s > l - n.helperProportions.height / 2
            );
          case "pointer":
            return (
              (a =
                (n.positionAbs || n.position.absolute).left +
                (n.clickOffset || n.offset.click).left),
              (v =
                (n.positionAbs || n.position.absolute).top +
                (n.clickOffset || n.offset.click).top),
              t(v, f, i.proportions.height) && t(a, u, i.proportions.width)
            );
          case "touch":
            return (
              ((e >= f && s >= e) || (l >= f && s >= l) || (f > e && l > s)) &&
              ((o >= u && h >= o) || (c >= u && h >= c) || (u > o && c > h))
            );
          default:
            return !1;
        }
      }),
      (n.ui.ddmanager = {
        current: null,
        droppables: {
          default: [],
        },
        prepareOffsets: function (t, i) {
          var r,
            f,
            u = n.ui.ddmanager.droppables[t.options.scope] || [],
            o = i ? i.type : null,
            e = (t.currentItem || t.element)
              .find(":data(ui-droppable)")
              .addBack();
          n: for (r = 0; u.length > r; r++)
            if (
              !(
                u[r].options.disabled ||
                (t &&
                  !u[r].accept.call(
                    u[r].element[0],
                    t.currentItem || t.element
                  ))
              )
            ) {
              for (f = 0; e.length > f; f++)
                if (e[f] === u[r].element[0]) {
                  u[r].proportions.height = 0;
                  continue n;
                }
              (u[r].visible = "none" !== u[r].element.css("display")),
                u[r].visible &&
                  ("mousedown" === o && u[r]._activate.call(u[r], i),
                  (u[r].offset = u[r].element.offset()),
                  (u[r].proportions = {
                    width: u[r].element[0].offsetWidth,
                    height: u[r].element[0].offsetHeight,
                  }));
            }
        },
        drop: function (t, i) {
          var r = !1;
          return (
            n.each(
              (n.ui.ddmanager.droppables[t.options.scope] || []).slice(),
              function () {
                this.options &&
                  (!this.options.disabled &&
                    this.visible &&
                    n.ui.intersect(t, this, this.options.tolerance) &&
                    (r = this._drop.call(this, i) || r),
                  !this.options.disabled &&
                    this.visible &&
                    this.accept.call(
                      this.element[0],
                      t.currentItem || t.element
                    ) &&
                    ((this.isout = !0),
                    (this.isover = !1),
                    this._deactivate.call(this, i)));
              }
            ),
            r
          );
        },
        dragStart: function (t, i) {
          t.element.parentsUntil("body").bind("scroll.droppable", function () {
            t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i);
          });
        },
        drag: function (t, i) {
          t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i),
            n.each(
              n.ui.ddmanager.droppables[t.options.scope] || [],
              function () {
                if (
                  !this.options.disabled &&
                  !this.greedyChild &&
                  this.visible
                ) {
                  var r,
                    e,
                    f,
                    o = n.ui.intersect(t, this, this.options.tolerance),
                    u =
                      !o && this.isover
                        ? "isout"
                        : o && !this.isover
                        ? "isover"
                        : null;
                  u &&
                    (this.options.greedy &&
                      ((e = this.options.scope),
                      (f = this.element
                        .parents(":data(ui-droppable)")
                        .filter(function () {
                          return (
                            n.data(this, "ui-droppable").options.scope === e
                          );
                        })),
                      f.length &&
                        ((r = n.data(f[0], "ui-droppable")),
                        (r.greedyChild = "isover" === u))),
                    r &&
                      "isover" === u &&
                      ((r.isover = !1), (r.isout = !0), r._out.call(r, i)),
                    (this[u] = !0),
                    (this["isout" === u ? "isover" : "isout"] = !1),
                    this["isover" === u ? "_over" : "_out"].call(this, i),
                    r &&
                      "isout" === u &&
                      ((r.isout = !1), (r.isover = !0), r._over.call(r, i)));
                }
              }
            );
        },
        dragStop: function (t, i) {
          t.element.parentsUntil("body").unbind("scroll.droppable"),
            t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i);
        },
      });
  })(jQuery),
  (function (n) {
    function i(n) {
      return parseInt(n, 10) || 0;
    }
    function t(n) {
      return !isNaN(parseInt(n, 10));
    }
    n.widget("ui.resizable", n.ui.mouse, {
      version: "1.10.3",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null,
      },
      _create: function () {
        var e,
          f,
          u,
          i,
          o,
          r = this,
          t = this.options;
        if (
          (this.element.addClass("ui-resizable"),
          n.extend(this, {
            _aspectRatio: !!t.aspectRatio,
            aspectRatio: t.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              t.helper || t.ghost || t.animate
                ? t.helper || "ui-resizable-helper"
                : null,
          }),
          this.element[0].nodeName.match(
            /canvas|textarea|input|select|button|img/i
          ) &&
            (this.element.wrap(
              n("<div class='ui-wrapper' style='overflow: hidden;'></div>").css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("ui-resizable", this.element.data("ui-resizable"))),
            (this.elementIsWrapper = !0),
            this.element.css({
              marginLeft: this.originalElement.css("marginLeft"),
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom"),
            }),
            this.originalElement.css({
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
            }),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block",
              })
            ),
            this.originalElement.css({
              margin: this.originalElement.css("margin"),
            }),
            this._proportionallyResize()),
          (this.handles =
            t.handles ||
            (n(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
              : "e,s,se")),
          this.handles.constructor === String)
        )
          for (
            "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              e = this.handles.split(","),
              this.handles = {},
              f = 0;
            e.length > f;
            f++
          )
            (u = n.trim(e[f])),
              (o = "ui-resizable-" + u),
              (i = n("<div class='ui-resizable-handle " + o + "'></div>")),
              i.css({
                zIndex: t.zIndex,
              }),
              "se" === u && i.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
              (this.handles[u] = ".ui-resizable-" + u),
              this.element.append(i);
        (this._renderAxis = function (t) {
          var i, r, f, u;
          t = t || this.element;
          for (i in this.handles)
            this.handles[i].constructor === String &&
              (this.handles[i] = n(this.handles[i], this.element).show()),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /textarea|input|select|button/i
                ) &&
                ((r = n(this.handles[i], this.element)),
                (u = /sw|ne|nw|se|n|s/.test(i)
                  ? r.outerHeight()
                  : r.outerWidth()),
                (f = [
                  "padding",
                  /ne|nw|n/.test(i)
                    ? "Top"
                    : /se|sw|s/.test(i)
                    ? "Bottom"
                    : /^e$/.test(i)
                    ? "Right"
                    : "Left",
                ].join("")),
                t.css(f, u),
                this._proportionallyResize()),
              n(this.handles[i]).length;
        }),
          this._renderAxis(this.element),
          (this._handles = n(
            ".ui-resizable-handle",
            this.element
          ).disableSelection()),
          this._handles.mouseover(function () {
            r.resizing ||
              (this.className &&
                (i = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                )),
              (r.axis = i && i[1] ? i[1] : "se"));
          }),
          t.autoHide &&
            (this._handles.hide(),
            n(this.element)
              .addClass("ui-resizable-autohide")
              .mouseenter(function () {
                t.disabled ||
                  (n(this).removeClass("ui-resizable-autohide"),
                  r._handles.show());
              })
              .mouseleave(function () {
                t.disabled ||
                  r.resizing ||
                  (n(this).addClass("ui-resizable-autohide"),
                  r._handles.hide());
              })),
          this._mouseInit();
      },
      _destroy: function () {
        this._mouseDestroy();
        var t,
          i = function (t) {
            n(t)
              .removeClass(
                "ui-resizable ui-resizable-disabled ui-resizable-resizing"
              )
              .removeData("resizable")
              .removeData("ui-resizable")
              .unbind(".resizable")
              .find(".ui-resizable-handle")
              .remove();
          };
        return (
          this.elementIsWrapper &&
            (i(this.element),
            (t = this.element),
            this.originalElement
              .css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left"),
              })
              .insertAfter(t),
            t.remove()),
          this.originalElement.css("resize", this.originalResizeStyle),
          i(this.originalElement),
          this
        );
      },
      _mouseCapture: function (t) {
        var u,
          i,
          r = !1;
        for (u in this.handles)
          (i = n(this.handles[u])[0]),
            (i === t.target || n.contains(i, t.target)) && (r = !0);
        return !this.options.disabled && r;
      },
      _mouseStart: function (t) {
        var e,
          f,
          o,
          u = this.options,
          s = this.element.position(),
          r = this.element;
        return (
          (this.resizing = !0),
          /absolute/.test(r.css("position"))
            ? r.css({
                position: "absolute",
                top: r.css("top"),
                left: r.css("left"),
              })
            : r.is(".ui-draggable") &&
              r.css({
                position: "absolute",
                top: s.top,
                left: s.left,
              }),
          this._renderProxy(),
          (e = i(this.helper.css("left"))),
          (f = i(this.helper.css("top"))),
          u.containment &&
            ((e += n(u.containment).scrollLeft() || 0),
            (f += n(u.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = {
            left: e,
            top: f,
          }),
          (this.size = this._helper
            ? {
                width: r.outerWidth(),
                height: r.outerHeight(),
              }
            : {
                width: r.width(),
                height: r.height(),
              }),
          (this.originalSize = this._helper
            ? {
                width: r.outerWidth(),
                height: r.outerHeight(),
              }
            : {
                width: r.width(),
                height: r.height(),
              }),
          (this.originalPosition = {
            left: e,
            top: f,
          }),
          (this.sizeDiff = {
            width: r.outerWidth() - r.width(),
            height: r.outerHeight() - r.height(),
          }),
          (this.originalMousePosition = {
            left: t.pageX,
            top: t.pageY,
          }),
          (this.aspectRatio =
            "number" == typeof u.aspectRatio
              ? u.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1),
          (o = n(".ui-resizable-" + this.axis).css("cursor")),
          n("body").css("cursor", "auto" === o ? this.axis + "-resize" : o),
          r.addClass("ui-resizable-resizing"),
          this._propagate("start", t),
          !0
        );
      },
      _mouseDrag: function (t) {
        var r,
          c = this.helper,
          i = {},
          f = this.originalMousePosition,
          l = this.axis,
          s = this.position.top,
          v = this.position.left,
          a = this.size.width,
          o = this.size.height,
          e = t.pageX - f.left || 0,
          h = t.pageY - f.top || 0,
          u = this._change[l];
        return u
          ? ((r = u.apply(this, [t, e, h])),
            this._updateVirtualBoundaries(t.shiftKey),
            (this._aspectRatio || t.shiftKey) && (r = this._updateRatio(r, t)),
            (r = this._respectSize(r, t)),
            this._updateCache(r),
            this._propagate("resize", t),
            this.position.top !== s && (i.top = this.position.top + "px"),
            this.position.left !== v && (i.left = this.position.left + "px"),
            this.size.width !== a && (i.width = this.size.width + "px"),
            this.size.height !== o && (i.height = this.size.height + "px"),
            c.css(i),
            !this._helper &&
              this._proportionallyResizeElements.length &&
              this._proportionallyResize(),
            n.isEmptyObject(i) || this._trigger("resize", t, this.ui()),
            !1)
          : !1;
      },
      _mouseStop: function (t) {
        this.resizing = !1;
        var r,
          u,
          s,
          o,
          h,
          c,
          f,
          e = this.options,
          i = this;
        return (
          this._helper &&
            ((r = this._proportionallyResizeElements),
            (u = r.length && /textarea/i.test(r[0].nodeName)),
            (s = u && n.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height),
            (o = u ? 0 : i.sizeDiff.width),
            (h = {
              width: i.helper.width() - o,
              height: i.helper.height() - s,
            }),
            (c =
              parseInt(i.element.css("left"), 10) +
                (i.position.left - i.originalPosition.left) || null),
            (f =
              parseInt(i.element.css("top"), 10) +
                (i.position.top - i.originalPosition.top) || null),
            e.animate ||
              this.element.css(
                n.extend(h, {
                  top: f,
                  left: c,
                })
              ),
            i.helper.height(i.size.height),
            i.helper.width(i.size.width),
            this._helper && !e.animate && this._proportionallyResize()),
          n("body").css("cursor", "auto"),
          this.element.removeClass("ui-resizable-resizing"),
          this._propagate("stop", t),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updateVirtualBoundaries: function (n) {
        var u,
          e,
          f,
          o,
          i,
          r = this.options;
        (i = {
          minWidth: t(r.minWidth) ? r.minWidth : 0,
          maxWidth: t(r.maxWidth) ? r.maxWidth : 1 / 0,
          minHeight: t(r.minHeight) ? r.minHeight : 0,
          maxHeight: t(r.maxHeight) ? r.maxHeight : 1 / 0,
        }),
          (this._aspectRatio || n) &&
            ((u = i.minHeight * this.aspectRatio),
            (f = i.minWidth / this.aspectRatio),
            (e = i.maxHeight * this.aspectRatio),
            (o = i.maxWidth / this.aspectRatio),
            u > i.minWidth && (i.minWidth = u),
            f > i.minHeight && (i.minHeight = f),
            i.maxWidth > e && (i.maxWidth = e),
            i.maxHeight > o && (i.maxHeight = o)),
          (this._vBoundaries = i);
      },
      _updateCache: function (n) {
        (this.offset = this.helper.offset()),
          t(n.left) && (this.position.left = n.left),
          t(n.top) && (this.position.top = n.top),
          t(n.height) && (this.size.height = n.height),
          t(n.width) && (this.size.width = n.width);
      },
      _updateRatio: function (n) {
        var r = this.position,
          i = this.size,
          u = this.axis;
        return (
          t(n.height)
            ? (n.width = n.height * this.aspectRatio)
            : t(n.width) && (n.height = n.width / this.aspectRatio),
          "sw" === u &&
            ((n.left = r.left + (i.width - n.width)), (n.top = null)),
          "nw" === u &&
            ((n.top = r.top + (i.height - n.height)),
            (n.left = r.left + (i.width - n.width))),
          n
        );
      },
      _respectSize: function (n) {
        var i = this._vBoundaries,
          h = this.axis,
          s = t(n.width) && i.maxWidth && i.maxWidth < n.width,
          l = t(n.height) && i.maxHeight && i.maxHeight < n.height,
          c = t(n.width) && i.minWidth && i.minWidth > n.width,
          o = t(n.height) && i.minHeight && i.minHeight > n.height,
          u = this.originalPosition.left + this.originalSize.width,
          r = this.position.top + this.size.height,
          e = /sw|nw|w/.test(h),
          f = /nw|ne|n/.test(h);
        return (
          c && (n.width = i.minWidth),
          o && (n.height = i.minHeight),
          s && (n.width = i.maxWidth),
          l && (n.height = i.maxHeight),
          c && e && (n.left = u - i.minWidth),
          s && e && (n.left = u - i.maxWidth),
          o && f && (n.top = r - i.minHeight),
          l && f && (n.top = r - i.maxHeight),
          n.width || n.height || n.left || !n.top
            ? n.width || n.height || n.top || !n.left || (n.left = null)
            : (n.top = null),
          n
        );
      },
      _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length)
          for (
            var t, r, f, n, u = this.helper || this.element, i = 0;
            this._proportionallyResizeElements.length > i;
            i++
          ) {
            if (((n = this._proportionallyResizeElements[i]), !this.borderDif))
              for (
                this.borderDif = [],
                  r = [
                    n.css("borderTopWidth"),
                    n.css("borderRightWidth"),
                    n.css("borderBottomWidth"),
                    n.css("borderLeftWidth"),
                  ],
                  f = [
                    n.css("paddingTop"),
                    n.css("paddingRight"),
                    n.css("paddingBottom"),
                    n.css("paddingLeft"),
                  ],
                  t = 0;
                r.length > t;
                t++
              )
                this.borderDif[t] =
                  (parseInt(r[t], 10) || 0) + (parseInt(f[t], 10) || 0);
            n.css({
              height: u.height() - this.borderDif[0] - this.borderDif[2] || 0,
              width: u.width() - this.borderDif[1] - this.borderDif[3] || 0,
            });
          }
      },
      _renderProxy: function () {
        var i = this.element,
          t = this.options;
        (this.elementOffset = i.offset()),
          this._helper
            ? ((this.helper =
                this.helper || n("<div style='overflow:hidden;'></div>")),
              this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++t.zIndex,
              }),
              this.helper.appendTo("body").disableSelection())
            : (this.helper = this.element);
      },
      _change: {
        e: function (n, t) {
          return {
            width: this.originalSize.width + t,
          };
        },
        w: function (n, t) {
          var r = this.originalSize,
            i = this.originalPosition;
          return {
            left: i.left + t,
            width: r.width - t,
          };
        },
        n: function (n, t, i) {
          var u = this.originalSize,
            r = this.originalPosition;
          return {
            top: r.top + i,
            height: u.height - i,
          };
        },
        s: function (n, t, i) {
          return {
            height: this.originalSize.height + i,
          };
        },
        se: function (t, i, r) {
          return n.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [t, i, r])
          );
        },
        sw: function (t, i, r) {
          return n.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [t, i, r])
          );
        },
        ne: function (t, i, r) {
          return n.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [t, i, r])
          );
        },
        nw: function (t, i, r) {
          return n.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [t, i, r])
          );
        },
      },
      _propagate: function (t, i) {
        n.ui.plugin.call(this, t, [i, this.ui()]),
          "resize" !== t && this._trigger(t, i, this.ui());
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition,
        };
      },
    }),
      n.ui.plugin.add("resizable", "animate", {
        stop: function (t) {
          var i = n(this).data("ui-resizable"),
            o = i.options,
            r = i._proportionallyResizeElements,
            e = r.length && /textarea/i.test(r[0].nodeName),
            s = e && n.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
            h = e ? 0 : i.sizeDiff.width,
            c = {
              width: i.size.width - h,
              height: i.size.height - s,
            },
            u =
              parseInt(i.element.css("left"), 10) +
                (i.position.left - i.originalPosition.left) || null,
            f =
              parseInt(i.element.css("top"), 10) +
                (i.position.top - i.originalPosition.top) || null;
          i.element.animate(
            n.extend(
              c,
              f && u
                ? {
                    top: f,
                    left: u,
                  }
                : {}
            ),
            {
              duration: o.animateDuration,
              easing: o.animateEasing,
              step: function () {
                var u = {
                  width: parseInt(i.element.css("width"), 10),
                  height: parseInt(i.element.css("height"), 10),
                  top: parseInt(i.element.css("top"), 10),
                  left: parseInt(i.element.css("left"), 10),
                };
                r &&
                  r.length &&
                  n(r[0]).css({
                    width: u.width,
                    height: u.height,
                  }),
                  i._updateCache(u),
                  i._propagate("resize", t);
              },
            }
          );
        },
      }),
      n.ui.plugin.add("resizable", "containment", {
        start: function () {
          var u,
            e,
            o,
            l,
            h,
            s,
            c,
            t = n(this).data("ui-resizable"),
            a = t.options,
            v = t.element,
            f = a.containment,
            r =
              f instanceof n
                ? f.get(0)
                : /parent/.test(f)
                ? v.parent().get(0)
                : f;
          r &&
            ((t.containerElement = n(r)),
            /document/.test(f) || f === document
              ? ((t.containerOffset = {
                  left: 0,
                  top: 0,
                }),
                (t.containerPosition = {
                  left: 0,
                  top: 0,
                }),
                (t.parentData = {
                  element: n(document),
                  left: 0,
                  top: 0,
                  width: n(document).width(),
                  height:
                    n(document).height() ||
                    document.body.parentNode.scrollHeight,
                }))
              : ((u = n(r)),
                (e = []),
                n(["Top", "Right", "Left", "Bottom"]).each(function (n, t) {
                  e[n] = i(u.css("padding" + t));
                }),
                (t.containerOffset = u.offset()),
                (t.containerPosition = u.position()),
                (t.containerSize = {
                  height: u.innerHeight() - e[3],
                  width: u.innerWidth() - e[1],
                }),
                (o = t.containerOffset),
                (l = t.containerSize.height),
                (h = t.containerSize.width),
                (s = n.ui.hasScroll(r, "left") ? r.scrollWidth : h),
                (c = n.ui.hasScroll(r) ? r.scrollHeight : l),
                (t.parentData = {
                  element: r,
                  left: o.left,
                  top: o.top,
                  width: s,
                  height: c,
                })));
        },
        resize: function (t) {
          var f,
            o,
            h,
            c,
            i = n(this).data("ui-resizable"),
            a = i.options,
            r = i.containerOffset,
            s = i.position,
            e = i._aspectRatio || t.shiftKey,
            u = {
              top: 0,
              left: 0,
            },
            l = i.containerElement;
          l[0] !== document && /static/.test(l.css("position")) && (u = r),
            s.left < (i._helper ? r.left : 0) &&
              ((i.size.width =
                i.size.width +
                (i._helper
                  ? i.position.left - r.left
                  : i.position.left - u.left)),
              e && (i.size.height = i.size.width / i.aspectRatio),
              (i.position.left = a.helper ? r.left : 0)),
            s.top < (i._helper ? r.top : 0) &&
              ((i.size.height =
                i.size.height +
                (i._helper ? i.position.top - r.top : i.position.top)),
              e && (i.size.width = i.size.height * i.aspectRatio),
              (i.position.top = i._helper ? r.top : 0)),
            (i.offset.left = i.parentData.left + i.position.left),
            (i.offset.top = i.parentData.top + i.position.top),
            (f = Math.abs(
              (i._helper ? i.offset.left - u.left : i.offset.left - u.left) +
                i.sizeDiff.width
            )),
            (o = Math.abs(
              (i._helper ? i.offset.top - u.top : i.offset.top - r.top) +
                i.sizeDiff.height
            )),
            (h = i.containerElement.get(0) === i.element.parent().get(0)),
            (c = /relative|absolute/.test(i.containerElement.css("position"))),
            h && c && (f -= i.parentData.left),
            f + i.size.width >= i.parentData.width &&
              ((i.size.width = i.parentData.width - f),
              e && (i.size.height = i.size.width / i.aspectRatio)),
            o + i.size.height >= i.parentData.height &&
              ((i.size.height = i.parentData.height - o),
              e && (i.size.width = i.size.height * i.aspectRatio));
        },
        stop: function () {
          var t = n(this).data("ui-resizable"),
            o = t.options,
            e = t.containerOffset,
            h = t.containerPosition,
            s = t.containerElement,
            i = n(t.helper),
            u = i.offset(),
            r = i.outerWidth() - t.sizeDiff.width,
            f = i.outerHeight() - t.sizeDiff.height;
          t._helper &&
            !o.animate &&
            /relative/.test(s.css("position")) &&
            n(this).css({
              left: u.left - h.left - e.left,
              width: r,
              height: f,
            }),
            t._helper &&
              !o.animate &&
              /static/.test(s.css("position")) &&
              n(this).css({
                left: u.left - h.left - e.left,
                width: r,
                height: f,
              });
        },
      }),
      n.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
          var r = n(this).data("ui-resizable"),
            t = r.options,
            i = function (t) {
              n(t).each(function () {
                var t = n(this);
                t.data("ui-resizable-alsoresize", {
                  width: parseInt(t.width(), 10),
                  height: parseInt(t.height(), 10),
                  left: parseInt(t.css("left"), 10),
                  top: parseInt(t.css("top"), 10),
                });
              });
            };
          "object" != typeof t.alsoResize || t.alsoResize.parentNode
            ? i(t.alsoResize)
            : t.alsoResize.length
            ? ((t.alsoResize = t.alsoResize[0]), i(t.alsoResize))
            : n.each(t.alsoResize, function (n) {
                i(n);
              });
        },
        resize: function (t, i) {
          var r = n(this).data("ui-resizable"),
            u = r.options,
            o = r.originalSize,
            e = r.originalPosition,
            s = {
              height: r.size.height - o.height || 0,
              width: r.size.width - o.width || 0,
              top: r.position.top - e.top || 0,
              left: r.position.left - e.left || 0,
            },
            f = function (t, r) {
              n(t).each(function () {
                var u = n(this),
                  e = n(this).data("ui-resizable-alsoresize"),
                  t = {},
                  f =
                    r && r.length
                      ? r
                      : u.parents(i.originalElement[0]).length
                      ? ["width", "height"]
                      : ["width", "height", "top", "left"];
                n.each(f, function (n, i) {
                  var r = (e[i] || 0) + (s[i] || 0);
                  r && r >= 0 && (t[i] = r || null);
                }),
                  u.css(t);
              });
            };
          "object" != typeof u.alsoResize || u.alsoResize.nodeType
            ? f(u.alsoResize)
            : n.each(u.alsoResize, function (n, t) {
                f(n, t);
              });
        },
        stop: function () {
          n(this).removeData("resizable-alsoresize");
        },
      }),
      n.ui.plugin.add("resizable", "ghost", {
        start: function () {
          var t = n(this).data("ui-resizable"),
            r = t.options,
            i = t.size;
          (t.ghost = t.originalElement.clone()),
            t.ghost
              .css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0,
              })
              .addClass("ui-resizable-ghost")
              .addClass("string" == typeof r.ghost ? r.ghost : ""),
            t.ghost.appendTo(t.helper);
        },
        resize: function () {
          var t = n(this).data("ui-resizable");
          t.ghost &&
            t.ghost.css({
              position: "relative",
              height: t.size.height,
              width: t.size.width,
            });
        },
        stop: function () {
          var t = n(this).data("ui-resizable");
          t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
        },
      }),
      n.ui.plugin.add("resizable", "grid", {
        resize: function () {
          var t = n(this).data("ui-resizable"),
            i = t.options,
            v = t.size,
            s = t.originalSize,
            o = t.originalPosition,
            l = t.axis,
            c = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
            f = c[0] || 1,
            e = c[1] || 1,
            a = Math.round((v.width - s.width) / f) * f,
            h = Math.round((v.height - s.height) / e) * e,
            r = s.width + a,
            u = s.height + h,
            w = i.maxWidth && r > i.maxWidth,
            b = i.maxHeight && u > i.maxHeight,
            y = i.minWidth && i.minWidth > r,
            p = i.minHeight && i.minHeight > u;
          (i.grid = c),
            y && (r += f),
            p && (u += e),
            w && (r -= f),
            b && (u -= e),
            /^(se|s|e)$/.test(l)
              ? ((t.size.width = r), (t.size.height = u))
              : /^(ne)$/.test(l)
              ? ((t.size.width = r),
                (t.size.height = u),
                (t.position.top = o.top - h))
              : /^(sw)$/.test(l)
              ? ((t.size.width = r),
                (t.size.height = u),
                (t.position.left = o.left - a))
              : ((t.size.width = r),
                (t.size.height = u),
                (t.position.top = o.top - h),
                (t.position.left = o.left - a));
        },
      });
  })(jQuery),
  (function (n) {
    n.widget("ui.selectable", n.ui.mouse, {
      version: "1.10.3",
      options: {
        appendTo: "body",
        autoRefresh: !0,
        distance: 0,
        filter: "*",
        tolerance: "touch",
        selected: null,
        selecting: null,
        start: null,
        stop: null,
        unselected: null,
        unselecting: null,
      },
      _create: function () {
        var t,
          i = this;
        this.element.addClass("ui-selectable"),
          (this.dragged = !1),
          (this.refresh = function () {
            (t = n(i.options.filter, i.element[0])),
              t.addClass("ui-selectee"),
              t.each(function () {
                var t = n(this),
                  i = t.offset();
                n.data(this, "selectable-item", {
                  element: this,
                  $element: t,
                  left: i.left,
                  top: i.top,
                  right: i.left + t.outerWidth(),
                  bottom: i.top + t.outerHeight(),
                  startselected: !1,
                  selected: t.hasClass("ui-selected"),
                  selecting: t.hasClass("ui-selecting"),
                  unselecting: t.hasClass("ui-unselecting"),
                });
              });
          }),
          this.refresh(),
          (this.selectees = t.addClass("ui-selectee")),
          this._mouseInit(),
          (this.helper = n("<div class='ui-selectable-helper'></div>"));
      },
      _destroy: function () {
        this.selectees.removeClass("ui-selectee").removeData("selectable-item"),
          this.element.removeClass("ui-selectable ui-selectable-disabled"),
          this._mouseDestroy();
      },
      _mouseStart: function (t) {
        var r = this,
          i = this.options;
        (this.opos = [t.pageX, t.pageY]),
          this.options.disabled ||
            ((this.selectees = n(i.filter, this.element[0])),
            this._trigger("start", t),
            n(i.appendTo).append(this.helper),
            this.helper.css({
              left: t.pageX,
              top: t.pageY,
              width: 0,
              height: 0,
            }),
            i.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function () {
              var i = n.data(this, "selectable-item");
              (i.startselected = !0),
                t.metaKey ||
                  t.ctrlKey ||
                  (i.$element.removeClass("ui-selected"),
                  (i.selected = !1),
                  i.$element.addClass("ui-unselecting"),
                  (i.unselecting = !0),
                  r._trigger("unselecting", t, {
                    unselecting: i.element,
                  }));
            }),
            n(t.target)
              .parents()
              .addBack()
              .each(function () {
                var u,
                  i = n.data(this, "selectable-item");
                return i
                  ? ((u =
                      (!t.metaKey && !t.ctrlKey) ||
                      !i.$element.hasClass("ui-selected")),
                    i.$element
                      .removeClass(u ? "ui-unselecting" : "ui-selected")
                      .addClass(u ? "ui-selecting" : "ui-unselecting"),
                    (i.unselecting = !u),
                    (i.selecting = u),
                    (i.selected = u),
                    u
                      ? r._trigger("selecting", t, {
                          selecting: i.element,
                        })
                      : r._trigger("unselecting", t, {
                          unselecting: i.element,
                        }),
                    !1)
                  : undefined;
              }));
      },
      _mouseDrag: function (t) {
        if (((this.dragged = !0), !this.options.disabled)) {
          var e,
            o = this,
            s = this.options,
            r = this.opos[0],
            i = this.opos[1],
            u = t.pageX,
            f = t.pageY;
          return (
            r > u && ((e = u), (u = r), (r = e)),
            i > f && ((e = f), (f = i), (i = e)),
            this.helper.css({
              left: r,
              top: i,
              width: u - r,
              height: f - i,
            }),
            this.selectees.each(function () {
              var e = n.data(this, "selectable-item"),
                h = !1;
              e &&
                e.element !== o.element[0] &&
                ("touch" === s.tolerance
                  ? (h = !(
                      e.left > u ||
                      r > e.right ||
                      e.top > f ||
                      i > e.bottom
                    ))
                  : "fit" === s.tolerance &&
                    (h =
                      e.left > r && u > e.right && e.top > i && f > e.bottom),
                h
                  ? (e.selected &&
                      (e.$element.removeClass("ui-selected"),
                      (e.selected = !1)),
                    e.unselecting &&
                      (e.$element.removeClass("ui-unselecting"),
                      (e.unselecting = !1)),
                    e.selecting ||
                      (e.$element.addClass("ui-selecting"),
                      (e.selecting = !0),
                      o._trigger("selecting", t, {
                        selecting: e.element,
                      })))
                  : (e.selecting &&
                      ((t.metaKey || t.ctrlKey) && e.startselected
                        ? (e.$element.removeClass("ui-selecting"),
                          (e.selecting = !1),
                          e.$element.addClass("ui-selected"),
                          (e.selected = !0))
                        : (e.$element.removeClass("ui-selecting"),
                          (e.selecting = !1),
                          e.startselected &&
                            (e.$element.addClass("ui-unselecting"),
                            (e.unselecting = !0)),
                          o._trigger("unselecting", t, {
                            unselecting: e.element,
                          }))),
                    e.selected &&
                      (t.metaKey ||
                        t.ctrlKey ||
                        e.startselected ||
                        (e.$element.removeClass("ui-selected"),
                        (e.selected = !1),
                        e.$element.addClass("ui-unselecting"),
                        (e.unselecting = !0),
                        o._trigger("unselecting", t, {
                          unselecting: e.element,
                        })))));
            }),
            !1
          );
        }
      },
      _mouseStop: function (t) {
        var i = this;
        return (
          (this.dragged = !1),
          n(".ui-unselecting", this.element[0]).each(function () {
            var r = n.data(this, "selectable-item");
            r.$element.removeClass("ui-unselecting"),
              (r.unselecting = !1),
              (r.startselected = !1),
              i._trigger("unselected", t, {
                unselected: r.element,
              });
          }),
          n(".ui-selecting", this.element[0]).each(function () {
            var r = n.data(this, "selectable-item");
            r.$element.removeClass("ui-selecting").addClass("ui-selected"),
              (r.selecting = !1),
              (r.selected = !0),
              (r.startselected = !0),
              i._trigger("selected", t, {
                selected: r.element,
              });
          }),
          this._trigger("stop", t),
          this.helper.remove(),
          !1
        );
      },
    });
  })(jQuery),
  (function (n) {
    function t(n, t, i) {
      return n > t && t + i > n;
    }
    function i(n) {
      return (
        /left|right/.test(n.css("float")) ||
        /inline|table-cell/.test(n.css("display"))
      );
    }
    n.widget("ui.sortable", n.ui.mouse, {
      version: "1.10.3",
      widgetEventPrefix: "sort",
      ready: !1,
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1000,
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null,
      },
      _create: function () {
        var n = this.options;
        (this.containerCache = {}),
          this.element.addClass("ui-sortable"),
          this.refresh(),
          (this.floating = this.items.length
            ? "x" === n.axis || i(this.items[0].item)
            : !1),
          (this.offset = this.element.offset()),
          this._mouseInit(),
          (this.ready = !0);
      },
      _destroy: function () {
        this.element.removeClass("ui-sortable ui-sortable-disabled"),
          this._mouseDestroy();
        for (var n = this.items.length - 1; n >= 0; n--)
          this.items[n].item.removeData(this.widgetName + "-item");
        return this;
      },
      _setOption: function (t, i) {
        "disabled" === t
          ? ((this.options[t] = i),
            this.widget().toggleClass("ui-sortable-disabled", !!i))
          : n.Widget.prototype._setOption.apply(this, arguments);
      },
      _mouseCapture: function (t, i) {
        var r = null,
          f = !1,
          u = this;
        return this.reverting
          ? !1
          : this.options.disabled || "static" === this.options.type
          ? !1
          : (this._refreshItems(t),
            n(t.target)
              .parents()
              .each(function () {
                return n.data(this, u.widgetName + "-item") === u
                  ? ((r = n(this)), !1)
                  : undefined;
              }),
            n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)),
            r
              ? !this.options.handle ||
                i ||
                (n(this.options.handle, r)
                  .find("*")
                  .addBack()
                  .each(function () {
                    this === t.target && (f = !0);
                  }),
                f)
                ? ((this.currentItem = r), this._removeCurrentsFromItems(), !0)
                : !1
              : !1);
      },
      _mouseStart: function (t, i, r) {
        var f,
          e,
          u = this.options;
        if (
          ((this.currentContainer = this),
          this.refreshPositions(),
          (this.helper = this._createHelper(t)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          n.extend(this.offset, {
            click: {
              left: t.pageX - this.offset.left,
              top: t.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          this.helper.css("position", "absolute"),
          (this.cssPosition = this.helper.css("position")),
          (this.originalPosition = this._generatePosition(t)),
          (this.originalPageX = t.pageX),
          (this.originalPageY = t.pageY),
          u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0],
          }),
          this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          u.containment && this._setContainment(),
          u.cursor &&
            "auto" !== u.cursor &&
            ((e = this.document.find("body")),
            (this.storedCursor = e.css("cursor")),
            e.css("cursor", u.cursor),
            (this.storedStylesheet = n(
              "<style>*{ cursor: " + u.cursor + " !important; }</style>"
            ).appendTo(e))),
          u.opacity &&
            (this.helper.css("opacity") &&
              (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", u.opacity)),
          u.zIndex &&
            (this.helper.css("zIndex") &&
              (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", u.zIndex)),
          this.scrollParent[0] !== document &&
            "HTML" !== this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger("start", t, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !r)
        )
          for (f = this.containers.length - 1; f >= 0; f--)
            this.containers[f]._trigger("activate", t, this._uiHash(this));
        return (
          n.ui.ddmanager && (n.ui.ddmanager.current = this),
          n.ui.ddmanager &&
            !u.dropBehaviour &&
            n.ui.ddmanager.prepareOffsets(this, t),
          (this.dragging = !0),
          this.helper.addClass("ui-sortable-helper"),
          this._mouseDrag(t),
          !0
        );
      },
      _mouseDrag: function (t) {
        var o,
          u,
          f,
          e,
          i = this.options,
          r = !1;
        for (
          this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
              (this.scrollParent[0] !== document &&
              "HTML" !== this.scrollParent[0].tagName
                ? (this.overflowOffset.top +
                    this.scrollParent[0].offsetHeight -
                    t.pageY <
                  i.scrollSensitivity
                    ? (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop + i.scrollSpeed)
                    : t.pageY - this.overflowOffset.top < i.scrollSensitivity &&
                      (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop - i.scrollSpeed),
                  this.overflowOffset.left +
                    this.scrollParent[0].offsetWidth -
                    t.pageX <
                  i.scrollSensitivity
                    ? (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft + i.scrollSpeed)
                    : t.pageX - this.overflowOffset.left <
                        i.scrollSensitivity &&
                      (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft - i.scrollSpeed))
                : (t.pageY - n(document).scrollTop() < i.scrollSensitivity
                    ? (r = n(document).scrollTop(
                        n(document).scrollTop() - i.scrollSpeed
                      ))
                    : n(window).height() - (t.pageY - n(document).scrollTop()) <
                        i.scrollSensitivity &&
                      (r = n(document).scrollTop(
                        n(document).scrollTop() + i.scrollSpeed
                      )),
                  t.pageX - n(document).scrollLeft() < i.scrollSensitivity
                    ? (r = n(document).scrollLeft(
                        n(document).scrollLeft() - i.scrollSpeed
                      ))
                    : n(window).width() - (t.pageX - n(document).scrollLeft()) <
                        i.scrollSensitivity &&
                      (r = n(document).scrollLeft(
                        n(document).scrollLeft() + i.scrollSpeed
                      ))),
              r !== !1 &&
                n.ui.ddmanager &&
                !i.dropBehaviour &&
                n.ui.ddmanager.prepareOffsets(this, t)),
            this.positionAbs = this._convertPositionTo("absolute"),
            (this.options.axis && "y" === this.options.axis) ||
              (this.helper[0].style.left = this.position.left + "px"),
            (this.options.axis && "x" === this.options.axis) ||
              (this.helper[0].style.top = this.position.top + "px"),
            o = this.items.length - 1;
          o >= 0;
          o--
        )
          if (
            ((u = this.items[o]),
            (f = u.item[0]),
            (e = this._intersectsWithPointer(u)),
            e &&
              u.instance === this.currentContainer &&
              f !== this.currentItem[0] &&
              this.placeholder[1 === e ? "next" : "prev"]()[0] !== f &&
              !n.contains(this.placeholder[0], f) &&
              ("semi-dynamic" === this.options.type
                ? !n.contains(this.element[0], f)
                : !0))
          ) {
            if (
              ((this.direction = 1 === e ? "down" : "up"),
              "pointer" !== this.options.tolerance &&
                !this._intersectsWithSides(u))
            )
              break;
            this._rearrange(t, u), this._trigger("change", t, this._uiHash());
            break;
          }
        return (
          this._contactContainers(t),
          n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
          this._trigger("sort", t, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function (t, i) {
        if (t) {
          if (
            (n.ui.ddmanager &&
              !this.options.dropBehaviour &&
              n.ui.ddmanager.drop(this, t),
            this.options.revert)
          ) {
            var e = this,
              f = this.placeholder.offset(),
              r = this.options.axis,
              u = {};
            (r && "x" !== r) ||
              (u.left =
                f.left -
                this.offset.parent.left -
                this.margins.left +
                (this.offsetParent[0] === document.body
                  ? 0
                  : this.offsetParent[0].scrollLeft)),
              (r && "y" !== r) ||
                (u.top =
                  f.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === document.body
                    ? 0
                    : this.offsetParent[0].scrollTop)),
              (this.reverting = !0),
              n(this.helper).animate(
                u,
                parseInt(this.options.revert, 10) || 500,
                function () {
                  e._clear(t);
                }
              );
          } else this._clear(t, i);
          return !1;
        }
      },
      cancel: function () {
        if (this.dragging) {
          this._mouseUp({
            target: null,
          }),
            "original" === this.options.helper
              ? this.currentItem
                  .css(this._storedCSS)
                  .removeClass("ui-sortable-helper")
              : this.currentItem.show();
          for (var t = this.containers.length - 1; t >= 0; t--)
            this.containers[t]._trigger("deactivate", null, this._uiHash(this)),
              this.containers[t].containerCache.over &&
                (this.containers[t]._trigger("out", null, this._uiHash(this)),
                (this.containers[t].containerCache.over = 0));
        }
        return (
          this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            n.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null,
            }),
            this.domPosition.prev
              ? n(this.domPosition.prev).after(this.currentItem)
              : n(this.domPosition.parent).prepend(this.currentItem)),
          this
        );
      },
      serialize: function (t) {
        var r = this._getItemsAsjQuery(t && t.connected),
          i = [];
        return (
          (t = t || {}),
          n(r).each(function () {
            var r = (n(t.item || this).attr(t.attribute || "id") || "").match(
              t.expression || /(.+)[\-=_](.+)/
            );
            r &&
              i.push(
                (t.key || r[1] + "[]") +
                  "=" +
                  (t.key && t.expression ? r[1] : r[2])
              );
          }),
          !i.length && t.key && i.push(t.key + "="),
          i.join("&")
        );
      },
      toArray: function (t) {
        var r = this._getItemsAsjQuery(t && t.connected),
          i = [];
        return (
          (t = t || {}),
          r.each(function () {
            i.push(n(t.item || this).attr(t.attribute || "id") || "");
          }),
          i
        );
      },
      _intersectsWith: function (n) {
        var i = this.positionAbs.left,
          v = i + this.helperProportions.width,
          t = this.positionAbs.top,
          a = t + this.helperProportions.height,
          r = n.left,
          s = r + n.width,
          u = n.top,
          e = u + n.height,
          o = this.offset.click.top,
          f = this.offset.click.left,
          l = "x" === this.options.axis || (t + o > u && e > t + o),
          h = "y" === this.options.axis || (i + f > r && s > i + f),
          c = l && h;
        return "pointer" === this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ("pointer" !== this.options.tolerance &&
            this.helperProportions[this.floating ? "width" : "height"] >
              n[this.floating ? "width" : "height"])
          ? c
          : i + this.helperProportions.width / 2 > r &&
              s > v - this.helperProportions.width / 2 &&
              t + this.helperProportions.height / 2 > u &&
              e > a - this.helperProportions.height / 2;
      },
      _intersectsWithPointer: function (n) {
        var f =
            "x" === this.options.axis ||
            t(this.positionAbs.top + this.offset.click.top, n.top, n.height),
          u =
            "y" === this.options.axis ||
            t(this.positionAbs.left + this.offset.click.left, n.left, n.width),
          e = f && u,
          i = this._getDragVerticalDirection(),
          r = this._getDragHorizontalDirection();
        return e
          ? this.floating
            ? (r && "right" === r) || "down" === i
              ? 2
              : 1
            : i && ("down" === i ? 2 : 1)
          : !1;
      },
      _intersectsWithSides: function (n) {
        var f = t(
            this.positionAbs.top + this.offset.click.top,
            n.top + n.height / 2,
            n.height
          ),
          u = t(
            this.positionAbs.left + this.offset.click.left,
            n.left + n.width / 2,
            n.width
          ),
          i = this._getDragVerticalDirection(),
          r = this._getDragHorizontalDirection();
        return this.floating && r
          ? ("right" === r && u) || ("left" === r && !u)
          : i && (("down" === i && f) || ("up" === i && !f));
      },
      _getDragVerticalDirection: function () {
        var n = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== n && (n > 0 ? "down" : "up");
      },
      _getDragHorizontalDirection: function () {
        var n = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== n && (n > 0 ? "right" : "left");
      },
      refresh: function (n) {
        return this._refreshItems(n), this.refreshPositions(), this;
      },
      _connectWith: function () {
        var n = this.options;
        return n.connectWith.constructor === String
          ? [n.connectWith]
          : n.connectWith;
      },
      _getItemsAsjQuery: function (t) {
        var r,
          f,
          o,
          i,
          s = [],
          u = [],
          e = this._connectWith();
        if (e && t)
          for (r = e.length - 1; r >= 0; r--)
            for (o = n(e[r]), f = o.length - 1; f >= 0; f--)
              (i = n.data(o[f], this.widgetFullName)),
                i &&
                  i !== this &&
                  !i.options.disabled &&
                  u.push([
                    n.isFunction(i.options.items)
                      ? i.options.items.call(i.element)
                      : n(i.options.items, i.element)
                          .not(".ui-sortable-helper")
                          .not(".ui-sortable-placeholder"),
                    i,
                  ]);
        for (
          u.push([
            n.isFunction(this.options.items)
              ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem,
                })
              : n(this.options.items, this.element)
                  .not(".ui-sortable-helper")
                  .not(".ui-sortable-placeholder"),
            this,
          ]),
            r = u.length - 1;
          r >= 0;
          r--
        )
          u[r][0].each(function () {
            s.push(this);
          });
        return n(s);
      },
      _removeCurrentsFromItems: function () {
        var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = n.grep(this.items, function (n) {
          for (var i = 0; t.length > i; i++) if (t[i] === n.item[0]) return !1;
          return !0;
        });
      },
      _refreshItems: function (t) {
        (this.items = []), (this.containers = [this]);
        var r,
          u,
          s,
          i,
          h,
          c,
          e,
          l,
          a = this.items,
          f = [
            [
              n.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], t, {
                    item: this.currentItem,
                  })
                : n(this.options.items, this.element),
              this,
            ],
          ],
          o = this._connectWith();
        if (o && this.ready)
          for (r = o.length - 1; r >= 0; r--)
            for (s = n(o[r]), u = s.length - 1; u >= 0; u--)
              (i = n.data(s[u], this.widgetFullName)),
                i &&
                  i !== this &&
                  !i.options.disabled &&
                  (f.push([
                    n.isFunction(i.options.items)
                      ? i.options.items.call(i.element[0], t, {
                          item: this.currentItem,
                        })
                      : n(i.options.items, i.element),
                    i,
                  ]),
                  this.containers.push(i));
        for (r = f.length - 1; r >= 0; r--)
          for (h = f[r][1], c = f[r][0], u = 0, l = c.length; l > u; u++)
            (e = n(c[u])),
              e.data(this.widgetName + "-item", h),
              a.push({
                item: e,
                instance: h,
                width: 0,
                height: 0,
                left: 0,
                top: 0,
              });
      },
      refreshPositions: function (t) {
        this.offsetParent &&
          this.helper &&
          (this.offset.parent = this._getParentOffset());
        for (var r, f, u, i = this.items.length - 1; i >= 0; i--)
          (r = this.items[i]),
            (r.instance !== this.currentContainer &&
              this.currentContainer &&
              r.item[0] !== this.currentItem[0]) ||
              ((f = this.options.toleranceElement
                ? n(this.options.toleranceElement, r.item)
                : r.item),
              t || ((r.width = f.outerWidth()), (r.height = f.outerHeight())),
              (u = f.offset()),
              (r.left = u.left),
              (r.top = u.top));
        if (this.options.custom && this.options.custom.refreshContainers)
          this.options.custom.refreshContainers.call(this);
        else
          for (i = this.containers.length - 1; i >= 0; i--)
            (u = this.containers[i].element.offset()),
              (this.containers[i].containerCache.left = u.left),
              (this.containers[i].containerCache.top = u.top),
              (this.containers[i].containerCache.width = this.containers[
                i
              ].element.outerWidth()),
              (this.containers[i].containerCache.height = this.containers[
                i
              ].element.outerHeight());
        return this;
      },
      _createPlaceholder: function (t) {
        t = t || this;
        var r,
          i = t.options;
        (i.placeholder && i.placeholder.constructor !== String) ||
          ((r = i.placeholder),
          (i.placeholder = {
            element: function () {
              var u = t.currentItem[0].nodeName.toLowerCase(),
                i = n("<" + u + ">", t.document[0])
                  .addClass(
                    r || t.currentItem[0].className + " ui-sortable-placeholder"
                  )
                  .removeClass("ui-sortable-helper");
              return (
                "tr" === u
                  ? t.currentItem.children().each(function () {
                      n("<td>&#160;</td>", t.document[0])
                        .attr("colspan", n(this).attr("colspan") || 1)
                        .appendTo(i);
                    })
                  : "img" === u && i.attr("src", t.currentItem.attr("src")),
                r || i.css("visibility", "hidden"),
                i
              );
            },
            update: function (n, u) {
              (!r || i.forcePlaceholderSize) &&
                (u.height() ||
                  u.height(
                    t.currentItem.innerHeight() -
                      parseInt(t.currentItem.css("paddingTop") || 0, 10) -
                      parseInt(t.currentItem.css("paddingBottom") || 0, 10)
                  ),
                u.width() ||
                  u.width(
                    t.currentItem.innerWidth() -
                      parseInt(t.currentItem.css("paddingLeft") || 0, 10) -
                      parseInt(t.currentItem.css("paddingRight") || 0, 10)
                  ));
            },
          })),
          (t.placeholder = n(
            i.placeholder.element.call(t.element, t.currentItem)
          )),
          t.currentItem.after(t.placeholder),
          i.placeholder.update(t, t.placeholder);
      },
      _contactContainers: function (r) {
        for (
          var f,
            y,
            c,
            a,
            v,
            h,
            o,
            p,
            l,
            s = null,
            u = null,
            e = this.containers.length - 1;
          e >= 0;
          e--
        )
          if (!n.contains(this.currentItem[0], this.containers[e].element[0]))
            if (this._intersectsWith(this.containers[e].containerCache)) {
              if (s && n.contains(this.containers[e].element[0], s.element[0]))
                continue;
              (s = this.containers[e]), (u = e);
            } else
              this.containers[e].containerCache.over &&
                (this.containers[e]._trigger("out", r, this._uiHash(this)),
                (this.containers[e].containerCache.over = 0));
        if (s)
          if (1 === this.containers.length)
            this.containers[u].containerCache.over ||
              (this.containers[u]._trigger("over", r, this._uiHash(this)),
              (this.containers[u].containerCache.over = 1));
          else {
            for (
              y = 10000,
                c = null,
                l = s.floating || i(this.currentItem),
                a = l ? "left" : "top",
                v = l ? "width" : "height",
                h = this.positionAbs[a] + this.offset.click[a],
                f = this.items.length - 1;
              f >= 0;
              f--
            )
              n.contains(
                this.containers[u].element[0],
                this.items[f].item[0]
              ) &&
                this.items[f].item[0] !== this.currentItem[0] &&
                (!l ||
                  t(
                    this.positionAbs.top + this.offset.click.top,
                    this.items[f].top,
                    this.items[f].height
                  )) &&
                ((o = this.items[f].item.offset()[a]),
                (p = !1),
                Math.abs(o - h) > Math.abs(o + this.items[f][v] - h) &&
                  ((p = !0), (o += this.items[f][v])),
                y > Math.abs(o - h) &&
                  ((y = Math.abs(o - h)),
                  (c = this.items[f]),
                  (this.direction = p ? "up" : "down")));
            if (!c && !this.options.dropOnEmpty) return;
            if (this.currentContainer === this.containers[u]) return;
            c
              ? this._rearrange(r, c, null, !0)
              : this._rearrange(r, null, this.containers[u].element, !0),
              this._trigger("change", r, this._uiHash()),
              this.containers[u]._trigger("change", r, this._uiHash(this)),
              (this.currentContainer = this.containers[u]),
              this.options.placeholder.update(
                this.currentContainer,
                this.placeholder
              ),
              this.containers[u]._trigger("over", r, this._uiHash(this)),
              (this.containers[u].containerCache.over = 1);
          }
      },
      _createHelper: function (t) {
        var r = this.options,
          i = n.isFunction(r.helper)
            ? n(r.helper.apply(this.element[0], [t, this.currentItem]))
            : "clone" === r.helper
            ? this.currentItem.clone()
            : this.currentItem;
        return (
          i.parents("body").length ||
            n(
              "parent" !== r.appendTo
                ? r.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(i[0]),
          i[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left"),
            }),
          (!i[0].style.width || r.forceHelperSize) &&
            i.width(this.currentItem.width()),
          (!i[0].style.height || r.forceHelperSize) &&
            i.height(this.currentItem.height()),
          i
        );
      },
      _adjustOffsetFromHelper: function (t) {
        "string" == typeof t && (t = t.split(" ")),
          n.isArray(t) &&
            (t = {
              left: +t[0],
              top: +t[1] || 0,
            }),
          "left" in t && (this.offset.click.left = t.left + this.margins.left),
          "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
          "top" in t && (this.offset.click.top = t.top + this.margins.top),
          "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var t = this.offsetParent.offset();
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== document &&
            n.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
            (t.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] === document.body ||
            (this.offsetParent[0].tagName &&
              "html" === this.offsetParent[0].tagName.toLowerCase() &&
              n.ui.ie)) &&
            (t = {
              top: 0,
              left: 0,
            }),
          {
            top:
              t.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              t.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
          var n = this.currentItem.position();
          return {
            top:
              n.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              n.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        }
        return {
          top: 0,
          left: 0,
        };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var t,
          r,
          u,
          i = this.options;
        "parent" === i.containment &&
          (i.containment = this.helper[0].parentNode),
          ("document" === i.containment || "window" === i.containment) &&
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              n("document" === i.containment ? document : window).width() -
                this.helperProportions.width -
                this.margins.left,
              (n("document" === i.containment ? document : window).height() ||
                document.body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]),
          /^(document|window|parent)$/.test(i.containment) ||
            ((t = n(i.containment)[0]),
            (r = n(i.containment).offset()),
            (u = "hidden" !== n(t).css("overflow")),
            (this.containment = [
              r.left +
                (parseInt(n(t).css("borderLeftWidth"), 10) || 0) +
                (parseInt(n(t).css("paddingLeft"), 10) || 0) -
                this.margins.left,
              r.top +
                (parseInt(n(t).css("borderTopWidth"), 10) || 0) +
                (parseInt(n(t).css("paddingTop"), 10) || 0) -
                this.margins.top,
              r.left +
                (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) -
                (parseInt(n(t).css("borderLeftWidth"), 10) || 0) -
                (parseInt(n(t).css("paddingRight"), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              r.top +
                (u
                  ? Math.max(t.scrollHeight, t.offsetHeight)
                  : t.offsetHeight) -
                (parseInt(n(t).css("borderTopWidth"), 10) || 0) -
                (parseInt(n(t).css("paddingBottom"), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
            ]));
      },
      _convertPositionTo: function (t, i) {
        i || (i = this.position);
        var r = "absolute" === t ? 1 : -1,
          u =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              n.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          f = /(html|body)/i.test(u[0].tagName);
        return {
          top:
            i.top +
            this.offset.relative.top * r +
            this.offset.parent.top * r -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollTop()
              : f
              ? 0
              : u.scrollTop()) *
              r,
          left:
            i.left +
            this.offset.relative.left * r +
            this.offset.parent.left * r -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : f
              ? 0
              : u.scrollLeft()) *
              r,
        };
      },
      _generatePosition: function (t) {
        var r,
          u,
          i = this.options,
          e = t.pageX,
          f = t.pageY,
          o =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              n.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          s = /(html|body)/i.test(o[0].tagName);
        return (
          "relative" !== this.cssPosition ||
            (this.scrollParent[0] !== document &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
          this.originalPosition &&
            (this.containment &&
              (t.pageX - this.offset.click.left < this.containment[0] &&
                (e = this.containment[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < this.containment[1] &&
                (f = this.containment[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > this.containment[2] &&
                (e = this.containment[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > this.containment[3] &&
                (f = this.containment[3] + this.offset.click.top)),
            i.grid &&
              ((r =
                this.originalPageY +
                Math.round((f - this.originalPageY) / i.grid[1]) * i.grid[1]),
              (f = this.containment
                ? r - this.offset.click.top >= this.containment[1] &&
                  r - this.offset.click.top <= this.containment[3]
                  ? r
                  : r - this.offset.click.top >= this.containment[1]
                  ? r - i.grid[1]
                  : r + i.grid[1]
                : r),
              (u =
                this.originalPageX +
                Math.round((e - this.originalPageX) / i.grid[0]) * i.grid[0]),
              (e = this.containment
                ? u - this.offset.click.left >= this.containment[0] &&
                  u - this.offset.click.left <= this.containment[2]
                  ? u
                  : u - this.offset.click.left >= this.containment[0]
                  ? u - i.grid[0]
                  : u + i.grid[0]
                : u))),
          {
            top:
              f -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : s
                ? 0
                : o.scrollTop()),
            left:
              e -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : s
                ? 0
                : o.scrollLeft()),
          }
        );
      },
      _rearrange: function (n, t, i, r) {
        i
          ? i[0].appendChild(this.placeholder[0])
          : t.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" === this.direction ? t.item[0] : t.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var u = this.counter;
        this._delay(function () {
          u === this.counter && this.refreshPositions(!r);
        });
      },
      _clear: function (n, t) {
        this.reverting = !1;
        var i,
          r = [];
        if (
          (!this._noFinalSort &&
            this.currentItem.parent().length &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] === this.currentItem[0])
        ) {
          for (i in this._storedCSS)
            ("auto" === this._storedCSS[i] ||
              "static" === this._storedCSS[i]) &&
              (this._storedCSS[i] = "");
          this.currentItem
            .css(this._storedCSS)
            .removeClass("ui-sortable-helper");
        } else this.currentItem.show();
        for (
          this.fromOutside &&
            !t &&
            r.push(function (n) {
              this._trigger("receive", n, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
                this.currentItem.prev().not(".ui-sortable-helper")[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
              t ||
              r.push(function (n) {
                this._trigger("update", n, this._uiHash());
              }),
            this !== this.currentContainer &&
              (t ||
                (r.push(function (n) {
                  this._trigger("remove", n, this._uiHash());
                }),
                r.push(
                  function (n) {
                    return function (t) {
                      n._trigger("receive", t, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ),
                r.push(
                  function (n) {
                    return function (t) {
                      n._trigger("update", t, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ))),
            i = this.containers.length - 1;
          i >= 0;
          i--
        )
          t ||
            r.push(
              function (n) {
                return function (t) {
                  n._trigger("deactivate", t, this._uiHash(this));
                };
              }.call(this, this.containers[i])
            ),
            this.containers[i].containerCache.over &&
              (r.push(
                function (n) {
                  return function (t) {
                    n._trigger("out", t, this._uiHash(this));
                  };
                }.call(this, this.containers[i])
              ),
              (this.containers[i].containerCache.over = 0));
        if (
          (this.storedCursor &&
            (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
          this._storedOpacity &&
            this.helper.css("opacity", this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              "zIndex",
              "auto" === this._storedZIndex ? "" : this._storedZIndex
            ),
          (this.dragging = !1),
          this.cancelHelperRemoval)
        ) {
          if (!t) {
            for (
              this._trigger("beforeStop", n, this._uiHash()), i = 0;
              r.length > i;
              i++
            )
              r[i].call(this, n);
            this._trigger("stop", n, this._uiHash());
          }
          return (this.fromOutside = !1), !1;
        }
        if (
          (t || this._trigger("beforeStop", n, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.helper[0] !== this.currentItem[0] && this.helper.remove(),
          (this.helper = null),
          !t)
        ) {
          for (i = 0; r.length > i; i++) r[i].call(this, n);
          this._trigger("stop", n, this._uiHash());
        }
        return (this.fromOutside = !1), !0;
      },
      _trigger: function () {
        n.Widget.prototype._trigger.apply(this, arguments) === !1 &&
          this.cancel();
      },
      _uiHash: function (t) {
        var i = t || this;
        return {
          helper: i.helper,
          placeholder: i.placeholder || n([]),
          position: i.position,
          originalPosition: i.originalPosition,
          offset: i.positionAbs,
          item: i.currentItem,
          sender: t ? t.element : null,
        };
      },
    });
  })(jQuery),
  (function (n, t) {
    var i = "ui-effects-";
    (n.effects = {
      effect: {},
    }),
      (function (n, t) {
        function e(n, t, i) {
          var r = c[t.type] || {};
          return null == n
            ? i || !t.def
              ? null
              : t.def
            : ((n = r.floor ? ~~n : parseFloat(n)),
              isNaN(n)
                ? t.def
                : r.mod
                ? (n + r.mod) % r.mod
                : 0 > n
                ? 0
                : n > r.max
                ? r.max
                : n);
        }
        function l(e) {
          var o = i(),
            s = (o._rgba = []);
          return (
            (e = e.toLowerCase()),
            r(y, function (n, i) {
              var f,
                h = i.re.exec(e),
                c = h && i.parse(h),
                r = i.space || "rgba";
              return c
                ? ((f = o[r](c)),
                  (o[u[r].cache] = f[u[r].cache]),
                  (s = o._rgba = f._rgba),
                  !1)
                : t;
            }),
            s.length
              ? ("0,0,0,0" === s.join() && n.extend(s, f.transparent), o)
              : f[e]
          );
        }
        function o(n, t, i) {
          return (
            (i = (i + 1) % 1),
            1 > 6 * i
              ? n + 6 * (t - n) * i
              : 1 > 2 * i
              ? t
              : 2 > 3 * i
              ? n + 6 * (t - n) * (2 / 3 - i)
              : n
          );
        }
        var f,
          v =
            "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
          a = /^([\-+])=\s*(\d+\.?\d*)/,
          y = [
            {
              re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (n) {
                return [n[1], n[2], n[3], n[4]];
              },
            },
            {
              re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              parse: function (n) {
                return [2.55 * n[1], 2.55 * n[2], 2.55 * n[3], n[4]];
              },
            },
            {
              re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
              parse: function (n) {
                return [
                  parseInt(n[1], 16),
                  parseInt(n[2], 16),
                  parseInt(n[3], 16),
                ];
              },
            },
            {
              re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
              parse: function (n) {
                return [
                  parseInt(n[1] + n[1], 16),
                  parseInt(n[2] + n[2], 16),
                  parseInt(n[3] + n[3], 16),
                ];
              },
            },
            {
              re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
              space: "hsla",
              parse: function (n) {
                return [n[1], n[2] / 100, n[3] / 100, n[4]];
              },
            },
          ],
          i = (n.Color = function (t, i, r, u) {
            return new n.Color.fn.parse(t, i, r, u);
          }),
          u = {
            rgba: {
              props: {
                red: {
                  idx: 0,
                  type: "byte",
                },
                green: {
                  idx: 1,
                  type: "byte",
                },
                blue: {
                  idx: 2,
                  type: "byte",
                },
              },
            },
            hsla: {
              props: {
                hue: {
                  idx: 0,
                  type: "degrees",
                },
                saturation: {
                  idx: 1,
                  type: "percent",
                },
                lightness: {
                  idx: 2,
                  type: "percent",
                },
              },
            },
          },
          c = {
            byte: {
              floor: !0,
              max: 255,
            },
            percent: {
              max: 1,
            },
            degrees: {
              mod: 360,
              floor: !0,
            },
          },
          s = (i.support = {}),
          h = n("<p>")[0],
          r = n.each;
        (h.style.cssText = "background-color:rgba(1,1,1,.5)"),
          (s.rgba = h.style.backgroundColor.indexOf("rgba") > -1),
          r(u, function (n, t) {
            (t.cache = "_" + n),
              (t.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1,
              });
          }),
          (i.fn = n.extend(i.prototype, {
            parse: function (o, s, h, c) {
              if (o === t) return (this._rgba = [null, null, null, null]), this;
              (o.jquery || o.nodeType) && ((o = n(o).css(s)), (s = t));
              var a = this,
                v = n.type(o),
                y = (this._rgba = []);
              return (
                s !== t && ((o = [o, s, h, c]), (v = "array")),
                "string" === v
                  ? this.parse(l(o) || f._default)
                  : "array" === v
                  ? (r(u.rgba.props, function (n, t) {
                      y[t.idx] = e(o[t.idx], t);
                    }),
                    this)
                  : "object" === v
                  ? (o instanceof i
                      ? r(u, function (n, t) {
                          o[t.cache] && (a[t.cache] = o[t.cache].slice());
                        })
                      : r(u, function (t, i) {
                          var u = i.cache;
                          r(i.props, function (n, t) {
                            if (!a[u] && i.to) {
                              if ("alpha" === n || null == o[n]) return;
                              a[u] = i.to(a._rgba);
                            }
                            a[u][t.idx] = e(o[n], t, !0);
                          }),
                            a[u] &&
                              0 > n.inArray(null, a[u].slice(0, 3)) &&
                              ((a[u][3] = 1),
                              i.from && (a._rgba = i.from(a[u])));
                        }),
                    this)
                  : t
              );
            },
            is: function (n) {
              var o = i(n),
                f = !0,
                e = this;
              return (
                r(u, function (n, i) {
                  var s,
                    u = o[i.cache];
                  return (
                    u &&
                      ((s = e[i.cache] || (i.to && i.to(e._rgba)) || []),
                      r(i.props, function (n, i) {
                        return null != u[i.idx]
                          ? (f = u[i.idx] === s[i.idx])
                          : t;
                      })),
                    f
                  );
                }),
                f
              );
            },
            _space: function () {
              var n = [],
                t = this;
              return (
                r(u, function (i, r) {
                  t[r.cache] && n.push(i);
                }),
                n.pop()
              );
            },
            transition: function (n, t) {
              var o = i(n),
                h = o._space(),
                f = u[h],
                a = 0 === this.alpha() ? i("transparent") : this,
                l = a[f.cache] || f.to(a._rgba),
                s = l.slice();
              return (
                (o = o[f.cache]),
                r(f.props, function (n, i) {
                  var h = i.idx,
                    r = l[h],
                    u = o[h],
                    f = c[i.type] || {};
                  null !== u &&
                    (null === r
                      ? (s[h] = u)
                      : (f.mod &&
                          (u - r > f.mod / 2
                            ? (r += f.mod)
                            : r - u > f.mod / 2 && (r -= f.mod)),
                        (s[h] = e((u - r) * t + r, i))));
                }),
                this[h](s)
              );
            },
            blend: function (t) {
              if (1 === this._rgba[3]) return this;
              var u = this._rgba.slice(),
                r = u.pop(),
                f = i(t)._rgba;
              return i(
                n.map(u, function (n, t) {
                  return (1 - r) * f[t] + r * n;
                })
              );
            },
            toRgbaString: function () {
              var i = "rgba(",
                t = n.map(this._rgba, function (n, t) {
                  return null == n ? (t > 2 ? 1 : 0) : n;
                });
              return 1 === t[3] && (t.pop(), (i = "rgb(")), i + t.join() + ")";
            },
            toHslaString: function () {
              var i = "hsla(",
                t = n.map(this.hsla(), function (n, t) {
                  return (
                    null == n && (n = t > 2 ? 1 : 0),
                    t && 3 > t && (n = Math.round(100 * n) + "%"),
                    n
                  );
                });
              return 1 === t[3] && (t.pop(), (i = "hsl(")), i + t.join() + ")";
            },
            toHexString: function (t) {
              var i = this._rgba.slice(),
                r = i.pop();
              return (
                t && i.push(~~(255 * r)),
                "#" +
                  n
                    .map(i, function (n) {
                      return (
                        (n = (n || 0).toString(16)),
                        1 === n.length ? "0" + n : n
                      );
                    })
                    .join("")
              );
            },
            toString: function () {
              return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
            },
          })),
          (i.fn.parse.prototype = i.fn),
          (u.hsla.to = function (n) {
            if (null == n[0] || null == n[1] || null == n[2])
              return [null, null, null, n[3]];
            var h,
              c,
              r = n[0] / 255,
              i = n[1] / 255,
              f = n[2] / 255,
              l = n[3],
              u = Math.max(r, i, f),
              o = Math.min(r, i, f),
              t = u - o,
              e = u + o,
              s = 0.5 * e;
            return (
              (h =
                o === u
                  ? 0
                  : r === u
                  ? (60 * (i - f)) / t + 360
                  : i === u
                  ? (60 * (f - r)) / t + 120
                  : (60 * (r - i)) / t + 240),
              (c = 0 === t ? 0 : 0.5 >= s ? t / e : t / (2 - e)),
              [Math.round(h) % 360, c, s, null == l ? 1 : l]
            );
          }),
          (u.hsla.from = function (n) {
            if (null == n[0] || null == n[1] || null == n[2])
              return [null, null, null, n[3]];
            var f = n[0] / 360,
              u = n[1],
              t = n[2],
              e = n[3],
              i = 0.5 >= t ? t * (1 + u) : t + u - t * u,
              r = 2 * t - i;
            return [
              Math.round(255 * o(r, i, f + 1 / 3)),
              Math.round(255 * o(r, i, f)),
              Math.round(255 * o(r, i, f - 1 / 3)),
              e,
            ];
          }),
          r(u, function (u, f) {
            var c = f.props,
              o = f.cache,
              h = f.to,
              s = f.from;
            (i.fn[u] = function (u) {
              if ((h && !this[o] && (this[o] = h(this._rgba)), u === t))
                return this[o].slice();
              var a,
                l = n.type(u),
                v = "array" === l || "object" === l ? u : arguments,
                f = this[o].slice();
              return (
                r(c, function (n, t) {
                  var i = v["object" === l ? n : t.idx];
                  null == i && (i = f[t.idx]), (f[t.idx] = e(i, t));
                }),
                s ? ((a = i(s(f))), (a[o] = f), a) : i(f)
              );
            }),
              r(c, function (t, r) {
                i.fn[t] ||
                  (i.fn[t] = function (i) {
                    var e,
                      f = n.type(i),
                      h = "alpha" === t ? (this._hsla ? "hsla" : "rgba") : u,
                      o = this[h](),
                      s = o[r.idx];
                    return "undefined" === f
                      ? s
                      : ("function" === f &&
                          ((i = i.call(this, s)), (f = n.type(i))),
                        null == i && r.empty
                          ? this
                          : ("string" === f &&
                              ((e = a.exec(i)),
                              e &&
                                (i =
                                  s +
                                  parseFloat(e[2]) * ("+" === e[1] ? 1 : -1))),
                            (o[r.idx] = i),
                            this[h](o)));
                  });
              });
          }),
          (i.hook = function (t) {
            var u = t.split(" ");
            r(u, function (t, r) {
              (n.cssHooks[r] = {
                set: function (t, u) {
                  var o,
                    f,
                    e = "";
                  if (
                    "transparent" !== u &&
                    ("string" !== n.type(u) || (o = l(u)))
                  ) {
                    if (((u = i(o || u)), !s.rgba && 1 !== u._rgba[3])) {
                      for (
                        f = "backgroundColor" === r ? t.parentNode : t;
                        ("" === e || "transparent" === e) && f && f.style;

                      )
                        try {
                          (e = n.css(f, "backgroundColor")), (f = f.parentNode);
                        } catch (h) {}
                      u = u.blend(e && "transparent" !== e ? e : "_default");
                    }
                    u = u.toRgbaString();
                  }
                  try {
                    t.style[r] = u;
                  } catch (h) {}
                },
              }),
                (n.fx.step[r] = function (t) {
                  t.colorInit ||
                    ((t.start = i(t.elem, r)),
                    (t.end = i(t.end)),
                    (t.colorInit = !0)),
                    n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos));
                });
            });
          }),
          i.hook(v),
          (n.cssHooks.borderColor = {
            expand: function (n) {
              var t = {};
              return (
                r(["Top", "Right", "Bottom", "Left"], function (i, r) {
                  t["border" + r + "Color"] = n;
                }),
                t
              );
            },
          }),
          (f = n.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff",
          });
      })(jQuery),
      (function () {
        function i(t) {
          var r,
            f,
            i = t.ownerDocument.defaultView
              ? t.ownerDocument.defaultView.getComputedStyle(t, null)
              : t.currentStyle,
            u = {};
          if (i && i.length && i[0] && i[i[0]])
            for (f = i.length; f--; )
              (r = i[f]), "string" == typeof i[r] && (u[n.camelCase(r)] = i[r]);
          else for (r in i) "string" == typeof i[r] && (u[r] = i[r]);
          return u;
        }
        function f(t, i) {
          var u,
            f,
            e = {};
          for (u in i)
            (f = i[u]),
              t[u] !== f &&
                (r[u] ||
                  ((n.fx.step[u] || !isNaN(parseFloat(f))) && (e[u] = f)));
          return e;
        }
        var u = ["add", "remove", "toggle"],
          r = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1,
          };
        n.each(
          [
            "borderLeftStyle",
            "borderRightStyle",
            "borderBottomStyle",
            "borderTopStyle",
          ],
          function (t, i) {
            n.fx.step[i] = function (n) {
              (("none" !== n.end && !n.setAttr) ||
                (1 === n.pos && !n.setAttr)) &&
                (jQuery.style(n.elem, i, n.end), (n.setAttr = !0));
            };
          }
        ),
          n.fn.addBack ||
            (n.fn.addBack = function (n) {
              return this.add(
                null == n ? this.prevObject : this.prevObject.filter(n)
              );
            }),
          (n.effects.animateClass = function (t, r, e, o) {
            var s = n.speed(r, e, o);
            return this.queue(function () {
              var o,
                e = n(this),
                h = e.attr("class") || "",
                r = s.children ? e.find("*").addBack() : e;
              (r = r.map(function () {
                var t = n(this);
                return {
                  el: t,
                  start: i(this),
                };
              })),
                (o = function () {
                  n.each(u, function (n, i) {
                    t[i] && e[i + "Class"](t[i]);
                  });
                }),
                o(),
                (r = r.map(function () {
                  return (
                    (this.end = i(this.el[0])),
                    (this.diff = f(this.start, this.end)),
                    this
                  );
                })),
                e.attr("class", h),
                (r = r.map(function () {
                  var r = this,
                    t = n.Deferred(),
                    i = n.extend({}, s, {
                      queue: !1,
                      complete: function () {
                        t.resolve(r);
                      },
                    });
                  return this.el.animate(this.diff, i), t.promise();
                })),
                n.when.apply(n, r.get()).done(function () {
                  o(),
                    n.each(arguments, function () {
                      var t = this.el;
                      n.each(this.diff, function (n) {
                        t.css(n, "");
                      });
                    }),
                    s.complete.call(e[0]);
                });
            });
          }),
          n.fn.extend({
            addClass: (function (t) {
              return function (i, r, u, f) {
                return r
                  ? n.effects.animateClass.call(
                      this,
                      {
                        add: i,
                      },
                      r,
                      u,
                      f
                    )
                  : t.apply(this, arguments);
              };
            })(n.fn.addClass),
            removeClass: (function (t) {
              return function (i, r, u, f) {
                return arguments.length > 1
                  ? n.effects.animateClass.call(
                      this,
                      {
                        remove: i,
                      },
                      r,
                      u,
                      f
                    )
                  : t.apply(this, arguments);
              };
            })(n.fn.removeClass),
            toggleClass: (function (i) {
              return function (r, u, f, e, o) {
                return "boolean" == typeof u || u === t
                  ? f
                    ? n.effects.animateClass.call(
                        this,
                        u
                          ? {
                              add: r,
                            }
                          : {
                              remove: r,
                            },
                        f,
                        e,
                        o
                      )
                    : i.apply(this, arguments)
                  : n.effects.animateClass.call(
                      this,
                      {
                        toggle: r,
                      },
                      u,
                      f,
                      e
                    );
              };
            })(n.fn.toggleClass),
            switchClass: function (t, i, r, u, f) {
              return n.effects.animateClass.call(
                this,
                {
                  add: i,
                  remove: t,
                },
                r,
                u,
                f
              );
            },
          });
      })(),
      (function () {
        function r(t, i, r, u) {
          return (
            n.isPlainObject(t) && ((i = t), (t = t.effect)),
            (t = {
              effect: t,
            }),
            null == i && (i = {}),
            n.isFunction(i) && ((u = i), (r = null), (i = {})),
            ("number" == typeof i || n.fx.speeds[i]) &&
              ((u = r), (r = i), (i = {})),
            n.isFunction(r) && ((u = r), (r = null)),
            i && n.extend(t, i),
            (r = r || i.duration),
            (t.duration = n.fx.off
              ? 0
              : "number" == typeof r
              ? r
              : r in n.fx.speeds
              ? n.fx.speeds[r]
              : n.fx.speeds._default),
            (t.complete = u || i.complete),
            t
          );
        }
        function u(t) {
          return !t || "number" == typeof t || n.fx.speeds[t]
            ? !0
            : "string" != typeof t || n.effects.effect[t]
            ? n.isFunction(t)
              ? !0
              : "object" != typeof t || t.effect
              ? !1
              : !0
            : !0;
        }
        n.extend(n.effects, {
          version: "1.10.3",
          save: function (n, t) {
            for (var r = 0; t.length > r; r++)
              null !== t[r] && n.data(i + t[r], n[0].style[t[r]]);
          },
          restore: function (n, r) {
            for (var f, u = 0; r.length > u; u++)
              null !== r[u] &&
                ((f = n.data(i + r[u])), f === t && (f = ""), n.css(r[u], f));
          },
          setMode: function (n, t) {
            return "toggle" === t && (t = n.is(":hidden") ? "show" : "hide"), t;
          },
          getBaseline: function (n, t) {
            var r, i;
            switch (n[0]) {
              case "top":
                r = 0;
                break;
              case "middle":
                r = 0.5;
                break;
              case "bottom":
                r = 1;
                break;
              default:
                r = n[0] / t.height;
            }
            switch (n[1]) {
              case "left":
                i = 0;
                break;
              case "center":
                i = 0.5;
                break;
              case "right":
                i = 1;
                break;
              default:
                i = n[1] / t.width;
            }
            return {
              x: i,
              y: r,
            };
          },
          createWrapper: function (t) {
            if (t.parent().is(".ui-effects-wrapper")) return t.parent();
            var r = {
                width: t.outerWidth(!0),
                height: t.outerHeight(!0),
                float: t.css("float"),
              },
              u = n("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0,
              }),
              f = {
                width: t.width(),
                height: t.height(),
              },
              i = document.activeElement;
            try {
              i.id;
            } catch (e) {
              i = document.body;
            }
            return (
              t.wrap(u),
              (t[0] === i || n.contains(t[0], i)) && n(i).focus(),
              (u = t.parent()),
              "static" === t.css("position")
                ? (u.css({
                    position: "relative",
                  }),
                  t.css({
                    position: "relative",
                  }))
                : (n.extend(r, {
                    position: t.css("position"),
                    zIndex: t.css("z-index"),
                  }),
                  n.each(["top", "left", "bottom", "right"], function (n, i) {
                    (r[i] = t.css(i)),
                      isNaN(parseInt(r[i], 10)) && (r[i] = "auto");
                  }),
                  t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto",
                  })),
              t.css(f),
              u.css(r).show()
            );
          },
          removeWrapper: function (t) {
            var i = document.activeElement;
            return (
              t.parent().is(".ui-effects-wrapper") &&
                (t.parent().replaceWith(t),
                (t[0] === i || n.contains(t[0], i)) && n(i).focus()),
              t
            );
          },
          setTransition: function (t, i, r, u) {
            return (
              (u = u || {}),
              n.each(i, function (n, i) {
                var f = t.cssUnit(i);
                f[0] > 0 && (u[i] = f[0] * r + f[1]);
              }),
              u
            );
          },
        }),
          n.fn.extend({
            effect: function () {
              function f(i) {
                function e() {
                  n.isFunction(o) && o.call(r[0]), n.isFunction(i) && i();
                }
                var r = n(this),
                  o = t.complete,
                  f = t.mode;
                (r.is(":hidden") ? "hide" === f : "show" === f)
                  ? (r[f](), e())
                  : u.call(r[0], t, e);
              }
              var t = r.apply(this, arguments),
                e = t.mode,
                i = t.queue,
                u = n.effects.effect[t.effect];
              return n.fx.off || !u
                ? e
                  ? this[e](t.duration, t.complete)
                  : this.each(function () {
                      t.complete && t.complete.call(this);
                    })
                : i === !1
                ? this.each(f)
                : this.queue(i || "fx", f);
            },
            show: (function (n) {
              return function (t) {
                if (u(t)) return n.apply(this, arguments);
                var i = r.apply(this, arguments);
                return (i.mode = "show"), this.effect.call(this, i);
              };
            })(n.fn.show),
            hide: (function (n) {
              return function (t) {
                if (u(t)) return n.apply(this, arguments);
                var i = r.apply(this, arguments);
                return (i.mode = "hide"), this.effect.call(this, i);
              };
            })(n.fn.hide),
            toggle: (function (n) {
              return function (t) {
                if (u(t) || "boolean" == typeof t)
                  return n.apply(this, arguments);
                var i = r.apply(this, arguments);
                return (i.mode = "toggle"), this.effect.call(this, i);
              };
            })(n.fn.toggle),
            cssUnit: function (t) {
              var r = this.css(t),
                i = [];
              return (
                n.each(["em", "px", "%", "pt"], function (n, t) {
                  r.indexOf(t) > 0 && (i = [parseFloat(r), t]);
                }),
                i
              );
            },
          });
      })(),
      (function () {
        var t = {};
        n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (n, i) {
          t[i] = function (t) {
            return Math.pow(t, n + 2);
          };
        }),
          n.extend(t, {
            Sine: function (n) {
              return 1 - Math.cos((n * Math.PI) / 2);
            },
            Circ: function (n) {
              return 1 - Math.sqrt(1 - n * n);
            },
            Elastic: function (n) {
              return 0 === n || 1 === n
                ? n
                : -Math.pow(2, 8 * (n - 1)) *
                    Math.sin(((80 * (n - 1) - 7.5) * Math.PI) / 15);
            },
            Back: function (n) {
              return n * n * (3 * n - 2);
            },
            Bounce: function (n) {
              for (var i, t = 4; ((i = Math.pow(2, --t)) - 1) / 11 > n; );
              return (
                1 / Math.pow(4, 3 - t) -
                7.5625 * Math.pow((3 * i - 2) / 22 - n, 2)
              );
            },
          }),
          n.each(t, function (t, i) {
            (n.easing["easeIn" + t] = i),
              (n.easing["easeOut" + t] = function (n) {
                return 1 - i(1 - n);
              }),
              (n.easing["easeInOut" + t] = function (n) {
                return 0.5 > n ? i(2 * n) / 2 : 1 - i(-2 * n + 2) / 2;
              });
          });
      })();
  })(jQuery),
  (function (n) {
    var r = 0,
      t = {},
      i = {};
    (t.height = t.paddingTop = t.paddingBottom = t.borderTopWidth = t.borderBottomWidth =
      "hide"),
      (i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth =
        "show"),
      n.widget("ui.accordion", {
        version: "1.10.3",
        options: {
          active: 0,
          animate: {},
          collapsible: !1,
          event: "click",
          header: "> li > :first-child,> :not(li):even",
          heightStyle: "auto",
          icons: {
            activeHeader: "ui-icon-triangle-1-s",
            header: "ui-icon-triangle-1-e",
          },
          activate: null,
          beforeActivate: null,
        },
        _create: function () {
          var t = this.options;
          (this.prevShow = this.prevHide = n()),
            this.element
              .addClass("ui-accordion ui-widget ui-helper-reset")
              .attr("role", "tablist"),
            t.collapsible ||
              (t.active !== !1 && null != t.active) ||
              (t.active = 0),
            this._processPanels(),
            0 > t.active && (t.active += this.headers.length),
            this._refresh();
        },
        _getCreateEventData: function () {
          return {
            header: this.active,
            panel: this.active.length ? this.active.next() : n(),
            content: this.active.length ? this.active.next() : n(),
          };
        },
        _createIcons: function () {
          var t = this.options.icons;
          t &&
            (n("<span>")
              .addClass("ui-accordion-header-icon ui-icon " + t.header)
              .prependTo(this.headers),
            this.active
              .children(".ui-accordion-header-icon")
              .removeClass(t.header)
              .addClass(t.activeHeader),
            this.headers.addClass("ui-accordion-icons"));
        },
        _destroyIcons: function () {
          this.headers
            .removeClass("ui-accordion-icons")
            .children(".ui-accordion-header-icon")
            .remove();
        },
        _destroy: function () {
          var n;
          this.element
            .removeClass("ui-accordion ui-widget ui-helper-reset")
            .removeAttr("role"),
            this.headers
              .removeClass(
                "ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top"
              )
              .removeAttr("role")
              .removeAttr("aria-selected")
              .removeAttr("aria-controls")
              .removeAttr("tabIndex")
              .each(function () {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id");
              }),
            this._destroyIcons(),
            (n = this.headers
              .next()
              .css("display", "")
              .removeAttr("role")
              .removeAttr("aria-expanded")
              .removeAttr("aria-hidden")
              .removeAttr("aria-labelledby")
              .removeClass(
                "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled"
              )
              .each(function () {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id");
              })),
            "content" !== this.options.heightStyle && n.css("height", "");
        },
        _setOption: function (n, t) {
          return "active" === n
            ? (this._activate(t), undefined)
            : ("event" === n &&
                (this.options.event &&
                  this._off(this.headers, this.options.event),
                this._setupEvents(t)),
              this._super(n, t),
              "collapsible" !== n ||
                t ||
                this.options.active !== !1 ||
                this._activate(0),
              "icons" === n && (this._destroyIcons(), t && this._createIcons()),
              "disabled" === n &&
                this.headers
                  .add(this.headers.next())
                  .toggleClass("ui-state-disabled", !!t),
              undefined);
        },
        _keydown: function (t) {
          if (!t.altKey && !t.ctrlKey) {
            var i = n.ui.keyCode,
              u = this.headers.length,
              f = this.headers.index(t.target),
              r = !1;
            switch (t.keyCode) {
              case i.RIGHT:
              case i.DOWN:
                r = this.headers[(f + 1) % u];
                break;
              case i.LEFT:
              case i.UP:
                r = this.headers[(f - 1 + u) % u];
                break;
              case i.SPACE:
              case i.ENTER:
                this._eventHandler(t);
                break;
              case i.HOME:
                r = this.headers[0];
                break;
              case i.END:
                r = this.headers[u - 1];
            }
            r &&
              (n(t.target).attr("tabIndex", -1),
              n(r).attr("tabIndex", 0),
              r.focus(),
              t.preventDefault());
          }
        },
        _panelKeyDown: function (t) {
          t.keyCode === n.ui.keyCode.UP &&
            t.ctrlKey &&
            n(t.currentTarget).prev().focus();
        },
        refresh: function () {
          var t = this.options;
          this._processPanels(),
            (t.active === !1 && t.collapsible === !0) || !this.headers.length
              ? ((t.active = !1), (this.active = n()))
              : t.active === !1
              ? this._activate(0)
              : this.active.length &&
                !n.contains(this.element[0], this.active[0])
              ? this.headers.length ===
                this.headers.find(".ui-state-disabled").length
                ? ((t.active = !1), (this.active = n()))
                : this._activate(Math.max(0, t.active - 1))
              : (t.active = this.headers.index(this.active)),
            this._destroyIcons(),
            this._refresh();
        },
        _processPanels: function () {
          (this.headers = this.element
            .find(this.options.header)
            .addClass(
              "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"
            )),
            this.headers
              .next()
              .addClass(
                "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
              )
              .filter(":not(.ui-accordion-content-active)")
              .hide();
        },
        _refresh: function () {
          var t,
            i = this.options,
            f = i.heightStyle,
            e = this.element.parent(),
            u = (this.accordionId =
              "ui-accordion-" + (this.element.attr("id") || ++r));
          (this.active = this._findActive(i.active)
            .addClass(
              "ui-accordion-header-active ui-state-active ui-corner-top"
            )
            .removeClass("ui-corner-all")),
            this.active.next().addClass("ui-accordion-content-active").show(),
            this.headers
              .attr("role", "tab")
              .each(function (t) {
                var f = n(this),
                  r = f.attr("id"),
                  e = f.next(),
                  i = e.attr("id");
                r || ((r = u + "-header-" + t), f.attr("id", r)),
                  i || ((i = u + "-panel-" + t), e.attr("id", i)),
                  f.attr("aria-controls", i),
                  e.attr("aria-labelledby", r);
              })
              .next()
              .attr("role", "tabpanel"),
            this.headers
              .not(this.active)
              .attr({
                "aria-selected": "false",
                tabIndex: -1,
              })
              .next()
              .attr({
                "aria-expanded": "false",
                "aria-hidden": "true",
              })
              .hide(),
            this.active.length
              ? this.active
                  .attr({
                    "aria-selected": "true",
                    tabIndex: 0,
                  })
                  .next()
                  .attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false",
                  })
              : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(i.event),
            "fill" === f
              ? ((t = e.height()),
                this.element.siblings(":visible").each(function () {
                  var r = n(this),
                    i = r.css("position");
                  "absolute" !== i && "fixed" !== i && (t -= r.outerHeight(!0));
                }),
                this.headers.each(function () {
                  t -= n(this).outerHeight(!0);
                }),
                this.headers
                  .next()
                  .each(function () {
                    n(this).height(
                      Math.max(0, t - n(this).innerHeight() + n(this).height())
                    );
                  })
                  .css("overflow", "auto"))
              : "auto" === f &&
                ((t = 0),
                this.headers
                  .next()
                  .each(function () {
                    t = Math.max(t, n(this).css("height", "").height());
                  })
                  .height(t));
        },
        _activate: function (t) {
          var i = this._findActive(t)[0];
          i !== this.active[0] &&
            ((i = i || this.active[0]),
            this._eventHandler({
              target: i,
              currentTarget: i,
              preventDefault: n.noop,
            }));
        },
        _findActive: function (t) {
          return "number" == typeof t ? this.headers.eq(t) : n();
        },
        _setupEvents: function (t) {
          var i = {
            keydown: "_keydown",
          };
          t &&
            n.each(t.split(" "), function (n, t) {
              i[t] = "_eventHandler";
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, i),
            this._on(this.headers.next(), {
              keydown: "_panelKeyDown",
            }),
            this._hoverable(this.headers),
            this._focusable(this.headers);
        },
        _eventHandler: function (t) {
          var i = this.options,
            u = this.active,
            r = n(t.currentTarget),
            f = r[0] === u[0],
            e = f && i.collapsible,
            s = e ? n() : r.next(),
            h = u.next(),
            o = {
              oldHeader: u,
              oldPanel: h,
              newHeader: e ? n() : r,
              newPanel: s,
            };
          t.preventDefault(),
            (f && !i.collapsible) ||
              this._trigger("beforeActivate", t, o) === !1 ||
              ((i.active = e ? !1 : this.headers.index(r)),
              (this.active = f ? n() : r),
              this._toggle(o),
              u.removeClass("ui-accordion-header-active ui-state-active"),
              i.icons &&
                u
                  .children(".ui-accordion-header-icon")
                  .removeClass(i.icons.activeHeader)
                  .addClass(i.icons.header),
              f ||
                (r
                  .removeClass("ui-corner-all")
                  .addClass(
                    "ui-accordion-header-active ui-state-active ui-corner-top"
                  ),
                i.icons &&
                  r
                    .children(".ui-accordion-header-icon")
                    .removeClass(i.icons.header)
                    .addClass(i.icons.activeHeader),
                r.next().addClass("ui-accordion-content-active")));
        },
        _toggle: function (t) {
          var r = t.newPanel,
            i = this.prevShow.length ? this.prevShow : t.oldPanel;
          this.prevShow.add(this.prevHide).stop(!0, !0),
            (this.prevShow = r),
            (this.prevHide = i),
            this.options.animate
              ? this._animate(r, i, t)
              : (i.hide(), r.show(), this._toggleComplete(t)),
            i.attr({
              "aria-expanded": "false",
              "aria-hidden": "true",
            }),
            i.prev().attr("aria-selected", "false"),
            r.length && i.length
              ? i.prev().attr("tabIndex", -1)
              : r.length &&
                this.headers
                  .filter(function () {
                    return 0 === n(this).attr("tabIndex");
                  })
                  .attr("tabIndex", -1),
            r
              .attr({
                "aria-expanded": "true",
                "aria-hidden": "false",
              })
              .prev()
              .attr({
                "aria-selected": "true",
                tabIndex: 0,
              });
        },
        _animate: function (n, r, u) {
          var a,
            e,
            f,
            l = this,
            c = 0,
            v = n.length && (!r.length || n.index() < r.index()),
            s = this.options.animate || {},
            o = (v && s.down) || s,
            h = function () {
              l._toggleComplete(u);
            };
          return (
            "number" == typeof o && (f = o),
            "string" == typeof o && (e = o),
            (e = e || o.easing || s.easing),
            (f = f || o.duration || s.duration),
            r.length
              ? n.length
                ? ((a = n.show().outerHeight()),
                  r.animate(t, {
                    duration: f,
                    easing: e,
                    step: function (n, t) {
                      t.now = Math.round(n);
                    },
                  }),
                  n.hide().animate(i, {
                    duration: f,
                    easing: e,
                    complete: h,
                    step: function (n, t) {
                      (t.now = Math.round(n)),
                        "height" !== t.prop
                          ? (c += t.now)
                          : "content" !== l.options.heightStyle &&
                            ((t.now = Math.round(a - r.outerHeight() - c)),
                            (c = 0));
                    },
                  }),
                  undefined)
                : r.animate(t, f, e, h)
              : n.animate(i, f, e, h)
          );
        },
        _toggleComplete: function (n) {
          var t = n.oldPanel;
          t
            .removeClass("ui-accordion-content-active")
            .prev()
            .removeClass("ui-corner-top")
            .addClass("ui-corner-all"),
            t.length && (t.parent()[0].className = t.parent()[0].className),
            this._trigger("activate", null, n);
        },
      });
  })(jQuery),
  (function (n) {
    var t = 0;
    n.widget("ui.autocomplete", {
      version: "1.10.3",
      defaultElement: "<input>",
      options: {
        appendTo: null,
        autoFocus: !1,
        delay: 300,
        minLength: 1,
        position: {
          my: "left top",
          at: "left bottom",
          collision: "none",
        },
        source: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        response: null,
        search: null,
        select: null,
      },
      pending: 0,
      _create: function () {
        var t,
          r,
          i,
          e = this.element[0].nodeName.toLowerCase(),
          f = "textarea" === e,
          u = "input" === e;
        (this.isMultiLine = f
          ? !0
          : u
          ? !1
          : this.element.prop("isContentEditable")),
          (this.valueMethod = this.element[f || u ? "val" : "text"]),
          (this.isNewMenu = !0),
          this.element
            .addClass("ui-autocomplete-input")
            .attr("autocomplete", "off"),
          this._on(this.element, {
            keydown: function (u) {
              if (this.element.prop("readOnly"))
                return (t = !0), (i = !0), (r = !0), undefined;
              (t = !1), (i = !1), (r = !1);
              var f = n.ui.keyCode;
              switch (u.keyCode) {
                case f.PAGE_UP:
                  (t = !0), this._move("previousPage", u);
                  break;
                case f.PAGE_DOWN:
                  (t = !0), this._move("nextPage", u);
                  break;
                case f.UP:
                  (t = !0), this._keyEvent("previous", u);
                  break;
                case f.DOWN:
                  (t = !0), this._keyEvent("next", u);
                  break;
                case f.ENTER:
                case f.NUMPAD_ENTER:
                  this.menu.active &&
                    ((t = !0), u.preventDefault(), this.menu.select(u));
                  break;
                case f.TAB:
                  this.menu.active && this.menu.select(u);
                  break;
                case f.ESCAPE:
                  this.menu.element.is(":visible") &&
                    (this._value(this.term), this.close(u), u.preventDefault());
                  break;
                default:
                  (r = !0), this._searchTimeout(u);
              }
            },
            keypress: function (i) {
              if (t)
                return (
                  (t = !1),
                  (!this.isMultiLine || this.menu.element.is(":visible")) &&
                    i.preventDefault(),
                  undefined
                );
              if (!r) {
                var u = n.ui.keyCode;
                switch (i.keyCode) {
                  case u.PAGE_UP:
                    this._move("previousPage", i);
                    break;
                  case u.PAGE_DOWN:
                    this._move("nextPage", i);
                    break;
                  case u.UP:
                    this._keyEvent("previous", i);
                    break;
                  case u.DOWN:
                    this._keyEvent("next", i);
                }
              }
            },
            input: function (n) {
              return i
                ? ((i = !1), n.preventDefault(), undefined)
                : (this._searchTimeout(n), undefined);
            },
            focus: function () {
              (this.selectedItem = null), (this.previous = this._value());
            },
            blur: function (n) {
              return this.cancelBlur
                ? (delete this.cancelBlur, undefined)
                : (clearTimeout(this.searching),
                  this.close(n),
                  this._change(n),
                  undefined);
            },
          }),
          this._initSource(),
          (this.menu = n("<ul>")
            .addClass("ui-autocomplete ui-front")
            .appendTo(this._appendTo())
            .menu({
              role: null,
            })
            .hide()
            .data("ui-menu")),
          this._on(this.menu.element, {
            mousedown: function (t) {
              t.preventDefault(),
                (this.cancelBlur = !0),
                this._delay(function () {
                  delete this.cancelBlur;
                });
              var i = this.menu.element[0];
              n(t.target).closest(".ui-menu-item").length ||
                this._delay(function () {
                  var t = this;
                  this.document.one("mousedown", function (r) {
                    r.target === t.element[0] ||
                      r.target === i ||
                      n.contains(i, r.target) ||
                      t.close();
                  });
                });
            },
            menufocus: function (t, i) {
              if (
                this.isNewMenu &&
                ((this.isNewMenu = !1),
                t.originalEvent && /^mouse/.test(t.originalEvent.type))
              )
                return (
                  this.menu.blur(),
                  this.document.one("mousemove", function () {
                    n(t.target).trigger(t.originalEvent);
                  }),
                  undefined
                );
              var r = i.item.data("ui-autocomplete-item");
              !1 !==
              this._trigger("focus", t, {
                item: r,
              })
                ? t.originalEvent &&
                  /^key/.test(t.originalEvent.type) &&
                  this._value(r.value)
                : this.liveRegion.text(r.value);
            },
            menuselect: function (n, t) {
              var i = t.item.data("ui-autocomplete-item"),
                r = this.previous;
              this.element[0] !== this.document[0].activeElement &&
                (this.element.focus(),
                (this.previous = r),
                this._delay(function () {
                  (this.previous = r), (this.selectedItem = i);
                })),
                !1 !==
                  this._trigger("select", n, {
                    item: i,
                  }) && this._value(i.value),
                (this.term = this._value()),
                this.close(n),
                (this.selectedItem = i);
            },
          }),
          (this.liveRegion = n("<span>", {
            role: "status",
            "aria-live": "polite",
          })
            .addClass("ui-helper-hidden-accessible")
            .insertBefore(this.element)),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            },
          });
      },
      _destroy: function () {
        clearTimeout(this.searching),
          this.element
            .removeClass("ui-autocomplete-input")
            .removeAttr("autocomplete"),
          this.menu.element.remove(),
          this.liveRegion.remove();
      },
      _setOption: function (n, t) {
        this._super(n, t),
          "source" === n && this._initSource(),
          "appendTo" === n && this.menu.element.appendTo(this._appendTo()),
          "disabled" === n && t && this.xhr && this.xhr.abort();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return (
          t &&
            (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)),
          t || (t = this.element.closest(".ui-front")),
          t.length || (t = this.document[0].body),
          t
        );
      },
      _initSource: function () {
        var i,
          r,
          t = this;
        n.isArray(this.options.source)
          ? ((i = this.options.source),
            (this.source = function (t, r) {
              r(n.ui.autocomplete.filter(i, t.term));
            }))
          : "string" == typeof this.options.source
          ? ((r = this.options.source),
            (this.source = function (i, u) {
              t.xhr && t.xhr.abort(),
                (t.xhr = n.ajax({
                  url: r,
                  data: i,
                  dataType: "json",
                  success: function (n) {
                    u(n);
                  },
                  error: function () {
                    u([]);
                  },
                }));
            }))
          : (this.source = this.options.source);
      },
      _searchTimeout: function (n) {
        clearTimeout(this.searching),
          (this.searching = this._delay(function () {
            this.term !== this._value() &&
              ((this.selectedItem = null), this.search(null, n));
          }, this.options.delay));
      },
      search: function (n, t) {
        return (
          (n = null != n ? n : this._value()),
          (this.term = this._value()),
          n.length < this.options.minLength
            ? this.close(t)
            : this._trigger("search", t) !== !1
            ? this._search(n)
            : undefined
        );
      },
      _search: function (n) {
        this.pending++,
          this.element.addClass("ui-autocomplete-loading"),
          (this.cancelSearch = !1),
          this.source(
            {
              term: n,
            },
            this._response()
          );
      },
      _response: function () {
        var n = this,
          i = ++t;
        return function (r) {
          i === t && n.__response(r),
            n.pending--,
            n.pending || n.element.removeClass("ui-autocomplete-loading");
        };
      },
      __response: function (n) {
        n && (n = this._normalize(n)),
          this._trigger("response", null, {
            content: n,
          }),
          !this.options.disabled && n && n.length && !this.cancelSearch
            ? (this._suggest(n), this._trigger("open"))
            : this._close();
      },
      close: function (n) {
        (this.cancelSearch = !0), this._close(n);
      },
      _close: function (n) {
        this.menu.element.is(":visible") &&
          (this.menu.element.hide(),
          this.menu.blur(),
          (this.isNewMenu = !0),
          this._trigger("close", n));
      },
      _change: function (n) {
        this.previous !== this._value() &&
          this._trigger("change", n, {
            item: this.selectedItem,
          });
      },
      _normalize: function (t) {
        return t.length && t[0].label && t[0].value
          ? t
          : n.map(t, function (t) {
              return "string" == typeof t
                ? {
                    label: t,
                    value: t,
                  }
                : n.extend(
                    {
                      label: t.label || t.value,
                      value: t.value || t.label,
                    },
                    t
                  );
            });
      },
      _suggest: function (t) {
        var i = this.menu.element.empty();
        this._renderMenu(i, t),
          (this.isNewMenu = !0),
          this.menu.refresh(),
          i.show(),
          this._resizeMenu(),
          i.position(
            n.extend(
              {
                of: this.element,
              },
              this.options.position
            )
          ),
          this.options.autoFocus && this.menu.next();
      },
      _resizeMenu: function () {
        var n = this.menu.element;
        n.outerWidth(
          Math.max(n.width("").outerWidth() + 1, this.element.outerWidth())
        );
      },
      _renderMenu: function (t, i) {
        var r = this;
        n.each(i, function (n, i) {
          r._renderItemData(t, i);
        });
      },
      _renderItemData: function (n, t) {
        return this._renderItem(n, t).data("ui-autocomplete-item", t);
      },
      _renderItem: function (t, i) {
        return n("<li>").append(n("<a>").text(i.label)).appendTo(t);
      },
      _move: function (n, t) {
        return this.menu.element.is(":visible")
          ? (this.menu.isFirstItem() && /^previous/.test(n)) ||
            (this.menu.isLastItem() && /^next/.test(n))
            ? (this._value(this.term), this.menu.blur(), undefined)
            : (this.menu[n](t), undefined)
          : (this.search(null, t), undefined);
      },
      widget: function () {
        return this.menu.element;
      },
      _value: function () {
        return this.valueMethod.apply(this.element, arguments);
      },
      _keyEvent: function (n, t) {
        (!this.isMultiLine || this.menu.element.is(":visible")) &&
          (this._move(n, t), t.preventDefault());
      },
    }),
      n.extend(n.ui.autocomplete, {
        escapeRegex: function (n) {
          return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function (t, i) {
          var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
          return n.grep(t, function (n) {
            return r.test(n.label || n.value || n);
          });
        },
      }),
      n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
          messages: {
            noResults: "No search results.",
            results: function (n) {
              return (
                n +
                (n > 1 ? " results are" : " result is") +
                " available, use up and down arrow keys to navigate."
              );
            },
          },
        },
        __response: function (n) {
          var t;
          this._superApply(arguments),
            this.options.disabled ||
              this.cancelSearch ||
              ((t =
                n && n.length
                  ? this.options.messages.results(n.length)
                  : this.options.messages.noResults),
              this.liveRegion.text(t));
        },
      });
  })(jQuery),
  (function (n) {
    var i,
      e,
      o,
      t,
      f = "ui-button ui-widget ui-state-default ui-corner-all",
      s = "ui-state-hover ui-state-active ",
      u =
        "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
      h = function () {
        var t = n(this);
        setTimeout(function () {
          t.find(":ui-button").button("refresh");
        }, 1);
      },
      r = function (t) {
        var i = t.name,
          u = t.form,
          r = n([]);
        return (
          i &&
            ((i = i.replace(/'/g, "\\'")),
            (r = u
              ? n(u).find("[name='" + i + "']")
              : n("[name='" + i + "']", t.ownerDocument).filter(function () {
                  return !this.form;
                }))),
          r
        );
      };
    n.widget("ui.button", {
      version: "1.10.3",
      defaultElement: "<button>",
      options: {
        disabled: null,
        text: !0,
        label: null,
        icons: {
          primary: null,
          secondary: null,
        },
      },
      _create: function () {
        this.element
          .closest("form")
          .unbind("reset" + this.eventNamespace)
          .bind("reset" + this.eventNamespace, h),
          "boolean" != typeof this.options.disabled
            ? (this.options.disabled = !!this.element.prop("disabled"))
            : this.element.prop("disabled", this.options.disabled),
          this._determineButtonType(),
          (this.hasTitle = !!this.buttonElement.attr("title"));
        var s = this,
          u = this.options,
          l = "checkbox" === this.type || "radio" === this.type,
          a = l ? "" : "ui-state-active",
          c = "ui-state-focus";
        null === u.label &&
          (u.label =
            "input" === this.type
              ? this.buttonElement.val()
              : this.buttonElement.html()),
          this._hoverable(this.buttonElement),
          this.buttonElement
            .addClass(f)
            .attr("role", "button")
            .bind("mouseenter" + this.eventNamespace, function () {
              u.disabled || (this === i && n(this).addClass("ui-state-active"));
            })
            .bind("mouseleave" + this.eventNamespace, function () {
              u.disabled || n(this).removeClass(a);
            })
            .bind("click" + this.eventNamespace, function (n) {
              u.disabled && (n.preventDefault(), n.stopImmediatePropagation());
            }),
          this.element
            .bind("focus" + this.eventNamespace, function () {
              s.buttonElement.addClass(c);
            })
            .bind("blur" + this.eventNamespace, function () {
              s.buttonElement.removeClass(c);
            }),
          l &&
            (this.element.bind("change" + this.eventNamespace, function () {
              t || s.refresh();
            }),
            this.buttonElement
              .bind("mousedown" + this.eventNamespace, function (n) {
                u.disabled || ((t = !1), (e = n.pageX), (o = n.pageY));
              })
              .bind("mouseup" + this.eventNamespace, function (n) {
                u.disabled || ((e !== n.pageX || o !== n.pageY) && (t = !0));
              })),
          "checkbox" === this.type
            ? this.buttonElement.bind(
                "click" + this.eventNamespace,
                function () {
                  return u.disabled || t ? !1 : undefined;
                }
              )
            : "radio" === this.type
            ? this.buttonElement.bind(
                "click" + this.eventNamespace,
                function () {
                  if (u.disabled || t) return !1;
                  n(this).addClass("ui-state-active"),
                    s.buttonElement.attr("aria-pressed", "true");
                  var i = s.element[0];
                  r(i)
                    .not(i)
                    .map(function () {
                      return n(this).button("widget")[0];
                    })
                    .removeClass("ui-state-active")
                    .attr("aria-pressed", "false");
                }
              )
            : (this.buttonElement
                .bind("mousedown" + this.eventNamespace, function () {
                  return u.disabled
                    ? !1
                    : (n(this).addClass("ui-state-active"),
                      (i = this),
                      s.document.one("mouseup", function () {
                        i = null;
                      }),
                      undefined);
                })
                .bind("mouseup" + this.eventNamespace, function () {
                  return u.disabled
                    ? !1
                    : (n(this).removeClass("ui-state-active"), undefined);
                })
                .bind("keydown" + this.eventNamespace, function (t) {
                  return u.disabled
                    ? !1
                    : ((t.keyCode === n.ui.keyCode.SPACE ||
                        t.keyCode === n.ui.keyCode.ENTER) &&
                        n(this).addClass("ui-state-active"),
                      undefined);
                })
                .bind(
                  "keyup" + this.eventNamespace + " blur" + this.eventNamespace,
                  function () {
                    n(this).removeClass("ui-state-active");
                  }
                ),
              this.buttonElement.is("a") &&
                this.buttonElement.keyup(function (t) {
                  t.keyCode === n.ui.keyCode.SPACE && n(this).click();
                })),
          this._setOption("disabled", u.disabled),
          this._resetButton();
      },
      _determineButtonType: function () {
        var n, t, i;
        (this.type = this.element.is("[type=checkbox]")
          ? "checkbox"
          : this.element.is("[type=radio]")
          ? "radio"
          : this.element.is("input")
          ? "input"
          : "button"),
          "checkbox" === this.type || "radio" === this.type
            ? ((n = this.element.parents().last()),
              (t = "label[for='" + this.element.attr("id") + "']"),
              (this.buttonElement = n.find(t)),
              this.buttonElement.length ||
                ((n = n.length ? n.siblings() : this.element.siblings()),
                (this.buttonElement = n.filter(t)),
                this.buttonElement.length || (this.buttonElement = n.find(t))),
              this.element.addClass("ui-helper-hidden-accessible"),
              (i = this.element.is(":checked")),
              i && this.buttonElement.addClass("ui-state-active"),
              this.buttonElement.prop("aria-pressed", i))
            : (this.buttonElement = this.element);
      },
      widget: function () {
        return this.buttonElement;
      },
      _destroy: function () {
        this.element.removeClass("ui-helper-hidden-accessible"),
          this.buttonElement
            .removeClass(f + " " + s + " " + u)
            .removeAttr("role")
            .removeAttr("aria-pressed")
            .html(this.buttonElement.find(".ui-button-text").html()),
          this.hasTitle || this.buttonElement.removeAttr("title");
      },
      _setOption: function (n, t) {
        return (
          this._super(n, t),
          "disabled" === n
            ? (t
                ? this.element.prop("disabled", !0)
                : this.element.prop("disabled", !1),
              undefined)
            : (this._resetButton(), undefined)
        );
      },
      refresh: function () {
        var t = this.element.is("input, button")
          ? this.element.is(":disabled")
          : this.element.hasClass("ui-button-disabled");
        t !== this.options.disabled && this._setOption("disabled", t),
          "radio" === this.type
            ? r(this.element[0]).each(function () {
                n(this).is(":checked")
                  ? n(this)
                      .button("widget")
                      .addClass("ui-state-active")
                      .attr("aria-pressed", "true")
                  : n(this)
                      .button("widget")
                      .removeClass("ui-state-active")
                      .attr("aria-pressed", "false");
              })
            : "checkbox" === this.type &&
              (this.element.is(":checked")
                ? this.buttonElement
                    .addClass("ui-state-active")
                    .attr("aria-pressed", "true")
                : this.buttonElement
                    .removeClass("ui-state-active")
                    .attr("aria-pressed", "false"));
      },
      _resetButton: function () {
        if ("input" === this.type)
          return (
            this.options.label && this.element.val(this.options.label),
            undefined
          );
        var i = this.buttonElement.removeClass(u),
          e = n("<span></span>", this.document[0])
            .addClass("ui-button-text")
            .html(this.options.label)
            .appendTo(i.empty())
            .text(),
          t = this.options.icons,
          f = t.primary && t.secondary,
          r = [];
        t.primary || t.secondary
          ? (this.options.text &&
              r.push(
                "ui-button-text-icon" +
                  (f ? "s" : t.primary ? "-primary" : "-secondary")
              ),
            t.primary &&
              i.prepend(
                "<span class='ui-button-icon-primary ui-icon " +
                  t.primary +
                  "'></span>"
              ),
            t.secondary &&
              i.append(
                "<span class='ui-button-icon-secondary ui-icon " +
                  t.secondary +
                  "'></span>"
              ),
            this.options.text ||
              (r.push(f ? "ui-button-icons-only" : "ui-button-icon-only"),
              this.hasTitle || i.attr("title", n.trim(e))))
          : r.push("ui-button-text-only"),
          i.addClass(r.join(" "));
      },
    }),
      n.widget("ui.buttonset", {
        version: "1.10.3",
        options: {
          items:
            "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)",
        },
        _create: function () {
          this.element.addClass("ui-buttonset");
        },
        _init: function () {
          this.refresh();
        },
        _setOption: function (n, t) {
          "disabled" === n && this.buttons.button("option", n, t),
            this._super(n, t);
        },
        refresh: function () {
          var t = "rtl" === this.element.css("direction");
          this.buttons = this.element
            .find(this.options.items)
            .filter(":ui-button")
            .button("refresh")
            .end()
            .not(":ui-button")
            .button()
            .end()
            .map(function () {
              return n(this).button("widget")[0];
            })
            .removeClass("ui-corner-all ui-corner-left ui-corner-right")
            .filter(":first")
            .addClass(t ? "ui-corner-right" : "ui-corner-left")
            .end()
            .filter(":last")
            .addClass(t ? "ui-corner-left" : "ui-corner-right")
            .end()
            .end();
        },
        _destroy: function () {
          this.element.removeClass("ui-buttonset"),
            this.buttons
              .map(function () {
                return n(this).button("widget")[0];
              })
              .removeClass("ui-corner-left ui-corner-right")
              .end()
              .button("destroy");
        },
      });
  })(jQuery),
  (function (n, t) {
    function e() {
      (this._curInst = null),
        (this._keyEvent = !1),
        (this._disabledInputs = []),
        (this._datepickerShowing = !1),
        (this._inDialog = !1),
        (this._mainDivId = "ui-datepicker-div"),
        (this._inlineClass = "ui-datepicker-inline"),
        (this._appendClass = "ui-datepicker-append"),
        (this._triggerClass = "ui-datepicker-trigger"),
        (this._dialogClass = "ui-datepicker-dialog"),
        (this._disableClass = "ui-datepicker-disabled"),
        (this._unselectableClass = "ui-datepicker-unselectable"),
        (this._currentClass = "ui-datepicker-current-day"),
        (this._dayOverClass = "ui-datepicker-days-cell-over"),
        (this.regional = []),
        (this.regional[""] = {
          closeText: "Done",
          prevText: "Prev",
          nextText: "Next",
          currentText: "Today",
          monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          monthNamesShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          dayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          weekHeader: "Wk",
          dateFormat: "mm/dd/yy",
          firstDay: 0,
          isRTL: !1,
          showMonthAfterYear: !1,
          yearSuffix: "",
        }),
        (this._defaults = {
          showOn: "focus",
          showAnim: "fadeIn",
          showOptions: {},
          defaultDate: null,
          appendText: "",
          buttonText: "...",
          buttonImage: "",
          buttonImageOnly: !1,
          hideIfNoPrevNext: !1,
          navigationAsDateFormat: !1,
          gotoCurrent: !1,
          changeMonth: !1,
          changeYear: !1,
          yearRange: "c-10:c+10",
          showOtherMonths: !1,
          selectOtherMonths: !1,
          showWeek: !1,
          calculateWeek: this.iso8601Week,
          shortYearCutoff: "+10",
          minDate: null,
          maxDate: null,
          duration: "fast",
          beforeShowDay: null,
          beforeShow: null,
          onSelect: null,
          onChangeMonthYear: null,
          onClose: null,
          numberOfMonths: 1,
          showCurrentAtPos: 0,
          stepMonths: 1,
          stepBigMonths: 12,
          altField: "",
          altFormat: "",
          constrainInput: !0,
          showButtonPanel: !1,
          autoSize: !1,
          disabled: !1,
        }),
        n.extend(this._defaults, this.regional[""]),
        (this.dpDiv = f(
          n(
            "<div id='" +
              this._mainDivId +
              "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
          )
        ));
    }
    function f(t) {
      var i =
        "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
      return t
        .delegate(i, "mouseout", function () {
          n(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") &&
              n(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") &&
              n(this).removeClass("ui-datepicker-next-hover");
        })
        .delegate(i, "mouseover", function () {
          n.datepicker._isDisabledDatepicker(
            u.inline ? t.parent()[0] : u.input[0]
          ) ||
            (n(this)
              .parents(".ui-datepicker-calendar")
              .find("a")
              .removeClass("ui-state-hover"),
            n(this).addClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") &&
              n(this).addClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") &&
              n(this).addClass("ui-datepicker-next-hover"));
        });
    }
    function r(t, i) {
      n.extend(t, i);
      for (var r in i) null == i[r] && (t[r] = i[r]);
      return t;
    }
    n.extend(n.ui, {
      datepicker: {
        version: "1.10.3",
      },
    });
    var u,
      i = "datepicker";
    n.extend(e.prototype, {
      markerClassName: "hasDatepicker",
      maxRows: 4,
      _widgetDatepicker: function () {
        return this.dpDiv;
      },
      setDefaults: function (n) {
        return r(this._defaults, n || {}), this;
      },
      _attachDatepicker: function (t, i) {
        var u, f, r;
        (u = t.nodeName.toLowerCase()),
          (f = "div" === u || "span" === u),
          t.id || ((this.uuid += 1), (t.id = "dp" + this.uuid)),
          (r = this._newInst(n(t), f)),
          (r.settings = n.extend({}, i || {})),
          "input" === u
            ? this._connectDatepicker(t, r)
            : f && this._inlineDatepicker(t, r);
      },
      _newInst: function (t, i) {
        var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
        return {
          id: r,
          input: t,
          selectedDay: 0,
          selectedMonth: 0,
          selectedYear: 0,
          drawMonth: 0,
          drawYear: 0,
          inline: i,
          dpDiv: i
            ? f(
                n(
                  "<div class='" +
                    this._inlineClass +
                    " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
                )
              )
            : this.dpDiv,
        };
      },
      _connectDatepicker: function (t, r) {
        var u = n(t);
        (r.append = n([])),
          (r.trigger = n([])),
          u.hasClass(this.markerClassName) ||
            (this._attachments(u, r),
            u
              .addClass(this.markerClassName)
              .keydown(this._doKeyDown)
              .keypress(this._doKeyPress)
              .keyup(this._doKeyUp),
            this._autoSize(r),
            n.data(t, i, r),
            r.settings.disabled && this._disableDatepicker(t));
      },
      _attachments: function (t, i) {
        var u,
          r,
          f,
          o = this._get(i, "appendText"),
          e = this._get(i, "isRTL");
        i.append && i.append.remove(),
          o &&
            ((i.append = n(
              "<span class='" + this._appendClass + "'>" + o + "</span>"
            )),
            t[e ? "before" : "after"](i.append)),
          t.unbind("focus", this._showDatepicker),
          i.trigger && i.trigger.remove(),
          (u = this._get(i, "showOn")),
          ("focus" === u || "both" === u) && t.focus(this._showDatepicker),
          ("button" === u || "both" === u) &&
            ((r = this._get(i, "buttonText")),
            (f = this._get(i, "buttonImage")),
            (i.trigger = n(
              this._get(i, "buttonImageOnly")
                ? n("<img/>").addClass(this._triggerClass).attr({
                    src: f,
                    alt: r,
                    title: r,
                  })
                : n("<button type='button'></button>")
                    .addClass(this._triggerClass)
                    .html(
                      f
                        ? n("<img/>").attr({
                            src: f,
                            alt: r,
                            title: r,
                          })
                        : r
                    )
            )),
            t[e ? "before" : "after"](i.trigger),
            i.trigger.click(function () {
              return (
                n.datepicker._datepickerShowing &&
                n.datepicker._lastInput === t[0]
                  ? n.datepicker._hideDatepicker()
                  : n.datepicker._datepickerShowing &&
                    n.datepicker._lastInput !== t[0]
                  ? (n.datepicker._hideDatepicker(),
                    n.datepicker._showDatepicker(t[0]))
                  : n.datepicker._showDatepicker(t[0]),
                !1
              );
            }));
      },
      _autoSize: function (n) {
        if (this._get(n, "autoSize") && !n.inline) {
          var u,
            f,
            e,
            t,
            i = new Date(2009, 11, 20),
            r = this._get(n, "dateFormat");
          r.match(/[DM]/) &&
            ((u = function (n) {
              for (f = 0, e = 0, t = 0; n.length > t; t++)
                n[t].length > f && ((f = n[t].length), (e = t));
              return e;
            }),
            i.setMonth(
              u(this._get(n, r.match(/MM/) ? "monthNames" : "monthNamesShort"))
            ),
            i.setDate(
              u(this._get(n, r.match(/DD/) ? "dayNames" : "dayNamesShort")) +
                20 -
                i.getDay()
            )),
            n.input.attr("size", this._formatDate(n, i).length);
        }
      },
      _inlineDatepicker: function (t, r) {
        var u = n(t);
        u.hasClass(this.markerClassName) ||
          (u.addClass(this.markerClassName).append(r.dpDiv),
          n.data(t, i, r),
          this._setDate(r, this._getDefaultDate(r), !0),
          this._updateDatepicker(r),
          this._updateAlternate(r),
          r.settings.disabled && this._disableDatepicker(t),
          r.dpDiv.css("display", "block"));
      },
      _dialogDatepicker: function (t, u, f, e, o) {
        var c,
          a,
          v,
          l,
          h,
          s = this._dialogInst;
        return (
          s ||
            ((this.uuid += 1),
            (c = "dp" + this.uuid),
            (this._dialogInput = n(
              "<input type='text' id='" +
                c +
                "' style='position: absolute; top: -100px; width: 0px;'/>"
            )),
            this._dialogInput.keydown(this._doKeyDown),
            n("body").append(this._dialogInput),
            (s = this._dialogInst = this._newInst(this._dialogInput, !1)),
            (s.settings = {}),
            n.data(this._dialogInput[0], i, s)),
          r(s.settings, e || {}),
          (u = u && u.constructor === Date ? this._formatDate(s, u) : u),
          this._dialogInput.val(u),
          (this._pos = o ? (o.length ? o : [o.pageX, o.pageY]) : null),
          this._pos ||
            ((a = document.documentElement.clientWidth),
            (v = document.documentElement.clientHeight),
            (l =
              document.documentElement.scrollLeft || document.body.scrollLeft),
            (h = document.documentElement.scrollTop || document.body.scrollTop),
            (this._pos = [a / 2 - 100 + l, v / 2 - 150 + h])),
          this._dialogInput
            .css("left", this._pos[0] + 20 + "px")
            .css("top", this._pos[1] + "px"),
          (s.settings.onSelect = f),
          (this._inDialog = !0),
          this.dpDiv.addClass(this._dialogClass),
          this._showDatepicker(this._dialogInput[0]),
          n.blockUI && n.blockUI(this.dpDiv),
          n.data(this._dialogInput[0], i, s),
          this
        );
      },
      _destroyDatepicker: function (t) {
        var r,
          u = n(t),
          f = n.data(t, i);
        u.hasClass(this.markerClassName) &&
          ((r = t.nodeName.toLowerCase()),
          n.removeData(t, i),
          "input" === r
            ? (f.append.remove(),
              f.trigger.remove(),
              u
                .removeClass(this.markerClassName)
                .unbind("focus", this._showDatepicker)
                .unbind("keydown", this._doKeyDown)
                .unbind("keypress", this._doKeyPress)
                .unbind("keyup", this._doKeyUp))
            : ("div" === r || "span" === r) &&
              u.removeClass(this.markerClassName).empty());
      },
      _enableDatepicker: function (t) {
        var r,
          u,
          f = n(t),
          e = n.data(t, i);
        f.hasClass(this.markerClassName) &&
          ((r = t.nodeName.toLowerCase()),
          "input" === r
            ? ((t.disabled = !1),
              e.trigger
                .filter("button")
                .each(function () {
                  this.disabled = !1;
                })
                .end()
                .filter("img")
                .css({
                  opacity: "1.0",
                  cursor: "",
                }))
            : ("div" === r || "span" === r) &&
              ((u = f.children("." + this._inlineClass)),
              u.children().removeClass("ui-state-disabled"),
              u
                .find("select.ui-datepicker-month, select.ui-datepicker-year")
                .prop("disabled", !1)),
          (this._disabledInputs = n.map(this._disabledInputs, function (n) {
            return n === t ? null : n;
          })));
      },
      _disableDatepicker: function (t) {
        var r,
          u,
          f = n(t),
          e = n.data(t, i);
        f.hasClass(this.markerClassName) &&
          ((r = t.nodeName.toLowerCase()),
          "input" === r
            ? ((t.disabled = !0),
              e.trigger
                .filter("button")
                .each(function () {
                  this.disabled = !0;
                })
                .end()
                .filter("img")
                .css({
                  opacity: "0.5",
                  cursor: "default",
                }))
            : ("div" === r || "span" === r) &&
              ((u = f.children("." + this._inlineClass)),
              u.children().addClass("ui-state-disabled"),
              u
                .find("select.ui-datepicker-month, select.ui-datepicker-year")
                .prop("disabled", !0)),
          (this._disabledInputs = n.map(this._disabledInputs, function (n) {
            return n === t ? null : n;
          })),
          (this._disabledInputs[this._disabledInputs.length] = t));
      },
      _isDisabledDatepicker: function (n) {
        if (!n) return !1;
        for (var t = 0; this._disabledInputs.length > t; t++)
          if (this._disabledInputs[t] === n) return !0;
        return !1;
      },
      _getInst: function (t) {
        try {
          return n.data(t, i);
        } catch (r) {
          throw "Missing instance data for this datepicker";
        }
      },
      _optionDatepicker: function (i, u, f) {
        var o,
          c,
          h,
          s,
          e = this._getInst(i);
        return 2 === arguments.length && "string" == typeof u
          ? "defaults" === u
            ? n.extend({}, n.datepicker._defaults)
            : e
            ? "all" === u
              ? n.extend({}, e.settings)
              : this._get(e, u)
            : null
          : ((o = u || {}),
            "string" == typeof u && ((o = {}), (o[u] = f)),
            e &&
              (this._curInst === e && this._hideDatepicker(),
              (c = this._getDateDatepicker(i, !0)),
              (h = this._getMinMaxDate(e, "min")),
              (s = this._getMinMaxDate(e, "max")),
              r(e.settings, o),
              null !== h &&
                o.dateFormat !== t &&
                o.minDate === t &&
                (e.settings.minDate = this._formatDate(e, h)),
              null !== s &&
                o.dateFormat !== t &&
                o.maxDate === t &&
                (e.settings.maxDate = this._formatDate(e, s)),
              "disabled" in o &&
                (o.disabled
                  ? this._disableDatepicker(i)
                  : this._enableDatepicker(i)),
              this._attachments(n(i), e),
              this._autoSize(e),
              this._setDate(e, c),
              this._updateAlternate(e),
              this._updateDatepicker(e)),
            t);
      },
      _changeDatepicker: function (n, t, i) {
        this._optionDatepicker(n, t, i);
      },
      _refreshDatepicker: function (n) {
        var t = this._getInst(n);
        t && this._updateDatepicker(t);
      },
      _setDateDatepicker: function (n, t) {
        var i = this._getInst(n);
        i &&
          (this._setDate(i, t),
          this._updateDatepicker(i),
          this._updateAlternate(i));
      },
      _getDateDatepicker: function (n, t) {
        var i = this._getInst(n);
        return (
          i && !i.inline && this._setDateFromField(i, t),
          i ? this._getDate(i) : null
        );
      },
      _doKeyDown: function (t) {
        var f,
          o,
          u,
          i = n.datepicker._getInst(t.target),
          r = !0,
          e = i.dpDiv.is(".ui-datepicker-rtl");
        if (((i._keyEvent = !0), n.datepicker._datepickerShowing))
          switch (t.keyCode) {
            case 9:
              n.datepicker._hideDatepicker(), (r = !1);
              break;
            case 13:
              return (
                (u = n(
                  "td." +
                    n.datepicker._dayOverClass +
                    ":not(." +
                    n.datepicker._currentClass +
                    ")",
                  i.dpDiv
                )),
                u[0] &&
                  n.datepicker._selectDay(
                    t.target,
                    i.selectedMonth,
                    i.selectedYear,
                    u[0]
                  ),
                (f = n.datepicker._get(i, "onSelect")),
                f
                  ? ((o = n.datepicker._formatDate(i)),
                    f.apply(i.input ? i.input[0] : null, [o, i]))
                  : n.datepicker._hideDatepicker(),
                !1
              );
            case 27:
              n.datepicker._hideDatepicker();
              break;
            case 33:
              n.datepicker._adjustDate(
                t.target,
                t.ctrlKey
                  ? -n.datepicker._get(i, "stepBigMonths")
                  : -n.datepicker._get(i, "stepMonths"),
                "M"
              );
              break;
            case 34:
              n.datepicker._adjustDate(
                t.target,
                t.ctrlKey
                  ? +n.datepicker._get(i, "stepBigMonths")
                  : +n.datepicker._get(i, "stepMonths"),
                "M"
              );
              break;
            case 35:
              (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target),
                (r = t.ctrlKey || t.metaKey);
              break;
            case 36:
              (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target),
                (r = t.ctrlKey || t.metaKey);
              break;
            case 37:
              (t.ctrlKey || t.metaKey) &&
                n.datepicker._adjustDate(t.target, e ? 1 : -1, "D"),
                (r = t.ctrlKey || t.metaKey),
                t.originalEvent.altKey &&
                  n.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey
                      ? -n.datepicker._get(i, "stepBigMonths")
                      : -n.datepicker._get(i, "stepMonths"),
                    "M"
                  );
              break;
            case 38:
              (t.ctrlKey || t.metaKey) &&
                n.datepicker._adjustDate(t.target, -7, "D"),
                (r = t.ctrlKey || t.metaKey);
              break;
            case 39:
              (t.ctrlKey || t.metaKey) &&
                n.datepicker._adjustDate(t.target, e ? -1 : 1, "D"),
                (r = t.ctrlKey || t.metaKey),
                t.originalEvent.altKey &&
                  n.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey
                      ? +n.datepicker._get(i, "stepBigMonths")
                      : +n.datepicker._get(i, "stepMonths"),
                    "M"
                  );
              break;
            case 40:
              (t.ctrlKey || t.metaKey) &&
                n.datepicker._adjustDate(t.target, 7, "D"),
                (r = t.ctrlKey || t.metaKey);
              break;
            default:
              r = !1;
          }
        else
          36 === t.keyCode && t.ctrlKey
            ? n.datepicker._showDatepicker(this)
            : (r = !1);
        r && (t.preventDefault(), t.stopPropagation());
      },
      _doKeyPress: function (i) {
        var u,
          r,
          f = n.datepicker._getInst(i.target);
        return n.datepicker._get(f, "constrainInput")
          ? ((u = n.datepicker._possibleChars(
              n.datepicker._get(f, "dateFormat")
            )),
            (r = String.fromCharCode(
              null == i.charCode ? i.keyCode : i.charCode
            )),
            i.ctrlKey || i.metaKey || " " > r || !u || u.indexOf(r) > -1)
          : t;
      },
      _doKeyUp: function (t) {
        var r,
          i = n.datepicker._getInst(t.target);
        if (i.input.val() !== i.lastVal)
          try {
            (r = n.datepicker.parseDate(
              n.datepicker._get(i, "dateFormat"),
              i.input ? i.input.val() : null,
              n.datepicker._getFormatConfig(i)
            )),
              r &&
                (n.datepicker._setDateFromField(i),
                n.datepicker._updateAlternate(i),
                n.datepicker._updateDatepicker(i));
          } catch (u) {}
        return !0;
      },
      _showDatepicker: function (t) {
        if (
          ((t = t.target || t),
          "input" !== t.nodeName.toLowerCase() &&
            (t = n("input", t.parentNode)[0]),
          !n.datepicker._isDisabledDatepicker(t) &&
            n.datepicker._lastInput !== t)
        ) {
          var i, s, h, u, e, f, o;
          (i = n.datepicker._getInst(t)),
            n.datepicker._curInst &&
              n.datepicker._curInst !== i &&
              (n.datepicker._curInst.dpDiv.stop(!0, !0),
              i &&
                n.datepicker._datepickerShowing &&
                n.datepicker._hideDatepicker(n.datepicker._curInst.input[0])),
            (s = n.datepicker._get(i, "beforeShow")),
            (h = s ? s.apply(t, [t, i]) : {}),
            h !== !1 &&
              (r(i.settings, h),
              (i.lastVal = null),
              (n.datepicker._lastInput = t),
              n.datepicker._setDateFromField(i),
              n.datepicker._inDialog && (t.value = ""),
              n.datepicker._pos ||
                ((n.datepicker._pos = n.datepicker._findPos(t)),
                (n.datepicker._pos[1] += t.offsetHeight)),
              (u = !1),
              n(t)
                .parents()
                .each(function () {
                  return (u |= "fixed" === n(this).css("position")), !u;
                }),
              (e = {
                left: n.datepicker._pos[0],
                top: n.datepicker._pos[1],
              }),
              (n.datepicker._pos = null),
              i.dpDiv.empty(),
              i.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px",
              }),
              n.datepicker._updateDatepicker(i),
              (e = n.datepicker._checkOffset(i, e, u)),
              i.dpDiv.css({
                position:
                  n.datepicker._inDialog && n.blockUI
                    ? "static"
                    : u
                    ? "fixed"
                    : "absolute",
                display: "none",
                left: e.left + "px",
                top: e.top + "px",
              }),
              i.inline ||
                ((f = n.datepicker._get(i, "showAnim")),
                (o = n.datepicker._get(i, "duration")),
                i.dpDiv.zIndex(n(t).zIndex() + 1),
                (n.datepicker._datepickerShowing = !0),
                n.effects && n.effects.effect[f]
                  ? i.dpDiv.show(f, n.datepicker._get(i, "showOptions"), o)
                  : i.dpDiv[f || "show"](f ? o : null),
                n.datepicker._shouldFocusInput(i) && i.input.focus(),
                (n.datepicker._curInst = i)));
        }
      },
      _updateDatepicker: function (t) {
        (this.maxRows = 4),
          (u = t),
          t.dpDiv.empty().append(this._generateHTML(t)),
          this._attachHandlers(t),
          t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
        var f,
          r = this._getNumberOfMonths(t),
          i = r[1],
          e = 17;
        t.dpDiv
          .removeClass(
            "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
          )
          .width(""),
          i > 1 &&
            t.dpDiv
              .addClass("ui-datepicker-multi-" + i)
              .css("width", e * i + "em"),
          t.dpDiv[(1 !== r[0] || 1 !== r[1] ? "add" : "remove") + "Class"](
            "ui-datepicker-multi"
          ),
          t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"](
            "ui-datepicker-rtl"
          ),
          t === n.datepicker._curInst &&
            n.datepicker._datepickerShowing &&
            n.datepicker._shouldFocusInput(t) &&
            t.input.focus(),
          t.yearshtml &&
            ((f = t.yearshtml),
            setTimeout(function () {
              f === t.yearshtml &&
                t.yearshtml &&
                t.dpDiv
                  .find("select.ui-datepicker-year:first")
                  .replaceWith(t.yearshtml),
                (f = t.yearshtml = null);
            }, 0));
      },
      _shouldFocusInput: function (n) {
        return (
          n.input &&
          n.input.is(":visible") &&
          !n.input.is(":disabled") &&
          !n.input.is(":focus")
        );
      },
      _checkOffset: function (t, i, r) {
        var u = t.dpDiv.outerWidth(),
          e = t.dpDiv.outerHeight(),
          h = t.input ? t.input.outerWidth() : 0,
          s = t.input ? t.input.outerHeight() : 0,
          f =
            document.documentElement.clientWidth +
            (r ? 0 : n(document).scrollLeft()),
          o =
            document.documentElement.clientHeight +
            (r ? 0 : n(document).scrollTop());
        return (
          (i.left -= this._get(t, "isRTL") ? u - h : 0),
          (i.left -=
            r && i.left === t.input.offset().left
              ? n(document).scrollLeft()
              : 0),
          (i.top -=
            r && i.top === t.input.offset().top + s
              ? n(document).scrollTop()
              : 0),
          (i.left -= Math.min(
            i.left,
            i.left + u > f && f > u ? Math.abs(i.left + u - f) : 0
          )),
          (i.top -= Math.min(
            i.top,
            i.top + e > o && o > e ? Math.abs(e + s) : 0
          )),
          i
        );
      },
      _findPos: function (t) {
        for (
          var i, u = this._getInst(t), r = this._get(u, "isRTL");
          t &&
          ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));

        )
          t = t[r ? "previousSibling" : "nextSibling"];
        return (i = n(t).offset()), [i.left, i.top];
      },
      _hideDatepicker: function (t) {
        var u,
          e,
          f,
          o,
          r = this._curInst;
        !r ||
          (t && r !== n.data(t, i)) ||
          (this._datepickerShowing &&
            ((u = this._get(r, "showAnim")),
            (e = this._get(r, "duration")),
            (f = function () {
              n.datepicker._tidyDialog(r);
            }),
            n.effects && (n.effects.effect[u] || n.effects[u])
              ? r.dpDiv.hide(u, n.datepicker._get(r, "showOptions"), e, f)
              : r.dpDiv[
                  "slideDown" === u
                    ? "slideUp"
                    : "fadeIn" === u
                    ? "fadeOut"
                    : "hide"
                ](u ? e : null, f),
            u || f(),
            (this._datepickerShowing = !1),
            (o = this._get(r, "onClose")),
            o &&
              o.apply(r.input ? r.input[0] : null, [
                r.input ? r.input.val() : "",
                r,
              ]),
            (this._lastInput = null),
            this._inDialog &&
              (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px",
              }),
              n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))),
            (this._inDialog = !1)));
      },
      _tidyDialog: function (n) {
        n.dpDiv
          .removeClass(this._dialogClass)
          .unbind(".ui-datepicker-calendar");
      },
      _checkExternalClick: function (t) {
        if (n.datepicker._curInst) {
          var i = n(t.target),
            r = n.datepicker._getInst(i[0]);
          ((i[0].id !== n.datepicker._mainDivId &&
            0 === i.parents("#" + n.datepicker._mainDivId).length &&
            !i.hasClass(n.datepicker.markerClassName) &&
            !i.closest("." + n.datepicker._triggerClass).length &&
            n.datepicker._datepickerShowing &&
            (!n.datepicker._inDialog || !n.blockUI)) ||
            (i.hasClass(n.datepicker.markerClassName) &&
              n.datepicker._curInst !== r)) &&
            n.datepicker._hideDatepicker();
        }
      },
      _adjustDate: function (t, i, r) {
        var f = n(t),
          u = this._getInst(f[0]);
        this._isDisabledDatepicker(f[0]) ||
          (this._adjustInstDate(
            u,
            i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0),
            r
          ),
          this._updateDatepicker(u));
      },
      _gotoToday: function (t) {
        var r,
          u = n(t),
          i = this._getInst(u[0]);
        this._get(i, "gotoCurrent") && i.currentDay
          ? ((i.selectedDay = i.currentDay),
            (i.drawMonth = i.selectedMonth = i.currentMonth),
            (i.drawYear = i.selectedYear = i.currentYear))
          : ((r = new Date()),
            (i.selectedDay = r.getDate()),
            (i.drawMonth = i.selectedMonth = r.getMonth()),
            (i.drawYear = i.selectedYear = r.getFullYear())),
          this._notifyChange(i),
          this._adjustDate(u);
      },
      _selectMonthYear: function (t, i, r) {
        var f = n(t),
          u = this._getInst(f[0]);
        (u["selected" + ("M" === r ? "Month" : "Year")] = u[
          "draw" + ("M" === r ? "Month" : "Year")
        ] = parseInt(i.options[i.selectedIndex].value, 10)),
          this._notifyChange(u),
          this._adjustDate(f);
      },
      _selectDay: function (t, i, r, u) {
        var f,
          e = n(t);
        n(u).hasClass(this._unselectableClass) ||
          this._isDisabledDatepicker(e[0]) ||
          ((f = this._getInst(e[0])),
          (f.selectedDay = f.currentDay = n("a", u).html()),
          (f.selectedMonth = f.currentMonth = i),
          (f.selectedYear = f.currentYear = r),
          this._selectDate(
            t,
            this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)
          ));
      },
      _clearDate: function (t) {
        var i = n(t);
        this._selectDate(i, "");
      },
      _selectDate: function (t, i) {
        var u,
          f = n(t),
          r = this._getInst(f[0]);
        (i = null != i ? i : this._formatDate(r)),
          r.input && r.input.val(i),
          this._updateAlternate(r),
          (u = this._get(r, "onSelect")),
          u
            ? u.apply(r.input ? r.input[0] : null, [i, r])
            : r.input && r.input.trigger("change"),
          r.inline
            ? this._updateDatepicker(r)
            : (this._hideDatepicker(),
              (this._lastInput = r.input[0]),
              "object" != typeof r.input[0] && r.input.focus(),
              (this._lastInput = null));
      },
      _updateAlternate: function (t) {
        var u,
          f,
          i,
          r = this._get(t, "altField");
        r &&
          ((u = this._get(t, "altFormat") || this._get(t, "dateFormat")),
          (f = this._getDate(t)),
          (i = this.formatDate(u, f, this._getFormatConfig(t))),
          n(r).each(function () {
            n(this).val(i);
          }));
      },
      noWeekends: function (n) {
        var t = n.getDay();
        return [t > 0 && 6 > t, ""];
      },
      iso8601Week: function (n) {
        var i,
          t = new Date(n.getTime());
        return (
          t.setDate(t.getDate() + 4 - (t.getDay() || 7)),
          (i = t.getTime()),
          t.setMonth(0),
          t.setDate(1),
          Math.floor(Math.round((i - t) / 86400000) / 7) + 1
        );
      },
      parseDate: function (i, r, u) {
        if (null == i || null == r) throw "Invalid arguments";
        if (((r = "object" == typeof r ? "" + r : r + ""), "" === r))
          return null;
        for (
          var p,
            w,
            f,
            e = 0,
            b =
              (u ? u.shortYearCutoff : null) || this._defaults.shortYearCutoff,
            it =
              "string" != typeof b
                ? b
                : (new Date().getFullYear() % 100) + parseInt(b, 10),
            rt = (u ? u.dayNamesShort : null) || this._defaults.dayNamesShort,
            g = (u ? u.dayNames : null) || this._defaults.dayNames,
            nt =
              (u ? u.monthNamesShort : null) || this._defaults.monthNamesShort,
            tt = (u ? u.monthNames : null) || this._defaults.monthNames,
            o = -1,
            h = -1,
            c = -1,
            y = -1,
            v = !1,
            a = function (n) {
              var t = i.length > s + 1 && i.charAt(s + 1) === n;
              return t && s++, t;
            },
            l = function (n) {
              var f = a(n),
                i =
                  "@" === n
                    ? 14
                    : "!" === n
                    ? 20
                    : "y" === n && f
                    ? 4
                    : "o" === n
                    ? 3
                    : 2,
                u = RegExp("^\\d{1," + i + "}"),
                t = r.substring(e).match(u);
              if (!t) throw "Missing number at position " + e;
              return (e += t[0].length), parseInt(t[0], 10);
            },
            d = function (i, u, f) {
              var o = -1,
                s = n
                  .map(a(i) ? f : u, function (n, t) {
                    return [[t, n]];
                  })
                  .sort(function (n, t) {
                    return -(n[1].length - t[1].length);
                  });
              if (
                (n.each(s, function (n, i) {
                  var u = i[1];
                  return r.substr(e, u.length).toLowerCase() === u.toLowerCase()
                    ? ((o = i[0]), (e += u.length), !1)
                    : t;
                }),
                -1 !== o)
              )
                return o + 1;
              throw "Unknown name at position " + e;
            },
            k = function () {
              if (r.charAt(e) !== i.charAt(s))
                throw "Unexpected literal at position " + e;
              e++;
            },
            s = 0;
          i.length > s;
          s++
        )
          if (v) "'" !== i.charAt(s) || a("'") ? k() : (v = !1);
          else
            switch (i.charAt(s)) {
              case "d":
                c = l("d");
                break;
              case "D":
                d("D", rt, g);
                break;
              case "o":
                y = l("o");
                break;
              case "m":
                h = l("m");
                break;
              case "M":
                h = d("M", nt, tt);
                break;
              case "y":
                o = l("y");
                break;
              case "@":
                (f = new Date(l("@"))),
                  (o = f.getFullYear()),
                  (h = f.getMonth() + 1),
                  (c = f.getDate());
                break;
              case "!":
                (f = new Date((l("!") - this._ticksTo1970) / 10000)),
                  (o = f.getFullYear()),
                  (h = f.getMonth() + 1),
                  (c = f.getDate());
                break;
              case "'":
                a("'") ? k() : (v = !0);
                break;
              default:
                k();
            }
        if (r.length > e && ((w = r.substr(e)), !/^\s+/.test(w)))
          throw "Extra/unparsed characters found in date: " + w;
        if (
          (-1 === o
            ? (o = new Date().getFullYear())
            : 100 > o &&
              (o +=
                new Date().getFullYear() -
                (new Date().getFullYear() % 100) +
                (it >= o ? 0 : -100)),
          y > -1)
        )
          for (h = 1, c = y; ; ) {
            if (((p = this._getDaysInMonth(o, h - 1)), p >= c)) break;
            h++, (c -= p);
          }
        if (
          ((f = this._daylightSavingAdjust(new Date(o, h - 1, c))),
          f.getFullYear() !== o || f.getMonth() + 1 !== h || f.getDate() !== c)
        )
          throw "Invalid date";
        return f;
      },
      ATOM: "yy-mm-dd",
      COOKIE: "D, dd M yy",
      ISO_8601: "yy-mm-dd",
      RFC_822: "D, d M y",
      RFC_850: "DD, dd-M-y",
      RFC_1036: "D, d M y",
      RFC_1123: "D, d M yy",
      RFC_2822: "D, d M yy",
      RSS: "D, d M y",
      TICKS: "!",
      TIMESTAMP: "@",
      W3C: "yy-mm-dd",
      _ticksTo1970:
        864000000000 *
        (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
      formatDate: function (n, t, i) {
        if (!t) return "";
        var u,
          c = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
          a = (i ? i.dayNames : null) || this._defaults.dayNames,
          h = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
          l = (i ? i.monthNames : null) || this._defaults.monthNames,
          f = function (t) {
            var i = n.length > u + 1 && n.charAt(u + 1) === t;
            return i && u++, i;
          },
          e = function (n, t, i) {
            var r = "" + t;
            if (f(n)) for (; i > r.length; ) r = "0" + r;
            return r;
          },
          s = function (n, t, i, r) {
            return f(n) ? r[t] : i[t];
          },
          r = "",
          o = !1;
        if (t)
          for (u = 0; n.length > u; u++)
            if (o)
              "'" !== n.charAt(u) || f("'") ? (r += n.charAt(u)) : (o = !1);
            else
              switch (n.charAt(u)) {
                case "d":
                  r += e("d", t.getDate(), 2);
                  break;
                case "D":
                  r += s("D", t.getDay(), c, a);
                  break;
                case "o":
                  r += e(
                    "o",
                    Math.round(
                      (+new Date(t.getFullYear(), t.getMonth(), t.getDate()) -
                        +new Date(t.getFullYear(), 0, 0)) /
                        86400000
                    ),
                    3
                  );
                  break;
                case "m":
                  r += e("m", t.getMonth() + 1, 2);
                  break;
                case "M":
                  r += s("M", t.getMonth(), h, l);
                  break;
                case "y":
                  r += f("y")
                    ? t.getFullYear()
                    : (10 > t.getYear() % 100 ? "0" : "") + (t.getYear() % 100);
                  break;
                case "@":
                  r += t.getTime();
                  break;
                case "!":
                  r += 10000 * t.getTime() + this._ticksTo1970;
                  break;
                case "'":
                  f("'") ? (r += "'") : (o = !0);
                  break;
                default:
                  r += n.charAt(u);
              }
        return r;
      },
      _possibleChars: function (n) {
        for (
          var i = "",
            r = !1,
            u = function (i) {
              var r = n.length > t + 1 && n.charAt(t + 1) === i;
              return r && t++, r;
            },
            t = 0;
          n.length > t;
          t++
        )
          if (r) "'" !== n.charAt(t) || u("'") ? (i += n.charAt(t)) : (r = !1);
          else
            switch (n.charAt(t)) {
              case "d":
              case "m":
              case "y":
              case "@":
                i += "0123456789";
                break;
              case "D":
              case "M":
                return null;
              case "'":
                u("'") ? (i += "'") : (r = !0);
                break;
              default:
                i += n.charAt(t);
            }
        return i;
      },
      _get: function (n, i) {
        return n.settings[i] !== t ? n.settings[i] : this._defaults[i];
      },
      _setDateFromField: function (n, t) {
        if (n.input.val() !== n.lastVal) {
          var e = this._get(n, "dateFormat"),
            r = (n.lastVal = n.input ? n.input.val() : null),
            u = this._getDefaultDate(n),
            i = u,
            f = this._getFormatConfig(n);
          try {
            i = this.parseDate(e, r, f) || u;
          } catch (o) {
            r = t ? "" : r;
          }
          (n.selectedDay = i.getDate()),
            (n.drawMonth = n.selectedMonth = i.getMonth()),
            (n.drawYear = n.selectedYear = i.getFullYear()),
            (n.currentDay = r ? i.getDate() : 0),
            (n.currentMonth = r ? i.getMonth() : 0),
            (n.currentYear = r ? i.getFullYear() : 0),
            this._adjustInstDate(n);
        }
      },
      _getDefaultDate: function (n) {
        return this._restrictMinMax(
          n,
          this._determineDate(n, this._get(n, "defaultDate"), new Date())
        );
      },
      _determineDate: function (t, i, r) {
        var f = function (n) {
            var t = new Date();
            return t.setDate(t.getDate() + n), t;
          },
          e = function (i) {
            try {
              return n.datepicker.parseDate(
                n.datepicker._get(t, "dateFormat"),
                i,
                n.datepicker._getFormatConfig(t)
              );
            } catch (h) {}
            for (
              var o =
                  (i.toLowerCase().match(/^c/)
                    ? n.datepicker._getDate(t)
                    : null) || new Date(),
                e = o.getFullYear(),
                f = o.getMonth(),
                r = o.getDate(),
                s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                u = s.exec(i);
              u;

            ) {
              switch (u[2] || "d") {
                case "d":
                case "D":
                  r += parseInt(u[1], 10);
                  break;
                case "w":
                case "W":
                  r += 7 * parseInt(u[1], 10);
                  break;
                case "m":
                case "M":
                  (f += parseInt(u[1], 10)),
                    (r = Math.min(r, n.datepicker._getDaysInMonth(e, f)));
                  break;
                case "y":
                case "Y":
                  (e += parseInt(u[1], 10)),
                    (r = Math.min(r, n.datepicker._getDaysInMonth(e, f)));
              }
              u = s.exec(i);
            }
            return new Date(e, f, r);
          },
          u =
            null == i || "" === i
              ? r
              : "string" == typeof i
              ? e(i)
              : "number" == typeof i
              ? isNaN(i)
                ? r
                : f(i)
              : new Date(i.getTime());
        return (
          (u = u && "Invalid Date" == "" + u ? r : u),
          u &&
            (u.setHours(0),
            u.setMinutes(0),
            u.setSeconds(0),
            u.setMilliseconds(0)),
          this._daylightSavingAdjust(u)
        );
      },
      _daylightSavingAdjust: function (n) {
        return n
          ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n)
          : null;
      },
      _setDate: function (n, t, i) {
        var u = !t,
          e = n.selectedMonth,
          f = n.selectedYear,
          r = this._restrictMinMax(n, this._determineDate(n, t, new Date()));
        (n.selectedDay = n.currentDay = r.getDate()),
          (n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth()),
          (n.drawYear = n.selectedYear = n.currentYear = r.getFullYear()),
          (e === n.selectedMonth && f === n.selectedYear) ||
            i ||
            this._notifyChange(n),
          this._adjustInstDate(n),
          n.input && n.input.val(u ? "" : this._formatDate(n));
      },
      _getDate: function (n) {
        return !n.currentYear || (n.input && "" === n.input.val())
          ? null
          : this._daylightSavingAdjust(
              new Date(n.currentYear, n.currentMonth, n.currentDay)
            );
      },
      _attachHandlers: function (t) {
        var r = this._get(t, "stepMonths"),
          i = "#" + t.id.replace(/\\\\/g, "\\");
        t.dpDiv.find("[data-handler]").map(function () {
          var t = {
            prev: function () {
              n.datepicker._adjustDate(i, -r, "M");
            },
            next: function () {
              n.datepicker._adjustDate(i, +r, "M");
            },
            hide: function () {
              n.datepicker._hideDatepicker();
            },
            today: function () {
              n.datepicker._gotoToday(i);
            },
            selectDay: function () {
              return (
                n.datepicker._selectDay(
                  i,
                  +this.getAttribute("data-month"),
                  +this.getAttribute("data-year"),
                  this
                ),
                !1
              );
            },
            selectMonth: function () {
              return n.datepicker._selectMonthYear(i, this, "M"), !1;
            },
            selectYear: function () {
              return n.datepicker._selectMonthYear(i, this, "Y"), !1;
            },
          };
          n(this).bind(
            this.getAttribute("data-event"),
            t[this.getAttribute("data-handler")]
          );
        });
      },
      _generateHTML: function (n) {
        var d,
          s,
          yt,
          h,
          st,
          k,
          ut,
          ti,
          si,
          c,
          gt,
          fi,
          ri,
          ei,
          ui,
          wt,
          it,
          oi,
          bt,
          tt,
          o,
          y,
          pt,
          p,
          vt,
          l,
          u,
          kt,
          ft,
          ii,
          ni,
          g,
          dt,
          i,
          et,
          ot,
          b,
          v,
          nt,
          lt = new Date(),
          ct = this._daylightSavingAdjust(
            new Date(lt.getFullYear(), lt.getMonth(), lt.getDate())
          ),
          f = this._get(n, "isRTL"),
          li = this._get(n, "showButtonPanel"),
          hi = this._get(n, "hideIfNoPrevNext"),
          ht = this._get(n, "navigationAsDateFormat"),
          e = this._getNumberOfMonths(n),
          ai = this._get(n, "showCurrentAtPos"),
          ci = this._get(n, "stepMonths"),
          at = 1 !== e[0] || 1 !== e[1],
          rt = this._daylightSavingAdjust(
            n.currentDay
              ? new Date(n.currentYear, n.currentMonth, n.currentDay)
              : new Date(9999, 9, 9)
          ),
          w = this._getMinMaxDate(n, "min"),
          a = this._getMinMaxDate(n, "max"),
          t = n.drawMonth - ai,
          r = n.drawYear;
        if ((0 > t && ((t += 12), r--), a))
          for (
            d = this._daylightSavingAdjust(
              new Date(
                a.getFullYear(),
                a.getMonth() - e[0] * e[1] + 1,
                a.getDate()
              )
            ),
              d = w && w > d ? w : d;
            this._daylightSavingAdjust(new Date(r, t, 1)) > d;

          )
            t--, 0 > t && ((t = 11), r--);
        for (
          n.drawMonth = t,
            n.drawYear = r,
            s = this._get(n, "prevText"),
            s = ht
              ? this.formatDate(
                  s,
                  this._daylightSavingAdjust(new Date(r, t - ci, 1)),
                  this._getFormatConfig(n)
                )
              : s,
            yt = this._canAdjustMonth(n, -1, r, t)
              ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
                s +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "e" : "w") +
                "'>" +
                s +
                "</span></a>"
              : hi
              ? ""
              : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
                s +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "e" : "w") +
                "'>" +
                s +
                "</span></a>",
            h = this._get(n, "nextText"),
            h = ht
              ? this.formatDate(
                  h,
                  this._daylightSavingAdjust(new Date(r, t + ci, 1)),
                  this._getFormatConfig(n)
                )
              : h,
            st = this._canAdjustMonth(n, 1, r, t)
              ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
                h +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "w" : "e") +
                "'>" +
                h +
                "</span></a>"
              : hi
              ? ""
              : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
                h +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "w" : "e") +
                "'>" +
                h +
                "</span></a>",
            k = this._get(n, "currentText"),
            ut = this._get(n, "gotoCurrent") && n.currentDay ? rt : ct,
            k = ht ? this.formatDate(k, ut, this._getFormatConfig(n)) : k,
            ti = n.inline
              ? ""
              : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
                this._get(n, "closeText") +
                "</button>",
            si = li
              ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
                (f ? ti : "") +
                (this._isInRange(n, ut)
                  ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                    k +
                    "</button>"
                  : "") +
                (f ? "" : ti) +
                "</div>"
              : "",
            c = parseInt(this._get(n, "firstDay"), 10),
            c = isNaN(c) ? 0 : c,
            gt = this._get(n, "showWeek"),
            fi = this._get(n, "dayNames"),
            ri = this._get(n, "dayNamesMin"),
            ei = this._get(n, "monthNames"),
            ui = this._get(n, "monthNamesShort"),
            wt = this._get(n, "beforeShowDay"),
            it = this._get(n, "showOtherMonths"),
            oi = this._get(n, "selectOtherMonths"),
            bt = this._getDefaultDate(n),
            tt = "",
            y = 0;
          e[0] > y;
          y++
        ) {
          for (pt = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
            if (
              ((vt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay))),
              (l = " ui-corner-all"),
              (u = ""),
              at)
            ) {
              if (((u += "<div class='ui-datepicker-group"), e[1] > 1))
                switch (p) {
                  case 0:
                    (u += " ui-datepicker-group-first"),
                      (l = " ui-corner-" + (f ? "right" : "left"));
                    break;
                  case e[1] - 1:
                    (u += " ui-datepicker-group-last"),
                      (l = " ui-corner-" + (f ? "left" : "right"));
                    break;
                  default:
                    (u += " ui-datepicker-group-middle"), (l = "");
                }
              u += "'>";
            }
            for (
              u +=
                "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                l +
                "'>" +
                (/all|left/.test(l) && 0 === y ? (f ? st : yt) : "") +
                (/all|right/.test(l) && 0 === y ? (f ? yt : st) : "") +
                this._generateMonthYearHeader(
                  n,
                  t,
                  r,
                  w,
                  a,
                  y > 0 || p > 0,
                  ei,
                  ui
                ) +
                "</div><table class='ui-datepicker-calendar'><thead><tr>",
                kt = gt
                  ? "<th class='ui-datepicker-week-col'>" +
                    this._get(n, "weekHeader") +
                    "</th>"
                  : "",
                o = 0;
              7 > o;
              o++
            )
              (ft = (o + c) % 7),
                (kt +=
                  "<th" +
                  ((o + c + 6) % 7 >= 5
                    ? " class='ui-datepicker-week-end'"
                    : "") +
                  "><span title='" +
                  fi[ft] +
                  "'>" +
                  ri[ft] +
                  "</span></th>");
            for (
              u += kt + "</tr></thead><tbody>",
                ii = this._getDaysInMonth(r, t),
                r === n.selectedYear &&
                  t === n.selectedMonth &&
                  (n.selectedDay = Math.min(n.selectedDay, ii)),
                ni = (this._getFirstDayOfMonth(r, t) - c + 7) % 7,
                g = Math.ceil((ni + ii) / 7),
                dt = at ? (this.maxRows > g ? this.maxRows : g) : g,
                this.maxRows = dt,
                i = this._daylightSavingAdjust(new Date(r, t, 1 - ni)),
                et = 0;
              dt > et;
              et++
            ) {
              for (
                u += "<tr>",
                  ot = gt
                    ? "<td class='ui-datepicker-week-col'>" +
                      this._get(n, "calculateWeek")(i) +
                      "</td>"
                    : "",
                  o = 0;
                7 > o;
                o++
              )
                (b = wt
                  ? wt.apply(n.input ? n.input[0] : null, [i])
                  : [!0, ""]),
                  (v = i.getMonth() !== t),
                  (nt = (v && !oi) || !b[0] || (w && w > i) || (a && i > a)),
                  (ot +=
                    "<td class='" +
                    ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                    (v ? " ui-datepicker-other-month" : "") +
                    ((i.getTime() === vt.getTime() &&
                      t === n.selectedMonth &&
                      n._keyEvent) ||
                    (bt.getTime() === i.getTime() &&
                      bt.getTime() === vt.getTime())
                      ? " " + this._dayOverClass
                      : "") +
                    (nt
                      ? " " + this._unselectableClass + " ui-state-disabled"
                      : "") +
                    (v && !it
                      ? ""
                      : " " +
                        b[1] +
                        (i.getTime() === rt.getTime()
                          ? " " + this._currentClass
                          : "") +
                        (i.getTime() === ct.getTime()
                          ? " ui-datepicker-today"
                          : "")) +
                    "'" +
                    ((v && !it) || !b[2]
                      ? ""
                      : " title='" + b[2].replace(/'/g, "&#39;") + "'") +
                    (nt
                      ? ""
                      : " data-handler='selectDay' data-event='click' data-month='" +
                        i.getMonth() +
                        "' data-year='" +
                        i.getFullYear() +
                        "'") +
                    ">" +
                    (v && !it
                      ? "&#xa0;"
                      : nt
                      ? "<span class='ui-state-default'>" +
                        i.getDate() +
                        "</span>"
                      : "<a class='ui-state-default" +
                        (i.getTime() === ct.getTime()
                          ? " ui-state-highlight"
                          : "") +
                        (i.getTime() === rt.getTime()
                          ? " ui-state-active"
                          : "") +
                        (v ? " ui-priority-secondary" : "") +
                        "' href='#'>" +
                        i.getDate() +
                        "</a>") +
                    "</td>"),
                  i.setDate(i.getDate() + 1),
                  (i = this._daylightSavingAdjust(i));
              u += ot + "</tr>";
            }
            t++,
              t > 11 && ((t = 0), r++),
              (u +=
                "</tbody></table>" +
                (at
                  ? "</div>" +
                    (e[0] > 0 && p === e[1] - 1
                      ? "<div class='ui-datepicker-row-break'></div>"
                      : "")
                  : "")),
              (pt += u);
          }
          tt += pt;
        }
        return (tt += si), (n._keyEvent = !1), tt;
      },
      _generateMonthYearHeader: function (n, t, i, r, u, f, e, o) {
        var d,
          k,
          h,
          p,
          b,
          w,
          s,
          a,
          v = this._get(n, "changeMonth"),
          y = this._get(n, "changeYear"),
          g = this._get(n, "showMonthAfterYear"),
          c = "<div class='ui-datepicker-title'>",
          l = "";
        if (f || !v)
          l += "<span class='ui-datepicker-month'>" + e[t] + "</span>";
        else {
          for (
            d = r && r.getFullYear() === i,
              k = u && u.getFullYear() === i,
              l +=
                "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
              h = 0;
            12 > h;
            h++
          )
            (!d || h >= r.getMonth()) &&
              (!k || u.getMonth() >= h) &&
              (l +=
                "<option value='" +
                h +
                "'" +
                (h === t ? " selected='selected'" : "") +
                ">" +
                o[h] +
                "</option>");
          l += "</select>";
        }
        if ((g || (c += l + (!f && v && y ? "" : "&#xa0;")), !n.yearshtml))
          if (((n.yearshtml = ""), f || !y))
            c += "<span class='ui-datepicker-year'>" + i + "</span>";
          else {
            for (
              p = this._get(n, "yearRange").split(":"),
                b = new Date().getFullYear(),
                w = function (n) {
                  var t = n.match(/c[+\-].*/)
                    ? i + parseInt(n.substring(1), 10)
                    : n.match(/[+\-].*/)
                    ? b + parseInt(n, 10)
                    : parseInt(n, 10);
                  return isNaN(t) ? b : t;
                },
                s = w(p[0]),
                a = Math.max(s, w(p[1] || "")),
                s = r ? Math.max(s, r.getFullYear()) : s,
                a = u ? Math.min(a, u.getFullYear()) : a,
                n.yearshtml +=
                  "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
              a >= s;
              s++
            )
              n.yearshtml +=
                "<option value='" +
                s +
                "'" +
                (s === i ? " selected='selected'" : "") +
                ">" +
                s +
                "</option>";
            (n.yearshtml += "</select>"),
              (c += n.yearshtml),
              (n.yearshtml = null);
          }
        return (
          (c += this._get(n, "yearSuffix")),
          g && (c += (!f && v && y ? "" : "&#xa0;") + l),
          (c += "</div>")
        );
      },
      _adjustInstDate: function (n, t, i) {
        var u = n.drawYear + ("Y" === i ? t : 0),
          f = n.drawMonth + ("M" === i ? t : 0),
          e =
            Math.min(n.selectedDay, this._getDaysInMonth(u, f)) +
            ("D" === i ? t : 0),
          r = this._restrictMinMax(
            n,
            this._daylightSavingAdjust(new Date(u, f, e))
          );
        (n.selectedDay = r.getDate()),
          (n.drawMonth = n.selectedMonth = r.getMonth()),
          (n.drawYear = n.selectedYear = r.getFullYear()),
          ("M" === i || "Y" === i) && this._notifyChange(n);
      },
      _restrictMinMax: function (n, t) {
        var r = this._getMinMaxDate(n, "min"),
          i = this._getMinMaxDate(n, "max"),
          u = r && r > t ? r : t;
        return i && u > i ? i : u;
      },
      _notifyChange: function (n) {
        var t = this._get(n, "onChangeMonthYear");
        t &&
          t.apply(n.input ? n.input[0] : null, [
            n.selectedYear,
            n.selectedMonth + 1,
            n,
          ]);
      },
      _getNumberOfMonths: function (n) {
        var t = this._get(n, "numberOfMonths");
        return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
      },
      _getMinMaxDate: function (n, t) {
        return this._determineDate(n, this._get(n, t + "Date"), null);
      },
      _getDaysInMonth: function (n, t) {
        return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate();
      },
      _getFirstDayOfMonth: function (n, t) {
        return new Date(n, t, 1).getDay();
      },
      _canAdjustMonth: function (n, t, i, r) {
        var f = this._getNumberOfMonths(n),
          u = this._daylightSavingAdjust(
            new Date(i, r + (0 > t ? t : f[0] * f[1]), 1)
          );
        return (
          0 > t &&
            u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())),
          this._isInRange(n, u)
        );
      },
      _isInRange: function (n, t) {
        var i,
          f,
          o = this._getMinMaxDate(n, "min"),
          s = this._getMinMaxDate(n, "max"),
          u = null,
          r = null,
          e = this._get(n, "yearRange");
        return (
          e &&
            ((i = e.split(":")),
            (f = new Date().getFullYear()),
            (u = parseInt(i[0], 10)),
            (r = parseInt(i[1], 10)),
            i[0].match(/[+\-].*/) && (u += f),
            i[1].match(/[+\-].*/) && (r += f)),
          (!o || t.getTime() >= o.getTime()) &&
            (!s || t.getTime() <= s.getTime()) &&
            (!u || t.getFullYear() >= u) &&
            (!r || r >= t.getFullYear())
        );
      },
      _getFormatConfig: function (n) {
        var t = this._get(n, "shortYearCutoff");
        return (
          (t =
            "string" != typeof t
              ? t
              : (new Date().getFullYear() % 100) + parseInt(t, 10)),
          {
            shortYearCutoff: t,
            dayNamesShort: this._get(n, "dayNamesShort"),
            dayNames: this._get(n, "dayNames"),
            monthNamesShort: this._get(n, "monthNamesShort"),
            monthNames: this._get(n, "monthNames"),
          }
        );
      },
      _formatDate: function (n, t, i, r) {
        t ||
          ((n.currentDay = n.selectedDay),
          (n.currentMonth = n.selectedMonth),
          (n.currentYear = n.selectedYear));
        var u = t
          ? "object" == typeof t
            ? t
            : this._daylightSavingAdjust(new Date(r, i, t))
          : this._daylightSavingAdjust(
              new Date(n.currentYear, n.currentMonth, n.currentDay)
            );
        return this.formatDate(
          this._get(n, "dateFormat"),
          u,
          this._getFormatConfig(n)
        );
      },
    }),
      (n.fn.datepicker = function (t) {
        if (!this.length) return this;
        n.datepicker.initialized ||
          (n(document).mousedown(n.datepicker._checkExternalClick),
          (n.datepicker.initialized = !0)),
          0 === n("#" + n.datepicker._mainDivId).length &&
            n("body").append(n.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t ||
          ("isDisabled" !== t && "getDate" !== t && "widget" !== t)
          ? "option" === t &&
            2 === arguments.length &&
            "string" == typeof arguments[1]
            ? n.datepicker["_" + t + "Datepicker"].apply(
                n.datepicker,
                [this[0]].concat(i)
              )
            : this.each(function () {
                "string" == typeof t
                  ? n.datepicker["_" + t + "Datepicker"].apply(
                      n.datepicker,
                      [this].concat(i)
                    )
                  : n.datepicker._attachDatepicker(this, t);
              })
          : n.datepicker["_" + t + "Datepicker"].apply(
              n.datepicker,
              [this[0]].concat(i)
            );
      }),
      (n.datepicker = new e()),
      (n.datepicker.initialized = !1),
      (n.datepicker.uuid = +new Date()),
      (n.datepicker.version = "1.10.3");
  })(jQuery),
  (function (n) {
    var i = {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0,
      },
      t = {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
      };
    n.widget("ui.dialog", {
      version: "1.10.3",
      options: {
        appendTo: "body",
        autoOpen: !0,
        buttons: [],
        closeOnEscape: !0,
        closeText: "close",
        dialogClass: "",
        draggable: !0,
        hide: null,
        height: "auto",
        maxHeight: null,
        maxWidth: null,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: {
          my: "center",
          at: "center",
          of: window,
          collision: "fit",
          using: function (t) {
            var i = n(this).css(t).offset().top;
            0 > i && n(this).css("top", t.top - i);
          },
        },
        resizable: !0,
        show: null,
        title: null,
        width: 300,
        beforeClose: null,
        close: null,
        drag: null,
        dragStart: null,
        dragStop: null,
        focus: null,
        open: null,
        resize: null,
        resizeStart: null,
        resizeStop: null,
      },
      _create: function () {
        (this.originalCss = {
          display: this.element[0].style.display,
          width: this.element[0].style.width,
          minHeight: this.element[0].style.minHeight,
          maxHeight: this.element[0].style.maxHeight,
          height: this.element[0].style.height,
        }),
          (this.originalPosition = {
            parent: this.element.parent(),
            index: this.element.parent().children().index(this.element),
          }),
          (this.originalTitle = this.element.attr("title")),
          (this.options.title = this.options.title || this.originalTitle),
          this._createWrapper(),
          this.element
            .show()
            .removeAttr("title")
            .addClass("ui-dialog-content ui-widget-content")
            .appendTo(this.uiDialog),
          this._createTitlebar(),
          this._createButtonPane(),
          this.options.draggable && n.fn.draggable && this._makeDraggable(),
          this.options.resizable && n.fn.resizable && this._makeResizable(),
          (this._isOpen = !1);
      },
      _init: function () {
        this.options.autoOpen && this.open();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return t && (t.jquery || t.nodeType)
          ? n(t)
          : this.document.find(t || "body").eq(0);
      },
      _destroy: function () {
        var n,
          t = this.originalPosition;
        this._destroyOverlay(),
          this.element
            .removeUniqueId()
            .removeClass("ui-dialog-content ui-widget-content")
            .css(this.originalCss)
            .detach(),
          this.uiDialog.stop(!0, !0).remove(),
          this.originalTitle && this.element.attr("title", this.originalTitle),
          (n = t.parent.children().eq(t.index)),
          n.length && n[0] !== this.element[0]
            ? n.before(this.element)
            : t.parent.append(this.element);
      },
      widget: function () {
        return this.uiDialog;
      },
      disable: n.noop,
      enable: n.noop,
      close: function (t) {
        var i = this;
        this._isOpen &&
          this._trigger("beforeClose", t) !== !1 &&
          ((this._isOpen = !1),
          this._destroyOverlay(),
          this.opener.filter(":focusable").focus().length ||
            n(this.document[0].activeElement).blur(),
          this._hide(this.uiDialog, this.options.hide, function () {
            i._trigger("close", t);
          }));
      },
      isOpen: function () {
        return this._isOpen;
      },
      moveToTop: function () {
        this._moveToTop();
      },
      _moveToTop: function (n, t) {
        var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog)
          .length;
        return i && !t && this._trigger("focus", n), i;
      },
      open: function () {
        var t = this;
        return this._isOpen
          ? (this._moveToTop() && this._focusTabbable(), undefined)
          : ((this._isOpen = !0),
            (this.opener = n(this.document[0].activeElement)),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this._show(this.uiDialog, this.options.show, function () {
              t._focusTabbable(), t._trigger("focus");
            }),
            this._trigger("open"),
            undefined);
      },
      _focusTabbable: function () {
        var n = this.element.find("[autofocus]");
        n.length || (n = this.element.find(":tabbable")),
          n.length || (n = this.uiDialogButtonPane.find(":tabbable")),
          n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable")),
          n.length || (n = this.uiDialog),
          n.eq(0).focus();
      },
      _keepFocus: function (t) {
        function i() {
          var t = this.document[0].activeElement,
            i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
          i || this._focusTabbable();
        }
        t.preventDefault(), i.call(this), this._delay(i);
      },
      _createWrapper: function () {
        (this.uiDialog = n("<div>")
          .addClass(
            "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
              this.options.dialogClass
          )
          .hide()
          .attr({
            tabIndex: -1,
            role: "dialog",
          })
          .appendTo(this._appendTo())),
          this._on(this.uiDialog, {
            keydown: function (t) {
              if (
                this.options.closeOnEscape &&
                !t.isDefaultPrevented() &&
                t.keyCode &&
                t.keyCode === n.ui.keyCode.ESCAPE
              )
                return t.preventDefault(), this.close(t), undefined;
              if (t.keyCode === n.ui.keyCode.TAB) {
                var u = this.uiDialog.find(":tabbable"),
                  r = u.filter(":first"),
                  i = u.filter(":last");
                (t.target !== i[0] && t.target !== this.uiDialog[0]) ||
                t.shiftKey
                  ? (t.target !== r[0] && t.target !== this.uiDialog[0]) ||
                    !t.shiftKey ||
                    (i.focus(1), t.preventDefault())
                  : (r.focus(1), t.preventDefault());
              }
            },
            mousedown: function (n) {
              this._moveToTop(n) && this._focusTabbable();
            },
          }),
          this.element.find("[aria-describedby]").length ||
            this.uiDialog.attr({
              "aria-describedby": this.element.uniqueId().attr("id"),
            });
      },
      _createTitlebar: function () {
        var t;
        (this.uiDialogTitlebar = n("<div>")
          .addClass(
            "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
          )
          .prependTo(this.uiDialog)),
          this._on(this.uiDialogTitlebar, {
            mousedown: function (t) {
              n(t.target).closest(".ui-dialog-titlebar-close") ||
                this.uiDialog.focus();
            },
          }),
          (this.uiDialogTitlebarClose = n("<button></button>")
            .button({
              label: this.options.closeText,
              icons: {
                primary: "ui-icon-closethick",
              },
              text: !1,
            })
            .addClass("ui-dialog-titlebar-close")
            .appendTo(this.uiDialogTitlebar)),
          this._on(this.uiDialogTitlebarClose, {
            click: function (n) {
              n.preventDefault(), this.close(n);
            },
          }),
          (t = n("<span>")
            .uniqueId()
            .addClass("ui-dialog-title")
            .prependTo(this.uiDialogTitlebar)),
          this._title(t),
          this.uiDialog.attr({
            "aria-labelledby": t.attr("id"),
          });
      },
      _title: function (n) {
        this.options.title || n.html("&#160;"), n.text(this.options.title);
      },
      _createButtonPane: function () {
        (this.uiDialogButtonPane = n("<div>").addClass(
          "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"
        )),
          (this.uiButtonSet = n("<div>")
            .addClass("ui-dialog-buttonset")
            .appendTo(this.uiDialogButtonPane)),
          this._createButtons();
      },
      _createButtons: function () {
        var i = this,
          t = this.options.buttons;
        return (
          this.uiDialogButtonPane.remove(),
          this.uiButtonSet.empty(),
          n.isEmptyObject(t) || (n.isArray(t) && !t.length)
            ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined)
            : (n.each(t, function (t, r) {
                var f, u;
                (r = n.isFunction(r)
                  ? {
                      click: r,
                      text: t,
                    }
                  : r),
                  (r = n.extend(
                    {
                      type: "button",
                    },
                    r
                  )),
                  (f = r.click),
                  (r.click = function () {
                    f.apply(i.element[0], arguments);
                  }),
                  (u = {
                    icons: r.icons,
                    text: r.showText,
                  }),
                  delete r.icons,
                  delete r.showText,
                  n("<button></button>", r).button(u).appendTo(i.uiButtonSet);
              }),
              this.uiDialog.addClass("ui-dialog-buttons"),
              this.uiDialogButtonPane.appendTo(this.uiDialog),
              undefined)
        );
      },
      _makeDraggable: function () {
        function i(n) {
          return {
            position: n.position,
            offset: n.offset,
          };
        }
        var t = this,
          r = this.options;
        this.uiDialog.draggable({
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function (r, u) {
            n(this).addClass("ui-dialog-dragging"),
              t._blockFrames(),
              t._trigger("dragStart", r, i(u));
          },
          drag: function (n, r) {
            t._trigger("drag", n, i(r));
          },
          stop: function (u, f) {
            (r.position = [
              f.position.left - t.document.scrollLeft(),
              f.position.top - t.document.scrollTop(),
            ]),
              n(this).removeClass("ui-dialog-dragging"),
              t._unblockFrames(),
              t._trigger("dragStop", u, i(f));
          },
        });
      },
      _makeResizable: function () {
        function r(n) {
          return {
            originalPosition: n.originalPosition,
            originalSize: n.originalSize,
            position: n.position,
            size: n.size,
          };
        }
        var i = this,
          t = this.options,
          u = t.resizable,
          e = this.uiDialog.css("position"),
          f = "string" == typeof u ? u : "n,e,s,w,se,sw,ne,nw";
        this.uiDialog
          .resizable({
            cancel: ".ui-dialog-content",
            containment: "document",
            alsoResize: this.element,
            maxWidth: t.maxWidth,
            maxHeight: t.maxHeight,
            minWidth: t.minWidth,
            minHeight: this._minHeight(),
            handles: f,
            start: function (t, u) {
              n(this).addClass("ui-dialog-resizing"),
                i._blockFrames(),
                i._trigger("resizeStart", t, r(u));
            },
            resize: function (n, t) {
              i._trigger("resize", n, r(t));
            },
            stop: function (u, f) {
              (t.height = n(this).height()),
                (t.width = n(this).width()),
                n(this).removeClass("ui-dialog-resizing"),
                i._unblockFrames(),
                i._trigger("resizeStop", u, r(f));
            },
          })
          .css("position", e);
      },
      _minHeight: function () {
        var n = this.options;
        return "auto" === n.height
          ? n.minHeight
          : Math.min(n.minHeight, n.height);
      },
      _position: function () {
        var n = this.uiDialog.is(":visible");
        n || this.uiDialog.show(),
          this.uiDialog.position(this.options.position),
          n || this.uiDialog.hide();
      },
      _setOptions: function (r) {
        var e = this,
          u = !1,
          f = {};
        n.each(r, function (n, r) {
          e._setOption(n, r), n in i && (u = !0), n in t && (f[n] = r);
        }),
          u && (this._size(), this._position()),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", f);
      },
      _setOption: function (n, t) {
        var u,
          r,
          i = this.uiDialog;
        "dialogClass" === n &&
          i.removeClass(this.options.dialogClass).addClass(t),
          "disabled" !== n &&
            (this._super(n, t),
            "appendTo" === n && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === n && this._createButtons(),
            "closeText" === n &&
              this.uiDialogTitlebarClose.button({
                label: "" + t,
              }),
            "draggable" === n &&
              ((u = i.is(":data(ui-draggable)")),
              u && !t && i.draggable("destroy"),
              !u && t && this._makeDraggable()),
            "position" === n && this._position(),
            "resizable" === n &&
              ((r = i.is(":data(ui-resizable)")),
              r && !t && i.resizable("destroy"),
              r && "string" == typeof t && i.resizable("option", "handles", t),
              r || t === !1 || this._makeResizable()),
            "title" === n &&
              this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
      },
      _size: function () {
        var t,
          i,
          r,
          n = this.options;
        this.element.show().css({
          width: "auto",
          minHeight: 0,
          maxHeight: "none",
          height: 0,
        }),
          n.minWidth > n.width && (n.width = n.minWidth),
          (t = this.uiDialog
            .css({
              height: "auto",
              width: n.width,
            })
            .outerHeight()),
          (i = Math.max(0, n.minHeight - t)),
          (r =
            "number" == typeof n.maxHeight
              ? Math.max(0, n.maxHeight - t)
              : "none"),
          "auto" === n.height
            ? this.element.css({
                minHeight: i,
                maxHeight: r,
                height: "auto",
              })
            : this.element.height(Math.max(0, n.height - t)),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", "minHeight", this._minHeight());
      },
      _blockFrames: function () {
        this.iframeBlocks = this.document.find("iframe").map(function () {
          var t = n(this);
          return n("<div>")
            .css({
              position: "absolute",
              width: t.outerWidth(),
              height: t.outerHeight(),
            })
            .appendTo(t.parent())
            .offset(t.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _allowInteraction: function (t) {
        return n(t.target).closest(".ui-dialog").length
          ? !0
          : !!n(t.target).closest(".ui-datepicker").length;
      },
      _createOverlay: function () {
        if (this.options.modal) {
          var i = this,
            t = this.widgetFullName;
          n.ui.dialog.overlayInstances ||
            this._delay(function () {
              n.ui.dialog.overlayInstances &&
                this.document.bind("focusin.dialog", function (r) {
                  i._allowInteraction(r) ||
                    (r.preventDefault(),
                    n(".ui-dialog:visible:last .ui-dialog-content")
                      .data(t)
                      ._focusTabbable());
                });
            }),
            (this.overlay = n("<div>")
              .addClass("ui-widget-overlay ui-front")
              .appendTo(this._appendTo())),
            this._on(this.overlay, {
              mousedown: "_keepFocus",
            }),
            n.ui.dialog.overlayInstances++;
        }
      },
      _destroyOverlay: function () {
        this.options.modal &&
          this.overlay &&
          (n.ui.dialog.overlayInstances--,
          n.ui.dialog.overlayInstances ||
            this.document.unbind("focusin.dialog"),
          this.overlay.remove(),
          (this.overlay = null));
      },
    }),
      (n.ui.dialog.overlayInstances = 0),
      n.uiBackCompat !== !1 &&
        n.widget("ui.dialog", n.ui.dialog, {
          _position: function () {
            var u,
              t = this.options.position,
              i = [],
              r = [0, 0];
            t
              ? (("string" == typeof t || ("object" == typeof t && "0" in t)) &&
                  ((i = t.split ? t.split(" ") : [t[0], t[1]]),
                  1 === i.length && (i[1] = i[0]),
                  n.each(["left", "top"], function (n, t) {
                    +i[n] === i[n] && ((r[n] = i[n]), (i[n] = t));
                  }),
                  (t = {
                    my:
                      i[0] +
                      (0 > r[0] ? r[0] : "+" + r[0]) +
                      " " +
                      i[1] +
                      (0 > r[1] ? r[1] : "+" + r[1]),
                    at: i.join(" "),
                  })),
                (t = n.extend({}, n.ui.dialog.prototype.options.position, t)))
              : (t = n.ui.dialog.prototype.options.position),
              (u = this.uiDialog.is(":visible")),
              u || this.uiDialog.show(),
              this.uiDialog.position(t),
              u || this.uiDialog.hide();
          },
        });
  })(jQuery),
  (function (n) {
    var i = /up|down|vertical/,
      t = /up|left|vertical|horizontal/;
    n.effects.effect.blind = function (r, u) {
      var e,
        s,
        h,
        f = n(this),
        v = ["position", "top", "bottom", "left", "right", "height", "width"],
        p = n.effects.setMode(f, r.mode || "hide"),
        w = r.direction || "up",
        o = i.test(w),
        l = o ? "height" : "width",
        c = o ? "top" : "left",
        b = t.test(w),
        a = {},
        y = "show" === p;
      f.parent().is(".ui-effects-wrapper")
        ? n.effects.save(f.parent(), v)
        : n.effects.save(f, v),
        f.show(),
        (e = n.effects.createWrapper(f).css({
          overflow: "hidden",
        })),
        (s = e[l]()),
        (h = parseFloat(e.css(c)) || 0),
        (a[l] = y ? s : 0),
        b ||
          (f
            .css(o ? "bottom" : "right", 0)
            .css(o ? "top" : "left", "auto")
            .css({
              position: "absolute",
            }),
          (a[c] = y ? h : s + h)),
        y && (e.css(l, 0), b || e.css(c, h + s)),
        e.animate(a, {
          duration: r.duration,
          easing: r.easing,
          queue: !1,
          complete: function () {
            "hide" === p && f.hide(),
              n.effects.restore(f, v),
              n.effects.removeWrapper(f),
              u();
          },
        });
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.bounce = function (t, i) {
      var p,
        o,
        s,
        r = n(this),
        y = ["position", "top", "bottom", "left", "right", "height", "width"],
        g = n.effects.setMode(r, t.mode || "effect"),
        f = "hide" === g,
        w = "show" === g,
        h = t.direction || "up",
        u = t.distance,
        b = t.times || 5,
        d = 2 * b + (w || f ? 1 : 0),
        a = t.duration / d,
        c = t.easing,
        e = "up" === h || "down" === h ? "top" : "left",
        v = "up" === h || "left" === h,
        l = r.queue(),
        k = l.length;
      for (
        (w || f) && y.push("opacity"),
          n.effects.save(r, y),
          r.show(),
          n.effects.createWrapper(r),
          u || (u = r["top" === e ? "outerHeight" : "outerWidth"]() / 3),
          w &&
            ((s = {
              opacity: 1,
            }),
            (s[e] = 0),
            r
              .css("opacity", 0)
              .css(e, v ? 2 * -u : 2 * u)
              .animate(s, a, c)),
          f && (u /= Math.pow(2, b - 1)),
          s = {},
          s[e] = 0,
          p = 0;
        b > p;
        p++
      )
        (o = {}),
          (o[e] = (v ? "-=" : "+=") + u),
          r.animate(o, a, c).animate(s, a, c),
          (u = f ? 2 * u : u / 2);
      f &&
        ((o = {
          opacity: 0,
        }),
        (o[e] = (v ? "-=" : "+=") + u),
        r.animate(o, a, c)),
        r.queue(function () {
          f && r.hide(),
            n.effects.restore(r, y),
            n.effects.removeWrapper(r),
            i();
        }),
        k > 1 && l.splice.apply(l, [1, 0].concat(l.splice(k, d + 1))),
        r.dequeue();
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.clip = function (t, i) {
      var h,
        u,
        e,
        r = n(this),
        l = ["position", "top", "bottom", "left", "right", "height", "width"],
        v = n.effects.setMode(r, t.mode || "hide"),
        f = "show" === v,
        y = t.direction || "vertical",
        a = "vertical" === y,
        o = a ? "height" : "width",
        c = a ? "top" : "left",
        s = {};
      n.effects.save(r, l),
        r.show(),
        (h = n.effects.createWrapper(r).css({
          overflow: "hidden",
        })),
        (u = "IMG" === r[0].tagName ? h : r),
        (e = u[o]()),
        f && (u.css(o, 0), u.css(c, e / 2)),
        (s[o] = f ? e : 0),
        (s[c] = f ? 0 : e / 2),
        u.animate(s, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            f || r.hide(),
              n.effects.restore(r, l),
              n.effects.removeWrapper(r),
              i();
          },
        });
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.drop = function (t, i) {
      var f,
        r = n(this),
        c = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "opacity",
          "height",
          "width",
        ],
        l = n.effects.setMode(r, t.mode || "hide"),
        e = "show" === l,
        u = t.direction || "left",
        o = "up" === u || "down" === u ? "top" : "left",
        s = "up" === u || "left" === u ? "pos" : "neg",
        h = {
          opacity: e ? 1 : 0,
        };
      n.effects.save(r, c),
        r.show(),
        n.effects.createWrapper(r),
        (f =
          t.distance || r["top" === o ? "outerHeight" : "outerWidth"](!0) / 2),
        e && r.css("opacity", 0).css(o, "pos" === s ? -f : f),
        (h[o] =
          (e ? ("pos" === s ? "+=" : "-=") : "pos" === s ? "-=" : "+=") + f),
        r.animate(h, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            "hide" === l && r.hide(),
              n.effects.restore(r, c),
              n.effects.removeWrapper(r),
              i();
          },
        });
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.explode = function (t, i) {
      function b() {
        l.push(this), l.length === o * c && k();
      }
      function k() {
        u.css({
          visibility: "visible",
        }),
          n(l).remove(),
          r || u.hide(),
          i();
      }
      for (
        var f,
          v,
          a,
          p,
          y,
          o = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
          c = o,
          u = n(this),
          d = n.effects.setMode(u, t.mode || "hide"),
          r = "show" === d,
          w = u.show().css("visibility", "hidden").offset(),
          h = Math.ceil(u.outerWidth() / c),
          s = Math.ceil(u.outerHeight() / o),
          l = [],
          e = 0;
        o > e;
        e++
      )
        for (a = w.top + e * s, y = e - (o - 1) / 2, f = 0; c > f; f++)
          (v = w.left + f * h),
            (p = f - (c - 1) / 2),
            u
              .clone()
              .appendTo("body")
              .wrap("<div></div>")
              .css({
                position: "absolute",
                visibility: "visible",
                left: -f * h,
                top: -e * s,
              })
              .parent()
              .addClass("ui-effects-explode")
              .css({
                position: "absolute",
                overflow: "hidden",
                width: h,
                height: s,
                left: v + (r ? p * h : 0),
                top: a + (r ? y * s : 0),
                opacity: r ? 0 : 1,
              })
              .animate(
                {
                  left: v + (r ? 0 : p * h),
                  top: a + (r ? 0 : y * s),
                  opacity: r ? 1 : 0,
                },
                t.duration || 500,
                t.easing,
                b
              );
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.fade = function (t, i) {
      var r = n(this),
        u = n.effects.setMode(r, t.mode || "toggle");
      r.animate(
        {
          opacity: u,
        },
        {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: i,
        }
      );
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.fold = function (t, i) {
      var u,
        o,
        r = n(this),
        y = ["position", "top", "bottom", "left", "right", "height", "width"],
        v = n.effects.setMode(r, t.mode || "hide"),
        e = "show" === v,
        p = "hide" === v,
        f = t.size || 15,
        b = /([0-9]+)%/.exec(f),
        w = !!t.horizFirst,
        s = e !== w,
        h = s ? ["width", "height"] : ["height", "width"],
        a = t.duration / 2,
        l = {},
        c = {};
      n.effects.save(r, y),
        r.show(),
        (u = n.effects.createWrapper(r).css({
          overflow: "hidden",
        })),
        (o = s ? [u.width(), u.height()] : [u.height(), u.width()]),
        b && (f = (parseInt(b[1], 10) / 100) * o[p ? 0 : 1]),
        e &&
          u.css(
            w
              ? {
                  height: 0,
                  width: f,
                }
              : {
                  height: f,
                  width: 0,
                }
          ),
        (l[h[0]] = e ? o[0] : f),
        (c[h[1]] = e ? o[1] : 0),
        u.animate(l, a, t.easing).animate(c, a, t.easing, function () {
          p && r.hide(),
            n.effects.restore(r, y),
            n.effects.removeWrapper(r),
            i();
        });
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.highlight = function (t, i) {
      var r = n(this),
        e = ["backgroundImage", "backgroundColor", "opacity"],
        f = n.effects.setMode(r, t.mode || "show"),
        u = {
          backgroundColor: r.css("backgroundColor"),
        };
      "hide" === f && (u.opacity = 0),
        n.effects.save(r, e),
        r
          .show()
          .css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99",
          })
          .animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function () {
              "hide" === f && r.hide(), n.effects.restore(r, e), i();
            },
          });
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.pulsate = function (t, i) {
      var o,
        r = n(this),
        s = n.effects.setMode(r, t.mode || "show"),
        c = "show" === s,
        a = "hide" === s,
        v = c || "hide" === s,
        e = 2 * (t.times || 5) + (v ? 1 : 0),
        h = t.duration / e,
        u = 0,
        f = r.queue(),
        l = f.length;
      for (
        (c || !r.is(":visible")) && (r.css("opacity", 0).show(), (u = 1)),
          o = 1;
        e > o;
        o++
      )
        r.animate(
          {
            opacity: u,
          },
          h,
          t.easing
        ),
          (u = 1 - u);
      r.animate(
        {
          opacity: u,
        },
        h,
        t.easing
      ),
        r.queue(function () {
          a && r.hide(), i();
        }),
        l > 1 && f.splice.apply(f, [1, 0].concat(f.splice(l, e + 1))),
        r.dequeue();
    };
  })(jQuery),
  (function (n) {
    (n.effects.effect.puff = function (t, i) {
      var r = n(this),
        e = n.effects.setMode(r, t.mode || "hide"),
        o = "hide" === e,
        s = parseInt(t.percent, 10) || 150,
        f = s / 100,
        u = {
          height: r.height(),
          width: r.width(),
          outerHeight: r.outerHeight(),
          outerWidth: r.outerWidth(),
        };
      n.extend(t, {
        effect: "scale",
        queue: !1,
        fade: !0,
        mode: e,
        complete: i,
        percent: o ? s : 100,
        from: o
          ? u
          : {
              height: u.height * f,
              width: u.width * f,
              outerHeight: u.outerHeight * f,
              outerWidth: u.outerWidth * f,
            },
      }),
        r.effect(t);
    }),
      (n.effects.effect.scale = function (t, i) {
        var u = n(this),
          r = n.extend(!0, {}, t),
          e = n.effects.setMode(u, t.mode || "effect"),
          s =
            parseInt(t.percent, 10) ||
            (0 === parseInt(t.percent, 10) ? 0 : "hide" === e ? 0 : 100),
          h = t.direction || "both",
          c = t.origin,
          f = {
            height: u.height(),
            width: u.width(),
            outerHeight: u.outerHeight(),
            outerWidth: u.outerWidth(),
          },
          o = {
            y: "horizontal" !== h ? s / 100 : 1,
            x: "vertical" !== h ? s / 100 : 1,
          };
        (r.effect = "size"),
          (r.queue = !1),
          (r.complete = i),
          "effect" !== e &&
            ((r.origin = c || ["middle", "center"]), (r.restore = !0)),
          (r.from =
            t.from ||
            ("show" === e
              ? {
                  height: 0,
                  width: 0,
                  outerHeight: 0,
                  outerWidth: 0,
                }
              : f)),
          (r.to = {
            height: f.height * o.y,
            width: f.width * o.x,
            outerHeight: f.outerHeight * o.y,
            outerWidth: f.outerWidth * o.x,
          }),
          r.fade &&
            ("show" === e && ((r.from.opacity = 0), (r.to.opacity = 1)),
            "hide" === e && ((r.from.opacity = 1), (r.to.opacity = 0))),
          u.effect(r);
      }),
      (n.effects.effect.size = function (t, i) {
        var f,
          l,
          u,
          r = n(this),
          w = [
            "position",
            "top",
            "bottom",
            "left",
            "right",
            "width",
            "height",
            "overflow",
            "opacity",
          ],
          k = [
            "position",
            "top",
            "bottom",
            "left",
            "right",
            "overflow",
            "opacity",
          ],
          v = ["width", "height", "overflow"],
          y = ["fontSize"],
          e = [
            "borderTopWidth",
            "borderBottomWidth",
            "paddingTop",
            "paddingBottom",
          ],
          s = [
            "borderLeftWidth",
            "borderRightWidth",
            "paddingLeft",
            "paddingRight",
          ],
          h = n.effects.setMode(r, t.mode || "effect"),
          a = t.restore || "effect" !== h,
          c = t.scale || "both",
          b = t.origin || ["middle", "center"],
          d = r.css("position"),
          o = a ? w : k,
          p = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0,
          };
        "show" === h && r.show(),
          (f = {
            height: r.height(),
            width: r.width(),
            outerHeight: r.outerHeight(),
            outerWidth: r.outerWidth(),
          }),
          "toggle" === t.mode && "show" === h
            ? ((r.from = t.to || p), (r.to = t.from || f))
            : ((r.from = t.from || ("show" === h ? p : f)),
              (r.to = t.to || ("hide" === h ? p : f))),
          (u = {
            from: {
              y: r.from.height / f.height,
              x: r.from.width / f.width,
            },
            to: {
              y: r.to.height / f.height,
              x: r.to.width / f.width,
            },
          }),
          ("box" === c || "both" === c) &&
            (u.from.y !== u.to.y &&
              ((o = o.concat(e)),
              (r.from = n.effects.setTransition(r, e, u.from.y, r.from)),
              (r.to = n.effects.setTransition(r, e, u.to.y, r.to))),
            u.from.x !== u.to.x &&
              ((o = o.concat(s)),
              (r.from = n.effects.setTransition(r, s, u.from.x, r.from)),
              (r.to = n.effects.setTransition(r, s, u.to.x, r.to)))),
          ("content" === c || "both" === c) &&
            u.from.y !== u.to.y &&
            ((o = o.concat(y).concat(v)),
            (r.from = n.effects.setTransition(r, y, u.from.y, r.from)),
            (r.to = n.effects.setTransition(r, y, u.to.y, r.to))),
          n.effects.save(r, o),
          r.show(),
          n.effects.createWrapper(r),
          r.css("overflow", "hidden").css(r.from),
          b &&
            ((l = n.effects.getBaseline(b, f)),
            (r.from.top = (f.outerHeight - r.outerHeight()) * l.y),
            (r.from.left = (f.outerWidth - r.outerWidth()) * l.x),
            (r.to.top = (f.outerHeight - r.to.outerHeight) * l.y),
            (r.to.left = (f.outerWidth - r.to.outerWidth) * l.x)),
          r.css(r.from),
          ("content" === c || "both" === c) &&
            ((e = e.concat(["marginTop", "marginBottom"]).concat(y)),
            (s = s.concat(["marginLeft", "marginRight"])),
            (v = w.concat(e).concat(s)),
            r.find("*[width]").each(function () {
              var i = n(this),
                r = {
                  height: i.height(),
                  width: i.width(),
                  outerHeight: i.outerHeight(),
                  outerWidth: i.outerWidth(),
                };
              a && n.effects.save(i, v),
                (i.from = {
                  height: r.height * u.from.y,
                  width: r.width * u.from.x,
                  outerHeight: r.outerHeight * u.from.y,
                  outerWidth: r.outerWidth * u.from.x,
                }),
                (i.to = {
                  height: r.height * u.to.y,
                  width: r.width * u.to.x,
                  outerHeight: r.height * u.to.y,
                  outerWidth: r.width * u.to.x,
                }),
                u.from.y !== u.to.y &&
                  ((i.from = n.effects.setTransition(i, e, u.from.y, i.from)),
                  (i.to = n.effects.setTransition(i, e, u.to.y, i.to))),
                u.from.x !== u.to.x &&
                  ((i.from = n.effects.setTransition(i, s, u.from.x, i.from)),
                  (i.to = n.effects.setTransition(i, s, u.to.x, i.to))),
                i.css(i.from),
                i.animate(i.to, t.duration, t.easing, function () {
                  a && n.effects.restore(i, v);
                });
            })),
          r.animate(r.to, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function () {
              0 === r.to.opacity && r.css("opacity", r.from.opacity),
                "hide" === h && r.hide(),
                n.effects.restore(r, o),
                a ||
                  ("static" === d
                    ? r.css({
                        position: "relative",
                        top: r.to.top,
                        left: r.to.left,
                      })
                    : n.each(["top", "left"], function (n, t) {
                        r.css(t, function (t, i) {
                          var f = parseInt(i, 10),
                            u = n ? r.to.left : r.to.top;
                          return "auto" === i ? u + "px" : f + u + "px";
                        });
                      })),
                n.effects.removeWrapper(r),
                i();
            },
          });
      });
  })(jQuery),
  (function (n) {
    n.effects.effect.shake = function (t, i) {
      var o,
        r = n(this),
        p = ["position", "top", "bottom", "left", "right", "height", "width"],
        k = n.effects.setMode(r, t.mode || "effect"),
        f = t.direction || "left",
        a = t.distance || 20,
        w = t.times || 3,
        b = 2 * w + 1,
        u = Math.round(t.duration / b),
        s = "up" === f || "down" === f ? "top" : "left",
        h = "up" === f || "left" === f,
        c = {},
        l = {},
        y = {},
        e = r.queue(),
        v = e.length;
      for (
        n.effects.save(r, p),
          r.show(),
          n.effects.createWrapper(r),
          c[s] = (h ? "-=" : "+=") + a,
          l[s] = (h ? "+=" : "-=") + 2 * a,
          y[s] = (h ? "-=" : "+=") + 2 * a,
          r.animate(c, u, t.easing),
          o = 1;
        w > o;
        o++
      )
        r.animate(l, u, t.easing).animate(y, u, t.easing);
      r
        .animate(l, u, t.easing)
        .animate(c, u / 2, t.easing)
        .queue(function () {
          "hide" === k && r.hide(),
            n.effects.restore(r, p),
            n.effects.removeWrapper(r),
            i();
        }),
        v > 1 && e.splice.apply(e, [1, 0].concat(e.splice(v, b + 1))),
        r.dequeue();
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.slide = function (t, i) {
      var u,
        r = n(this),
        h = ["position", "top", "bottom", "left", "right", "width", "height"],
        c = n.effects.setMode(r, t.mode || "show"),
        l = "show" === c,
        f = t.direction || "left",
        o = "up" === f || "down" === f ? "top" : "left",
        e = "up" === f || "left" === f,
        s = {};
      n.effects.save(r, h),
        r.show(),
        (u = t.distance || r["top" === o ? "outerHeight" : "outerWidth"](!0)),
        n.effects.createWrapper(r).css({
          overflow: "hidden",
        }),
        l && r.css(o, e ? (isNaN(u) ? "-" + u : -u) : u),
        (s[o] = (l ? (e ? "+=" : "-=") : e ? "-=" : "+=") + u),
        r.animate(s, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            "hide" === c && r.hide(),
              n.effects.restore(r, h),
              n.effects.removeWrapper(r),
              i();
          },
        });
    };
  })(jQuery),
  (function (n) {
    n.effects.effect.transfer = function (t, i) {
      var f = n(this),
        r = n(t.to),
        u = "fixed" === r.css("position"),
        h = n("body"),
        c = u ? h.scrollTop() : 0,
        s = u ? h.scrollLeft() : 0,
        e = r.offset(),
        a = {
          top: e.top - c,
          left: e.left - s,
          height: r.innerHeight(),
          width: r.innerWidth(),
        },
        o = f.offset(),
        l = n("<div class='ui-effects-transfer'></div>")
          .appendTo(document.body)
          .addClass(t.className)
          .css({
            top: o.top - c,
            left: o.left - s,
            height: f.innerHeight(),
            width: f.innerWidth(),
            position: u ? "fixed" : "absolute",
          })
          .animate(a, t.duration, t.easing, function () {
            l.remove(), i();
          });
    };
  })(jQuery),
  (function (n) {
    n.widget("ui.menu", {
      version: "1.10.3",
      defaultElement: "<ul>",
      delay: 300,
      options: {
        icons: {
          submenu: "ui-icon-carat-1-e",
        },
        menus: "ul",
        position: {
          my: "left top",
          at: "right top",
        },
        role: "menu",
        blur: null,
        focus: null,
        select: null,
      },
      _create: function () {
        (this.activeMenu = this.element),
          (this.mouseHandled = !1),
          this.element
            .uniqueId()
            .addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
            .toggleClass(
              "ui-menu-icons",
              !!this.element.find(".ui-icon").length
            )
            .attr({
              role: this.options.role,
              tabIndex: 0,
            })
            .bind(
              "click" + this.eventNamespace,
              n.proxy(function (n) {
                this.options.disabled && n.preventDefault();
              }, this)
            ),
          this.options.disabled &&
            this.element
              .addClass("ui-state-disabled")
              .attr("aria-disabled", "true"),
          this._on({
            "mousedown .ui-menu-item > a": function (n) {
              n.preventDefault();
            },
            "click .ui-state-disabled > a": function (n) {
              n.preventDefault();
            },
            "click .ui-menu-item:has(a)": function (t) {
              var i = n(t.target).closest(".ui-menu-item");
              !this.mouseHandled &&
                i.not(".ui-state-disabled").length &&
                ((this.mouseHandled = !0),
                this.select(t),
                i.has(".ui-menu").length
                  ? this.expand(t)
                  : this.element.is(":focus") ||
                    (this.element.trigger("focus", [!0]),
                    this.active &&
                      1 === this.active.parents(".ui-menu").length &&
                      clearTimeout(this.timer)));
            },
            "mouseenter .ui-menu-item": function (t) {
              var i = n(t.currentTarget);
              i
                .siblings()
                .children(".ui-state-active")
                .removeClass("ui-state-active"),
                this.focus(t, i);
            },
            mouseleave: "collapseAll",
            "mouseleave .ui-menu": "collapseAll",
            focus: function (n, t) {
              var i =
                this.active || this.element.children(".ui-menu-item").eq(0);
              t || this.focus(n, i);
            },
            blur: function (t) {
              this._delay(function () {
                n.contains(this.element[0], this.document[0].activeElement) ||
                  this.collapseAll(t);
              });
            },
            keydown: "_keydown",
          }),
          this.refresh(),
          this._on(this.document, {
            click: function (t) {
              n(t.target).closest(".ui-menu").length || this.collapseAll(t),
                (this.mouseHandled = !1);
            },
          });
      },
      _destroy: function () {
        this.element
          .removeAttr("aria-activedescendant")
          .find(".ui-menu")
          .addBack()
          .removeClass(
            "ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons"
          )
          .removeAttr("role")
          .removeAttr("tabIndex")
          .removeAttr("aria-labelledby")
          .removeAttr("aria-expanded")
          .removeAttr("aria-hidden")
          .removeAttr("aria-disabled")
          .removeUniqueId()
          .show(),
          this.element
            .find(".ui-menu-item")
            .removeClass("ui-menu-item")
            .removeAttr("role")
            .removeAttr("aria-disabled")
            .children("a")
            .removeUniqueId()
            .removeClass("ui-corner-all ui-state-hover")
            .removeAttr("tabIndex")
            .removeAttr("role")
            .removeAttr("aria-haspopup")
            .children()
            .each(function () {
              var t = n(this);
              t.data("ui-menu-submenu-carat") && t.remove();
            }),
          this.element
            .find(".ui-menu-divider")
            .removeClass("ui-menu-divider ui-widget-content");
      },
      _keydown: function (t) {
        function s(n) {
          return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        }
        var i,
          e,
          r,
          f,
          u,
          o = !0;
        switch (t.keyCode) {
          case n.ui.keyCode.PAGE_UP:
            this.previousPage(t);
            break;
          case n.ui.keyCode.PAGE_DOWN:
            this.nextPage(t);
            break;
          case n.ui.keyCode.HOME:
            this._move("first", "first", t);
            break;
          case n.ui.keyCode.END:
            this._move("last", "last", t);
            break;
          case n.ui.keyCode.UP:
            this.previous(t);
            break;
          case n.ui.keyCode.DOWN:
            this.next(t);
            break;
          case n.ui.keyCode.LEFT:
            this.collapse(t);
            break;
          case n.ui.keyCode.RIGHT:
            this.active &&
              !this.active.is(".ui-state-disabled") &&
              this.expand(t);
            break;
          case n.ui.keyCode.ENTER:
          case n.ui.keyCode.SPACE:
            this._activate(t);
            break;
          case n.ui.keyCode.ESCAPE:
            this.collapse(t);
            break;
          default:
            (o = !1),
              (e = this.previousFilter || ""),
              (r = String.fromCharCode(t.keyCode)),
              (f = !1),
              clearTimeout(this.filterTimer),
              r === e ? (f = !0) : (r = e + r),
              (u = RegExp("^" + s(r), "i")),
              (i = this.activeMenu
                .children(".ui-menu-item")
                .filter(function () {
                  return u.test(n(this).children("a").text());
                })),
              (i =
                f && -1 !== i.index(this.active.next())
                  ? this.active.nextAll(".ui-menu-item")
                  : i),
              i.length ||
                ((r = String.fromCharCode(t.keyCode)),
                (u = RegExp("^" + s(r), "i")),
                (i = this.activeMenu
                  .children(".ui-menu-item")
                  .filter(function () {
                    return u.test(n(this).children("a").text());
                  }))),
              i.length
                ? (this.focus(t, i),
                  i.length > 1
                    ? ((this.previousFilter = r),
                      (this.filterTimer = this._delay(function () {
                        delete this.previousFilter;
                      }, 1000)))
                    : delete this.previousFilter)
                : delete this.previousFilter;
        }
        o && t.preventDefault();
      },
      _activate: function (n) {
        this.active.is(".ui-state-disabled") ||
          (this.active.children("a[aria-haspopup='true']").length
            ? this.expand(n)
            : this.select(n));
      },
      refresh: function () {
        var t,
          r = this.options.icons.submenu,
          i = this.element.find(this.options.menus);
        i
          .filter(":not(.ui-menu)")
          .addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
          .hide()
          .attr({
            role: this.options.role,
            "aria-hidden": "true",
            "aria-expanded": "false",
          })
          .each(function () {
            var i = n(this),
              t = i.prev("a"),
              u = n("<span>")
                .addClass("ui-menu-icon ui-icon " + r)
                .data("ui-menu-submenu-carat", !0);
            t.attr("aria-haspopup", "true").prepend(u),
              i.attr("aria-labelledby", t.attr("id"));
          }),
          (t = i.add(this.element)),
          t
            .children(":not(.ui-menu-item):has(a)")
            .addClass("ui-menu-item")
            .attr("role", "presentation")
            .children("a")
            .uniqueId()
            .addClass("ui-corner-all")
            .attr({
              tabIndex: -1,
              role: this._itemRole(),
            }),
          t.children(":not(.ui-menu-item)").each(function () {
            var t = n(this);
            /[^\-\u2014\u2013\s]/.test(t.text()) ||
              t.addClass("ui-widget-content ui-menu-divider");
          }),
          t.children(".ui-state-disabled").attr("aria-disabled", "true"),
          this.active &&
            !n.contains(this.element[0], this.active[0]) &&
            this.blur();
      },
      _itemRole: function () {
        return {
          menu: "menuitem",
          listbox: "option",
        }[this.options.role];
      },
      _setOption: function (n, t) {
        "icons" === n &&
          this.element
            .find(".ui-menu-icon")
            .removeClass(this.options.icons.submenu)
            .addClass(t.submenu),
          this._super(n, t);
      },
      focus: function (n, t) {
        var i, r;
        this.blur(n, n && "focus" === n.type),
          this._scrollIntoView(t),
          (this.active = t.first()),
          (r = this.active.children("a").addClass("ui-state-focus")),
          this.options.role &&
            this.element.attr("aria-activedescendant", r.attr("id")),
          this.active
            .parent()
            .closest(".ui-menu-item")
            .children("a:first")
            .addClass("ui-state-active"),
          n && "keydown" === n.type
            ? this._close()
            : (this.timer = this._delay(function () {
                this._close();
              }, this.delay)),
          (i = t.children(".ui-menu")),
          i.length && /^mouse/.test(n.type) && this._startOpening(i),
          (this.activeMenu = t.parent()),
          this._trigger("focus", n, {
            item: t,
          });
      },
      _scrollIntoView: function (t) {
        var o, e, i, f, u, r;
        this._hasScroll() &&
          ((o = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0),
          (e = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0),
          (i = t.offset().top - this.activeMenu.offset().top - o - e),
          (f = this.activeMenu.scrollTop()),
          (u = this.activeMenu.height()),
          (r = t.height()),
          0 > i
            ? this.activeMenu.scrollTop(f + i)
            : i + r > u && this.activeMenu.scrollTop(f + i - u + r));
      },
      blur: function (n, t) {
        t || clearTimeout(this.timer),
          this.active &&
            (this.active.children("a").removeClass("ui-state-focus"),
            (this.active = null),
            this._trigger("blur", n, {
              item: this.active,
            }));
      },
      _startOpening: function (n) {
        clearTimeout(this.timer),
          "true" === n.attr("aria-hidden") &&
            (this.timer = this._delay(function () {
              this._close(), this._open(n);
            }, this.delay));
      },
      _open: function (t) {
        var i = n.extend(
          {
            of: this.active,
          },
          this.options.position
        );
        clearTimeout(this.timer),
          this.element
            .find(".ui-menu")
            .not(t.parents(".ui-menu"))
            .hide()
            .attr("aria-hidden", "true"),
          t
            .show()
            .removeAttr("aria-hidden")
            .attr("aria-expanded", "true")
            .position(i);
      },
      collapseAll: function (t, i) {
        clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            var r = i
              ? this.element
              : n(t && t.target).closest(this.element.find(".ui-menu"));
            r.length || (r = this.element),
              this._close(r),
              this.blur(t),
              (this.activeMenu = r);
          }, this.delay));
      },
      _close: function (n) {
        n || (n = this.active ? this.active.parent() : this.element),
          n
            .find(".ui-menu")
            .hide()
            .attr("aria-hidden", "true")
            .attr("aria-expanded", "false")
            .end()
            .find("a.ui-state-active")
            .removeClass("ui-state-active");
      },
      collapse: function (n) {
        var t =
          this.active &&
          this.active.parent().closest(".ui-menu-item", this.element);
        t && t.length && (this._close(), this.focus(n, t));
      },
      expand: function (n) {
        var t =
          this.active &&
          this.active.children(".ui-menu ").children(".ui-menu-item").first();
        t &&
          t.length &&
          (this._open(t.parent()),
          this._delay(function () {
            this.focus(n, t);
          }));
      },
      next: function (n) {
        this._move("next", "first", n);
      },
      previous: function (n) {
        this._move("prev", "last", n);
      },
      isFirstItem: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length;
      },
      isLastItem: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length;
      },
      _move: function (n, t, i) {
        var r;
        this.active &&
          (r =
            "first" === n || "last" === n
              ? this.active["first" === n ? "prevAll" : "nextAll"](
                  ".ui-menu-item"
                ).eq(-1)
              : this.active[n + "All"](".ui-menu-item").eq(0)),
          (r && r.length && this.active) ||
            (r = this.activeMenu.children(".ui-menu-item")[t]()),
          this.focus(i, r);
      },
      nextPage: function (t) {
        var i, u, r;
        return this.active
          ? (this.isLastItem() ||
              (this._hasScroll()
                ? ((u = this.active.offset().top),
                  (r = this.element.height()),
                  this.active.nextAll(".ui-menu-item").each(function () {
                    return (i = n(this)), 0 > i.offset().top - u - r;
                  }),
                  this.focus(t, i))
                : this.focus(
                    t,
                    this.activeMenu
                      .children(".ui-menu-item")
                      [this.active ? "last" : "first"]()
                  )),
            undefined)
          : (this.next(t), undefined);
      },
      previousPage: function (t) {
        var i, u, r;
        return this.active
          ? (this.isFirstItem() ||
              (this._hasScroll()
                ? ((u = this.active.offset().top),
                  (r = this.element.height()),
                  this.active.prevAll(".ui-menu-item").each(function () {
                    return (i = n(this)), i.offset().top - u + r > 0;
                  }),
                  this.focus(t, i))
                : this.focus(
                    t,
                    this.activeMenu.children(".ui-menu-item").first()
                  )),
            undefined)
          : (this.next(t), undefined);
      },
      _hasScroll: function () {
        return this.element.outerHeight() < this.element.prop("scrollHeight");
      },
      select: function (t) {
        this.active = this.active || n(t.target).closest(".ui-menu-item");
        var i = {
          item: this.active,
        };
        this.active.has(".ui-menu").length || this.collapseAll(t, !0),
          this._trigger("select", t, i);
      },
    });
  })(jQuery),
  (function (n, t) {
    function c(n, t, i) {
      return [
        parseFloat(n[0]) * (s.test(n[0]) ? t / 100 : 1),
        parseFloat(n[1]) * (s.test(n[1]) ? i / 100 : 1),
      ];
    }
    function u(t, i) {
      return parseInt(n.css(t, i), 10) || 0;
    }
    function y(t) {
      var i = t[0];
      return 9 === i.nodeType
        ? {
            width: t.width(),
            height: t.height(),
            offset: {
              top: 0,
              left: 0,
            },
          }
        : n.isWindow(i)
        ? {
            width: t.width(),
            height: t.height(),
            offset: {
              top: t.scrollTop(),
              left: t.scrollLeft(),
            },
          }
        : i.preventDefault
        ? {
            width: 0,
            height: 0,
            offset: {
              top: i.pageY,
              left: i.pageX,
            },
          }
        : {
            width: t.outerWidth(),
            height: t.outerHeight(),
            offset: t.offset(),
          };
    }
    n.ui = n.ui || {};
    var f,
      r = Math.max,
      i = Math.abs,
      l = Math.round,
      a = /left|center|right/,
      o = /top|center|bottom/,
      e = /[\+\-]\d+(\.[\d]+)?%?/,
      h = /^\w+/,
      s = /%$/,
      v = n.fn.position;
    (n.position = {
      scrollbarWidth: function () {
        if (f !== t) return f;
        var u,
          r,
          i = n(
            "<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
          ),
          e = i.children()[0];
        return (
          n("body").append(i),
          (u = e.offsetWidth),
          i.css("overflow", "scroll"),
          (r = e.offsetWidth),
          u === r && (r = i[0].clientWidth),
          i.remove(),
          (f = u - r)
        );
      },
      getScrollInfo: function (t) {
        var r = t.isWindow ? "" : t.element.css("overflow-x"),
          i = t.isWindow ? "" : t.element.css("overflow-y"),
          f =
            "scroll" === r ||
            ("auto" === r && t.width < t.element[0].scrollWidth),
          u =
            "scroll" === i ||
            ("auto" === i && t.height < t.element[0].scrollHeight);
        return {
          width: u ? n.position.scrollbarWidth() : 0,
          height: f ? n.position.scrollbarWidth() : 0,
        };
      },
      getWithinInfo: function (t) {
        var i = n(t || window),
          r = n.isWindow(i[0]);
        return {
          element: i,
          isWindow: r,
          offset: i.offset() || {
            left: 0,
            top: 0,
          },
          scrollLeft: i.scrollLeft(),
          scrollTop: i.scrollTop(),
          width: r ? i.width() : i.outerWidth(),
          height: r ? i.height() : i.outerHeight(),
        };
      },
    }),
      (n.fn.position = function (t) {
        if (!t || !t.of) return v.apply(this, arguments);
        t = n.extend({}, t);
        var k,
          f,
          s,
          w,
          p,
          d,
          nt = n(t.of),
          it = n.position.getWithinInfo(t.within),
          tt = n.position.getScrollInfo(it),
          b = (t.collision || "flip").split(" "),
          g = {};
        return (
          (d = y(nt)),
          nt[0].preventDefault && (t.at = "left top"),
          (f = d.width),
          (s = d.height),
          (w = d.offset),
          (p = n.extend({}, w)),
          n.each(["my", "at"], function () {
            var i,
              r,
              n = (t[this] || "").split(" ");
            1 === n.length &&
              (n = a.test(n[0])
                ? n.concat(["center"])
                : o.test(n[0])
                ? ["center"].concat(n)
                : ["center", "center"]),
              (n[0] = a.test(n[0]) ? n[0] : "center"),
              (n[1] = o.test(n[1]) ? n[1] : "center"),
              (i = e.exec(n[0])),
              (r = e.exec(n[1])),
              (g[this] = [i ? i[0] : 0, r ? r[0] : 0]),
              (t[this] = [h.exec(n[0])[0], h.exec(n[1])[0]]);
          }),
          1 === b.length && (b[1] = b[0]),
          "right" === t.at[0]
            ? (p.left += f)
            : "center" === t.at[0] && (p.left += f / 2),
          "bottom" === t.at[1]
            ? (p.top += s)
            : "center" === t.at[1] && (p.top += s / 2),
          (k = c(g.at, f, s)),
          (p.left += k[0]),
          (p.top += k[1]),
          this.each(function () {
            var y,
              ut,
              a = n(this),
              o = a.outerWidth(),
              h = a.outerHeight(),
              rt = u(this, "marginLeft"),
              d = u(this, "marginTop"),
              ft = o + rt + u(this, "marginRight") + tt.width,
              et = h + d + u(this, "marginBottom") + tt.height,
              e = n.extend({}, p),
              v = c(g.my, a.outerWidth(), a.outerHeight());
            "right" === t.my[0]
              ? (e.left -= o)
              : "center" === t.my[0] && (e.left -= o / 2),
              "bottom" === t.my[1]
                ? (e.top -= h)
                : "center" === t.my[1] && (e.top -= h / 2),
              (e.left += v[0]),
              (e.top += v[1]),
              n.support.offsetFractions ||
                ((e.left = l(e.left)), (e.top = l(e.top))),
              (y = {
                marginLeft: rt,
                marginTop: d,
              }),
              n.each(["left", "top"], function (i, r) {
                n.ui.position[b[i]] &&
                  n.ui.position[b[i]][r](e, {
                    targetWidth: f,
                    targetHeight: s,
                    elemWidth: o,
                    elemHeight: h,
                    collisionPosition: y,
                    collisionWidth: ft,
                    collisionHeight: et,
                    offset: [k[0] + v[0], k[1] + v[1]],
                    my: t.my,
                    at: t.at,
                    within: it,
                    elem: a,
                  });
              }),
              t.using &&
                (ut = function (n) {
                  var l = w.left - e.left,
                    v = l + f - o,
                    u = w.top - e.top,
                    y = u + s - h,
                    c = {
                      target: {
                        element: nt,
                        left: w.left,
                        top: w.top,
                        width: f,
                        height: s,
                      },
                      element: {
                        element: a,
                        left: e.left,
                        top: e.top,
                        width: o,
                        height: h,
                      },
                      horizontal: 0 > v ? "left" : l > 0 ? "right" : "center",
                      vertical: 0 > y ? "top" : u > 0 ? "bottom" : "middle",
                    };
                  o > f && f > i(l + v) && (c.horizontal = "center"),
                    h > s && s > i(u + y) && (c.vertical = "middle"),
                    (c.important =
                      r(i(l), i(v)) > r(i(u), i(y))
                        ? "horizontal"
                        : "vertical"),
                    t.using.call(this, n, c);
                }),
              a.offset(
                n.extend(e, {
                  using: ut,
                })
              );
          })
        );
      }),
      (n.ui.position = {
        fit: {
          left: function (n, t) {
            var h,
              e = t.within,
              u = e.isWindow ? e.scrollLeft : e.offset.left,
              o = e.width,
              s = n.left - t.collisionPosition.marginLeft,
              i = u - s,
              f = s + t.collisionWidth - o - u;
            t.collisionWidth > o
              ? i > 0 && 0 >= f
                ? ((h = n.left + i + t.collisionWidth - o - u),
                  (n.left += i - h))
                : (n.left =
                    f > 0 && 0 >= i ? u : i > f ? u + o - t.collisionWidth : u)
              : i > 0
              ? (n.left += i)
              : f > 0
              ? (n.left -= f)
              : (n.left = r(n.left - s, n.left));
          },
          top: function (n, t) {
            var h,
              o = t.within,
              u = o.isWindow ? o.scrollTop : o.offset.top,
              e = t.within.height,
              s = n.top - t.collisionPosition.marginTop,
              i = u - s,
              f = s + t.collisionHeight - e - u;
            t.collisionHeight > e
              ? i > 0 && 0 >= f
                ? ((h = n.top + i + t.collisionHeight - e - u),
                  (n.top += i - h))
                : (n.top =
                    f > 0 && 0 >= i ? u : i > f ? u + e - t.collisionHeight : u)
              : i > 0
              ? (n.top += i)
              : f > 0
              ? (n.top -= f)
              : (n.top = r(n.top - s, n.top));
          },
        },
        flip: {
          left: function (n, t) {
            var h,
              o,
              r = t.within,
              y = r.offset.left + r.scrollLeft,
              v = r.width,
              s = r.isWindow ? r.scrollLeft : r.offset.left,
              a = n.left - t.collisionPosition.marginLeft,
              l = a - s,
              c = a + t.collisionWidth - v - s,
              e =
                "left" === t.my[0]
                  ? -t.elemWidth
                  : "right" === t.my[0]
                  ? t.elemWidth
                  : 0,
              f =
                "left" === t.at[0]
                  ? t.targetWidth
                  : "right" === t.at[0]
                  ? -t.targetWidth
                  : 0,
              u = -2 * t.offset[0];
            0 > l
              ? ((h = n.left + e + f + u + t.collisionWidth - v - y),
                (0 > h || i(l) > h) && (n.left += e + f + u))
              : c > 0 &&
                ((o = n.left - t.collisionPosition.marginLeft + e + f + u - s),
                (o > 0 || c > i(o)) && (n.left += e + f + u));
          },
          top: function (n, t) {
            var s,
              h,
              e = t.within,
              y = e.offset.top + e.scrollTop,
              a = e.height,
              c = e.isWindow ? e.scrollTop : e.offset.top,
              v = n.top - t.collisionPosition.marginTop,
              l = v - c,
              o = v + t.collisionHeight - a - c,
              p = "top" === t.my[1],
              u = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
              f =
                "top" === t.at[1]
                  ? t.targetHeight
                  : "bottom" === t.at[1]
                  ? -t.targetHeight
                  : 0,
              r = -2 * t.offset[1];
            0 > l
              ? ((h = n.top + u + f + r + t.collisionHeight - a - y),
                n.top + u + f + r > l &&
                  (0 > h || i(l) > h) &&
                  (n.top += u + f + r))
              : o > 0 &&
                ((s = n.top - t.collisionPosition.marginTop + u + f + r - c),
                n.top + u + f + r > o &&
                  (s > 0 || o > i(s)) &&
                  (n.top += u + f + r));
          },
        },
        flipfit: {
          left: function () {
            n.ui.position.flip.left.apply(this, arguments),
              n.ui.position.fit.left.apply(this, arguments);
          },
          top: function () {
            n.ui.position.flip.top.apply(this, arguments),
              n.ui.position.fit.top.apply(this, arguments);
          },
        },
      }),
      (function () {
        var t,
          r,
          i,
          e,
          o,
          u = document.getElementsByTagName("body")[0],
          f = document.createElement("div");
        (t = document.createElement(u ? "div" : "body")),
          (i = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none",
          }),
          u &&
            n.extend(i, {
              position: "absolute",
              left: "-1000px",
              top: "-1000px",
            });
        for (o in i) t.style[o] = i[o];
        t.appendChild(f),
          (r = u || document.documentElement),
          r.insertBefore(t, r.firstChild),
          (f.style.cssText = "position: absolute; left: 10.7432222px;"),
          (e = n(f).offset().left),
          (n.support.offsetFractions = e > 10 && 11 > e),
          (t.innerHTML = ""),
          r.removeChild(t);
      })();
  })(jQuery),
  (function (n, t) {
    n.widget("ui.progressbar", {
      version: "1.10.3",
      options: {
        max: 100,
        value: 0,
        change: null,
        complete: null,
      },
      min: 0,
      _create: function () {
        (this.oldValue = this.options.value = this._constrainedValue()),
          this.element
            .addClass(
              "ui-progressbar ui-widget ui-widget-content ui-corner-all"
            )
            .attr({
              role: "progressbar",
              "aria-valuemin": this.min,
            }),
          (this.valueDiv = n(
            "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>"
          ).appendTo(this.element)),
          this._refreshValue();
      },
      _destroy: function () {
        this.element
          .removeClass(
            "ui-progressbar ui-widget ui-widget-content ui-corner-all"
          )
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.valueDiv.remove();
      },
      value: function (n) {
        return n === t
          ? this.options.value
          : ((this.options.value = this._constrainedValue(n)),
            this._refreshValue(),
            t);
      },
      _constrainedValue: function (n) {
        return (
          n === t && (n = this.options.value),
          (this.indeterminate = n === !1),
          "number" != typeof n && (n = 0),
          this.indeterminate
            ? !1
            : Math.min(this.options.max, Math.max(this.min, n))
        );
      },
      _setOptions: function (n) {
        var t = n.value;
        delete n.value,
          this._super(n),
          (this.options.value = this._constrainedValue(t)),
          this._refreshValue();
      },
      _setOption: function (n, t) {
        "max" === n && (t = Math.max(this.min, t)), this._super(n, t);
      },
      _percentage: function () {
        return this.indeterminate
          ? 100
          : (100 * (this.options.value - this.min)) /
              (this.options.max - this.min);
      },
      _refreshValue: function () {
        var t = this.options.value,
          i = this._percentage();
        this.valueDiv
          .toggle(this.indeterminate || t > this.min)
          .toggleClass("ui-corner-right", t === this.options.max)
          .width(i.toFixed(0) + "%"),
          this.element.toggleClass(
            "ui-progressbar-indeterminate",
            this.indeterminate
          ),
          this.indeterminate
            ? (this.element.removeAttr("aria-valuenow"),
              this.overlayDiv ||
                (this.overlayDiv = n(
                  "<div class='ui-progressbar-overlay'></div>"
                ).appendTo(this.valueDiv)))
            : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t,
              }),
              this.overlayDiv &&
                (this.overlayDiv.remove(), (this.overlayDiv = null))),
          this.oldValue !== t && ((this.oldValue = t), this._trigger("change")),
          t === this.options.max && this._trigger("complete");
      },
    });
  })(jQuery),
  (function (n) {
    var t = 5;
    n.widget("ui.slider", n.ui.mouse, {
      version: "1.10.3",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this.element.addClass(
            "ui-slider ui-slider-" +
              this.orientation +
              " ui-widget ui-widget-content ui-corner-all"
          ),
          this._refresh(),
          this._setOption("disabled", this.options.disabled),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var r,
          i,
          f = this.options,
          t = this.element
            .find(".ui-slider-handle")
            .addClass("ui-state-default ui-corner-all"),
          e =
            "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
          u = [];
        for (
          i = (f.values && f.values.length) || 1,
            t.length > i && (t.slice(i).remove(), (t = t.slice(0, i))),
            r = t.length;
          i > r;
          r++
        )
          u.push(e);
        (this.handles = t.add(n(u.join("")).appendTo(this.element))),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (t) {
            n(this).data("ui-slider-handle-index", t);
          });
      },
      _createRange: function () {
        var t = this.options,
          i = "";
        t.range
          ? (t.range === !0 &&
              (t.values
                ? t.values.length && 2 !== t.values.length
                  ? (t.values = [t.values[0], t.values[0]])
                  : n.isArray(t.values) && (t.values = t.values.slice(0))
                : (t.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? this.range
                  .removeClass("ui-slider-range-min ui-slider-range-max")
                  .css({
                    left: "",
                    bottom: "",
                  })
              : ((this.range = n("<div></div>").appendTo(this.element)),
                (i = "ui-slider-range ui-widget-header ui-corner-all")),
            this.range.addClass(
              i +
                ("min" === t.range || "max" === t.range
                  ? " ui-slider-range-" + t.range
                  : "")
            ))
          : (this.range = n([]));
      },
      _setupEvents: function () {
        var n = this.handles.add(this.range).filter("a");
        this._off(n),
          this._on(n, this._handleEvents),
          this._hoverable(n),
          this._focusable(n);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range.remove(),
          this.element.removeClass(
            "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
          ),
          this._mouseDestroy();
      },
      _mouseCapture: function (t) {
        var l,
          o,
          u,
          i,
          r,
          c,
          f,
          h,
          e = this,
          s = this.options;
        return s.disabled
          ? !1
          : ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (l = {
              x: t.pageX,
              y: t.pageY,
            }),
            (o = this._normValueFromMouse(l)),
            (u = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (t) {
              var f = Math.abs(o - e.values(t));
              (u > f ||
                (u === f &&
                  (t === e._lastChangedValue || e.values(t) === s.min))) &&
                ((u = f), (i = n(this)), (r = t));
            }),
            (c = this._start(t, r)),
            c === !1
              ? !1
              : ((this._mouseSliding = !0),
                (this._handleIndex = r),
                i.addClass("ui-state-active").focus(),
                (f = i.offset()),
                (h = !n(t.target).parents().addBack().is(".ui-slider-handle")),
                (this._clickOffset = h
                  ? {
                      left: 0,
                      top: 0,
                    }
                  : {
                      left: t.pageX - f.left - i.width() / 2,
                      top:
                        t.pageY -
                        f.top -
                        i.height() / 2 -
                        (parseInt(i.css("borderTopWidth"), 10) || 0) -
                        (parseInt(i.css("borderBottomWidth"), 10) || 0) +
                        (parseInt(i.css("marginTop"), 10) || 0),
                    }),
                this.handles.hasClass("ui-state-hover") || this._slide(t, r, o),
                (this._animateOff = !0),
                !0));
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (n) {
        var i = {
            x: n.pageX,
            y: n.pageY,
          },
          t = this._normValueFromMouse(i);
        return this._slide(n, this._handleIndex, t), !1;
      },
      _mouseStop: function (n) {
        return (
          this.handles.removeClass("ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(n, this._handleIndex),
          this._change(n, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1),
          !1
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (n) {
        var r, i, t, f, u;
        return (
          "horizontal" === this.orientation
            ? ((r = this.elementSize.width),
              (i =
                n.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((r = this.elementSize.height),
              (i =
                n.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0))),
          (t = i / r),
          t > 1 && (t = 1),
          0 > t && (t = 0),
          "vertical" === this.orientation && (t = 1 - t),
          (f = this._valueMax() - this._valueMin()),
          (u = this._valueMin() + t * f),
          this._trimAlignValue(u)
        );
      },
      _start: function (n, t) {
        var i = {
          handle: this.handles[t],
          value: this.value(),
        };
        return (
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values())),
          this._trigger("start", n, i)
        );
      },
      _slide: function (n, t, i) {
        var r, f, u;
        this.options.values && this.options.values.length
          ? ((r = this.values(t ? 0 : 1)),
            2 === this.options.values.length &&
              this.options.range === !0 &&
              ((0 === t && i > r) || (1 === t && r > i)) &&
              (i = r),
            i !== this.values(t) &&
              ((f = this.values()),
              (f[t] = i),
              (u = this._trigger("slide", n, {
                handle: this.handles[t],
                value: i,
                values: f,
              })),
              (r = this.values(t ? 0 : 1)),
              u !== !1 && this.values(t, i, !0)))
          : i !== this.value() &&
            ((u = this._trigger("slide", n, {
              handle: this.handles[t],
              value: i,
            })),
            u !== !1 && this.value(i));
      },
      _stop: function (n, t) {
        var i = {
          handle: this.handles[t],
          value: this.value(),
        };
        this.options.values &&
          this.options.values.length &&
          ((i.value = this.values(t)), (i.values = this.values())),
          this._trigger("stop", n, i);
      },
      _change: function (n, t) {
        if (!this._keySliding && !this._mouseSliding) {
          var i = {
            handle: this.handles[t],
            value: this.value(),
          };
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(t)), (i.values = this.values())),
            (this._lastChangedValue = t),
            this._trigger("change", n, i);
        }
      },
      value: function (n) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(n)),
            this._refreshValue(),
            this._change(null, 0),
            undefined)
          : this._value();
      },
      values: function (t, i) {
        var u, f, r;
        if (arguments.length > 1)
          return (
            (this.options.values[t] = this._trimAlignValue(i)),
            this._refreshValue(),
            this._change(null, t),
            undefined
          );
        if (!arguments.length) return this._values();
        if (!n.isArray(arguments[0]))
          return this.options.values && this.options.values.length
            ? this._values(t)
            : this.value();
        for (
          u = this.options.values, f = arguments[0], r = 0;
          u.length > r;
          r += 1
        )
          (u[r] = this._trimAlignValue(f[r])), this._change(null, r);
        this._refreshValue();
      },
      _setOption: function (t, i) {
        var r,
          u = 0;
        switch (
          ("range" === t &&
            this.options.range === !0 &&
            ("min" === i
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === i &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          n.isArray(this.options.values) && (u = this.options.values.length),
          n.Widget.prototype._setOption.apply(this, arguments),
          t)
        ) {
          case "orientation":
            this._detectOrientation(),
              this.element
                .removeClass("ui-slider-horizontal ui-slider-vertical")
                .addClass("ui-slider-" + this.orientation),
              this._refreshValue();
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), r = 0;
              u > r;
              r += 1
            )
              this._change(null, r);
            this._animateOff = !1;
            break;
          case "min":
          case "max":
            (this._animateOff = !0),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _value: function () {
        var n = this.options.value;
        return (n = this._trimAlignValue(n));
      },
      _values: function (n) {
        var r, t, i;
        if (arguments.length)
          return (r = this.options.values[n]), (r = this._trimAlignValue(r));
        if (this.options.values && this.options.values.length) {
          for (t = this.options.values.slice(), i = 0; t.length > i; i += 1)
            t[i] = this._trimAlignValue(t[i]);
          return t;
        }
        return [];
      },
      _trimAlignValue: function (n) {
        if (this._valueMin() >= n) return this._valueMin();
        if (n >= this._valueMax()) return this._valueMax();
        var t = this.options.step > 0 ? this.options.step : 1,
          i = (n - this._valueMin()) % t,
          r = n - i;
        return (
          2 * Math.abs(i) >= t && (r += i > 0 ? t : -t),
          parseFloat(r.toFixed(5))
        );
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.options.max;
      },
      _refreshValue: function () {
        var s,
          t,
          c,
          o,
          h,
          e = this.options.range,
          i = this.options,
          r = this,
          u = this._animateOff ? !1 : i.animate,
          f = {};
        this.options.values && this.options.values.length
          ? this.handles.each(function (e) {
              (t =
                100 *
                ((r.values(e) - r._valueMin()) /
                  (r._valueMax() - r._valueMin()))),
                (f["horizontal" === r.orientation ? "left" : "bottom"] =
                  t + "%"),
                n(this).stop(1, 1)[u ? "animate" : "css"](f, i.animate),
                r.options.range === !0 &&
                  ("horizontal" === r.orientation
                    ? (0 === e &&
                        r.range.stop(1, 1)[u ? "animate" : "css"](
                          {
                            left: t + "%",
                          },
                          i.animate
                        ),
                      1 === e &&
                        r.range[u ? "animate" : "css"](
                          {
                            width: t - s + "%",
                          },
                          {
                            queue: !1,
                            duration: i.animate,
                          }
                        ))
                    : (0 === e &&
                        r.range.stop(1, 1)[u ? "animate" : "css"](
                          {
                            bottom: t + "%",
                          },
                          i.animate
                        ),
                      1 === e &&
                        r.range[u ? "animate" : "css"](
                          {
                            height: t - s + "%",
                          },
                          {
                            queue: !1,
                            duration: i.animate,
                          }
                        ))),
                (s = t);
            })
          : ((c = this.value()),
            (o = this._valueMin()),
            (h = this._valueMax()),
            (t = h !== o ? 100 * ((c - o) / (h - o)) : 0),
            (f["horizontal" === this.orientation ? "left" : "bottom"] =
              t + "%"),
            this.handle.stop(1, 1)[u ? "animate" : "css"](f, i.animate),
            "min" === e &&
              "horizontal" === this.orientation &&
              this.range.stop(1, 1)[u ? "animate" : "css"](
                {
                  width: t + "%",
                },
                i.animate
              ),
            "max" === e &&
              "horizontal" === this.orientation &&
              this.range[u ? "animate" : "css"](
                {
                  width: 100 - t + "%",
                },
                {
                  queue: !1,
                  duration: i.animate,
                }
              ),
            "min" === e &&
              "vertical" === this.orientation &&
              this.range.stop(1, 1)[u ? "animate" : "css"](
                {
                  height: t + "%",
                },
                i.animate
              ),
            "max" === e &&
              "vertical" === this.orientation &&
              this.range[u ? "animate" : "css"](
                {
                  height: 100 - t + "%",
                },
                {
                  queue: !1,
                  duration: i.animate,
                }
              ));
      },
      _handleEvents: {
        keydown: function (i) {
          var o,
            u,
            r,
            e,
            f = n(i.target).data("ui-slider-handle-index");
          switch (i.keyCode) {
            case n.ui.keyCode.HOME:
            case n.ui.keyCode.END:
            case n.ui.keyCode.PAGE_UP:
            case n.ui.keyCode.PAGE_DOWN:
            case n.ui.keyCode.UP:
            case n.ui.keyCode.RIGHT:
            case n.ui.keyCode.DOWN:
            case n.ui.keyCode.LEFT:
              if (
                (i.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  n(i.target).addClass("ui-state-active"),
                  (o = this._start(i, f)),
                  o === !1))
              )
                return;
          }
          switch (
            ((e = this.options.step),
            (u = r =
              this.options.values && this.options.values.length
                ? this.values(f)
                : this.value()),
            i.keyCode)
          ) {
            case n.ui.keyCode.HOME:
              r = this._valueMin();
              break;
            case n.ui.keyCode.END:
              r = this._valueMax();
              break;
            case n.ui.keyCode.PAGE_UP:
              r = this._trimAlignValue(
                u + (this._valueMax() - this._valueMin()) / t
              );
              break;
            case n.ui.keyCode.PAGE_DOWN:
              r = this._trimAlignValue(
                u - (this._valueMax() - this._valueMin()) / t
              );
              break;
            case n.ui.keyCode.UP:
            case n.ui.keyCode.RIGHT:
              if (u === this._valueMax()) return;
              r = this._trimAlignValue(u + e);
              break;
            case n.ui.keyCode.DOWN:
            case n.ui.keyCode.LEFT:
              if (u === this._valueMin()) return;
              r = this._trimAlignValue(u - e);
          }
          this._slide(i, f, r);
        },
        click: function (n) {
          n.preventDefault();
        },
        keyup: function (t) {
          var i = n(t.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(t, i),
            this._change(t, i),
            n(t.target).removeClass("ui-state-active"));
        },
      },
    });
  })(jQuery),
  (function (n) {
    function t(n) {
      return function () {
        var t = this.element.val();
        n.apply(this, arguments),
          this._refresh(),
          t !== this.element.val() && this._trigger("change");
      };
    }
    n.widget("ui.spinner", {
      version: "1.10.3",
      defaultElement: "<input>",
      widgetEventPrefix: "spin",
      options: {
        culture: null,
        icons: {
          down: "ui-icon-triangle-1-s",
          up: "ui-icon-triangle-1-n",
        },
        incremental: !0,
        max: null,
        min: null,
        numberFormat: null,
        page: 10,
        step: 1,
        change: null,
        spin: null,
        start: null,
        stop: null,
      },
      _create: function () {
        this._setOption("max", this.options.max),
          this._setOption("min", this.options.min),
          this._setOption("step", this.options.step),
          this._value(this.element.val(), !0),
          this._draw(),
          this._on(this._events),
          this._refresh(),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            },
          });
      },
      _getCreateOptions: function () {
        var t = {},
          i = this.element;
        return (
          n.each(["min", "max", "step"], function (n, r) {
            var u = i.attr(r);
            void 0 !== u && u.length && (t[r] = u);
          }),
          t
        );
      },
      _events: {
        keydown: function (n) {
          this._start(n) && this._keydown(n) && n.preventDefault();
        },
        keyup: "_stop",
        focus: function () {
          this.previous = this.element.val();
        },
        blur: function (n) {
          return this.cancelBlur
            ? (delete this.cancelBlur, void 0)
            : (this._stop(),
              this._refresh(),
              this.previous !== this.element.val() &&
                this._trigger("change", n),
              void 0);
        },
        mousewheel: function (n, t) {
          if (t) {
            if (!this.spinning && !this._start(n)) return !1;
            this._spin((t > 0 ? 1 : -1) * this.options.step, n),
              clearTimeout(this.mousewheelTimer),
              (this.mousewheelTimer = this._delay(function () {
                this.spinning && this._stop(n);
              }, 100)),
              n.preventDefault();
          }
        },
        "mousedown .ui-spinner-button": function (t) {
          function r() {
            var n = this.element[0] === this.document[0].activeElement;
            n ||
              (this.element.focus(),
              (this.previous = i),
              this._delay(function () {
                this.previous = i;
              }));
          }
          var i;
          (i =
            this.element[0] === this.document[0].activeElement
              ? this.previous
              : this.element.val()),
            t.preventDefault(),
            r.call(this),
            (this.cancelBlur = !0),
            this._delay(function () {
              delete this.cancelBlur, r.call(this);
            }),
            this._start(t) !== !1 &&
              this._repeat(
                null,
                n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                t
              );
        },
        "mouseup .ui-spinner-button": "_stop",
        "mouseenter .ui-spinner-button": function (t) {
          if (n(t.currentTarget).hasClass("ui-state-active"))
            return this._start(t) === !1
              ? !1
              : (this._repeat(
                  null,
                  n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                  t
                ),
                void 0);
        },
        "mouseleave .ui-spinner-button": "_stop",
      },
      _draw: function () {
        var n = (this.uiSpinner = this.element
          .addClass("ui-spinner-input")
          .attr("autocomplete", "off")
          .wrap(this._uiSpinnerHtml())
          .parent()
          .append(this._buttonHtml()));
        this.element.attr("role", "spinbutton"),
          (this.buttons = n
            .find(".ui-spinner-button")
            .attr("tabIndex", -1)
            .button()
            .removeClass("ui-corner-all")),
          this.buttons.height() > Math.ceil(0.5 * n.height()) &&
            n.height() > 0 &&
            n.height(n.height()),
          this.options.disabled && this.disable();
      },
      _keydown: function (t) {
        var r = this.options,
          i = n.ui.keyCode;
        switch (t.keyCode) {
          case i.UP:
            return this._repeat(null, 1, t), !0;
          case i.DOWN:
            return this._repeat(null, -1, t), !0;
          case i.PAGE_UP:
            return this._repeat(null, r.page, t), !0;
          case i.PAGE_DOWN:
            return this._repeat(null, -r.page, t), !0;
        }
        return !1;
      },
      _uiSpinnerHtml: function () {
        return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
      },
      _buttonHtml: function () {
        return (
          "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " +
          this.options.icons.up +
          "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " +
          this.options.icons.down +
          "'>&#9660;</span></a>"
        );
      },
      _start: function (n) {
        return this.spinning || this._trigger("start", n) !== !1
          ? (this.counter || (this.counter = 1), (this.spinning = !0), !0)
          : !1;
      },
      _repeat: function (n, t, i) {
        (n = n || 500),
          clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            this._repeat(40, t, i);
          }, n)),
          this._spin(t * this.options.step, i);
      },
      _spin: function (n, t) {
        var i = this.value() || 0;
        this.counter || (this.counter = 1),
          (i = this._adjustValue(i + n * this._increment(this.counter))),
          (this.spinning &&
            this._trigger("spin", t, {
              value: i,
            }) === !1) ||
            (this._value(i), this.counter++);
      },
      _increment: function (t) {
        var i = this.options.incremental;
        return i
          ? n.isFunction(i)
            ? i(t)
            : Math.floor(
                (t * t * t) / 50000 - (t * t) / 500 + (17 * t) / 200 + 1
              )
          : 1;
      },
      _precision: function () {
        var n = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (n = Math.max(n, this._precisionOf(this.options.min))),
          n
        );
      },
      _precisionOf: function (n) {
        var i = "" + n,
          t = i.indexOf(".");
        return -1 === t ? 0 : i.length - t - 1;
      },
      _adjustValue: function (n) {
        var r,
          i,
          t = this.options;
        return (
          (r = null !== t.min ? t.min : 0),
          (i = n - r),
          (i = Math.round(i / t.step) * t.step),
          (n = r + i),
          (n = parseFloat(n.toFixed(this._precision()))),
          null !== t.max && n > t.max
            ? t.max
            : null !== t.min && t.min > n
            ? t.min
            : n
        );
      },
      _stop: function (n) {
        this.spinning &&
          (clearTimeout(this.timer),
          clearTimeout(this.mousewheelTimer),
          (this.counter = 0),
          (this.spinning = !1),
          this._trigger("stop", n));
      },
      _setOption: function (n, t) {
        if ("culture" === n || "numberFormat" === n) {
          var i = this._parse(this.element.val());
          return (
            (this.options[n] = t), this.element.val(this._format(i)), void 0
          );
        }
        ("max" === n || "min" === n || "step" === n) &&
          "string" == typeof t &&
          (t = this._parse(t)),
          "icons" === n &&
            (this.buttons
              .first()
              .find(".ui-icon")
              .removeClass(this.options.icons.up)
              .addClass(t.up),
            this.buttons
              .last()
              .find(".ui-icon")
              .removeClass(this.options.icons.down)
              .addClass(t.down)),
          this._super(n, t),
          "disabled" === n &&
            (t
              ? (this.element.prop("disabled", !0),
                this.buttons.button("disable"))
              : (this.element.prop("disabled", !1),
                this.buttons.button("enable")));
      },
      _setOptions: t(function (n) {
        this._super(n), this._value(this.element.val());
      }),
      _parse: function (n) {
        return (
          "string" == typeof n &&
            "" !== n &&
            (n =
              window.Globalize && this.options.numberFormat
                ? Globalize.parseFloat(n, 10, this.options.culture)
                : +n),
          "" === n || isNaN(n) ? null : n
        );
      },
      _format: function (n) {
        return "" === n
          ? ""
          : window.Globalize && this.options.numberFormat
          ? Globalize.format(n, this.options.numberFormat, this.options.culture)
          : n;
      },
      _refresh: function () {
        this.element.attr({
          "aria-valuemin": this.options.min,
          "aria-valuemax": this.options.max,
          "aria-valuenow": this._parse(this.element.val()),
        });
      },
      _value: function (n, t) {
        var i;
        "" !== n &&
          ((i = this._parse(n)),
          null !== i &&
            (t || (i = this._adjustValue(i)), (n = this._format(i)))),
          this.element.val(n),
          this._refresh();
      },
      _destroy: function () {
        this.element
          .removeClass("ui-spinner-input")
          .prop("disabled", !1)
          .removeAttr("autocomplete")
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.uiSpinner.replaceWith(this.element);
      },
      stepUp: t(function (n) {
        this._stepUp(n);
      }),
      _stepUp: function (n) {
        this._start() &&
          (this._spin((n || 1) * this.options.step), this._stop());
      },
      stepDown: t(function (n) {
        this._stepDown(n);
      }),
      _stepDown: function (n) {
        this._start() &&
          (this._spin((n || 1) * -this.options.step), this._stop());
      },
      pageUp: t(function (n) {
        this._stepUp((n || 1) * this.options.page);
      }),
      pageDown: t(function (n) {
        this._stepDown((n || 1) * this.options.page);
      }),
      value: function (n) {
        return arguments.length
          ? (t(this._value).call(this, n), void 0)
          : this._parse(this.element.val());
      },
      widget: function () {
        return this.uiSpinner;
      },
    });
  })(jQuery),
  (function (n, t) {
    function u() {
      return ++f;
    }
    function i(n) {
      return (
        n.hash.length > 1 &&
        decodeURIComponent(n.href.replace(r, "")) ===
          decodeURIComponent(location.href.replace(r, ""))
      );
    }
    var f = 0,
      r = /#.*$/;
    n.widget("ui.tabs", {
      version: "1.10.3",
      delay: 300,
      options: {
        active: null,
        collapsible: !1,
        event: "click",
        heightStyle: "content",
        hide: null,
        show: null,
        activate: null,
        beforeActivate: null,
        beforeLoad: null,
        load: null,
      },
      _create: function () {
        var i = this,
          t = this.options;
        (this.running = !1),
          this.element
            .addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
            .toggleClass("ui-tabs-collapsible", t.collapsible)
            .delegate(
              ".ui-tabs-nav > li",
              "mousedown" + this.eventNamespace,
              function (t) {
                n(this).is(".ui-state-disabled") && t.preventDefault();
              }
            )
            .delegate(
              ".ui-tabs-anchor",
              "focus" + this.eventNamespace,
              function () {
                n(this).closest("li").is(".ui-state-disabled") && this.blur();
              }
            ),
          this._processTabs(),
          (t.active = this._initialActive()),
          n.isArray(t.disabled) &&
            (t.disabled = n
              .unique(
                t.disabled.concat(
                  n.map(this.tabs.filter(".ui-state-disabled"), function (n) {
                    return i.tabs.index(n);
                  })
                )
              )
              .sort()),
          (this.active =
            this.options.active !== !1 && this.anchors.length
              ? this._findActive(t.active)
              : n()),
          this._refresh(),
          this.active.length && this.load(t.active);
      },
      _initialActive: function () {
        var i = this.options.active,
          u = this.options.collapsible,
          r = location.hash.substring(1);
        return (
          null === i &&
            (r &&
              this.tabs.each(function (u, f) {
                return n(f).attr("aria-controls") === r ? ((i = u), !1) : t;
              }),
            null === i &&
              (i = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
            (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)),
          i !== !1 &&
            ((i = this.tabs.index(this.tabs.eq(i))),
            -1 === i && (i = u ? !1 : 0)),
          !u && i === !1 && this.anchors.length && (i = 0),
          i
        );
      },
      _getCreateEventData: function () {
        return {
          tab: this.active,
          panel: this.active.length ? this._getPanelForTab(this.active) : n(),
        };
      },
      _tabKeydown: function (i) {
        var f = n(this.document[0].activeElement).closest("li"),
          r = this.tabs.index(f),
          u = !0;
        if (!this._handlePageNav(i)) {
          switch (i.keyCode) {
            case n.ui.keyCode.RIGHT:
            case n.ui.keyCode.DOWN:
              r++;
              break;
            case n.ui.keyCode.UP:
            case n.ui.keyCode.LEFT:
              (u = !1), r--;
              break;
            case n.ui.keyCode.END:
              r = this.anchors.length - 1;
              break;
            case n.ui.keyCode.HOME:
              r = 0;
              break;
            case n.ui.keyCode.SPACE:
              return (
                i.preventDefault(),
                clearTimeout(this.activating),
                this._activate(r),
                t
              );
            case n.ui.keyCode.ENTER:
              return (
                i.preventDefault(),
                clearTimeout(this.activating),
                this._activate(r === this.options.active ? !1 : r),
                t
              );
            default:
              return;
          }
          i.preventDefault(),
            clearTimeout(this.activating),
            (r = this._focusNextTab(r, u)),
            i.ctrlKey ||
              (f.attr("aria-selected", "false"),
              this.tabs.eq(r).attr("aria-selected", "true"),
              (this.activating = this._delay(function () {
                this.option("active", r);
              }, this.delay)));
        }
      },
      _panelKeydown: function (t) {
        this._handlePageNav(t) ||
          (t.ctrlKey &&
            t.keyCode === n.ui.keyCode.UP &&
            (t.preventDefault(), this.active.focus()));
      },
      _handlePageNav: function (i) {
        return i.altKey && i.keyCode === n.ui.keyCode.PAGE_UP
          ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0)
          : i.altKey && i.keyCode === n.ui.keyCode.PAGE_DOWN
          ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0)
          : t;
      },
      _findNextTab: function (t, i) {
        function u() {
          return t > r && (t = 0), 0 > t && (t = r), t;
        }
        for (
          var r = this.tabs.length - 1;
          -1 !== n.inArray(u(), this.options.disabled);

        )
          t = i ? t + 1 : t - 1;
        return t;
      },
      _focusNextTab: function (n, t) {
        return (n = this._findNextTab(n, t)), this.tabs.eq(n).focus(), n;
      },
      _setOption: function (n, i) {
        return "active" === n
          ? (this._activate(i), t)
          : "disabled" === n
          ? (this._setupDisabled(i), t)
          : (this._super(n, i),
            "collapsible" === n &&
              (this.element.toggleClass("ui-tabs-collapsible", i),
              i || this.options.active !== !1 || this._activate(0)),
            "event" === n && this._setupEvents(i),
            "heightStyle" === n && this._setupHeightStyle(i),
            t);
      },
      _tabId: function (n) {
        return n.attr("aria-controls") || "ui-tabs-" + u();
      },
      _sanitizeSelector: function (n) {
        return n
          ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
          : "";
      },
      refresh: function () {
        var t = this.options,
          i = this.tablist.children(":has(a[href])");
        (t.disabled = n.map(i.filter(".ui-state-disabled"), function (n) {
          return i.index(n);
        })),
          this._processTabs(),
          t.active !== !1 && this.anchors.length
            ? this.active.length && !n.contains(this.tablist[0], this.active[0])
              ? this.tabs.length === t.disabled.length
                ? ((t.active = !1), (this.active = n()))
                : this._activate(
                    this._findNextTab(Math.max(0, t.active - 1), !1)
                  )
              : (t.active = this.tabs.index(this.active))
            : ((t.active = !1), (this.active = n())),
          this._refresh();
      },
      _refresh: function () {
        this._setupDisabled(this.options.disabled),
          this._setupEvents(this.options.event),
          this._setupHeightStyle(this.options.heightStyle),
          this.tabs.not(this.active).attr({
            "aria-selected": "false",
            tabIndex: -1,
          }),
          this.panels.not(this._getPanelForTab(this.active)).hide().attr({
            "aria-expanded": "false",
            "aria-hidden": "true",
          }),
          this.active.length
            ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0,
              }),
              this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false",
              }))
            : this.tabs.eq(0).attr("tabIndex", 0);
      },
      _processTabs: function () {
        var t = this;
        (this.tablist = this._getList()
          .addClass(
            "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
          )
          .attr("role", "tablist")),
          (this.tabs = this.tablist
            .find("> li:has(a[href])")
            .addClass("ui-state-default ui-corner-top")
            .attr({
              role: "tab",
              tabIndex: -1,
            })),
          (this.anchors = this.tabs
            .map(function () {
              return n("a", this)[0];
            })
            .addClass("ui-tabs-anchor")
            .attr({
              role: "presentation",
              tabIndex: -1,
            })),
          (this.panels = n()),
          this.anchors.each(function (r, u) {
            var e,
              f,
              s,
              c = n(u).uniqueId().attr("id"),
              o = n(u).closest("li"),
              h = o.attr("aria-controls");
            i(u)
              ? ((e = u.hash), (f = t.element.find(t._sanitizeSelector(e))))
              : ((s = t._tabId(o)),
                (e = "#" + s),
                (f = t.element.find(e)),
                f.length ||
                  ((f = t._createPanel(s)),
                  f.insertAfter(t.panels[r - 1] || t.tablist)),
                f.attr("aria-live", "polite")),
              f.length && (t.panels = t.panels.add(f)),
              h && o.data("ui-tabs-aria-controls", h),
              o.attr({
                "aria-controls": e.substring(1),
                "aria-labelledby": c,
              }),
              f.attr("aria-labelledby", c);
          }),
          this.panels
            .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
            .attr("role", "tabpanel");
      },
      _getList: function () {
        return this.element.find("ol,ul").eq(0);
      },
      _createPanel: function (t) {
        return n("<div>")
          .attr("id", t)
          .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
          .data("ui-tabs-destroy", !0);
      },
      _setupDisabled: function (t) {
        n.isArray(t) &&
          (t.length ? t.length === this.anchors.length && (t = !0) : (t = !1));
        for (var r, i = 0; (r = this.tabs[i]); i++)
          t === !0 || -1 !== n.inArray(i, t)
            ? n(r).addClass("ui-state-disabled").attr("aria-disabled", "true")
            : n(r).removeClass("ui-state-disabled").removeAttr("aria-disabled");
        this.options.disabled = t;
      },
      _setupEvents: function (t) {
        var i = {
          click: function (n) {
            n.preventDefault();
          },
        };
        t &&
          n.each(t.split(" "), function (n, t) {
            i[t] = "_eventHandler";
          }),
          this._off(this.anchors.add(this.tabs).add(this.panels)),
          this._on(this.anchors, i),
          this._on(this.tabs, {
            keydown: "_tabKeydown",
          }),
          this._on(this.panels, {
            keydown: "_panelKeydown",
          }),
          this._focusable(this.tabs),
          this._hoverable(this.tabs);
      },
      _setupHeightStyle: function (t) {
        var i,
          r = this.element.parent();
        "fill" === t
          ? ((i = r.height()),
            (i -= this.element.outerHeight() - this.element.height()),
            this.element.siblings(":visible").each(function () {
              var r = n(this),
                t = r.css("position");
              "absolute" !== t && "fixed" !== t && (i -= r.outerHeight(!0));
            }),
            this.element
              .children()
              .not(this.panels)
              .each(function () {
                i -= n(this).outerHeight(!0);
              }),
            this.panels
              .each(function () {
                n(this).height(
                  Math.max(0, i - n(this).innerHeight() + n(this).height())
                );
              })
              .css("overflow", "auto"))
          : "auto" === t &&
            ((i = 0),
            this.panels
              .each(function () {
                i = Math.max(i, n(this).height("").height());
              })
              .height(i));
      },
      _eventHandler: function (t) {
        var o = this.options,
          r = this.active,
          c = n(t.currentTarget),
          i = c.closest("li"),
          e = i[0] === r[0],
          u = e && o.collapsible,
          f = u ? n() : this._getPanelForTab(i),
          s = r.length ? this._getPanelForTab(r) : n(),
          h = {
            oldTab: r,
            oldPanel: s,
            newTab: u ? n() : i,
            newPanel: f,
          };
        t.preventDefault(),
          i.hasClass("ui-state-disabled") ||
            i.hasClass("ui-tabs-loading") ||
            this.running ||
            (e && !o.collapsible) ||
            this._trigger("beforeActivate", t, h) === !1 ||
            ((o.active = u ? !1 : this.tabs.index(i)),
            (this.active = e ? n() : i),
            this.xhr && this.xhr.abort(),
            s.length ||
              f.length ||
              n.error("jQuery UI Tabs: Mismatching fragment identifier."),
            f.length && this.load(this.tabs.index(i), t),
            this._toggle(t, h));
      },
      _toggle: function (t, i) {
        function o() {
          (u.running = !1), u._trigger("activate", t, i);
        }
        function e() {
          i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
            r.length && u.options.show
              ? u._show(r, u.options.show, o)
              : (r.show(), o());
        }
        var u = this,
          r = i.newPanel,
          f = i.oldPanel;
        (this.running = !0),
          f.length && this.options.hide
            ? this._hide(f, this.options.hide, function () {
                i.oldTab
                  .closest("li")
                  .removeClass("ui-tabs-active ui-state-active"),
                  e();
              })
            : (i.oldTab
                .closest("li")
                .removeClass("ui-tabs-active ui-state-active"),
              f.hide(),
              e()),
          f.attr({
            "aria-expanded": "false",
            "aria-hidden": "true",
          }),
          i.oldTab.attr("aria-selected", "false"),
          r.length && f.length
            ? i.oldTab.attr("tabIndex", -1)
            : r.length &&
              this.tabs
                .filter(function () {
                  return 0 === n(this).attr("tabIndex");
                })
                .attr("tabIndex", -1),
          r.attr({
            "aria-expanded": "true",
            "aria-hidden": "false",
          }),
          i.newTab.attr({
            "aria-selected": "true",
            tabIndex: 0,
          });
      },
      _activate: function (t) {
        var r,
          i = this._findActive(t);
        i[0] !== this.active[0] &&
          (i.length || (i = this.active),
          (r = i.find(".ui-tabs-anchor")[0]),
          this._eventHandler({
            target: r,
            currentTarget: r,
            preventDefault: n.noop,
          }));
      },
      _findActive: function (t) {
        return t === !1 ? n() : this.tabs.eq(t);
      },
      _getIndex: function (n) {
        return (
          "string" == typeof n &&
            (n = this.anchors.index(
              this.anchors.filter("[href$='" + n + "']")
            )),
          n
        );
      },
      _destroy: function () {
        this.xhr && this.xhr.abort(),
          this.element.removeClass(
            "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"
          ),
          this.tablist
            .removeClass(
              "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
            )
            .removeAttr("role"),
          this.anchors
            .removeClass("ui-tabs-anchor")
            .removeAttr("role")
            .removeAttr("tabIndex")
            .removeUniqueId(),
          this.tabs.add(this.panels).each(function () {
            n.data(this, "ui-tabs-destroy")
              ? n(this).remove()
              : n(this)
                  .removeClass(
                    "ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel"
                  )
                  .removeAttr("tabIndex")
                  .removeAttr("aria-live")
                  .removeAttr("aria-busy")
                  .removeAttr("aria-selected")
                  .removeAttr("aria-labelledby")
                  .removeAttr("aria-hidden")
                  .removeAttr("aria-expanded")
                  .removeAttr("role");
          }),
          this.tabs.each(function () {
            var t = n(this),
              i = t.data("ui-tabs-aria-controls");
            i
              ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls")
              : t.removeAttr("aria-controls");
          }),
          this.panels.show(),
          "content" !== this.options.heightStyle &&
            this.panels.css("height", "");
      },
      enable: function (i) {
        var r = this.options.disabled;
        r !== !1 &&
          (i === t
            ? (r = !1)
            : ((i = this._getIndex(i)),
              (r = n.isArray(r)
                ? n.map(r, function (n) {
                    return n !== i ? n : null;
                  })
                : n.map(this.tabs, function (n, t) {
                    return t !== i ? t : null;
                  }))),
          this._setupDisabled(r));
      },
      disable: function (i) {
        var r = this.options.disabled;
        if (r !== !0) {
          if (i === t) r = !0;
          else {
            if (((i = this._getIndex(i)), -1 !== n.inArray(i, r))) return;
            r = n.isArray(r) ? n.merge([i], r).sort() : [i];
          }
          this._setupDisabled(r);
        }
      },
      load: function (t, r) {
        t = this._getIndex(t);
        var e = this,
          u = this.tabs.eq(t),
          s = u.find(".ui-tabs-anchor"),
          f = this._getPanelForTab(u),
          o = {
            tab: u,
            panel: f,
          };
        i(s[0]) ||
          ((this.xhr = n.ajax(this._ajaxSettings(s, r, o))),
          this.xhr &&
            "canceled" !== this.xhr.statusText &&
            (u.addClass("ui-tabs-loading"),
            f.attr("aria-busy", "true"),
            this.xhr
              .success(function (n) {
                setTimeout(function () {
                  f.html(n), e._trigger("load", r, o);
                }, 1);
              })
              .complete(function (n, t) {
                setTimeout(function () {
                  "abort" === t && e.panels.stop(!1, !0),
                    u.removeClass("ui-tabs-loading"),
                    f.removeAttr("aria-busy"),
                    n === e.xhr && delete e.xhr;
                }, 1);
              })));
      },
      _ajaxSettings: function (t, i, r) {
        var u = this;
        return {
          url: t.attr("href"),
          beforeSend: function (t, f) {
            return u._trigger(
              "beforeLoad",
              i,
              n.extend(
                {
                  jqXHR: t,
                  ajaxSettings: f,
                },
                r
              )
            );
          },
        };
      },
      _getPanelForTab: function (t) {
        var i = n(t).attr("aria-controls");
        return this.element.find(this._sanitizeSelector("#" + i));
      },
    });
  })(jQuery),
  (function (n) {
    function r(t, i) {
      var r = (t.attr("aria-describedby") || "").split(/\s+/);
      r.push(i),
        t
          .data("ui-tooltip-id", i)
          .attr("aria-describedby", n.trim(r.join(" ")));
    }
    function i(t) {
      var u = t.data("ui-tooltip-id"),
        i = (t.attr("aria-describedby") || "").split(/\s+/),
        r = n.inArray(u, i);
      -1 !== r && i.splice(r, 1),
        t.removeData("ui-tooltip-id"),
        (i = n.trim(i.join(" "))),
        i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby");
    }
    var t = 0;
    n.widget("ui.tooltip", {
      version: "1.10.3",
      options: {
        content: function () {
          var t = n(this).attr("title") || "";
          return n("<a>").text(t).html();
        },
        hide: !0,
        items: "[title]:not([disabled])",
        position: {
          my: "left top+15",
          at: "left bottom",
          collision: "flipfit flip",
        },
        show: !0,
        tooltipClass: null,
        track: !1,
        close: null,
        open: null,
      },
      _create: function () {
        this._on({
          mouseover: "open",
          focusin: "open",
        }),
          (this.tooltips = {}),
          (this.parents = {}),
          this.options.disabled && this._disable();
      },
      _setOption: function (t, i) {
        var r = this;
        return "disabled" === t
          ? (this[i ? "_disable" : "_enable"](), (this.options[t] = i), void 0)
          : (this._super(t, i),
            "content" === t &&
              n.each(this.tooltips, function (n, t) {
                r._updateContent(t);
              }),
            void 0);
      },
      _disable: function () {
        var t = this;
        n.each(this.tooltips, function (i, r) {
          var u = n.Event("blur");
          (u.target = u.currentTarget = r[0]), t.close(u, !0);
        }),
          this.element
            .find(this.options.items)
            .addBack()
            .each(function () {
              var t = n(this);
              t.is("[title]") &&
                t.data("ui-tooltip-title", t.attr("title")).attr("title", "");
            });
      },
      _enable: function () {
        this.element
          .find(this.options.items)
          .addBack()
          .each(function () {
            var t = n(this);
            t.data("ui-tooltip-title") &&
              t.attr("title", t.data("ui-tooltip-title"));
          });
      },
      open: function (t) {
        var r = this,
          i = n(t ? t.target : this.element).closest(this.options.items);
        i.length &&
          !i.data("ui-tooltip-id") &&
          (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")),
          i.data("ui-tooltip-open", !0),
          t &&
            "mouseover" === t.type &&
            i.parents().each(function () {
              var i,
                t = n(this);
              t.data("ui-tooltip-open") &&
                ((i = n.Event("blur")),
                (i.target = i.currentTarget = this),
                r.close(i, !0)),
                t.attr("title") &&
                  (t.uniqueId(),
                  (r.parents[this.id] = {
                    element: this,
                    title: t.attr("title"),
                  }),
                  t.attr("title", ""));
            }),
          this._updateContent(i, t));
      },
      _updateContent: function (n, t) {
        var r,
          i = this.options.content,
          f = this,
          u = t ? t.type : null;
        return "string" == typeof i
          ? this._open(t, n, i)
          : ((r = i.call(n[0], function (i) {
              n.data("ui-tooltip-open") &&
                f._delay(function () {
                  t && (t.type = u), this._open(t, n, i);
                });
            })),
            r && this._open(t, n, r),
            void 0);
      },
      _open: function (t, i, u) {
        function s(n) {
          (o.of = n), f.is(":hidden") || f.position(o);
        }
        var f,
          e,
          h,
          o = n.extend({}, this.options.position);
        if (u) {
          if (((f = this._find(i)), f.length))
            return f.find(".ui-tooltip-content").html(u), void 0;
          i.is("[title]") &&
            (t && "mouseover" === t.type
              ? i.attr("title", "")
              : i.removeAttr("title")),
            (f = this._tooltip(i)),
            r(i, f.attr("id")),
            f.find(".ui-tooltip-content").html(u),
            this.options.track && t && /^mouse/.test(t.type)
              ? (this._on(this.document, {
                  mousemove: s,
                }),
                s(t))
              : f.position(
                  n.extend(
                    {
                      of: i,
                    },
                    this.options.position
                  )
                ),
            f.hide(),
            this._show(f, this.options.show),
            this.options.show &&
              this.options.show.delay &&
              (h = this.delayedShow = setInterval(function () {
                f.is(":visible") && (s(o.of), clearInterval(h));
              }, n.fx.interval)),
            this._trigger("open", t, {
              tooltip: f,
            }),
            (e = {
              keyup: function (t) {
                if (t.keyCode === n.ui.keyCode.ESCAPE) {
                  var r = n.Event(t);
                  (r.currentTarget = i[0]), this.close(r, !0);
                }
              },
              remove: function () {
                this._removeTooltip(f);
              },
            }),
            (t && "mouseover" !== t.type) || (e.mouseleave = "close"),
            (t && "focusin" !== t.type) || (e.focusout = "close"),
            this._on(!0, i, e);
        }
      },
      close: function (t) {
        var f = this,
          r = n(t ? t.currentTarget : this.element),
          u = this._find(r);
        this.closing ||
          (clearInterval(this.delayedShow),
          r.data("ui-tooltip-title") &&
            r.attr("title", r.data("ui-tooltip-title")),
          i(r),
          u.stop(!0),
          this._hide(u, this.options.hide, function () {
            f._removeTooltip(n(this));
          }),
          r.removeData("ui-tooltip-open"),
          this._off(r, "mouseleave focusout keyup"),
          r[0] !== this.element[0] && this._off(r, "remove"),
          this._off(this.document, "mousemove"),
          t &&
            "mouseleave" === t.type &&
            n.each(this.parents, function (t, i) {
              n(i.element).attr("title", i.title), delete f.parents[t];
            }),
          (this.closing = !0),
          this._trigger("close", t, {
            tooltip: u,
          }),
          (this.closing = !1));
      },
      _tooltip: function (i) {
        var u = "ui-tooltip-" + t++,
          r = n("<div>")
            .attr({
              id: u,
              role: "tooltip",
            })
            .addClass(
              "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
                (this.options.tooltipClass || "")
            );
        return (
          n("<div>").addClass("ui-tooltip-content").appendTo(r),
          r.appendTo(this.document[0].body),
          (this.tooltips[u] = i),
          r
        );
      },
      _find: function (t) {
        var i = t.data("ui-tooltip-id");
        return i ? n("#" + i) : n();
      },
      _removeTooltip: function (n) {
        n.remove(), delete this.tooltips[n.attr("id")];
      },
      _destroy: function () {
        var t = this;
        n.each(this.tooltips, function (i, r) {
          var u = n.Event("blur");
          (u.target = u.currentTarget = r[0]),
            t.close(u, !0),
            n("#" + i).remove(),
            r.data("ui-tooltip-title") &&
              (r.attr("title", r.data("ui-tooltip-title")),
              r.removeData("ui-tooltip-title"));
        });
      },
    });
  })(jQuery),
  (function (n) {
    function i(n, t) {
      for (var i = window, r = (n || "").split("."); i && r.length; )
        i = i[r.shift()];
      return typeof i == "function"
        ? i
        : (t.push(n), Function.constructor.apply(null, t));
    }
    function u(n) {
      return n === "GET" || n === "POST";
    }
    function o(n, t) {
      !u(t) && n.setRequestHeader("X-HTTP-Method-Override", t);
    }
    function s(t, i, r) {
      var u;
      r.indexOf("application/x-javascript") === -1 &&
        ((u = (t.getAttribute("data-ajax-mode") || "").toUpperCase()),
        n(t.getAttribute("data-ajax-update")).each(function (t, r) {
          var f;
          switch (u) {
            case "BEFORE":
              (f = r.firstChild),
                n("<div />")
                  .html(i)
                  .contents()
                  .each(function () {
                    r.insertBefore(this, f);
                  });
              break;
            case "AFTER":
              n("<div />")
                .html(i)
                .contents()
                .each(function () {
                  r.appendChild(this);
                });
              break;
            default:
              n(r).html(i);
          }
        }));
    }
    function r(t, r) {
      var h, c, f, e;
      ((h = t.getAttribute("data-ajax-confirm")), !h || window.confirm(h)) &&
        ((c = n(t.getAttribute("data-ajax-loading"))),
        (e = t.getAttribute("data-ajax-loading-duration") || 0),
        n.extend(r, {
          type: t.getAttribute("data-ajax-method") || undefined,
          url: t.getAttribute("data-ajax-url") || undefined,
          beforeSend: function (n) {
            var r;
            return (
              o(n, f),
              (r = i(t.getAttribute("data-ajax-begin"), ["xhr"]).apply(
                this,
                arguments
              )),
              r !== !1 && c.show(e),
              r
            );
          },
          complete: function () {
            c.hide(e),
              i(t.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(
                this,
                arguments
              );
          },
          success: function (n, r, u) {
            s(t, n, u.getResponseHeader("Content-Type") || "text/html"),
              i(t.getAttribute("data-ajax-success"), [
                "data",
                "status",
                "xhr",
              ]).apply(this, arguments);
          },
          error: i(t.getAttribute("data-ajax-failure"), [
            "xhr",
            "status",
            "error",
          ]),
        }),
        r.data.push({
          name: "X-Requested-With",
          value: "XMLHttpRequest",
        }),
        (f = r.type.toUpperCase()),
        u(f) ||
          ((r.type = "POST"),
          r.data.push({
            name: "X-HTTP-Method-Override",
            value: f,
          })),
        n.ajax(r));
    }
    function e(t) {
      var i = n(t).data(f);
      return !i || !i.validate || i.validate();
    }
    var t = "unobtrusiveAjaxClick",
      f = "unobtrusiveValidation";
    n("a[data-ajax=true]").live("click", function (n) {
      n.preventDefault(),
        r(this, {
          url: this.href,
          type: "GET",
          data: [],
        });
    }),
      n("form[data-ajax=true] input[type=image]").live("click", function (i) {
        var f = i.target.name,
          e = n(i.target),
          r = e.parents("form")[0],
          u = e.offset();
        n(r).data(t, [
          {
            name: f + ".x",
            value: Math.round(i.pageX - u.left),
          },
          {
            name: f + ".y",
            value: Math.round(i.pageY - u.top),
          },
        ]),
          setTimeout(function () {
            n(r).removeData(t);
          }, 0);
      }),
      n("form[data-ajax=true] :submit").live("click", function (i) {
        var u = i.target.name,
          r = n(i.target).parents("form")[0];
        n(r).data(
          t,
          u
            ? [
                {
                  name: u,
                  value: i.target.value,
                },
              ]
            : []
        ),
          setTimeout(function () {
            n(r).removeData(t);
          }, 0);
      }),
      n("form[data-ajax=true]").live("submit", function (i) {
        var u = n(this).data(t) || [];
        (i.preventDefault(), e(this)) &&
          r(this, {
            url: this.action,
            type: this.method || "GET",
            data: u.concat(n(this).serializeArray()),
          });
      });
  })(jQuery),
  (function (n) {
    n.extend(n.fn, {
      validate: function (t) {
        if (!this.length)
          return (
            t &&
              t.debug &&
              window.console &&
              console.warn(
                "Nothing selected, can't validate, returning nothing."
              ),
            void 0
          );
        var i = n.data(this[0], "validator");
        return i
          ? i
          : (this.attr("novalidate", "novalidate"),
            (i = new n.validator(t, this[0])),
            n.data(this[0], "validator", i),
            i.settings.onsubmit &&
              (this.validateDelegate(":submit", "click", function (t) {
                i.settings.submitHandler && (i.submitButton = t.target),
                  n(t.target).hasClass("cancel") && (i.cancelSubmit = !0),
                  void 0 !== n(t.target).attr("formnovalidate") &&
                    (i.cancelSubmit = !0);
              }),
              this.submit(function (t) {
                function r() {
                  var r;
                  return i.settings.submitHandler
                    ? (i.submitButton &&
                        (r = n("<input type='hidden'/>")
                          .attr("name", i.submitButton.name)
                          .val(n(i.submitButton).val())
                          .appendTo(i.currentForm)),
                      i.settings.submitHandler.call(i, i.currentForm, t),
                      i.submitButton && r.remove(),
                      !1)
                    : !0;
                }
                return (
                  i.settings.debug && t.preventDefault(),
                  i.cancelSubmit
                    ? ((i.cancelSubmit = !1), r())
                    : i.form()
                    ? i.pendingRequest
                      ? ((i.formSubmitted = !0), !1)
                      : r()
                    : (i.focusInvalid(), !1)
                );
              })),
            i);
      },
      valid: function () {
        if (n(this[0]).is("form")) return this.validate().form();
        var t = !0,
          i = n(this[0].form).validate();
        return (
          this.each(function () {
            t = t && i.element(this);
          }),
          t
        );
      },
      removeAttrs: function (t) {
        var r = {},
          i = this;
        return (
          n.each(t.split(/\s/), function (n, t) {
            (r[t] = i.attr(t)), i.removeAttr(t);
          }),
          r
        );
      },
      rules: function (t, i) {
        var r = this[0],
          e,
          u,
          s;
        if (t) {
          var o = n.data(r.form, "validator").settings,
            h = o.rules,
            f = n.validator.staticRules(r);
          switch (t) {
            case "add":
              n.extend(f, n.validator.normalizeRule(i)),
                delete f.messages,
                (h[r.name] = f),
                i.messages &&
                  (o.messages[r.name] = n.extend(
                    o.messages[r.name],
                    i.messages
                  ));
              break;
            case "remove":
              return i
                ? ((e = {}),
                  n.each(i.split(/\s/), function (n, t) {
                    (e[t] = f[t]), delete f[t];
                  }),
                  e)
                : (delete h[r.name], f);
          }
        }
        return (
          (u = n.validator.normalizeRules(
            n.extend(
              {},
              n.validator.classRules(r),
              n.validator.attributeRules(r),
              n.validator.dataRules(r),
              n.validator.staticRules(r)
            ),
            r
          )),
          u.required &&
            ((s = u.required),
            delete u.required,
            (u = n.extend(
              {
                required: s,
              },
              u
            ))),
          u
        );
      },
    }),
      n.extend(n.expr[":"], {
        blank: function (t) {
          return !n.trim("" + n(t).val());
        },
        filled: function (t) {
          return !!n.trim("" + n(t).val());
        },
        unchecked: function (t) {
          return !n(t).prop("checked");
        },
      }),
      (n.validator = function (t, i) {
        (this.settings = n.extend(!0, {}, n.validator.defaults, t)),
          (this.currentForm = i),
          this.init();
      }),
      (n.validator.format = function (t, i) {
        return 1 === arguments.length
          ? function () {
              var i = n.makeArray(arguments);
              return i.unshift(t), n.validator.format.apply(this, i);
            }
          : (arguments.length > 2 &&
              i.constructor !== Array &&
              (i = n.makeArray(arguments).slice(1)),
            i.constructor !== Array && (i = [i]),
            n.each(i, function (n, i) {
              t = t.replace(RegExp("\\{" + n + "\\}", "g"), function () {
                return i;
              });
            }),
            t);
      }),
      n.extend(n.validator, {
        defaults: {
          messages: {},
          groups: {},
          rules: {},
          errorClass: "error",
          validClass: "valid",
          errorElement: "label",
          focusInvalid: !0,
          errorContainer: n([]),
          errorLabelContainer: n([]),
          onsubmit: !0,
          ignore: ":hidden",
          ignoreTitle: !1,
          onfocusin: function (n) {
            (this.lastActive = n),
              this.settings.focusCleanup &&
                !this.blockFocusCleanup &&
                (this.settings.unhighlight &&
                  this.settings.unhighlight.call(
                    this,
                    n,
                    this.settings.errorClass,
                    this.settings.validClass
                  ),
                this.addWrapper(this.errorsFor(n)).hide());
          },
          onfocusout: function (n) {
            this.checkable(n) ||
              (!(n.name in this.submitted) && this.optional(n)) ||
              this.element(n);
          },
          onkeyup: function (n, t) {
            (9 !== t.which || "" !== this.elementValue(n)) &&
              (n.name in this.submitted || n === this.lastElement) &&
              this.element(n);
          },
          onclick: function (n) {
            n.name in this.submitted
              ? this.element(n)
              : n.parentNode.name in this.submitted &&
                this.element(n.parentNode);
          },
          highlight: function (t, i, r) {
            "radio" === t.type
              ? this.findByName(t.name).addClass(i).removeClass(r)
              : n(t).addClass(i).removeClass(r);
          },
          unhighlight: function (t, i, r) {
            "radio" === t.type
              ? this.findByName(t.name).removeClass(i).addClass(r)
              : n(t).removeClass(i).addClass(r);
          },
        },
        setDefaults: function (t) {
          n.extend(n.validator.defaults, t);
        },
        messages: {
          required: "This field is required.",
          remote: "Please fix this field.",
          email: "Please enter a valid email address.",
          url: "Please enter a valid URL.",
          date: "Please enter a valid date.",
          dateISO: "Please enter a valid date (ISO).",
          number: "Please enter a valid number.",
          digits: "Please enter only digits.",
          creditcard: "Please enter a valid credit card number.",
          equalTo: "Please enter the same value again.",
          maxlength: n.validator.format(
            "Please enter no more than {0} characters."
          ),
          minlength: n.validator.format(
            "Please enter at least {0} characters."
          ),
          rangelength: n.validator.format(
            "Please enter a value between {0} and {1} characters long."
          ),
          range: n.validator.format(
            "Please enter a value between {0} and {1}."
          ),
          max: n.validator.format(
            "Please enter a value less than or equal to {0}."
          ),
          min: n.validator.format(
            "Please enter a value greater than or equal to {0}."
          ),
        },
        autoCreateRanges: !1,
        prototype: {
          init: function () {
            function i(t) {
              var i = n.data(this[0].form, "validator"),
                r = "on" + t.type.replace(/^validate/, "");
              i.settings[r] && i.settings[r].call(i, this[0], t);
            }
            var r, t;
            (this.labelContainer = n(this.settings.errorLabelContainer)),
              (this.errorContext =
                (this.labelContainer.length && this.labelContainer) ||
                n(this.currentForm)),
              (this.containers = n(this.settings.errorContainer).add(
                this.settings.errorLabelContainer
              )),
              (this.submitted = {}),
              (this.valueCache = {}),
              (this.pendingRequest = 0),
              (this.pending = {}),
              (this.invalid = {}),
              this.reset(),
              (r = this.groups = {}),
              n.each(this.settings.groups, function (t, i) {
                "string" == typeof i && (i = i.split(/\s/)),
                  n.each(i, function (n, i) {
                    r[i] = t;
                  });
              }),
              (t = this.settings.rules),
              n.each(t, function (i, r) {
                t[i] = n.validator.normalizeRule(r);
              }),
              n(this.currentForm)
                .validateDelegate(
                  ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ",
                  "focusin focusout keyup",
                  i
                )
                .validateDelegate(
                  "[type='radio'], [type='checkbox'], select, option",
                  "click",
                  i
                ),
              this.settings.invalidHandler &&
                n(this.currentForm).bind(
                  "invalid-form.validate",
                  this.settings.invalidHandler
                );
          },
          form: function () {
            return (
              this.checkForm(),
              n.extend(this.submitted, this.errorMap),
              (this.invalid = n.extend({}, this.errorMap)),
              this.valid() ||
                n(this.currentForm).triggerHandler("invalid-form", [this]),
              this.showErrors(),
              this.valid()
            );
          },
          checkForm: function () {
            this.prepareForm();
            for (
              var n = 0, t = (this.currentElements = this.elements());
              t[n];
              n++
            )
              this.check(t[n]);
            return this.valid();
          },
          element: function (t) {
            (t = this.validationTargetFor(this.clean(t))),
              (this.lastElement = t),
              this.prepareElement(t),
              (this.currentElements = n(t));
            var i = this.check(t) !== !1;
            return (
              i ? delete this.invalid[t.name] : (this.invalid[t.name] = !0),
              this.numberOfInvalids() ||
                (this.toHide = this.toHide.add(this.containers)),
              this.showErrors(),
              i
            );
          },
          showErrors: function (t) {
            if (t) {
              n.extend(this.errorMap, t), (this.errorList = []);
              for (var i in t)
                this.errorList.push({
                  message: t[i],
                  element: this.findByName(i)[0],
                });
              this.successList = n.grep(this.successList, function (n) {
                return !(n.name in t);
              });
            }
            this.settings.showErrors
              ? this.settings.showErrors.call(
                  this,
                  this.errorMap,
                  this.errorList
                )
              : this.defaultShowErrors();
          },
          resetForm: function () {
            n.fn.resetForm && n(this.currentForm).resetForm(),
              (this.submitted = {}),
              (this.lastElement = null),
              this.prepareForm(),
              this.hideErrors(),
              this.elements()
                .removeClass(this.settings.errorClass)
                .removeData("previousValue");
          },
          numberOfInvalids: function () {
            return this.objectLength(this.invalid);
          },
          objectLength: function (n) {
            var t = 0,
              i;
            for (i in n) t++;
            return t;
          },
          hideErrors: function () {
            this.addWrapper(this.toHide).hide();
          },
          valid: function () {
            return 0 === this.size();
          },
          size: function () {
            return this.errorList.length;
          },
          focusInvalid: function () {
            if (this.settings.focusInvalid)
              try {
                n(
                  this.findLastActive() ||
                    (this.errorList.length && this.errorList[0].element) ||
                    []
                )
                  .filter(":visible")
                  .focus()
                  .trigger("focusin");
              } catch (t) {}
          },
          findLastActive: function () {
            var t = this.lastActive;
            return (
              t &&
              1 ===
                n.grep(this.errorList, function (n) {
                  return n.element.name === t.name;
                }).length &&
              t
            );
          },
          elements: function () {
            var i = this,
              t = {};
            return n(this.currentForm)
              .find("input, select, textarea")
              .not(":submit, :reset, :image, [disabled]")
              .not(this.settings.ignore)
              .filter(function () {
                return (
                  !this.name &&
                    i.settings.debug &&
                    window.console &&
                    console.error("%o has no name assigned", this),
                  this.name in t || !i.objectLength(n(this).rules())
                    ? !1
                    : ((t[this.name] = !0), !0)
                );
              });
          },
          clean: function (t) {
            return n(t)[0];
          },
          errors: function () {
            var t = this.settings.errorClass.replace(" ", ".");
            return n(this.settings.errorElement + "." + t, this.errorContext);
          },
          reset: function () {
            (this.successList = []),
              (this.errorList = []),
              (this.errorMap = {}),
              (this.toShow = n([])),
              (this.toHide = n([])),
              (this.currentElements = n([]));
          },
          prepareForm: function () {
            this.reset(), (this.toHide = this.errors().add(this.containers));
          },
          prepareElement: function (n) {
            this.reset(), (this.toHide = this.errorsFor(n));
          },
          elementValue: function (t) {
            var r = n(t).attr("type"),
              i = n(t).val();
            return "radio" === r || "checkbox" === r
              ? n("input[name='" + n(t).attr("name") + "']:checked").val()
              : "string" == typeof i
              ? i.replace(/\r/g, "")
              : i;
          },
          check: function (t) {
            var i, r;
            t = this.validationTargetFor(this.clean(t));
            var u,
              f = n(t).rules(),
              e = !1,
              o = this.elementValue(t);
            for (i in f) {
              r = {
                method: i,
                parameters: f[i],
              };
              try {
                if (
                  ((u = n.validator.methods[i].call(this, o, t, r.parameters)),
                  "dependency-mismatch" === u)
                ) {
                  e = !0;
                  continue;
                }
                if (((e = !1), "pending" === u))
                  return (
                    (this.toHide = this.toHide.not(this.errorsFor(t))), void 0
                  );
                if (!u) return this.formatAndAdd(t, r), !1;
              } catch (s) {
                throw (
                  (this.settings.debug &&
                    window.console &&
                    console.log(
                      "Exception occurred when checking element " +
                        t.id +
                        ", check the '" +
                        r.method +
                        "' method.",
                      s
                    ),
                  s)
                );
              }
            }
            if (!e) return this.objectLength(f) && this.successList.push(t), !0;
          },
          customDataMessage: function (t, i) {
            return (
              n(t).data("msg-" + i.toLowerCase()) ||
              (t.attributes && n(t).attr("data-msg-" + i.toLowerCase()))
            );
          },
          customMessage: function (n, t) {
            var i = this.settings.messages[n];
            return i && (i.constructor === String ? i : i[t]);
          },
          findDefined: function () {
            for (var n = 0; arguments.length > n; n++)
              if (void 0 !== arguments[n]) return arguments[n];
            return void 0;
          },
          defaultMessage: function (t, i) {
            return this.findDefined(
              this.customMessage(t.name, i),
              this.customDataMessage(t, i),
              (!this.settings.ignoreTitle && t.title) || void 0,
              n.validator.messages[i],
              "<strong>Warning: No message defined for " + t.name + "</strong>"
            );
          },
          formatAndAdd: function (t, i) {
            var r = this.defaultMessage(t, i.method),
              u = /\$?\{(\d+)\}/g;
            "function" == typeof r
              ? (r = r.call(this, i.parameters, t))
              : u.test(r) &&
                (r = n.validator.format(r.replace(u, "{$1}"), i.parameters)),
              this.errorList.push({
                message: r,
                element: t,
              }),
              (this.errorMap[t.name] = r),
              (this.submitted[t.name] = r);
          },
          addWrapper: function (n) {
            return (
              this.settings.wrapper &&
                (n = n.add(n.parent(this.settings.wrapper))),
              n
            );
          },
          defaultShowErrors: function () {
            for (var i, t, n = 0; this.errorList[n]; n++)
              (t = this.errorList[n]),
                this.settings.highlight &&
                  this.settings.highlight.call(
                    this,
                    t.element,
                    this.settings.errorClass,
                    this.settings.validClass
                  ),
                this.showLabel(t.element, t.message);
            if (
              (this.errorList.length &&
                (this.toShow = this.toShow.add(this.containers)),
              this.settings.success)
            )
              for (n = 0; this.successList[n]; n++)
                this.showLabel(this.successList[n]);
            if (this.settings.unhighlight)
              for (n = 0, i = this.validElements(); i[n]; n++)
                this.settings.unhighlight.call(
                  this,
                  i[n],
                  this.settings.errorClass,
                  this.settings.validClass
                );
            (this.toHide = this.toHide.not(this.toShow)),
              this.hideErrors(),
              this.addWrapper(this.toShow).show();
          },
          validElements: function () {
            return this.currentElements.not(this.invalidElements());
          },
          invalidElements: function () {
            return n(this.errorList).map(function () {
              return this.element;
            });
          },
          showLabel: function (t, i) {
            var r = this.errorsFor(t);
            r.length
              ? (r
                  .removeClass(this.settings.validClass)
                  .addClass(this.settings.errorClass),
                r.html(i))
              : ((r = n("<" + this.settings.errorElement + ">")
                  .attr("for", this.idOrName(t))
                  .addClass(this.settings.errorClass)
                  .html(i || "")),
                this.settings.wrapper &&
                  (r = r
                    .hide()
                    .show()
                    .wrap("<" + this.settings.wrapper + "/>")
                    .parent()),
                this.labelContainer.append(r).length ||
                  (this.settings.errorPlacement
                    ? this.settings.errorPlacement(r, n(t))
                    : r.insertAfter(t))),
              !i &&
                this.settings.success &&
                (r.text(""),
                "string" == typeof this.settings.success
                  ? r.addClass(this.settings.success)
                  : this.settings.success(r, t)),
              (this.toShow = this.toShow.add(r));
          },
          errorsFor: function (t) {
            var i = this.idOrName(t);
            return this.errors().filter(function () {
              return n(this).attr("for") === i;
            });
          },
          idOrName: function (n) {
            return (
              this.groups[n.name] ||
              (this.checkable(n) ? n.name : n.id || n.name)
            );
          },
          validationTargetFor: function (n) {
            return (
              this.checkable(n) &&
                (n = this.findByName(n.name).not(this.settings.ignore)[0]),
              n
            );
          },
          checkable: function (n) {
            return /radio|checkbox/i.test(n.type);
          },
          findByName: function (t) {
            return n(this.currentForm).find("[name='" + t + "']");
          },
          getLength: function (t, i) {
            switch (i.nodeName.toLowerCase()) {
              case "select":
                return n("option:selected", i).length;
              case "input":
                if (this.checkable(i))
                  return this.findByName(i.name).filter(":checked").length;
            }
            return t.length;
          },
          depend: function (n, t) {
            return this.dependTypes[typeof n]
              ? this.dependTypes[typeof n](n, t)
              : !0;
          },
          dependTypes: {
            boolean: function (n) {
              return n;
            },
            string: function (t, i) {
              return !!n(t, i.form).length;
            },
            function: function (n, t) {
              return n(t);
            },
          },
          optional: function (t) {
            var i = this.elementValue(t);
            return (
              !n.validator.methods.required.call(this, i, t) &&
              "dependency-mismatch"
            );
          },
          startRequest: function (n) {
            this.pending[n.name] ||
              (this.pendingRequest++, (this.pending[n.name] = !0));
          },
          stopRequest: function (t, i) {
            this.pendingRequest--,
              0 > this.pendingRequest && (this.pendingRequest = 0),
              delete this.pending[t.name],
              i &&
              0 === this.pendingRequest &&
              this.formSubmitted &&
              this.form()
                ? (n(this.currentForm).submit(), (this.formSubmitted = !1))
                : !i &&
                  0 === this.pendingRequest &&
                  this.formSubmitted &&
                  (n(this.currentForm).triggerHandler("invalid-form", [this]),
                  (this.formSubmitted = !1));
          },
          previousValue: function (t) {
            return (
              n.data(t, "previousValue") ||
              n.data(t, "previousValue", {
                old: null,
                valid: !0,
                message: this.defaultMessage(t, "remote"),
              })
            );
          },
        },
        classRuleSettings: {
          required: {
            required: !0,
          },
          email: {
            email: !0,
          },
          url: {
            url: !0,
          },
          date: {
            date: !0,
          },
          dateISO: {
            dateISO: !0,
          },
          number: {
            number: !0,
          },
          digits: {
            digits: !0,
          },
          creditcard: {
            creditcard: !0,
          },
        },
        addClassRules: function (t, i) {
          t.constructor === String
            ? (this.classRuleSettings[t] = i)
            : n.extend(this.classRuleSettings, t);
        },
        classRules: function (t) {
          var r = {},
            i = n(t).attr("class");
          return (
            i &&
              n.each(i.split(" "), function () {
                this in n.validator.classRuleSettings &&
                  n.extend(r, n.validator.classRuleSettings[this]);
              }),
            r
          );
        },
        attributeRules: function (t) {
          var u = {},
            e = n(t),
            f = e[0].getAttribute("type"),
            r,
            i;
          for (r in n.validator.methods)
            "required" === r
              ? ((i = e.get(0).getAttribute(r)),
                "" === i && (i = !0),
                (i = !!i))
              : (i = e.attr(r)),
              /min|max/.test(r) &&
                (null === f || /number|range|text/.test(f)) &&
                (i = Number(i)),
              i ? (u[r] = i) : f === r && "range" !== f && (u[r] = !0);
          return (
            u.maxlength &&
              /-1|2147483647|524288/.test(u.maxlength) &&
              delete u.maxlength,
            u
          );
        },
        dataRules: function (t) {
          var r,
            i,
            u = {},
            f = n(t);
          for (r in n.validator.methods)
            (i = f.data("rule-" + r.toLowerCase())), void 0 !== i && (u[r] = i);
          return u;
        },
        staticRules: function (t) {
          var r = {},
            i = n.data(t.form, "validator");
          return (
            i.settings.rules &&
              (r = n.validator.normalizeRule(i.settings.rules[t.name]) || {}),
            r
          );
        },
        normalizeRules: function (t, i) {
          return (
            n.each(t, function (r, u) {
              if (u === !1) return delete t[r], void 0;
              if (u.param || u.depends) {
                var f = !0;
                switch (typeof u.depends) {
                  case "string":
                    f = !!n(u.depends, i.form).length;
                    break;
                  case "function":
                    f = u.depends.call(i, i);
                }
                f ? (t[r] = void 0 !== u.param ? u.param : !0) : delete t[r];
              }
            }),
            n.each(t, function (r, u) {
              t[r] = n.isFunction(u) ? u(i) : u;
            }),
            n.each(["minlength", "maxlength"], function () {
              t[this] && (t[this] = Number(t[this]));
            }),
            n.each(["rangelength", "range"], function () {
              var i;
              t[this] &&
                (n.isArray(t[this])
                  ? (t[this] = [Number(t[this][0]), Number(t[this][1])])
                  : "string" == typeof t[this] &&
                    ((i = t[this].split(/[\s,]+/)),
                    (t[this] = [Number(i[0]), Number(i[1])])));
            }),
            n.validator.autoCreateRanges &&
              (t.min &&
                t.max &&
                ((t.range = [t.min, t.max]), delete t.min, delete t.max),
              t.minlength &&
                t.maxlength &&
                ((t.rangelength = [t.minlength, t.maxlength]),
                delete t.minlength,
                delete t.maxlength)),
            t
          );
        },
        normalizeRule: function (t) {
          if ("string" == typeof t) {
            var i = {};
            n.each(t.split(/\s/), function () {
              i[this] = !0;
            }),
              (t = i);
          }
          return t;
        },
        addMethod: function (t, i, r) {
          (n.validator.methods[t] = i),
            (n.validator.messages[t] =
              void 0 !== r ? r : n.validator.messages[t]),
            3 > i.length &&
              n.validator.addClassRules(t, n.validator.normalizeRule(t));
        },
        methods: {
          required: function (t, i, r) {
            if (!this.depend(r, i)) return "dependency-mismatch";
            if ("select" === i.nodeName.toLowerCase()) {
              var u = n(i).val();
              return u && u.length > 0;
            }
            return this.checkable(i)
              ? this.getLength(t, i) > 0
              : n.trim(t).length > 0;
          },
          email: function (n, t) {
            return (
              this.optional(t) ||
              /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(
                n
              )
            );
          },
          url: function (n, t) {
            return (
              this.optional(t) ||
              /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
                n
              )
            );
          },
          date: function (n, t) {
            return this.optional(t) || !/Invalid|NaN/.test("" + new Date(n));
          },
          dateISO: function (n, t) {
            return (
              this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(n)
            );
          },
          number: function (n, t) {
            return (
              this.optional(t) ||
              /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            );
          },
          digits: function (n, t) {
            return this.optional(t) || /^\d+$/.test(n);
          },
          creditcard: function (n, t) {
            var i, f;
            if (this.optional(t)) return "dependency-mismatch";
            if (/[^0-9 \-]+/.test(n)) return !1;
            var e = 0,
              r = 0,
              u = !1;
            for (n = n.replace(/\D/g, ""), i = n.length - 1; i >= 0; i--)
              (f = n.charAt(i)),
                (r = parseInt(f, 10)),
                u && (r *= 2) > 9 && (r -= 9),
                (e += r),
                (u = !u);
            return 0 == e % 10;
          },
          minlength: function (t, i, r) {
            var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
            return this.optional(i) || u >= r;
          },
          maxlength: function (t, i, r) {
            var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
            return this.optional(i) || r >= u;
          },
          rangelength: function (t, i, r) {
            var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
            return this.optional(i) || (u >= r[0] && r[1] >= u);
          },
          min: function (n, t, i) {
            return this.optional(t) || n >= i;
          },
          max: function (n, t, i) {
            return this.optional(t) || i >= n;
          },
          range: function (n, t, i) {
            return this.optional(t) || (n >= i[0] && i[1] >= n);
          },
          equalTo: function (t, i, r) {
            var u = n(r);
            return (
              this.settings.onfocusout &&
                u
                  .unbind(".validate-equalTo")
                  .bind("blur.validate-equalTo", function () {
                    n(i).valid();
                  }),
              t === u.val()
            );
          },
          remote: function (t, i, r) {
            var f, u, e;
            return this.optional(i)
              ? "dependency-mismatch"
              : ((f = this.previousValue(i)),
                this.settings.messages[i.name] ||
                  (this.settings.messages[i.name] = {}),
                (f.originalMessage = this.settings.messages[i.name].remote),
                (this.settings.messages[i.name].remote = f.message),
                (r =
                  ("string" == typeof r && {
                    url: r,
                  }) ||
                  r),
                f.old === t)
              ? f.valid
              : ((f.old = t),
                (u = this),
                this.startRequest(i),
                (e = {}),
                (e[i.name] = t),
                n.ajax(
                  n.extend(
                    !0,
                    {
                      url: r,
                      mode: "abort",
                      port: "validate" + i.name,
                      dataType: "json",
                      data: e,
                      success: function (r) {
                        var o, h, s, e;
                        (u.settings.messages[i.name].remote =
                          f.originalMessage),
                          (o = r === !0 || "true" === r),
                          o
                            ? ((h = u.formSubmitted),
                              u.prepareElement(i),
                              (u.formSubmitted = h),
                              u.successList.push(i),
                              delete u.invalid[i.name],
                              u.showErrors())
                            : ((s = {}),
                              (e = r || u.defaultMessage(i, "remote")),
                              (s[i.name] = f.message = n.isFunction(e)
                                ? e(t)
                                : e),
                              (u.invalid[i.name] = !0),
                              u.showErrors(s)),
                          (f.valid = o),
                          u.stopRequest(i, o);
                      },
                    },
                    r
                  )
                ),
                "pending");
          },
        },
      }),
      (n.format = n.validator.format);
  })(jQuery),
  (function (n) {
    var t = {},
      i;
    n.ajaxPrefilter
      ? n.ajaxPrefilter(function (n, i, r) {
          var u = n.port;
          "abort" === n.mode && (t[u] && t[u].abort(), (t[u] = r));
        })
      : ((i = n.ajax),
        (n.ajax = function (r) {
          var f = ("mode" in r ? r : n.ajaxSettings).mode,
            u = ("port" in r ? r : n.ajaxSettings).port;
          return "abort" === f
            ? (t[u] && t[u].abort(), (t[u] = i.apply(this, arguments)), t[u])
            : i.apply(this, arguments);
        }));
  })(jQuery),
  (function (n) {
    n.extend(n.fn, {
      validateDelegate: function (t, i, r) {
        return this.bind(i, function (i) {
          var u = n(i.target);
          if (u.is(t)) return r.apply(u, arguments);
        });
      },
    });
  })(jQuery),
  (function (n) {
    function i(n, t, i) {
      (n.rules[t] = i), n.message && (n.messages[t] = n.message);
    }
    function h(n) {
      return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
    }
    function u(n) {
      return n.substr(0, n.lastIndexOf(".") + 1);
    }
    function f(n, t) {
      return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n;
    }
    function c(t, i) {
      var r = n(this).find("[data-valmsg-for='" + i[0].name + "']"),
        u = n.parseJSON(r.attr("data-valmsg-replace")) !== !1;
      r
        .removeClass("field-validation-valid")
        .addClass("field-validation-error"),
        t.data("unobtrusiveContainer", r),
        u
          ? (r.empty(), t.removeClass("input-validation-error").appendTo(r))
          : t.hide();
    }
    function l(t, i) {
      var u = n(this).find("[data-valmsg-summary=true]"),
        r = u.find("ul");
      r &&
        r.length &&
        i.errorList.length &&
        (r.empty(),
        u
          .addClass("validation-summary-errors")
          .removeClass("validation-summary-valid"),
        n.each(i.errorList, function () {
          n("<li />").html(this.message).appendTo(r);
        }));
    }
    function s(t) {
      var i = t.data("unobtrusiveContainer"),
        r = n.parseJSON(i.attr("data-valmsg-replace"));
      i &&
        (i
          .addClass("field-validation-valid")
          .removeClass("field-validation-error"),
        t.removeData("unobtrusiveContainer"),
        r && i.empty());
    }
    function o(t) {
      var i = n(t),
        r = i.data(e);
      return (
        r ||
          ((r = {
            options: {
              errorClass: "input-validation-error",
              errorElement: "span",
              errorPlacement: n.proxy(c, t),
              invalidHandler: n.proxy(l, t),
              messages: {},
              rules: {},
              success: n.proxy(s, t),
            },
            attachValidation: function () {
              i.validate(this.options);
            },
            validate: function () {
              return i.validate(), i.valid();
            },
          }),
          i.data(e, r)),
        r
      );
    }
    var r = n.validator,
      t,
      e = "unobtrusiveValidation";
    (r.unobtrusive = {
      adapters: [],
      parseElement: function (t, i) {
        var f = n(t),
          e = f.parents("form")[0],
          r,
          u,
          s;
        e &&
          ((r = o(e)),
          (r.options.rules[t.name] = u = {}),
          (r.options.messages[t.name] = s = {}),
          n.each(this.adapters, function () {
            var i = "data-val-" + this.name,
              o = f.attr(i),
              r = {};
            o !== undefined &&
              ((i += "-"),
              n.each(this.params, function () {
                r[this] = f.attr(i + this);
              }),
              this.adapt({
                element: t,
                form: e,
                message: o,
                params: r,
                rules: u,
                messages: s,
              }));
          }),
          jQuery.extend(u, {
            __dummy__: !0,
          }),
          !i && r.attachValidation());
      },
      parse: function (t) {
        n(t)
          .find(":input[data-val=true]")
          .each(function () {
            r.unobtrusive.parseElement(this, !0);
          }),
          n("form").each(function () {
            var n = o(this);
            n && n.attachValidation();
          });
      },
    }),
      (t = r.unobtrusive.adapters),
      (t.add = function (n, t, i) {
        return (
          i || ((i = t), (t = [])),
          this.push({
            name: n,
            params: t,
            adapt: i,
          }),
          this
        );
      }),
      (t.addBool = function (n, t) {
        return this.add(n, function (r) {
          i(r, t || n, !0);
        });
      }),
      (t.addMinMax = function (n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function (n) {
          var e = n.params.min,
            f = n.params.max;
          e && f ? i(n, u, [e, f]) : e ? i(n, t, e) : f && i(n, r, f);
        });
      }),
      (t.addSingleVal = function (n, t, r) {
        return this.add(n, [t || "val"], function (u) {
          i(u, r || n, u.params[t]);
        });
      }),
      r.addMethod("__dummy__", function () {
        return !0;
      }),
      r.addMethod("regex", function (n, t, i) {
        var r;
        return this.optional(t)
          ? !0
          : ((r = new RegExp(i).exec(n)),
            r && r.index === 0 && r[0].length === n.length);
      }),
      t.addSingleVal("accept", "exts").addSingleVal("regex", "pattern"),
      t
        .addBool("creditcard")
        .addBool("date")
        .addBool("digits")
        .addBool("email")
        .addBool("number")
        .addBool("url"),
      t
        .addMinMax("length", "minlength", "maxlength", "rangelength")
        .addMinMax("range", "min", "max", "range"),
      t.add("equalto", ["other"], function (t) {
        var o = u(t.element.name),
          s = t.params.other,
          r = f(s, o),
          e = n(t.form).find(":input[name=" + r + "]")[0];
        i(t, "equalTo", e);
      }),
      t.add("required", function (n) {
        (n.element.tagName.toUpperCase() !== "INPUT" ||
          n.element.type.toUpperCase() !== "CHECKBOX") &&
          i(n, "required", !0);
      }),
      t.add("remote", ["url", "type", "additionalfields"], function (t) {
        var r = {
            url: t.params.url,
            type: t.params.type || "GET",
            data: {},
          },
          e = u(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function (i, u) {
          var o = f(u, e);
          r.data[o] = function () {
            return n(t.form)
              .find(":input[name='" + o + "']")
              .val();
          };
        }),
          i(t, "remote", r);
      }),
      n(function () {
        r.unobtrusive.parse(document);
      });
  })(jQuery),
  (function (n) {
    function i(n, t, i) {
      (n.rules[t] = i), n.message && (n.messages[t] = n.message);
    }
    function c(n) {
      return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
    }
    function f(n) {
      return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
    }
    function o(n) {
      return n.substr(0, n.lastIndexOf(".") + 1);
    }
    function e(n, t) {
      return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n;
    }
    function a(t, i) {
      var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"),
        u = n.parseJSON(r.attr("data-valmsg-replace") || "null") !== !1;
      r
        .removeClass("field-validation-valid")
        .addClass("field-validation-error"),
        r.closest(".control-group").addClass("error"),
        t.data("unobtrusiveContainer", r),
        u
          ? (r.empty(), t.removeClass("input-validation-error").appendTo(r))
          : t.hide();
    }
    function v(t, i) {
      var u = n(this).find("[data-valmsg-summary=true]"),
        r = u.find("ul");
      r &&
        r.length &&
        i.errorList.length &&
        (r.empty(),
        u
          .addClass("validation-summary-errors")
          .removeClass("validation-summary-valid"),
        n.each(i.errorList, function () {
          n("<li />").html(this.message).appendTo(r);
        }));
    }
    function l(t) {
      var i = t.data("unobtrusiveContainer"),
        r = n.parseJSON(i.attr("data-valmsg-replace") || "null");
      i &&
        (i
          .addClass("field-validation-valid")
          .removeClass("field-validation-error"),
        i.closest(".control-group").removeClass("error"),
        t.removeData("unobtrusiveContainer"),
        r && i.empty());
    }
    function h() {
      var i = n(this);
      i.data("validator").resetForm(),
        i
          .find(".validation-summary-errors")
          .addClass("validation-summary-valid")
          .removeClass("validation-summary-errors"),
        i
          .find(".field-validation-error")
          .addClass("field-validation-valid")
          .removeClass("field-validation-error")
          .removeData("unobtrusiveContainer")
          .find(">*")
          .removeData("unobtrusiveContainer"),
        i.find(".control-group").removeClass("error");
    }
    function s(t) {
      var i = n(t),
        r = i.data(u),
        f = n.proxy(h, t);
      return (
        r ||
          ((r = {
            options: {
              errorClass: "input-validation-error",
              errorElement: "span",
              errorPlacement: n.proxy(a, t),
              invalidHandler: n.proxy(v, t),
              messages: {},
              rules: {},
              success: n.proxy(l, t),
            },
            attachValidation: function () {
              i.unbind("reset." + u, f)
                .bind("reset." + u, f)
                .validate(this.options);
            },
            validate: function () {
              return i.validate(), i.valid();
            },
          }),
          i.data(u, r)),
        r
      );
    }
    var r = n.validator,
      t,
      u = "unobtrusiveValidation";
    (r.unobtrusive = {
      adapters: [],
      parseElement: function (t, i) {
        var f = n(t),
          e = f.parents("form")[0],
          r,
          u,
          o;
        e &&
          ((r = s(e)),
          (r.options.rules[t.name] = u = {}),
          (r.options.messages[t.name] = o = {}),
          n.each(this.adapters, function () {
            var i = "data-val-" + this.name,
              s = f.attr(i),
              r = {};
            s !== undefined &&
              ((i += "-"),
              n.each(this.params, function () {
                r[this] = f.attr(i + this);
              }),
              this.adapt({
                element: t,
                form: e,
                message: s,
                params: r,
                rules: u,
                messages: o,
              }));
          }),
          n.extend(u, {
            __dummy__: !0,
          }),
          i || r.attachValidation());
      },
      parse: function (t) {
        var i = n(t)
          .parents("form")
          .andSelf()
          .add(n(t).find("form"))
          .filter("form");
        n(t)
          .find(":input[data-val=true]")
          .each(function () {
            r.unobtrusive.parseElement(this, !0);
          }),
          i.each(function () {
            var n = s(this);
            n && n.attachValidation();
          });
      },
    }),
      (t = r.unobtrusive.adapters),
      (t.add = function (n, t, i) {
        return (
          i || ((i = t), (t = [])),
          this.push({
            name: n,
            params: t,
            adapt: i,
          }),
          this
        );
      }),
      (t.addBool = function (n, t) {
        return this.add(n, function (r) {
          i(r, t || n, !0);
        });
      }),
      (t.addMinMax = function (n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function (n) {
          var e = n.params.min,
            f = n.params.max;
          e && f ? i(n, u, [e, f]) : e ? i(n, t, e) : f && i(n, r, f);
        });
      }),
      (t.addSingleVal = function (n, t, r) {
        return this.add(n, [t || "val"], function (u) {
          i(u, r || n, u.params[t]);
        });
      }),
      r.addMethod("__dummy__", function () {
        return !0;
      }),
      r.addMethod("regex", function (n, t, i) {
        var r;
        return this.optional(t)
          ? !0
          : ((r = new RegExp(i).exec(n)),
            r && r.index === 0 && r[0].length === n.length);
      }),
      t.addSingleVal("accept", "exts").addSingleVal("regex", "pattern"),
      t
        .addBool("creditcard")
        .addBool("date")
        .addBool("digits")
        .addBool("email")
        .addBool("number")
        .addBool("url"),
      t
        .addMinMax("length", "minlength", "maxlength", "rangelength")
        .addMinMax("range", "min", "max", "range"),
      t.add("equalto", ["other"], function (t) {
        var s = o(t.element.name),
          h = t.params.other,
          r = e(h, s),
          u = n(t.form).find(":input[name='" + f(r) + "']")[0];
        i(t, "equalTo", u);
      }),
      t.add("required", function (n) {
        (n.element.tagName.toUpperCase() !== "INPUT" ||
          n.element.type.toUpperCase() !== "CHECKBOX") &&
          i(n, "required", !0);
      }),
      t.add("remote", ["url", "type", "additionalfields"], function (t) {
        var r = {
            url: t.params.url,
            type: t.params.type || "GET",
            data: {},
          },
          u = o(t.element.name);
        n.each(c(t.params.additionalfields || t.element.name), function (i, o) {
          var s = e(o, u);
          r.data[s] = function () {
            return n(t.form)
              .find(":input[name='" + f(s) + "']")
              .val();
          };
        }),
          i(t, "remote", r);
      }),
      n(function () {
        r.unobtrusive.parse(document);
      });
  })(jQuery),
  !(function (n) {
    "use strict";
    n(function () {
      n.support.transition = (function () {
        var n = (function () {
          var i = document.createElement("bootstrap"),
            t = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend",
            },
            n;
          for (n in t) if (i.style[n] !== undefined) return t[n];
        })();
        return (
          n && {
            end: n,
          }
        );
      })();
    });
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var r = '[data-dismiss="alert"]',
      t = function (t) {
        n(t).on("click", r, this.close);
      },
      i;
    (t.prototype.close = function (t) {
      function f() {
        i.trigger("closed").remove();
      }
      var u = n(this),
        r = u.attr("data-target"),
        i;
      (r || ((r = u.attr("href")), (r = r && r.replace(/.*(?=#[^\s]*$)/, ""))),
      (i = n(r)),
      t && t.preventDefault(),
      i.length || (i = u.hasClass("alert") ? u : u.parent()),
      i.trigger((t = n.Event("close"))),
      t.isDefaultPrevented()) ||
        (i.removeClass("in"),
        n.support.transition && i.hasClass("fade")
          ? i.on(n.support.transition.end, f)
          : f());
    }),
      (i = n.fn.alert),
      (n.fn.alert = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("alert");
          r || u.data("alert", (r = new t(this))),
            typeof i == "string" && r[i].call(u);
        });
      }),
      (n.fn.alert.Constructor = t),
      (n.fn.alert.noConflict = function () {
        return (n.fn.alert = i), this;
      }),
      n(document).on("click.alert.data-api", r, t.prototype.close);
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (t, i) {
        (this.$element = n(t)),
          (this.options = n.extend({}, n.fn.button.defaults, i));
      },
      i;
    (t.prototype.setState = function (n) {
      var i = "disabled",
        t = this.$element,
        u = t.data(),
        r = t.is("input") ? "val" : "html";
      (n += "Text"),
        u.resetText || t.data("resetText", t[r]()),
        t[r](u[n] || this.options[n]),
        setTimeout(function () {
          n == "loadingText"
            ? t.addClass(i).attr(i, i)
            : t.removeClass(i).removeAttr(i);
        }, 0);
    }),
      (t.prototype.toggle = function () {
        var n = this.$element.closest('[data-toggle="buttons-radio"]');
        n && n.find(".active").removeClass("active"),
          this.$element.toggleClass("active");
      }),
      (i = n.fn.button),
      (n.fn.button = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("button"),
            f = typeof i == "object" && i;
          r || u.data("button", (r = new t(this, f))),
            i == "toggle" ? r.toggle() : i && r.setState(i);
        });
      }),
      (n.fn.button.defaults = {
        loadingText: "loading...",
      }),
      (n.fn.button.Constructor = t),
      (n.fn.button.noConflict = function () {
        return (n.fn.button = i), this;
      }),
      n(document).on(
        "click.button.data-api",
        "[data-toggle^=button]",
        function (t) {
          var i = n(t.target);
          i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle");
        }
      );
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (t, i) {
        (this.$element = n(t)),
          (this.$indicators = this.$element.find(".carousel-indicators")),
          (this.options = i),
          this.options.pause == "hover" &&
            this.$element
              .on("mouseenter", n.proxy(this.pause, this))
              .on("mouseleave", n.proxy(this.cycle, this));
      },
      i;
    (t.prototype = {
      cycle: function (t) {
        return (
          t || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              n.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      },
      getActiveIndex: function () {
        return (
          (this.$active = this.$element.find(".item.active")),
          (this.$items = this.$active.parent().children()),
          this.$items.index(this.$active)
        );
      },
      to: function (t) {
        var i = this.getActiveIndex(),
          r = this;
        if (!(t > this.$items.length - 1) && !(t < 0))
          return this.sliding
            ? this.$element.one("slid", function () {
                r.to(t);
              })
            : i == t
            ? this.pause().cycle()
            : this.slide(t > i ? "next" : "prev", n(this.$items[t]));
      },
      pause: function (t) {
        return (
          t || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            n.support.transition.end &&
            (this.$element.trigger(n.support.transition.end), this.cycle(!0)),
          clearInterval(this.interval),
          (this.interval = null),
          this
        );
      },
      next: function () {
        if (!this.sliding) return this.slide("next");
      },
      prev: function () {
        if (!this.sliding) return this.slide("prev");
      },
      slide: function (t, i) {
        var o = this.$element.find(".item.active"),
          r = i || o[t](),
          s = this.interval,
          u = t == "next" ? "left" : "right",
          h = t == "next" ? "first" : "last",
          e = this,
          f;
        if (
          ((this.sliding = !0),
          s && this.pause(),
          (r = r.length ? r : this.$element.find(".item")[h]()),
          (f = n.Event("slide", {
            relatedTarget: r[0],
            direction: u,
          })),
          !r.hasClass("active"))
        ) {
          if (
            (this.$indicators.length &&
              (this.$indicators.find(".active").removeClass("active"),
              this.$element.one("slid", function () {
                var t = n(e.$indicators.children()[e.getActiveIndex()]);
                t && t.addClass("active");
              })),
            n.support.transition && this.$element.hasClass("slide"))
          ) {
            if ((this.$element.trigger(f), f.isDefaultPrevented())) return;
            r.addClass(t),
              r[0].offsetWidth,
              o.addClass(u),
              r.addClass(u),
              this.$element.one(n.support.transition.end, function () {
                r.removeClass([t, u].join(" ")).addClass("active"),
                  o.removeClass(["active", u].join(" ")),
                  (e.sliding = !1),
                  setTimeout(function () {
                    e.$element.trigger("slid");
                  }, 0);
              });
          } else {
            if ((this.$element.trigger(f), f.isDefaultPrevented())) return;
            o.removeClass("active"),
              r.addClass("active"),
              (this.sliding = !1),
              this.$element.trigger("slid");
          }
          return s && this.cycle(), this;
        }
      },
    }),
      (i = n.fn.carousel),
      (n.fn.carousel = function (i) {
        return this.each(function () {
          var e = n(this),
            r = e.data("carousel"),
            u = n.extend({}, n.fn.carousel.defaults, typeof i == "object" && i),
            f = typeof i == "string" ? i : u.slide;
          r || e.data("carousel", (r = new t(this, u))),
            typeof i == "number"
              ? r.to(i)
              : f
              ? r[f]()
              : u.interval && r.pause().cycle();
        });
      }),
      (n.fn.carousel.defaults = {
        interval: 5000,
        pause: "hover",
      }),
      (n.fn.carousel.Constructor = t),
      (n.fn.carousel.noConflict = function () {
        return (n.fn.carousel = i), this;
      }),
      n(document).on(
        "click.carousel.data-api",
        "[data-slide], [data-slide-to]",
        function (t) {
          var i = n(this),
            f,
            r = n(
              i.attr("data-target") ||
                ((f = i.attr("href")) && f.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            e = n.extend({}, r.data(), i.data()),
            u;
          r.carousel(e),
            (u = i.attr("data-slide-to")) &&
              r.data("carousel").pause().to(u).cycle(),
            t.preventDefault();
        }
      );
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (t, i) {
        (this.$element = n(t)),
          (this.options = n.extend({}, n.fn.collapse.defaults, i)),
          this.options.parent && (this.$parent = n(this.options.parent)),
          this.options.toggle && this.toggle();
      },
      i;
    (t.prototype = {
      constructor: t,
      dimension: function () {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height";
      },
      show: function () {
        var r, u, t, i;
        if (!this.transitioning && !this.$element.hasClass("in")) {
          if (
            ((r = this.dimension()),
            (u = n.camelCase(["scroll", r].join("-"))),
            (t = this.$parent && this.$parent.find("> .accordion-group > .in")),
            t && t.length)
          ) {
            if (((i = t.data("collapse")), i && i.transitioning)) return;
            t.collapse("hide"), i || t.data("collapse", null);
          }
          this.$element[r](0),
            this.transition("addClass", n.Event("show"), "shown"),
            n.support.transition && this.$element[r](this.$element[0][u]);
        }
      },
      hide: function () {
        var t;
        !this.transitioning &&
          this.$element.hasClass("in") &&
          ((t = this.dimension()),
          this.reset(this.$element[t]()),
          this.transition("removeClass", n.Event("hide"), "hidden"),
          this.$element[t](0));
      },
      reset: function (n) {
        var t = this.dimension();
        return (
          this.$element.removeClass("collapse")[t](n || "auto")[0].offsetWidth,
          this.$element[n !== null ? "addClass" : "removeClass"]("collapse"),
          this
        );
      },
      transition: function (t, i, r) {
        var u = this,
          f = function () {
            i.type == "show" && u.reset(),
              (u.transitioning = 0),
              u.$element.trigger(r);
          };
        (this.$element.trigger(i), i.isDefaultPrevented()) ||
          ((this.transitioning = 1),
          this.$element[t]("in"),
          n.support.transition && this.$element.hasClass("collapse")
            ? this.$element.one(n.support.transition.end, f)
            : f());
      },
      toggle: function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      },
    }),
      (i = n.fn.collapse),
      (n.fn.collapse = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("collapse"),
            f = n.extend(
              {},
              n.fn.collapse.defaults,
              u.data(),
              typeof i == "object" && i
            );
          r || u.data("collapse", (r = new t(this, f))),
            typeof i == "string" && r[i]();
        });
      }),
      (n.fn.collapse.defaults = {
        toggle: !0,
      }),
      (n.fn.collapse.Constructor = t),
      (n.fn.collapse.noConflict = function () {
        return (n.fn.collapse = i), this;
      }),
      n(document).on(
        "click.collapse.data-api",
        "[data-toggle=collapse]",
        function (t) {
          var i = n(this),
            u,
            r =
              i.attr("data-target") ||
              t.preventDefault() ||
              ((u = i.attr("href")) && u.replace(/.*(?=#[^\s]+$)/, "")),
            f = n(r).data("collapse") ? "toggle" : i.data();
          i[n(r).hasClass("in") ? "addClass" : "removeClass"]("collapsed"),
            n(r).collapse(f);
        }
      );
  })(window.jQuery),
  !(function (n) {
    "use strict";
    function r() {
      n(".dropdown-backdrop").remove(),
        n(i).each(function () {
          u(n(this)).removeClass("open");
        });
    }
    function u(t) {
      var i = t.attr("data-target"),
        r;
      return (
        i ||
          ((i = t.attr("href")),
          (i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""))),
        (r = i && n(i)),
        (r && r.length) || (r = t.parent()),
        r
      );
    }
    var i = "[data-toggle=dropdown]",
      t = function (t) {
        var i = n(t).on("click.dropdown.data-api", this.toggle);
        n("html").on("click.dropdown.data-api", function () {
          i.parent().removeClass("open");
        });
      },
      f;
    (t.prototype = {
      constructor: t,
      toggle: function () {
        var f = n(this),
          i,
          e;
        if (!f.is(".disabled, :disabled"))
          return (
            (i = u(f)),
            (e = i.hasClass("open")),
            r(),
            e ||
              ("ontouchstart" in document.documentElement &&
                n('<div class="dropdown-backdrop"/>')
                  .insertBefore(n(this))
                  .on("click", r),
              i.toggleClass("open")),
            f.focus(),
            !1
          );
      },
      keydown: function (t) {
        var o, f, h, e, s, r;
        if (
          /(38|40|27)/.test(t.keyCode) &&
          ((o = n(this)),
          t.preventDefault(),
          t.stopPropagation(),
          !o.is(".disabled, :disabled"))
        ) {
          if (
            ((e = u(o)), (s = e.hasClass("open")), !s || (s && t.keyCode == 27))
          )
            return t.which == 27 && e.find(i).focus(), o.click();
          ((f = n("[role=menu] li:not(.divider):visible a", e)), f.length) &&
            ((r = f.index(f.filter(":focus"))),
            t.keyCode == 38 && r > 0 && r--,
            t.keyCode == 40 && r < f.length - 1 && r++,
            ~r || (r = 0),
            f.eq(r).focus());
        }
      },
    }),
      (f = n.fn.dropdown),
      (n.fn.dropdown = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("dropdown");
          r || u.data("dropdown", (r = new t(this))),
            typeof i == "string" && r[i].call(u);
        });
      }),
      (n.fn.dropdown.Constructor = t),
      (n.fn.dropdown.noConflict = function () {
        return (n.fn.dropdown = f), this;
      }),
      n(document)
        .on("click.dropdown.data-api", r)
        .on("click.dropdown.data-api", ".dropdown form", function (n) {
          n.stopPropagation();
        })
        .on("click.dropdown.data-api", i, t.prototype.toggle)
        .on(
          "keydown.dropdown.data-api",
          i + ", [role=menu]",
          t.prototype.keydown
        );
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (t, i) {
        (this.options = i),
          (this.$element = n(t).delegate(
            '[data-dismiss="modal"]',
            "click.dismiss.modal",
            n.proxy(this.hide, this)
          )),
          this.options.remote &&
            this.$element.find(".modal-body").load(this.options.remote);
      },
      i;
    (t.prototype = {
      constructor: t,
      toggle: function () {
        return this[this.isShown ? "hide" : "show"]();
      },
      show: function () {
        var t = this,
          i = n.Event("show");
        (this.$element.trigger(i), this.isShown || i.isDefaultPrevented()) ||
          ((this.isShown = !0),
          this.escape(),
          this.backdrop(function () {
            var i = n.support.transition && t.$element.hasClass("fade");
            t.$element.parent().length || t.$element.appendTo(document.body),
              t.$element.show(),
              i && t.$element[0].offsetWidth,
              t.$element.addClass("in").attr("aria-hidden", !1),
              t.enforceFocus(),
              i
                ? t.$element.one(n.support.transition.end, function () {
                    t.$element.focus().trigger("shown");
                  })
                : t.$element.focus().trigger("shown");
          }));
      },
      hide: function (t) {
        t && t.preventDefault();
        var i = this;
        ((t = n.Event("hide")),
        this.$element.trigger(t),
        this.isShown && !t.isDefaultPrevented()) &&
          ((this.isShown = !1),
          this.escape(),
          n(document).off("focusin.modal"),
          this.$element.removeClass("in").attr("aria-hidden", !0),
          n.support.transition && this.$element.hasClass("fade")
            ? this.hideWithTransition()
            : this.hideModal());
      },
      enforceFocus: function () {
        var t = this;
        n(document).on("focusin.modal", function (n) {
          t.$element[0] !== n.target &&
            !t.$element.has(n.target).length &&
            t.$element.focus();
        });
      },
      escape: function () {
        var n = this;
        this.isShown && this.options.keyboard
          ? this.$element.on("keyup.dismiss.modal", function (t) {
              t.which == 27 && n.hide();
            })
          : this.isShown || this.$element.off("keyup.dismiss.modal");
      },
      hideWithTransition: function () {
        var t = this,
          i = setTimeout(function () {
            t.$element.off(n.support.transition.end), t.hideModal();
          }, 500);
        this.$element.one(n.support.transition.end, function () {
          clearTimeout(i), t.hideModal();
        });
      },
      hideModal: function () {
        var n = this;
        this.$element.hide(),
          this.backdrop(function () {
            n.removeBackdrop(), n.$element.trigger("hidden");
          });
      },
      removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      },
      backdrop: function (t) {
        var u = this,
          r = this.$element.hasClass("fade") ? "fade" : "",
          i;
        if (this.isShown && this.options.backdrop) {
          if (
            ((i = n.support.transition && r),
            (this.$backdrop = n(
              '<div class="modal-backdrop ' + r + '" />'
            ).appendTo(document.body)),
            this.$backdrop.click(
              this.options.backdrop == "static"
                ? n.proxy(this.$element[0].focus, this.$element[0])
                : n.proxy(this.hide, this)
            ),
            i && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !t)
          )
            return;
          i ? this.$backdrop.one(n.support.transition.end, t) : t();
        } else
          !this.isShown && this.$backdrop
            ? (this.$backdrop.removeClass("in"),
              n.support.transition && this.$element.hasClass("fade")
                ? this.$backdrop.one(n.support.transition.end, t)
                : t())
            : t && t();
      },
    }),
      (i = n.fn.modal),
      (n.fn.modal = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("modal"),
            f = n.extend(
              {},
              n.fn.modal.defaults,
              u.data(),
              typeof i == "object" && i
            );
          r || u.data("modal", (r = new t(this, f))),
            typeof i == "string" ? r[i]() : f.show && r.show();
        });
      }),
      (n.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0,
      }),
      (n.fn.modal.Constructor = t),
      (n.fn.modal.noConflict = function () {
        return (n.fn.modal = i), this;
      }),
      n(document).on("click.modal.data-api", '[data-toggle="modal"]', function (
        t
      ) {
        var r = n(this),
          i = r.attr("href"),
          u = n(
            r.attr("data-target") || (i && i.replace(/.*(?=#[^\s]+$)/, ""))
          ),
          f = u.data("modal")
            ? "toggle"
            : n.extend(
                {
                  remote: !/#/.test(i) && i,
                },
                u.data(),
                r.data()
              );
        t.preventDefault(),
          u.modal(f).one("hide", function () {
            r.focus();
          });
      });
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (n, t) {
        this.init("tooltip", n, t);
      },
      i;
    (t.prototype = {
      constructor: t,
      init: function (t, i, r) {
        var o, s, f, u, e;
        for (
          this.type = t,
            this.$element = n(i),
            this.options = this.getOptions(r),
            this.enabled = !0,
            f = this.options.trigger.split(" "),
            e = f.length;
          e--;

        )
          (u = f[e]),
            u == "click"
              ? this.$element.on(
                  "click." + this.type,
                  this.options.selector,
                  n.proxy(this.toggle, this)
                )
              : u != "manual" &&
                ((o = u == "hover" ? "mouseenter" : "focus"),
                (s = u == "hover" ? "mouseleave" : "blur"),
                this.$element.on(
                  o + "." + this.type,
                  this.options.selector,
                  n.proxy(this.enter, this)
                ),
                this.$element.on(
                  s + "." + this.type,
                  this.options.selector,
                  n.proxy(this.leave, this)
                ));
        this.options.selector
          ? (this._options = n.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      },
      getOptions: function (t) {
        return (
          (t = n.extend({}, n.fn[this.type].defaults, this.$element.data(), t)),
          t.delay &&
            typeof t.delay == "number" &&
            (t.delay = {
              show: t.delay,
              hide: t.delay,
            }),
          t
        );
      },
      enter: function (t) {
        var u = n.fn[this.type].defaults,
          r = {},
          i;
        if (
          (this._options &&
            n.each(
              this._options,
              function (n, t) {
                u[n] != t && (r[n] = t);
              },
              this
            ),
          (i = n(t.currentTarget)[this.type](r).data(this.type)),
          !i.options.delay || !i.options.delay.show)
        )
          return i.show();
        clearTimeout(this.timeout),
          (i.hoverState = "in"),
          (this.timeout = setTimeout(function () {
            i.hoverState == "in" && i.show();
          }, i.options.delay.show));
      },
      leave: function (t) {
        var i = n(t.currentTarget)[this.type](this._options).data(this.type);
        if (
          (this.timeout && clearTimeout(this.timeout),
          !i.options.delay || !i.options.delay.hide)
        )
          return i.hide();
        (i.hoverState = "out"),
          (this.timeout = setTimeout(function () {
            i.hoverState == "out" && i.hide();
          }, i.options.delay.hide));
      },
      show: function () {
        var i,
          t,
          f,
          u,
          e,
          r,
          o = n.Event("show");
        if (this.hasContent() && this.enabled) {
          if ((this.$element.trigger(o), o.isDefaultPrevented())) return;
          (i = this.tip()),
            this.setContent(),
            this.options.animation && i.addClass("fade"),
            (e =
              typeof this.options.placement == "function"
                ? this.options.placement.call(this, i[0], this.$element[0])
                : this.options.placement),
            i.detach().css({
              top: 0,
              left: 0,
              display: "block",
            }),
            this.options.container
              ? i.appendTo(this.options.container)
              : i.insertAfter(this.$element),
            (t = this.getPosition()),
            (f = i[0].offsetWidth),
            (u = i[0].offsetHeight);
          switch (e) {
            case "bottom":
              r = {
                top: t.top + t.height,
                left: t.left + t.width / 2 - f / 2,
              };
              break;
            case "top":
              r = {
                top: t.top - u,
                left: t.left + t.width / 2 - f / 2,
              };
              break;
            case "left":
              r = {
                top: t.top + t.height / 2 - u / 2,
                left: t.left - f,
              };
              break;
            case "right":
              r = {
                top: t.top + t.height / 2 - u / 2,
                left: t.left + t.width,
              };
          }
          this.applyPlacement(r, e), this.$element.trigger("shown");
        }
      },
      applyPlacement: function (n, t) {
        var i = this.tip(),
          s = i[0].offsetWidth,
          e = i[0].offsetHeight,
          u,
          r,
          f,
          o;
        i.offset(n).addClass(t).addClass("in"),
          (u = i[0].offsetWidth),
          (r = i[0].offsetHeight),
          t == "top" && r != e && ((n.top = n.top + e - r), (o = !0)),
          t == "bottom" || t == "top"
            ? ((f = 0),
              n.left < 0 &&
                ((f = n.left * -2),
                (n.left = 0),
                i.offset(n),
                (u = i[0].offsetWidth),
                (r = i[0].offsetHeight)),
              this.replaceArrow(f - s + u, u, "left"))
            : this.replaceArrow(r - e, r, "top"),
          o && i.offset(n);
      },
      replaceArrow: function (n, t, i) {
        this.arrow().css(i, n ? 50 * (1 - n / t) + "%" : "");
      },
      setContent: function () {
        var n = this.tip(),
          t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t),
          n.removeClass("fade in top bottom left right");
      },
      hide: function () {
        function r() {
          var i = setTimeout(function () {
            t.off(n.support.transition.end).detach();
          }, 500);
          t.one(n.support.transition.end, function () {
            clearTimeout(i), t.detach();
          });
        }
        var u = this,
          t = this.tip(),
          i = n.Event("hide");
        if ((this.$element.trigger(i), !i.isDefaultPrevented()))
          return (
            t.removeClass("in"),
            n.support.transition && this.$tip.hasClass("fade")
              ? r()
              : t.detach(),
            this.$element.trigger("hidden"),
            this
          );
      },
      fixTitle: function () {
        var n = this.$element;
        (n.attr("title") || typeof n.attr("data-original-title") != "string") &&
          n
            .attr("data-original-title", n.attr("title") || "")
            .attr("title", "");
      },
      hasContent: function () {
        return this.getTitle();
      },
      getPosition: function () {
        var t = this.$element[0];
        return n.extend(
          {},
          typeof t.getBoundingClientRect == "function"
            ? t.getBoundingClientRect()
            : {
                width: t.offsetWidth,
                height: t.offsetHeight,
              },
          this.$element.offset()
        );
      },
      getTitle: function () {
        var t,
          i = this.$element,
          n = this.options;
        return (
          (t =
            i.attr("data-original-title") ||
            (typeof n.title == "function" ? n.title.call(i[0]) : n.title)),
          t
        );
      },
      tip: function () {
        return (this.$tip = this.$tip || n(this.options.template));
      },
      arrow: function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      },
      validate: function () {
        this.$element[0].parentNode ||
          (this.hide(), (this.$element = null), (this.options = null));
      },
      enable: function () {
        this.enabled = !0;
      },
      disable: function () {
        this.enabled = !1;
      },
      toggleEnabled: function () {
        this.enabled = !this.enabled;
      },
      toggle: function (t) {
        var i = t
          ? n(t.currentTarget)[this.type](this._options).data(this.type)
          : this;
        i.tip().hasClass("in") ? i.hide() : i.show();
      },
      destroy: function () {
        this.hide()
          .$element.off("." + this.type)
          .removeData(this.type);
      },
    }),
      (i = n.fn.tooltip),
      (n.fn.tooltip = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("tooltip"),
            f = typeof i == "object" && i;
          r || u.data("tooltip", (r = new t(this, f))),
            typeof i == "string" && r[i]();
        });
      }),
      (n.fn.tooltip.Constructor = t),
      (n.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
      }),
      (n.fn.tooltip.noConflict = function () {
        return (n.fn.tooltip = i), this;
      });
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (n, t) {
        this.init("popover", n, t);
      },
      i;
    (t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype, {
      constructor: t,
      setContent: function () {
        var n = this.tip(),
          i = this.getTitle(),
          t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i),
          n.find(".popover-content")[this.options.html ? "html" : "text"](t),
          n.removeClass("fade top bottom left right in");
      },
      hasContent: function () {
        return this.getTitle() || this.getContent();
      },
      getContent: function () {
        var t,
          i = this.$element,
          n = this.options;
        return (
          (t =
            (typeof n.content == "function"
              ? n.content.call(i[0])
              : n.content) || i.attr("data-content")),
          t
        );
      },
      tip: function () {
        return this.$tip || (this.$tip = n(this.options.template)), this.$tip;
      },
      destroy: function () {
        this.hide()
          .$element.off("." + this.type)
          .removeData(this.type);
      },
    })),
      (i = n.fn.popover),
      (n.fn.popover = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("popover"),
            f = typeof i == "object" && i;
          r || u.data("popover", (r = new t(this, f))),
            typeof i == "string" && r[i]();
        });
      }),
      (n.fn.popover.Constructor = t),
      (n.fn.popover.defaults = n.extend({}, n.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (n.fn.popover.noConflict = function () {
        return (n.fn.popover = i), this;
      });
  })(window.jQuery),
  !(function (n) {
    "use strict";
    function t(t, i) {
      var u = n.proxy(this.process, this),
        f = n(t).is("body") ? n(window) : n(t),
        r;
      (this.options = n.extend({}, n.fn.scrollspy.defaults, i)),
        (this.$scrollElement = f.on("scroll.scroll-spy.data-api", u)),
        (this.selector =
          (this.options.target ||
            ((r = n(t).attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")) ||
            "") + " .nav li > a"),
        (this.$body = n("body")),
        this.refresh(),
        this.process();
    }
    t.prototype = {
      constructor: t,
      refresh: function () {
        var t = this,
          i;
        (this.offsets = n([])),
          (this.targets = n([])),
          (i = this.$body
            .find(this.selector)
            .map(function () {
              var u = n(this),
                r = u.data("target") || u.attr("href"),
                i = /^#\w/.test(r) && n(r);
              return (
                (i &&
                  i.length && [
                    [
                      i.position().top +
                        (!n.isWindow(t.$scrollElement.get(0)) &&
                          t.$scrollElement.scrollTop()),
                      r,
                    ],
                  ]) ||
                null
              );
            })
            .sort(function (n, t) {
              return n[0] - t[0];
            })
            .each(function () {
              t.offsets.push(this[0]), t.targets.push(this[1]);
            }));
      },
      process: function () {
        var i = this.$scrollElement.scrollTop() + this.options.offset,
          e = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
          f = e - this.$scrollElement.height(),
          t = this.offsets,
          r = this.targets,
          u = this.activeTarget,
          n;
        if (i >= f) return u != (n = r.last()[0]) && this.activate(n);
        for (n = t.length; n--; )
          u != r[n] &&
            i >= t[n] &&
            (!t[n + 1] || i <= t[n + 1]) &&
            this.activate(r[n]);
      },
      activate: function (t) {
        var i, r;
        (this.activeTarget = t),
          n(this.selector).parent(".active").removeClass("active"),
          (r =
            this.selector +
            '[data-target="' +
            t +
            '"],' +
            this.selector +
            '[href="' +
            t +
            '"]'),
          (i = n(r).parent("li").addClass("active")),
          i.parent(".dropdown-menu").length &&
            (i = i.closest("li.dropdown").addClass("active")),
          i.trigger("activate");
      },
    };
    var i = n.fn.scrollspy;
    (n.fn.scrollspy = function (i) {
      return this.each(function () {
        var u = n(this),
          r = u.data("scrollspy"),
          f = typeof i == "object" && i;
        r || u.data("scrollspy", (r = new t(this, f))),
          typeof i == "string" && r[i]();
      });
    }),
      (n.fn.scrollspy.Constructor = t),
      (n.fn.scrollspy.defaults = {
        offset: 10,
      }),
      (n.fn.scrollspy.noConflict = function () {
        return (n.fn.scrollspy = i), this;
      }),
      n(window).on("load", function () {
        n('[data-spy="scroll"]').each(function () {
          var t = n(this);
          t.scrollspy(t.data());
        });
      });
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (t) {
        this.element = n(t);
      },
      i;
    (t.prototype = {
      constructor: t,
      show: function () {
        var t = this.element,
          e = t.closest("ul:not(.dropdown-menu)"),
          i = t.attr("data-target"),
          f,
          r,
          u;
        (i ||
          ((i = t.attr("href")), (i = i && i.replace(/.*(?=#[^\s]*$)/, ""))),
        t.parent("li").hasClass("active")) ||
          ((f = e.find(".active:last a")[0]),
          (u = n.Event("show", {
            relatedTarget: f,
          })),
          t.trigger(u),
          u.isDefaultPrevented()) ||
          ((r = n(i)),
          this.activate(t.parent("li"), e),
          this.activate(r, r.parent(), function () {
            t.trigger({
              type: "shown",
              relatedTarget: f,
            });
          }));
      },
      activate: function (t, i, r) {
        function e() {
          u
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active"),
            t.addClass("active"),
            f ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu") &&
              t.closest("li.dropdown").addClass("active"),
            r && r();
        }
        var u = i.find("> .active"),
          f = r && n.support.transition && u.hasClass("fade");
        f ? u.one(n.support.transition.end, e) : e(), u.removeClass("in");
      },
    }),
      (i = n.fn.tab),
      (n.fn.tab = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("tab");
          r || u.data("tab", (r = new t(this))), typeof i == "string" && r[i]();
        });
      }),
      (n.fn.tab.Constructor = t),
      (n.fn.tab.noConflict = function () {
        return (n.fn.tab = i), this;
      }),
      n(document).on(
        "click.tab.data-api",
        '[data-toggle="tab"], [data-toggle="pill"]',
        function (t) {
          t.preventDefault(), n(this).tab("show");
        }
      );
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (t, i) {
        (this.$element = n(t)),
          (this.options = n.extend({}, n.fn.typeahead.defaults, i)),
          (this.matcher = this.options.matcher || this.matcher),
          (this.sorter = this.options.sorter || this.sorter),
          (this.highlighter = this.options.highlighter || this.highlighter),
          (this.updater = this.options.updater || this.updater),
          (this.source = this.options.source),
          (this.$menu = n(this.options.menu)),
          (this.shown = !1),
          this.listen();
      },
      i;
    (t.prototype = {
      constructor: t,
      select: function () {
        var n = this.$menu.find(".active").attr("data-value");
        return this.$element.val(this.updater(n)).change(), this.hide();
      },
      updater: function (n) {
        return n;
      },
      show: function () {
        var t = n.extend({}, this.$element.position(), {
          height: this.$element[0].offsetHeight,
        });
        return (
          this.$menu
            .insertAfter(this.$element)
            .css({
              top: t.top + t.height,
              left: t.left,
            })
            .show(),
          (this.shown = !0),
          this
        );
      },
      hide: function () {
        return this.$menu.hide(), (this.shown = !1), this;
      },
      lookup: function () {
        var i;
        return (
          (this.query = this.$element.val()),
          !this.query || this.query.length < this.options.minLength
            ? this.shown
              ? this.hide()
              : this
            : ((i = n.isFunction(this.source)
                ? this.source(this.query, n.proxy(this.process, this))
                : this.source),
              i ? this.process(i) : this)
        );
      },
      process: function (t) {
        var i = this;
        return (
          (t = n.grep(t, function (n) {
            return i.matcher(n);
          })),
          (t = this.sorter(t)),
          t.length
            ? this.render(t.slice(0, this.options.items)).show()
            : this.shown
            ? this.hide()
            : this
        );
      },
      matcher: function (n) {
        return ~n.toLowerCase().indexOf(this.query.toLowerCase());
      },
      sorter: function (n) {
        for (var u = [], i = [], r = [], t; (t = n.shift()); )
          t.toLowerCase().indexOf(this.query.toLowerCase())
            ? ~t.indexOf(this.query)
              ? i.push(t)
              : r.push(t)
            : u.push(t);
        return u.concat(i, r);
      },
      highlighter: function (n) {
        var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        return n.replace(new RegExp("(" + t + ")", "ig"), function (n, t) {
          return "<strong>" + t + "</strong>";
        });
      },
      render: function (t) {
        var i = this;
        return (
          (t = n(t).map(function (t, r) {
            return (
              (t = n(i.options.item).attr("data-value", r)),
              t.find("a").html(i.highlighter(r)),
              t[0]
            );
          })),
          t.first().addClass("active"),
          this.$menu.html(t),
          this
        );
      },
      next: function () {
        var r = this.$menu.find(".active").removeClass("active"),
          i = r.next();
        i.length || (i = n(this.$menu.find("li")[0])), i.addClass("active");
      },
      prev: function () {
        var i = this.$menu.find(".active").removeClass("active"),
          t = i.prev();
        t.length || (t = this.$menu.find("li").last()), t.addClass("active");
      },
      listen: function () {
        this.$element
          .on("focus", n.proxy(this.focus, this))
          .on("blur", n.proxy(this.blur, this))
          .on("keypress", n.proxy(this.keypress, this))
          .on("keyup", n.proxy(this.keyup, this)),
          this.eventSupported("keydown") &&
            this.$element.on("keydown", n.proxy(this.keydown, this)),
          this.$menu
            .on("click", n.proxy(this.click, this))
            .on("mouseenter", "li", n.proxy(this.mouseenter, this))
            .on("mouseleave", "li", n.proxy(this.mouseleave, this));
      },
      eventSupported: function (n) {
        var t = n in this.$element;
        return (
          t ||
            (this.$element.setAttribute(n, "return;"),
            (t = typeof this.$element[n] == "function")),
          t
        );
      },
      move: function (n) {
        if (this.shown) {
          switch (n.keyCode) {
            case 9:
            case 13:
            case 27:
              n.preventDefault();
              break;
            case 38:
              n.preventDefault(), this.prev();
              break;
            case 40:
              n.preventDefault(), this.next();
          }
          n.stopPropagation();
        }
      },
      keydown: function (t) {
        (this.suppressKeyPressRepeat = ~n.inArray(t.keyCode, [
          40,
          38,
          9,
          13,
          27,
        ])),
          this.move(t);
      },
      keypress: function (n) {
        this.suppressKeyPressRepeat || this.move(n);
      },
      keyup: function (n) {
        switch (n.keyCode) {
          case 40:
          case 38:
          case 16:
          case 17:
          case 18:
            break;
          case 9:
          case 13:
            if (!this.shown) return;
            this.select();
            break;
          case 27:
            if (!this.shown) return;
            this.hide();
            break;
          default:
            this.lookup();
        }
        n.stopPropagation(), n.preventDefault();
      },
      focus: function () {
        this.focused = !0;
      },
      blur: function () {
        (this.focused = !1), !this.mousedover && this.shown && this.hide();
      },
      click: function (n) {
        n.stopPropagation(),
          n.preventDefault(),
          this.select(),
          this.$element.focus();
      },
      mouseenter: function (t) {
        (this.mousedover = !0),
          this.$menu.find(".active").removeClass("active"),
          n(t.currentTarget).addClass("active");
      },
      mouseleave: function () {
        (this.mousedover = !1), !this.focused && this.shown && this.hide();
      },
    }),
      (i = n.fn.typeahead),
      (n.fn.typeahead = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("typeahead"),
            f = typeof i == "object" && i;
          r || u.data("typeahead", (r = new t(this, f))),
            typeof i == "string" && r[i]();
        });
      }),
      (n.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1,
      }),
      (n.fn.typeahead.Constructor = t),
      (n.fn.typeahead.noConflict = function () {
        return (n.fn.typeahead = i), this;
      }),
      n(document).on(
        "focus.typeahead.data-api",
        '[data-provide="typeahead"]',
        function () {
          var i = n(this);
          i.data("typeahead") || i.typeahead(i.data());
        }
      );
  })(window.jQuery),
  !(function (n) {
    "use strict";
    var t = function (t, i) {
        (this.options = n.extend({}, n.fn.affix.defaults, i)),
          (this.$window = n(window)
            .on("scroll.affix.data-api", n.proxy(this.checkPosition, this))
            .on(
              "click.affix.data-api",
              n.proxy(function () {
                setTimeout(n.proxy(this.checkPosition, this), 1);
              }, this)
            )),
          (this.$element = n(t)),
          this.checkPosition();
      },
      i;
    (t.prototype.checkPosition = function () {
      if (this.$element.is(":visible")) {
        var o = n(document).height(),
          f = this.$window.scrollTop(),
          e = this.$element.offset(),
          i = this.options.offset,
          r = i.bottom,
          u = i.top,
          s = "affix affix-top affix-bottom",
          t;
        (typeof i != "object" && (r = u = i),
        typeof u == "function" && (u = i.top()),
        typeof r == "function" && (r = i.bottom()),
        (t =
          this.unpin != null && f + this.unpin <= e.top
            ? !1
            : r != null && e.top + this.$element.height() >= o - r
            ? "bottom"
            : u != null && f <= u
            ? "top"
            : !1),
        this.affixed !== t) &&
          ((this.affixed = t),
          (this.unpin = t == "bottom" ? e.top - f : null),
          this.$element.removeClass(s).addClass("affix" + (t ? "-" + t : "")));
      }
    }),
      (i = n.fn.affix),
      (n.fn.affix = function (i) {
        return this.each(function () {
          var u = n(this),
            r = u.data("affix"),
            f = typeof i == "object" && i;
          r || u.data("affix", (r = new t(this, f))),
            typeof i == "string" && r[i]();
        });
      }),
      (n.fn.affix.Constructor = t),
      (n.fn.affix.defaults = {
        offset: 0,
      }),
      (n.fn.affix.noConflict = function () {
        return (n.fn.affix = i), this;
      }),
      n(window).on("load", function () {
        n('[data-spy="affix"]').each(function () {
          var i = n(this),
            t = i.data();
          (t.offset = t.offset || {}),
            t.offsetBottom && (t.offset.bottom = t.offsetBottom),
            t.offsetTop && (t.offset.top = t.offsetTop),
            i.affix(t);
        });
      });
  })(window.jQuery),
  (function () {
    for (
      var n,
        u = function () {},
        r = [
          "assert",
          "clear",
          "count",
          "debug",
          "dir",
          "dirxml",
          "error",
          "exception",
          "group",
          "groupCollapsed",
          "groupEnd",
          "info",
          "log",
          "markTimeline",
          "profile",
          "profileEnd",
          "table",
          "time",
          "timeEnd",
          "timeStamp",
          "trace",
          "warn",
        ],
        t = r.length,
        i = (window.console = window.console || {});
      t--;

    )
      (n = r[t]), i[n] || (i[n] = u);
  })(),
  (function (n, t) {
    "use strict";
    var tt = n.document,
      r = n.Modernizr,
      v = function (n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
      },
      w = "Moz Webkit O Ms".split(" "),
      o = function (n) {
        var u = tt.documentElement.style,
          i,
          t,
          r;
        if (typeof u[n] == "string") return n;
        for (n = v(n), t = 0, r = w.length; t < r; t++)
          if (((i = w[t] + n), typeof u[i] == "string")) return i;
      },
      y = o("transform"),
      d = o("transitionProperty"),
      e = {
        csstransforms: function () {
          return !!y;
        },
        csstransforms3d: function () {
          var n = !!o("perspective");
          if (n) {
            var f = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
              r = "@media (" + f.join("transform-3d),(") + "modernizr)",
              u = t(
                "<style>" + r + "{#modernizr{height:3px}}</style>"
              ).appendTo("head"),
              i = t('<div id="modernizr" />').appendTo("html");
            (n = i.height() === 3), i.remove(), u.remove();
          }
          return n;
        },
        csstransitions: function () {
          return !!d;
        },
      },
      u,
      p,
      s,
      nt,
      h,
      g,
      k,
      f,
      a,
      b,
      l,
      c;
    if (r) for (u in e) r.hasOwnProperty(u) || r.addTest(u, e[u]);
    else {
      (r = n.Modernizr = {
        _version: "1.6ish: miniModernizr for Isotope",
      }),
        (p = " ");
      for (u in e) (s = e[u]()), (r[u] = s), (p += " " + (s ? "" : "no-") + u);
      t("html").addClass(p);
    }
    r.csstransforms &&
      ((nt = r.csstransforms3d
        ? {
            translate: function (n) {
              return "translate3d(" + n[0] + "px, " + n[1] + "px, 0) ";
            },
            scale: function (n) {
              return "scale3d(" + n + ", " + n + ", 1) ";
            },
          }
        : {
            translate: function (n) {
              return "translate(" + n[0] + "px, " + n[1] + "px) ";
            },
            scale: function (n) {
              return "scale(" + n + ") ";
            },
          }),
      (h = function (n, i, r) {
        var f = t.data(n, "isoTransform") || {},
          s = {},
          u,
          e = {},
          o;
        (s[i] = r), t.extend(f, s);
        for (u in f) (o = f[u]), (e[u] = nt[u](o));
        var l = e.translate || "",
          c = e.scale || "",
          h = l + c;
        t.data(n, "isoTransform", f), (n.style[y] = h);
      }),
      (t.cssNumber.scale = !0),
      (t.cssHooks.scale = {
        set: function (n, t) {
          h(n, "scale", t);
        },
        get: function (n) {
          var r = t.data(n, "isoTransform");
          return r && r.scale ? r.scale : 1;
        },
      }),
      (t.fx.step.scale = function (n) {
        t.cssHooks.scale.set(n.elem, n.now + n.unit);
      }),
      (t.cssNumber.translate = !0),
      (t.cssHooks.translate = {
        set: function (n, t) {
          h(n, "translate", t);
        },
        get: function (n) {
          var r = t.data(n, "isoTransform");
          return r && r.translate ? r.translate : [0, 0];
        },
      })),
      r.csstransitions &&
        ((g = {
          WebkitTransitionProperty: "webkitTransitionEnd",
          MozTransitionProperty: "transitionend",
          OTransitionProperty: "oTransitionEnd otransitionend",
          transitionProperty: "transitionend",
        }[d]),
        (k = o("transitionDuration"))),
      (f = t.event),
      (f.special.smartresize = {
        setup: function () {
          t(this).bind("resize", f.special.smartresize.handler);
        },
        teardown: function () {
          t(this).unbind("resize", f.special.smartresize.handler);
        },
        handler: function (n, t) {
          var r = this,
            i = arguments;
          (n.type = "smartresize"),
            a && clearTimeout(a),
            (a = setTimeout(
              function () {
                jQuery.event.handle.apply(r, i);
              },
              t === "execAsap" ? 0 : 100
            ));
        },
      }),
      (t.fn.smartresize = function (n) {
        return n
          ? this.bind("smartresize", n)
          : this.trigger("smartresize", ["execAsap"]);
      }),
      (t.Isotope = function (n, i, r) {
        (this.element = t(i)), this._create(n), this._init(r);
      }),
      (b = ["width", "height"]),
      (l = t(n)),
      (t.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {
          opacity: 0,
          scale: 0.001,
        },
        visibleStyle: {
          opacity: 1,
          scale: 1,
        },
        containerStyle: {
          position: "relative",
          overflow: "hidden",
        },
        animationEngine: "best-available",
        animationOptions: {
          queue: !1,
          duration: 800,
        },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1,
      }),
      (t.Isotope.prototype = {
        _create: function (n) {
          var e, f, i, r, s, o, u;
          (this.options = t.extend({}, t.Isotope.settings, n)),
            (this.styleQueue = []),
            (this.elemCount = 0),
            (e = this.element[0].style),
            (this.originalStyle = {}),
            (f = b.slice(0));
          for (i in this.options.containerStyle) f.push(i);
          for (r = 0, s = f.length; r < s; r++)
            (i = f[r]), (this.originalStyle[i] = e[i] || "");
          this.element.css(this.options.containerStyle),
            this._updateAnimationEngine(),
            this._updateUsingTransforms(),
            (o = {
              "original-order": function (n, t) {
                return t.elemCount++, t.elemCount;
              },
              random: function () {
                return Math.random();
              },
            }),
            (this.options.getSortData = t.extend(this.options.getSortData, o)),
            this.reloadItems(),
            (this.offset = {
              left: parseInt(this.element.css("padding-left") || 0, 10),
              top: parseInt(this.element.css("padding-top") || 0, 10),
            }),
            (u = this),
            setTimeout(function () {
              u.element.addClass(u.options.containerClass);
            }, 0),
            this.options.resizable &&
              l.bind("smartresize.isotope", function () {
                u.resize();
              }),
            this.element.delegate(
              "." + this.options.hiddenClass,
              "click",
              function () {
                return !1;
              }
            );
        },
        _getAtoms: function (n) {
          var r = this.options.itemSelector,
            i = r ? n.filter(r).add(n.find(r)) : n,
            t = {
              position: "absolute",
            };
          return (
            this.usingTransforms && ((t.left = 0), (t.top = 0)),
            i.css(t).addClass(this.options.itemClass),
            this.updateSortData(i, !0),
            i
          );
        },
        _init: function (n) {
          (this.$filteredAtoms = this._filter(this.$allAtoms)),
            this._sort(),
            this.reLayout(n);
        },
        option: function (n) {
          var i, r;
          if (t.isPlainObject(n)) {
            this.options = t.extend(!0, this.options, n);
            for (r in n) (i = "_update" + v(r)), this[i] && this[i]();
          }
        },
        _updateAnimationEngine: function () {
          var t = this.options.animationEngine
              .toLowerCase()
              .replace(/[ _\-]/g, ""),
            n;
          switch (t) {
            case "css":
            case "none":
              n = !1;
              break;
            case "jquery":
              n = !0;
              break;
            default:
              n = !r.csstransitions;
          }
          (this.isUsingJQueryAnimation = n), this._updateUsingTransforms();
        },
        _updateTransformsEnabled: function () {
          this._updateUsingTransforms();
        },
        _updateUsingTransforms: function () {
          var n = (this.usingTransforms =
            this.options.transformsEnabled &&
            r.csstransforms &&
            r.csstransitions &&
            !this.isUsingJQueryAnimation);
          n ||
            (delete this.options.hiddenStyle.scale,
            delete this.options.visibleStyle.scale),
            (this.getPositionStyles = n ? this._translate : this._positionAbs);
        },
        _filter: function (n) {
          var t = this.options.filter === "" ? "*" : this.options.filter,
            u;
          if (!t) return n;
          var r = this.options.hiddenClass,
            f = "." + r,
            e = n.filter(f),
            i = e;
          return (
            t !== "*" &&
              ((i = e.filter(t)),
              (u = n.not(f).not(t).addClass(r)),
              this.styleQueue.push({
                $el: u,
                style: this.options.hiddenStyle,
              })),
            this.styleQueue.push({
              $el: i,
              style: this.options.visibleStyle,
            }),
            i.removeClass(r),
            n.filter(t)
          );
        },
        updateSortData: function (n, i) {
          var e = this,
            f = this.options.getSortData,
            u,
            r;
          n.each(function () {
            (u = t(this)), (r = {});
            for (var n in f)
              r[n] =
                !i && n === "original-order"
                  ? t.data(this, "isotope-sort-data")[n]
                  : f[n](u, e);
            t.data(this, "isotope-sort-data", r);
          });
        },
        _sort: function () {
          var t = this.options.sortBy,
            n = this._getSorter,
            r = this.options.sortAscending ? 1 : -1,
            i = function (i, u) {
              var e = n(i, t),
                f = n(u, t);
              return (
                e === f &&
                  t !== "original-order" &&
                  ((e = n(i, "original-order")), (f = n(u, "original-order"))),
                (e > f ? 1 : e < f ? -1 : 0) * r
              );
            };
          this.$filteredAtoms.sort(i);
        },
        _getSorter: function (n, i) {
          return t.data(n, "isotope-sort-data")[i];
        },
        _translate: function (n, t) {
          return {
            translate: [n, t],
          };
        },
        _positionAbs: function (n, t) {
          return {
            left: n,
            top: t,
          };
        },
        _pushPosition: function (n, t, i) {
          (t = Math.round(t + this.offset.left)),
            (i = Math.round(i + this.offset.top));
          var r = this.getPositionStyles(t, i);
          this.styleQueue.push({
            $el: n,
            style: r,
          }),
            this.options.itemPositionDataEnabled &&
              n.data("isotope-item-position", {
                x: t,
                y: i,
              });
        },
        layout: function (n, t) {
          var r = this.options.layoutMode,
            i;
          this["_" + r + "Layout"](n),
            this.options.resizesContainer &&
              ((i = this["_" + r + "GetContainerSize"]()),
              this.styleQueue.push({
                $el: this.element,
                style: i,
              })),
            this._processStyleQueue(n, t),
            (this.isLaidOut = !0);
        },
        _processStyleQueue: function (n, i) {
          var h = this.isLaidOut
              ? this.isUsingJQueryAnimation
                ? "animate"
                : "css"
              : "css",
            u = this.options.animationOptions,
            p = this.options.onLayout,
            y,
            s,
            f,
            e,
            a;
          if (
            ((s = function (n, t) {
              t.$el[h](t.style, u);
            }),
            this._isInserting && this.isUsingJQueryAnimation)
          )
            s = function (n, t) {
              (y = t.$el.hasClass("no-transition") ? "css" : h),
                t.$el[y](t.style, u);
            };
          else if (i || p || u.complete) {
            var w = !1,
              b = [i, p, u.complete],
              v = this;
            if (
              ((f = !0),
              (e = function () {
                var i, t, r;
                if (!w) {
                  for (t = 0, r = b.length; t < r; t++)
                    (i = b[t]),
                      typeof i == "function" && i.call(v.element, n, v);
                  w = !0;
                }
              }),
              this.isUsingJQueryAnimation && h === "animate")
            )
              (u.complete = e), (f = !1);
            else if (r.csstransitions) {
              for (
                var d = 0, l = this.styleQueue[0], o = l && l.$el, c;
                !o || !o.length;

              ) {
                if (((c = this.styleQueue[d++]), !c)) return;
                o = c.$el;
              }
              (a = parseFloat(getComputedStyle(o[0])[k])),
                a > 0 &&
                  ((s = function (n, t) {
                    t.$el[h](t.style, u).one(g, e);
                  }),
                  (f = !1));
            }
          }
          t.each(this.styleQueue, s), f && e(), (this.styleQueue = []);
        },
        resize: function () {
          this["_" + this.options.layoutMode + "ResizeChanged"]() &&
            this.reLayout();
        },
        reLayout: function (n) {
          this["_" + this.options.layoutMode + "Reset"](),
            this.layout(this.$filteredAtoms, n);
        },
        addItems: function (n, t) {
          var i = this._getAtoms(n);
          (this.$allAtoms = this.$allAtoms.add(i)), t && t(i);
        },
        insert: function (n, t) {
          this.element.append(n);
          var i = this;
          this.addItems(n, function (n) {
            var r = i._filter(n);
            i._addHideAppended(r),
              i._sort(),
              i.reLayout(),
              i._revealAppended(r, t);
          });
        },
        appended: function (n, t) {
          var i = this;
          this.addItems(n, function (n) {
            i._addHideAppended(n), i.layout(n), i._revealAppended(n, t);
          });
        },
        _addHideAppended: function (n) {
          (this.$filteredAtoms = this.$filteredAtoms.add(n)),
            n.addClass("no-transition"),
            (this._isInserting = !0),
            this.styleQueue.push({
              $el: n,
              style: this.options.hiddenStyle,
            });
        },
        _revealAppended: function (n, t) {
          var i = this;
          setTimeout(function () {
            n.removeClass("no-transition"),
              i.styleQueue.push({
                $el: n,
                style: i.options.visibleStyle,
              }),
              (i._isInserting = !1),
              i._processStyleQueue(n, t);
          }, 10);
        },
        reloadItems: function () {
          this.$allAtoms = this._getAtoms(this.element.children());
        },
        remove: function (n, t) {
          (this.$allAtoms = this.$allAtoms.not(n)),
            (this.$filteredAtoms = this.$filteredAtoms.not(n));
          var r = this,
            i = function () {
              n.remove(), t && t.call(r.element);
            };
          n.filter(":not(." + this.options.hiddenClass + ")").length
            ? (this.styleQueue.push({
                $el: n,
                style: this.options.hiddenStyle,
              }),
              this._sort(),
              this.reLayout(i))
            : i();
        },
        shuffle: function (n) {
          this.updateSortData(this.$allAtoms),
            (this.options.sortBy = "random"),
            this._sort(),
            this.reLayout(n);
        },
        destroy: function () {
          var r = this.usingTransforms,
            n = this.options,
            i,
            t;
          this.$allAtoms
            .removeClass(n.hiddenClass + " " + n.itemClass)
            .each(function () {
              var n = this.style;
              (n.position = ""),
                (n.top = ""),
                (n.left = ""),
                (n.opacity = ""),
                r && (n[y] = "");
            }),
            (i = this.element[0].style);
          for (t in this.originalStyle) i[t] = this.originalStyle[t];
          this.element
            .unbind(".isotope")
            .undelegate("." + n.hiddenClass, "click")
            .removeClass(n.containerClass)
            .removeData("isotope"),
            l.unbind(".isotope");
        },
        _getSegments: function (n) {
          var i = this.options.layoutMode,
            f = n ? "rowHeight" : "columnWidth",
            e = n ? "height" : "width",
            o = n ? "rows" : "cols",
            r = this.element[e](),
            t,
            u =
              (this.options[i] && this.options[i][f]) ||
              this.$filteredAtoms["outer" + v(e)](!0) ||
              r;
          (t = Math.floor(r / u)),
            (t = Math.max(t, 1)),
            (this[i][o] = t),
            (this[i][f] = u);
        },
        _checkIfSegmentsChanged: function (n) {
          var i = this.options.layoutMode,
            t = n ? "rows" : "cols",
            r = this[i][t];
          return this._getSegments(n), this[i][t] !== r;
        },
        _masonryReset: function () {
          (this.masonry = {}), this._getSegments();
          var n = this.masonry.cols;
          for (this.masonry.colYs = []; n--; ) this.masonry.colYs.push(0);
        },
        _masonryLayout: function (n) {
          var r = this,
            i = r.masonry;
          n.each(function () {
            var e = t(this),
              u = Math.ceil(e.outerWidth(!0) / i.columnWidth),
              o,
              f,
              s,
              n;
            if (((u = Math.min(u, i.cols)), u === 1))
              r._masonryPlaceBrick(e, i.colYs);
            else {
              for (o = i.cols + 1 - u, f = [], n = 0; n < o; n++)
                (s = i.colYs.slice(n, n + u)), (f[n] = Math.max.apply(Math, s));
              r._masonryPlaceBrick(e, f);
            }
          });
        },
        _masonryPlaceBrick: function (n, t) {
          for (
            var u = Math.min.apply(Math, t),
              f = 0,
              s,
              h,
              e,
              o,
              i = 0,
              r = t.length;
            i < r;
            i++
          )
            if (t[i] === u) {
              f = i;
              break;
            }
          for (
            s = this.masonry.columnWidth * f,
              h = u,
              this._pushPosition(n, s, h),
              e = u + n.outerHeight(!0),
              o = this.masonry.cols + 1 - r,
              i = 0;
            i < o;
            i++
          )
            this.masonry.colYs[f + i] = e;
        },
        _masonryGetContainerSize: function () {
          var n = Math.max.apply(Math, this.masonry.colYs);
          return {
            height: n,
          };
        },
        _masonryResizeChanged: function () {
          return this._checkIfSegmentsChanged();
        },
        _fitRowsReset: function () {
          this.fitRows = {
            x: 0,
            y: 0,
            height: 0,
          };
        },
        _fitRowsLayout: function (n) {
          var r = this,
            u = this.element.width(),
            i = this.fitRows;
          n.each(function () {
            var n = t(this),
              f = n.outerWidth(!0),
              e = n.outerHeight(!0);
            i.x !== 0 && f + i.x > u && ((i.x = 0), (i.y = i.height)),
              r._pushPosition(n, i.x, i.y),
              (i.height = Math.max(i.y + e, i.height)),
              (i.x += f);
          });
        },
        _fitRowsGetContainerSize: function () {
          return {
            height: this.fitRows.height,
          };
        },
        _fitRowsResizeChanged: function () {
          return !0;
        },
        _cellsByRowReset: function () {
          (this.cellsByRow = {
            index: 0,
          }),
            this._getSegments(),
            this._getSegments(!0);
        },
        _cellsByRowLayout: function (n) {
          var r = this,
            i = this.cellsByRow;
          n.each(function () {
            var n = t(this),
              e = i.index % i.cols,
              o = Math.floor(i.index / i.cols),
              u = (e + 0.5) * i.columnWidth - n.outerWidth(!0) / 2,
              f = (o + 0.5) * i.rowHeight - n.outerHeight(!0) / 2;
            r._pushPosition(n, u, f), i.index++;
          });
        },
        _cellsByRowGetContainerSize: function () {
          return {
            height:
              Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) *
                this.cellsByRow.rowHeight +
              this.offset.top,
          };
        },
        _cellsByRowResizeChanged: function () {
          return this._checkIfSegmentsChanged();
        },
        _straightDownReset: function () {
          this.straightDown = {
            y: 0,
          };
        },
        _straightDownLayout: function (n) {
          var i = this;
          n.each(function () {
            var r = t(this);
            i._pushPosition(r, 0, i.straightDown.y),
              (i.straightDown.y += r.outerHeight(!0));
          });
        },
        _straightDownGetContainerSize: function () {
          return {
            height: this.straightDown.y,
          };
        },
        _straightDownResizeChanged: function () {
          return !0;
        },
        _masonryHorizontalReset: function () {
          (this.masonryHorizontal = {}), this._getSegments(!0);
          var n = this.masonryHorizontal.rows;
          for (this.masonryHorizontal.rowXs = []; n--; )
            this.masonryHorizontal.rowXs.push(0);
        },
        _masonryHorizontalLayout: function (n) {
          var r = this,
            i = r.masonryHorizontal;
          n.each(function () {
            var e = t(this),
              u = Math.ceil(e.outerHeight(!0) / i.rowHeight),
              o,
              f,
              s,
              n;
            if (((u = Math.min(u, i.rows)), u === 1))
              r._masonryHorizontalPlaceBrick(e, i.rowXs);
            else {
              for (o = i.rows + 1 - u, f = [], n = 0; n < o; n++)
                (s = i.rowXs.slice(n, n + u)), (f[n] = Math.max.apply(Math, s));
              r._masonryHorizontalPlaceBrick(e, f);
            }
          });
        },
        _masonryHorizontalPlaceBrick: function (n, t) {
          for (
            var u = Math.min.apply(Math, t),
              f = 0,
              s,
              h,
              e,
              o,
              i = 0,
              r = t.length;
            i < r;
            i++
          )
            if (t[i] === u) {
              f = i;
              break;
            }
          for (
            s = u,
              h = this.masonryHorizontal.rowHeight * f,
              this._pushPosition(n, s, h),
              e = u + n.outerWidth(!0),
              o = this.masonryHorizontal.rows + 1 - r,
              i = 0;
            i < o;
            i++
          )
            this.masonryHorizontal.rowXs[f + i] = e;
        },
        _masonryHorizontalGetContainerSize: function () {
          var n = Math.max.apply(Math, this.masonryHorizontal.rowXs);
          return {
            width: n,
          };
        },
        _masonryHorizontalResizeChanged: function () {
          return this._checkIfSegmentsChanged(!0);
        },
        _fitColumnsReset: function () {
          this.fitColumns = {
            x: 0,
            y: 0,
            width: 0,
          };
        },
        _fitColumnsLayout: function (n) {
          var r = this,
            u = this.element.height(),
            i = this.fitColumns;
          n.each(function () {
            var n = t(this),
              e = n.outerWidth(!0),
              f = n.outerHeight(!0);
            i.y !== 0 && f + i.y > u && ((i.x = i.width), (i.y = 0)),
              r._pushPosition(n, i.x, i.y),
              (i.width = Math.max(i.x + e, i.width)),
              (i.y += f);
          });
        },
        _fitColumnsGetContainerSize: function () {
          return {
            width: this.fitColumns.width,
          };
        },
        _fitColumnsResizeChanged: function () {
          return !0;
        },
        _cellsByColumnReset: function () {
          (this.cellsByColumn = {
            index: 0,
          }),
            this._getSegments(),
            this._getSegments(!0);
        },
        _cellsByColumnLayout: function (n) {
          var r = this,
            i = this.cellsByColumn;
          n.each(function () {
            var n = t(this),
              e = Math.floor(i.index / i.rows),
              o = i.index % i.rows,
              u = (e + 0.5) * i.columnWidth - n.outerWidth(!0) / 2,
              f = (o + 0.5) * i.rowHeight - n.outerHeight(!0) / 2;
            r._pushPosition(n, u, f), i.index++;
          });
        },
        _cellsByColumnGetContainerSize: function () {
          return {
            width:
              Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) *
              this.cellsByColumn.columnWidth,
          };
        },
        _cellsByColumnResizeChanged: function () {
          return this._checkIfSegmentsChanged(!0);
        },
        _straightAcrossReset: function () {
          this.straightAcross = {
            x: 0,
          };
        },
        _straightAcrossLayout: function (n) {
          var i = this;
          n.each(function () {
            var r = t(this);
            i._pushPosition(r, i.straightAcross.x, 0),
              (i.straightAcross.x += r.outerWidth(!0));
          });
        },
        _straightAcrossGetContainerSize: function () {
          return {
            width: this.straightAcross.x,
          };
        },
        _straightAcrossResizeChanged: function () {
          return !0;
        },
      }),
      (t.fn.imagesLoaded = function (n) {
        function s() {
          n.call(i, r);
        }
        function o(n) {
          var i = n.target;
          i.src !== u &&
            t.inArray(i, f) === -1 &&
            (f.push(i),
            --e <= 0 && (setTimeout(s), r.unbind(".imagesLoaded", o)));
        }
        var i = this,
          r = i.find("img").add(i.filter("img")),
          e = r.length,
          u =
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
          f = [];
        return (
          e || s(),
          r.bind("load.imagesLoaded error.imagesLoaded", o).each(function () {
            var n = this.src;
            (this.src = u), (this.src = n);
          }),
          i
        );
      }),
      (c = function (t) {
        n.console && n.console.error(t);
      }),
      (t.fn.isotope = function (n, i) {
        if (typeof n == "string") {
          var r = Array.prototype.slice.call(arguments, 1);
          this.each(function () {
            var i = t.data(this, "isotope");
            if (!i) {
              c(
                "cannot call methods on isotope prior to initialization; attempted to call method '" +
                  n +
                  "'"
              );
              return;
            }
            if (!t.isFunction(i[n]) || n.charAt(0) === "_") {
              c("no such method '" + n + "' for isotope instance");
              return;
            }
            i[n].apply(i, r);
          });
        } else
          this.each(function () {
            var r = t.data(this, "isotope");
            r
              ? (r.option(n), r._init(i))
              : t.data(this, "isotope", new t.Isotope(n, this, i));
          });
        return this;
      });
  })(window, jQuery),
  (function (n) {
    function h(t) {
      if (t.target.nodeName != "INPUT") {
        var i = n(this).children(":checkbox");
        i.is(":checked") ? i.attr("checked", !1) : i.attr("checked", !0),
          typeof ShowSingleOrMultipleFiles == "function" &&
            ShowSingleOrMultipleFiles(i);
      }
    }
    function y() {
      var i = n(this);
      n(".popover").remove(), n(".popover-alt").remove();
    }
    function r(t, i) {
      var r = window.innerWidth,
        u = n(i).offset().left;
      return r - u > 725 ? "right" : r < 1100 ? "top" : "left";
    }
    function a() {
      var u = n(this).closest(".thumb-wrap"),
        f = {
          Id: u[0].id,
        },
        i = u[0].id.split("-");
      window.innerWidth < 1024 && n(".popover-overlay").show(),
        i[2] == "1"
          ? (u.popover({
              trigger: "manual",
              title: null,
              placement: r,
              html: !0,
              content: function () {
                return [
                  '<h2 class="id-instance">' + i[0] + "-" + i[1] + "</h2>",
                  '<div class="images">',
                  '<div class="stressed"><span class="label">Stressed</span><img src="../../Media/Image.ashx?Id=' +
                    i[0] +
                    "&Type=File&Display=Preview&InstanceId=" +
                    i[1] +
                    '&FileDisplayType=Stressed" /></div>',
                  '<div class="better"><span class="label">Better</span><img src="../../Media/Image.ashx?Id= ' +
                    i[0] +
                    "&Type=File&Display=Preview&InstanceId=" +
                    i[1] +
                    '&FileDisplayType=Better" /></div>',
                  "</div>",
                ].join("");
              },
            }),
            n(".popover").remove(),
            u.popover("show"))
          : i[2] == "3"
          ? (u.popover({
              trigger: "manual",
              title: null,
              placement: r,
              html: !0,
              content: function () {
                return [
                  '<h2 class="id-instance">' + i[0] + "-" + i[1] + "</h2>",
                  '<div class="poster">',
                  '<img src="../../Media/Image.ashx?Id=' +
                    i[0] +
                    "&Type=Poster&Display=Presentation&InstanceId=" +
                    i[1] +
                    '&FileDisplayType=Better" />',
                  "</div>",
                ].join("");
              },
            }),
            n(".popover").remove(),
            u.popover("show"))
          : (u.popover({
              trigger: "manual",
              placement: r,
              title: null,
              html: !0,
              content: "<h2>" + i[0] + "-" + i[1] + "</h2>",
            }),
            n(".popover").remove(),
            u.popover("show"));
    }
    function s() {
      var i = {
        Id: n(this)[0].id,
      };
      n(".popover").remove(),
        n.ajax({
          url: controller + "AjaxMediaPopup",
          data: i,
          type: "POST",
          success: function (t) {
            t != "" &&
              n("<div></div>")
                .attr("id", "myPopup")
                .appendTo("body")
                .dialog({
                  title: t.title,
                  close: function () {
                    n(this).remove();
                  },
                  modal: !0,
                  height: 680,
                  width: 900,
                  left: 0,
                })
                .load((this.href = t.redirectToUrl));
          },
          error: function (n) {
            alert(n);
          },
        });
    }
    function t(t) {
      var i = {
        IsChecked: document.getElementById(t).checked,
        Name: document.getElementById(t).name,
      };
      n.ajax({
        url: controller + "AjaxCheckbox",
        data: i,
        type: "POST",
        success: function (t) {
          t != "" &&
            (n("#gridcontainer").html(t),
            n(".items").unblock(),
            tb_init("a.thickbox, area.thickbox, input.thickbox"));
        },
        error: function (n) {
          alert(n);
        },
        beforeSend: function () {
          n(".items").block({
            message: "Getting Results..",
            css: {
              border: "3px solid #a00",
              centerY: !1,
            },
          });
        },
      });
    }
    function i(t) {
      t != "cbSelectAll" &&
        document.getElementById("cbSelectAll") != null &&
        document.getElementById("cbSelectAll").checked &&
        (document.getElementById("cbSelectAll").checked = !1);
      var i = {
        IsChecked: document.getElementById(t).checked,
        status: document.getElementById(t).name,
      };
      n.ajax({
        url: controller + "AjaxCheckboxStatus",
        data: i,
        type: "POST",
        success: function (t) {
          t != "" &&
            (n("#gridcontainer").html(t),
            n(".items").unblock(),
            tb_init("a.thickbox, area.thickbox, input.thickbox"));
        },
        error: function (n) {
          alert(n);
        },
        beforeSend: function () {
          n(".items").block({
            message: "Getting Results..",
            css: {
              border: "3px solid #a00",
              centerY: !1,
            },
          });
        },
      });
    }
    function v() {
      var u = [],
        r = [],
        i;
      n("input[name='SelectedMediaGroup[]']:checked").each(function () {
        u.push(n(this)[0].id);
      }),
        n("input[name='roles']:checked").each(function () {
          r.push(n(this)[0].value);
        }),
        (i = {
          selectedMedia: u,
          selectedRoles: r,
        }),
        n.ajax({
          url: controller + "AjaxSaveDashboardItem",
          data: i,
          type: "POST",
          dataType: "json",
          traditional: !0,
          success: function (t) {
            t.isSuccessful
              ? (n("#messageContainer").fadeIn("fast"),
                (document.getElementById("simmessage").innerHTML =
                  "Selected File(s) were saved Successfully"),
                n("#messageContainer").fadeOut(15000))
              : (n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  t.responseText),
                n("#messageErrorContainer").fadeOut(15000)),
              n(".items").unblock(),
              n("#dashboard-roles").modal("hide"),
              n("input[name='roles']:checked").each(function () {
                n(this)[0].checked = !1;
              });
          },
          error: function () {
            n("#messageErrorContainer").fadeIn("fast"),
              (document.getElementById("simerrormessage").innerHTML =
                "Error saving Selected File(s) to Dashboard"),
              n("#messageErrorContainer").fadeOut(15000),
              n(".items").unblock(),
              n("#dashboard-roles").modal("hide"),
              n("input[name='roles']:checked").each(function () {
                n(this)[0].checked = !1;
              });
          },
          beforeSend: function () {
            n(".items").block({
              message: "Saving item(s) to Dashboard...",
              css: {
                border: "3px solid #a00",
                centerY: !1,
              },
            });
          },
        });
    }
    function o(t, i) {
      var u = [],
        r,
        f;
      if (
        (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
          u.push(n(this)[0].id);
        }),
        u.length <= 0)
      ) {
        n("#messageErrorContainer").fadeIn("fast"),
          (document.getElementById("simerrormessage").innerHTML =
            "No files are selected"),
          n("#messageErrorContainer").fadeOut(15000);
        return;
      }
      if (i == -1 && t != "PublishToLibrary") {
        (r = "Consultant"),
          t == "SubmitForFacilitatorApproval" && (r = "Faclilitator"),
          n("#messageErrorContainer").fadeIn("fast"),
          (document.getElementById("simerrormessage").innerHTML =
            "Please select a " + r + " for approval."),
          n("#messageErrorContainer").fadeOut(15000);
        return;
      }
      (f = {
        selectedMedia: u,
        actionType: t,
        selectedUser: i,
      }),
        n.ajax({
          url: controller + "SubmitForApproval",
          data: f,
          type: "POST",
          dataType: "json",
          traditional: !0,
          success: function (t) {
            t != "" &&
              (n("#gridcontainer").html(t),
              n("#messageContainer").fadeIn("fast"),
              (document.getElementById("simmessage").innerHTML =
                "Selected item(s) were submitted for approval"),
              n("#messageContainer").fadeOut(15000));
          },
          error: function (t) {
            n("#messageErrorContainer").fadeIn("fast"),
              (document.getElementById("simerrormessage").innerHTML =
                t != null
                  ? t.responseText
                  : "Error submitting items for approval"),
              n("#messageErrorContainer").fadeOut(15000);
          },
        });
    }
    function f(t) {
      var i = [];
      if (
        (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
          i.push(n(this)[0].id);
        }),
        i.length <= 0)
      ) {
        n("#messageErrorContainer").fadeIn("fast"),
          (document.getElementById("simerrormessage").innerHTML =
            "Error: No file(s) are selected"),
          n("#messageErrorContainer").fadeOut(15000);
        return;
      }
      n(t).modal();
    }
    function c() {
      var i = "/File/LoadAlbums",
        t = "#selectedAlbums";
      n.ajaxSetup({
        cache: !1,
      }),
        n.getJSON(i, function (i) {
          n(t).empty(),
            n.each(i.Albums, function (i, r) {
              n(t).append(
                "<option value='" + r.Value + "'>" + r.Text + "</option>"
              );
            });
        });
    }
    function e(t) {
      return n("<a />", {
        tabindex: "-1",
        href: t.attr("href"),
        text: t.text(),
      });
    }
    var p, l, u;
    n.ajaxSetup({
      cache: !1,
    }),
      (l = n(".section-content .items"));
    n(document).on("mouseenter", ".items .item .thumb-wrap img", a);
    n(document).on("mouseleave", ".items .item .thumb-wrap img", y);
    n(document).on("click", ".items .item .title", h);
    n(function () {
      n("#KeywordsSearchText").keydown(function (t) {
        if (t.keyCode == 13) return n("#KeywordSearch").focus().click(), !1;
      });
    }),
      n("#KeywordSearch").click(function () {
        var t = {
          Keywords: document.getElementById("KeywordsSearchText").value,
        };
        n.ajax({
          url: controller + "AjaxKeywordSearch",
          data: t,
          type: "POST",
          success: function (t) {
            n(".items").unblock(),
              n("#gridcontainer").html(t),
              (t == "" || t == null) &&
                (n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Search result found no records"),
                n("#messageErrorContainer").fadeOut(15000));
          },
          error: function (t) {
            n("#gridcontainer").html(t),
              n("#messageErrorContainer").fadeIn("fast"),
              (document.getElementById("simerrormessage").innerHTML =
                "Search result found no records"),
              n("#messageErrorContainer").fadeOut(15000);
          },
          beforeSend: function () {
            n(".items").block({
              message: "Getting Results..",
              css: {
                border: "3px solid #a00",
                centerY: !1,
              },
            });
          },
        });
      });
    n(document).on("click", ".items .item .thumb-wrap .ModalPopup", s);
    n(document).on("click", "divPopup", s);
    n("#closepopup").live("click", function (t) {
      t.preventDefault(), n("#myPopup").dialog("close"), n(this).remove();
    }),
      n("#MediaSort>li").click(function () {
        var t = {
          SortIndex: n(this).index(),
        };
        n.ajax({
          url: controller + "AjaxMediaSort",
          data: t,
          type: "POST",
          success: function (t) {
            t != "" && (n("#gridcontainer").html(t), n(".items").unblock());
          },
          error: function (n) {
            alert(n);
          },
          beforeSend: function () {
            n(".items").block({
              message: "Getting Results..",
              css: {
                border: "3px solid #a00",
                centerY: !1,
              },
            });
          },
        });
      }),
      n("#cbPhotos").click(function () {
        t("cbPhotos");
      }),
      n("#cbSharedPhotos").click(function () {
        t("cbSharedPhotos");
      }),
      n("#cbSinglePhotos").click(function () {
        t("cbSinglePhotos");
      }),
      n("#cbPresentations").click(function () {
        t("cbPresentations");
      }),
      n("#cbSimtivities").click(function () {
        t("cbSimtivities");
      }),
      n("#cbPosters").click(function () {
        t("cbPosters");
      }),
      n("#cbFacilitatorMaterialOnly").click(function () {
        t("cbFacilitatorMaterialOnly");
      }),
      n("#cbConsultantMaterialOnly").click(function () {
        t("cbConsultantMaterialOnly");
      }),
      n("#cbVideos").click(function () {
        t("cbVideos");
      }),
      n("#cbOther").click(function () {
        t("cbOther");
      }),
      n("#cbIconic").click(function () {
        t("cbIconic");
      }),
      n("#cbTemplates").click(function () {
        t("cbTemplates");
      }),
      n("#cbApproved").click(function () {
        i("cbApproved");
      }),
      n("#cbPending").click(function () {
        i("cbPending");
      }),
      n("#cbNotSubmitted").click(function () {
        i("cbNotSubmitted");
      }),
      n("#cbRejected").click(function () {
        i("cbRejected");
      }),
      n("#cbPublished").click(function () {
        i("cbPublished");
      }),
      n("#cbNotPublished").click(function () {
        i("cbNotPublished");
      }),
      n("#cbSelectAll").click(function () {
        document.getElementById("cbSelectAll").checked
          ? (n("#cbApproved").prop("checked", !0),
            n("#cbPending").prop("checked", !0),
            n("#cbNotSubmitted").prop("checked", !0),
            n("#cbRejected").prop("checked", !0))
          : (n("#cbPending").prop("checked", !1),
            n("#cbNotSubmitted").prop("checked", !1),
            n("#cbRejected").prop("checked", !1)),
          i("cbSelectAll");
      }),
      n("#LanguagesLibrary").click(function () {
        var i = [],
          t;
        n("input[name='LanguageGroup[]']:checked").each(function () {
          i.push(n(this)[0].id);
        }),
          (t = {
            SelectedLanguages: i,
          }),
          n.ajax({
            url: controller + "AjaxLanguages",
            data: t,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" && (n("#gridcontainer").html(t), n(".items").unblock());
            },
            error: function (n) {
              alert(n);
            },
            beforeSend: function () {
              n(".items").block({
                message: "Getting Results..",
                css: {
                  border: "3px solid #a00",
                  centerY: !1,
                },
              });
            },
          });
      }),
      n("#ModulesLibrary").click(function () {
        var i = [],
          t;
        n("input[name='ModuleGroup[]']:checked").each(function () {
          i.push(n(this)[0].id);
        }),
          (t = {
            SelectedModules: i,
          }),
          n.ajax({
            url: controller + "AjaxModules",
            data: t,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" && (n("#gridcontainer").html(t), n(".items").unblock());
            },
            error: function (n) {
              alert(n);
            },
            beforeSend: function () {
              n(".items").block({
                message: "Getting Results..",
                css: {
                  border: "3px solid #a00",
                  centerY: !1,
                },
              });
            },
          });
      }),
      n("#OptionsLibrary").click(function () {
        var i = [],
          t;
        n("input[name='OptionGroup[]']:checked").each(function () {
          i.push(n(this)[0].id);
        }),
          (t = {
            SelectedOptions: i,
          }),
          n.ajax({
            url: controller + "AjaxOptions",
            data: t,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" && (n("#gridcontainer").html(t), n(".items").unblock());
            },
            error: function (n) {
              alert(n);
            },
            beforeSend: function () {
              n(".items").block({
                message: "Getting Results..",
                css: {
                  border: "3px solid #a00",
                  centerY: !1,
                },
              });
            },
          });
      }),
      n("#EnvironmentLibrary").click(function () {
        var i = [],
          t;
        n("input[name='EnvironmentGroup[]']:checked").each(function () {
          i.push(n(this)[0].id);
        }),
          (t = {
            SelectedEnvironments: i,
          }),
          n.ajax({
            url: controller + "AjaxEnvironments",
            data: t,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" && (n("#gridcontainer").html(t), n(".items").unblock());
            },
            error: function (n) {
              alert(n);
            },
            beforeSend: function () {
              n(".items").block({
                message: "Getting Results..",
                css: {
                  border: "3px solid #a00",
                  centerY: !1,
                },
              });
            },
          });
      }),
      n("#SelectedMediaCopy").click(function () {
        var t = [],
          r,
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "Error: No file(s) are selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        (i = {
          SelectedMedia: t,
          ActionType: "Copy",
        }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t.isSuccessful
                ? (n("#messageContainer").fadeIn("fast"),
                  (document.getElementById("simmessage").innerHTML =
                    "Selected File(s) Copied Successfully"),
                  n("#messageContainer").fadeOut(15000))
                : (n("#messageErrorContainer").fadeIn("fast"),
                  (document.getElementById("simerrormessage").innerHTML =
                    t.responseText),
                  n("#messageErrorContainer").fadeOut(15000)),
                n(".items").unblock();
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error Copying Selected File(s)"),
                n("#messageErrorContainer").fadeOut(15000),
                n(".items").unblock();
            },
            beforeSend: function () {
              n(".items").block({
                message: "Copying item(s) to My Files...",
                css: {
                  border: "3px solid #a00",
                  centerY: !1,
                },
              });
            },
          });
      }),
      n("#SelectedMediaAddToKR").click(function () {
        var t = [],
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "Error: No file(s) are selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        location.href = "/AddEditSiteAdmin/AddKRQuestionChoice/?items=" + t;
      }),
      n("#SelectedMediaDashboard").click(function () {
        var t = [],
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "Error: No file(s) are selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        n("#dashboard-roles").modal();
      });
    n(document).on("click", "#dashboard-selected-roles", v);
    n("#SelectedMediaShowAlbum").click(function () {
      var t = [],
        i;
      if (
        (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
          t.push(n(this)[0].id);
        }),
        t.length <= 0)
      ) {
        n("#messageErrorContainer").fadeIn("fast"),
          (document.getElementById("simerrormessage").innerHTML =
            "Error: No file(s) are selected"),
          n("#messageErrorContainer").fadeOut(15000);
        return;
      }
      n("#add-to-album").modal();
    }),
      n("#SelectedMediaPoster").click(function () {
        var t = [],
          r,
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "Error: No file(s) were selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        (i = {
          SelectedMedia: t,
          ActionType: "Poster",
        }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              n(".items").unblock(),
                t.isSuccessful
                  ? (window.location.href = t.redirectToUrl)
                  : (n("#messageErrorContainer").fadeIn("fast"),
                    (document.getElementById("simerrormessage").innerHTML =
                      t.responseText),
                    n("#messageErrorContainer").fadeOut(15000));
            },
            error: function (t) {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  t.responseText),
                n("#messageErrorContainer").fadeOut(15000),
                n(".items").unblock();
            },
            beforeSend: function () {
              n(".items").block({
                message: "Creating Poster from Photo Pair...",
                css: {
                  border: "3px solid #a00",
                  centerY: !1,
                },
              });
            },
          });
      }),
      n("#SelectedMediaPresentation").click(function () {
        var t = [],
          r,
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "No file(s) were selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        (i = {
          SelectedMedia: t,
          ActionType: "Presentation",
        }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" &&
                (n("#gridcontainer").html(t),
                n("#messageContainer").fadeIn("fast"),
                (document.getElementById("simmessage").innerHTML =
                  "Selected File(s) Copied Successfully"),
                n("#messageContainer").fadeOut(15000));
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error Copying Selected File(s)"),
                n("#messageErrorContainer").fadeOut(15000);
            },
          });
      }),
      n("#PublishSelectedPresentation").click(function () {
        var t = [],
          r,
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "No file(s) were selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        (i = {
          SelectedMedia: t,
          ActionType: "Publish",
        }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" &&
                (n("#gridcontainer").html(t),
                n("#messageContainer").fadeIn("fast"),
                (document.getElementById("simmessage").innerHTML =
                  "Selected File(s) Published Successfully"),
                n("#messageContainer").fadeOut(15000));
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error Publishing Selected File(s)"),
                n("#messageErrorContainer").fadeOut(15000);
            },
          });
      }),
      n("#SelectedMediaDelete").click(function () {
        var t = [],
          r,
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "No files are selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        confirm("Are you sure you want to delete the selected file(s)?") &&
          ((i = {
            SelectedMedia: t,
            ActionType: "Delete",
          }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t.responseText
                ? t.isSuccessful
                  ? (n("#gridcontainer").html(t.responseText),
                    n("#messageContainer").fadeIn("fast"),
                    (document.getElementById("simmessage").innerHTML =
                      "Selected File(s) Removed Successfully"),
                    n("#messageContainer").fadeOut(15000))
                  : (n("#messageErrorContainer").fadeIn("fast"),
                    (document.getElementById("simerrormessage").innerHTML =
                      t.responseText),
                    n("#messageErrorContainer").fadeOut(15000))
                : t != ""
                ? (n("#gridcontainer").html(t),
                  n("#messageContainer").fadeIn("fast"),
                  (document.getElementById("simmessage").innerHTML =
                    "Selected File(s) Removed Successfully"),
                  n("#messageContainer").fadeOut(15000))
                : (n("#messageErrorContainer").fadeIn("fast"),
                  (document.getElementById("simerrormessage").innerHTML =
                    "Error while deleting items. Items were not removed."),
                  n("#messageErrorContainer").fadeOut(15000));
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error while deleting items. Items were not removed."),
                n("#messageErrorContainer").fadeOut(15000);
            },
          }));
      }),
      n("#SelectedRemoveFromAlbum").click(function () {
        var t = [],
          u,
          r = n("#CurrentAlbumId").val(),
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "No files are selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        (i = {
          SelectedMedia: t,
          ActionType: "RemoveFromAlbum",
          selectedAlbum: r,
        }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" &&
                (n("#gridcontainer").html(t),
                n("#messageContainer").fadeIn("fast"),
                (document.getElementById("simmessage").innerHTML =
                  "Selected File(s) Removed from Album Successfully"),
                n("#messageContainer").fadeOut(15000));
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error while removing items. Items were not removed."),
                n("#messageErrorContainer").fadeOut(15000);
            },
          });
      }),
      n("#DeleteSelectedDashboardItems").click(function () {
        var t = [],
          r = n("#RoleId").val(),
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length == 0) ||
          !confirm("Are you sure you want to remove these items?")
        )
          return !1;
        (i = {
          selectedMedia: t,
          roleId: r,
        }),
          n.ajax({
            url: "/Admin/DeleteDashboardItems",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (n) {
              n != "" &&
                n.isSuccessful &&
                (location.href =
                  "/Admin/EditDashboard?roleId=" +
                  r +
                  "&displayMessage=DeleteDashboardSuccess");
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error while removing items. Items were not removed."),
                n("#messageErrorContainer").fadeOut(15000);
            },
          });
      }),
      n("#PublishToLibrary").click(function () {
        var t = [],
          r = "PublishToLibrary",
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "No files are selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        (i = {
          selectedMedia: t,
          actionType: r,
        }),
          n.ajax({
            url: controller + "SubmitForApproval",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" &&
                (n("#gridcontainer").html(t),
                n("#messageContainer").fadeIn("fast"),
                (document.getElementById("simmessage").innerHTML =
                  "Selected item(s) were published to the Library"),
                n("#messageContainer").fadeOut(15000));
            },
            error: function (t) {
              if ((n("#messageErrorContainer").fadeIn("fast"), t != null)) {
                var i = JSON.parse(t.responseText);
                document.getElementById("simerrormessage").innerHTML = i.error;
              } else
                document.getElementById("simerrormessage").innerHTML =
                  "Error submitting items for approval";
              n("#messageErrorContainer").fadeOut(15000);
            },
          });
      }),
      n("#SubmitForConsultantApproval").click(function () {
        var t = n("#ConsultantApprovers").val();
        if (t == "" || t <= 0) {
          document.getElementById("consultantError").innerHTML =
            "A Consultant must be selected for approval";
          return;
        }
        o("SubmitForConsultantApproval", t),
          n("#submit-to-consultant").modal("hide");
      }),
      n("#SubmitForFacilitatorApproval").click(function () {
        var t = n("#FacilitatorApprovers").val();
        if (t == "" || t <= 0) {
          document.getElementById("facilitatorError").innerHTML =
            "A Facilitator must be selected for approval";
          return;
        }
        o("SubmitForFacilitatorApproval", t),
          n("#submit-to-facilitator").modal("hide");
      }),
      n("#SelectedMediaAddFavorites").click(function () {
        var t = [],
          r,
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "No files are selected"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        (i = {
          SelectedMedia: t,
          ActionType: "AddToFavorites",
        }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" &&
                (n("#messageContainer").fadeIn("fast"),
                (document.getElementById("simmessage").innerHTML =
                  "Selected File(s) added to Favorites successfully"),
                n("#messageContainer").fadeOut(15000)),
                n(".items").unblock();
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error Copying Selected File(s)"),
                n("#messageErrorContainer").fadeOut(15000),
                n(".items").unblock();
            },
            beforeSend: function () {
              n(".items").block({
                message: "Adding item(s) to Favorites...",
                css: {
                  border: "3px solid #a00",
                  centerY: !1,
                },
              });
            },
          });
      }),
      n("#SelectedMediaRemoveFavorites").click(function () {
        var i = [],
          t;
        n("input[name='SelectedMediaGroup[]']:checked").each(function () {
          i.push(n(this)[0].id);
        }),
          (t = {
            SelectedMedia: i,
            ActionType: "RemoveFromFavorites",
          }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: t,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" &&
                (n("#gridcontainer").html(t),
                n("#messageContainer").fadeIn("fast"),
                (document.getElementById("simmessage").innerHTML =
                  "Selected File(s) removed from Favorites successfully"),
                n("#messageContainer").fadeOut(15000));
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error removing Selected File(s)"),
                n("#messageErrorContainer").fadeOut(15000);
            },
          });
      }),
      n("#SelectedMediaAddAlbum").click(function () {
        var r = [],
          u = [],
          t = n("#selectedAlbums").val(),
          i,
          f;
        Array.isArray(t) ? (u = t) : u.push(t),
          (i = null),
          n("#newAlbum").length && (i = n("#newAlbum").val()),
          n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            r.push(n(this)[0].id);
          }),
          r.length > 0 &&
            ((f = {
              SelectedMedia: r,
              AlbumsSelected: u,
              NewAlbum: i,
            }),
            n.ajax({
              url: controller + "AjaxSelectedAlbum",
              data: f,
              type: "POST",
              dataType: "json",
              traditional: !0,
              success: function (t) {
                n("#add-to-album").modal("hide"),
                  t == null
                    ? (n("#messageErrorContainer").fadeIn("fast"),
                      (document.getElementById("simerrormessage").innerHTML =
                        "An album already exists with that name."),
                      n("#messageErrorContainer").fadeOut(15000))
                    : t != "" &&
                      (n("#gridcontainer").html(t),
                      n("#messageContainer").fadeIn("fast"),
                      (document.getElementById("simmessage").innerHTML =
                        "Selected File(s) added to Album successfully"),
                      n("#messageContainer").fadeOut(15000),
                      n("#newAlbum").val(""),
                      c());
              },
              error: function () {
                n("#add-to-album").modal("hide"),
                  n("#messageErrorContainer").fadeIn("fast"),
                  (document.getElementById("simerrormessage").innerHTML =
                    "Error Adding Selected File(s) to Album"),
                  n("#messageErrorContainer").fadeOut(15000);
              },
            }));
      }),
      n("#SelectedMediaSubmitToFacilitator").click(function () {
        f("#submit-to-facilitator");
      }),
      n("#SelectedMediaSubmitToConsultant").click(function () {
        f("#submit-to-consultant");
      }),
      n("#SelectedAlbumDelete").click(function () {
        var t = [],
          i;
        if (
          (n("input[name='SelectedMediaGroup[]']:checked").each(function () {
            t.push(n(this)[0].id);
          }),
          t.length <= 0)
        ) {
          n("#messageErrorContainer").fadeIn("fast"),
            (document.getElementById("simerrormessage").innerHTML =
              "Albums(s) must be selected for deletion"),
            n("#messageErrorContainer").fadeOut(15000);
          return;
        }
        t.length > 0 &&
          ((i = {
            SelectedMedia: t,
            ActionType: "DeleteAlbum",
          }),
          n.ajax({
            url: controller + "AjaxSelectedMedia",
            data: i,
            type: "POST",
            dataType: "json",
            traditional: !0,
            success: function (t) {
              t != "" && t != "ERROR"
                ? (n("#gridcontainer").html(t),
                  n("#messageContainer").fadeIn("fast"),
                  (document.getElementById("simmessage").innerHTML =
                    "Selected Albums(s) have been deleted successfully"),
                  n("#messageContainer").fadeOut(15000))
                : t == "ERROR" &&
                  (n("#messageErrorContainer").fadeIn("fast"),
                  (document.getElementById("simerrormessage").innerHTML =
                    "Albums(s) must be selected for deletion"),
                  n("#messageErrorContainer").fadeOut(15000));
            },
            error: function () {
              n("#messageErrorContainer").fadeIn("fast"),
                (document.getElementById("simerrormessage").innerHTML =
                  "Error deleting selected Album(s)"),
                n("#messageErrorContainer").fadeOut(15000);
            },
          }));
      }),
      (u = n(".phone-nav ul.dropdown-menu")),
      typeof u != "undefined" &&
        n(".primary-nav > ul.nav > li").each(function () {
          var f = n(this),
            o = n(this).find("a:first"),
            i = n("<li />").appendTo(u),
            t,
            r;
          i.attr("class", f.attr("class")),
            e(o).appendTo(i),
            (t = f.find("ul.sub-nav > li")),
            typeof t != "undefined" &&
              t.length > 0 &&
              (i.addClass("dropdown-submenu"),
              (r = n("<ul />", {
                class: "dropdown-menu",
              })),
              t.each(function () {
                var u = n(this),
                  i = n("<li />").appendTo(r),
                  t;
                i.attr("class", u.attr("class")),
                  (t = u.find("a:first")),
                  e(t).appendTo(i);
              }),
              r.appendTo(i));
        });
    n(document).on("change", ".pagination-dropdown", function () {
      var r = n(this).attr("data-ajax-update"),
        i = n(this).attr("data-ajax-begin"),
        t = n(this).attr("data-ajax-complete");
      window[i](),
        n("#" + r).load(n(this).val(), function () {
          window[t]();
        });
    });
    n(document).on("click", "#get-report-btn", function (t) {
      var i = n("#class-participants-reports-control");
      return i.length > 0
        ? i.find('input[type="checkbox"]:checked').length == 0
          ? (alert(
              "You must select at least one class participant option before proceeding"
            ),
            t.preventDefault(),
            !1)
          : !0
        : !0;
    });
    n("#lnkSelectAll").click(function () {
      n("#myfilescontainer *:checkbox").attr("checked", "checked");
    }),
      n("#lnkNone").click(function () {
        n("#myfilescontainer *:checkbox").removeAttr("checked");
      });
  })(jQuery),
  (_editRedirectWidth = 760),
  $(function () {
    var t = ".active-toggle",
      n;
    $(t).length > 0 &&
      $(t).each(function () {
        filterActiveToggle($(this));
      });
    $(document).on("click", t, function () {
      filterActiveToggle($(this));
    });
    n = "";
    $(document).on("click", ".download-button", function (t) {
      t.preventDefault(),
        $("#download-type-box").modal({
          show: !0,
          backdrop: !0,
          keyboard: !0,
        }),
        (n = $(this).attr("href"));
    });
    $(document).on("click", ".download-media-type", function (t) {
      t.preventDefault();
      var i = $(this).attr("title");
      if (($("#download-type-box").modal("hide"), i == "Cancel")) return !1;
      (n += "&fileDisplayType=" + i), (location.href = n);
    });
    $("nav").on("click", ".home", function (n) {
      n.preventDefault(), (location.href = "/User/Home");
    });
    $("nav").on("click", ".home", function (n) {
      n.preventDefault(), (location.href = "/User/Home");
    });
    $("nav").on("click", ".library", function (n) {
      n.preventDefault(), (location.href = "/library");
    });
    $("nav").on("click", ".class", function (n) {
      n.preventDefault(), (location.href = "/class");
    });
    $("nav .my-files")
      .click(function () {
        location.href = "/file";
      })
      .children()
      .click(function (n) {
        var t = $(n.target);
        return t.is("a") ? !0 : !1;
      });
    $("nav").on("click", ".my-info", function (n) {
      n.preventDefault(), (location.href = "/User");
    });
    $("nav").on("click", ".admin", function (n) {
      n.preventDefault(), (location.href = "/Admin");
    });
    $("nav .siteadmin")
      .click(function () {
        location.href = "/siteadmin/modules";
      })
      .children()
      .click(function (n) {
        n.preventDefault();
        var t = $(n.target);
        return t.is("a") && (location.href = n.target), !1;
      });
    $("nav").on("click", ".refresher", function (n) {
      n.preventDefault(), (location.href = "/KnowledgeRefresher");
    });
    $("nav").on("click", ".reports", function (n) {
      n.preventDefault(), (location.href = "/reports");
    });
    $("nav").on("click", ".support", function (n) {
      n.preventDefault(), window.open("/Admin/Support");
    });
    $(document).on("click", ".downloadPreview-media-type", function (t) {
      t.preventDefault();
      var i = $(this).attr("title");
      if (($("#download-type-box").modal("hide"), i == "Cancel")) return !1;
      if (((n += "&fileDisplayType=" + i), i == "NotApplicable"))
        return window.open(n), !1;
      location.href = n;
    });
  }),
  (function (n, t, i) {
    "use strict";
    function s(n, i, r, u) {
      for (var h = [], e, f, s, v, a, c, o = 0; o < n.length; o++)
        (e = n[o]),
          e
            ? ((f = tinycolor(e)),
              (s =
                f.toHsl().l < 0.5
                  ? "sp-thumb-el sp-thumb-dark"
                  : "sp-thumb-el sp-thumb-light"),
              (s += tinycolor.equals(i, e) ? " sp-thumb-active" : ""),
              (v = f.toString(u.preferredFormat || "rgb")),
              (a = l
                ? "background-color:" + f.toRgbString()
                : "filter:" + f.toFilter()),
              h.push(
                '<span title="' +
                  v +
                  '" data-color="' +
                  f.toRgbString() +
                  '" class="' +
                  s +
                  '"><span class="sp-thumb-inner" style="' +
                  a +
                  ';" /></span>'
              ))
            : ((c = "sp-clear-display"),
              h.push(
                t("<div />")
                  .append(
                    t(
                      '<span data-color="" style="background-color:transparent;" class="' +
                        c +
                        '"></span>'
                    ).attr("title", u.noColorSelectedText)
                  )
                  .html()
              ));
      return "<div class='sp-cf " + r + "'>" + h.join("") + "</div>";
    }
    function b() {
      for (var n = 0; n < r.length; n++) r[n] && r[n].hide();
    }
    function w(n, i) {
      var r = t.extend({}, a, n);
      return (
        (r.callbacks = {
          move: u(r.move, i),
          change: u(r.change, i),
          show: u(r.show, i),
          hide: u(r.hide, i),
          beforeShow: u(r.beforeShow, i),
        }),
        r
      );
    }
    function k(u, e) {
      function hr() {
        var n, i, r;
        if (
          (h.showPaletteOnly && (h.showPalette = !0),
          cr.text(
            h.showPaletteOnly
              ? h.togglePaletteMoreText
              : h.togglePaletteLessText
          ),
          h.palette)
        )
          for (
            yi = h.palette.slice(0),
              ci = t.isArray(yi[0]) ? yi : [yi],
              vi = {},
              n = 0;
            n < ci.length;
            n++
          )
            for (i = 0; i < ci[n].length; i++)
              (r = tinycolor(ci[n][i]).toRgbString()), (vi[r] = !0);
        a.toggleClass("sp-flat", ot),
          a.toggleClass("sp-input-disabled", !h.showInput),
          a.toggleClass("sp-alpha-enabled", h.showAlpha),
          a.toggleClass("sp-clear-enabled", ct),
          a.toggleClass("sp-buttons-disabled", !h.showButtons),
          a.toggleClass("sp-palette-buttons-disabled", !h.togglePaletteOnly),
          a.toggleClass("sp-palette-disabled", !h.showPalette),
          a.toggleClass("sp-palette-only", h.showPaletteOnly),
          a.toggleClass("sp-initial-disabled", !h.showInitial),
          a.addClass(h.className).addClass(h.containerClassName),
          dt();
      }
      function wu() {
        function r(n) {
          return (
            n.data && n.data.ignore
              ? (lt(t(n.target).closest(".sp-thumb-el").data("color")), wt())
              : (lt(t(n.target).closest(".sp-thumb-el").data("color")),
                wt(),
                ht(!0),
                h.hideAfterPaletteSelect && st()),
            !1
          );
        }
        var n, i;
        f && a.find("*:not(input)").attr("unselectable", "on"),
          hr(),
          nr && k.after(yt).hide(),
          ct || lr.hide(),
          ot
            ? k.after(a).hide()
            : ((n = h.appendTo === "parent" ? k.parent() : t(h.appendTo)),
              n.length !== 1 && (n = t("body")),
              n.append(a)),
          ou(),
          ii.bind("click.spectrum touchstart.spectrum", function (n) {
            er || br(),
              n.stopPropagation(),
              t(n.target).is("input") || n.preventDefault();
          }),
          (k.is(":disabled") || h.disabled === !0) && dr(),
          a.click(v),
          ft.change(gi),
          ft.bind("paste", function () {
            setTimeout(gi, 1);
          }),
          ft.keydown(function (n) {
            n.keyCode == 13 && gi();
          }),
          uu.text(h.cancelText),
          uu.bind("click.spectrum", function (n) {
            n.stopPropagation(), n.preventDefault(), wr(), st();
          }),
          lr.attr("title", h.clearText),
          lr.bind("click.spectrum", function (n) {
            n.stopPropagation(),
              n.preventDefault(),
              (ut = !0),
              wt(),
              ot && ht(!0);
          }),
          iu.text(h.chooseText),
          iu.bind("click.spectrum", function (n) {
            n.stopPropagation(), n.preventDefault(), du() && (ht(!0), st());
          }),
          cr.text(
            h.showPaletteOnly
              ? h.togglePaletteMoreText
              : h.togglePaletteLessText
          ),
          cr.bind("click.spectrum", function (n) {
            n.stopPropagation(),
              n.preventDefault(),
              (h.showPaletteOnly = !h.showPaletteOnly),
              h.showPaletteOnly ||
                ot ||
                a.css("left", "-=" + (hu.outerWidth(!0) + 5)),
              hr();
          }),
          o(
            nu,
            function (n, t, i) {
              (tt = n / rr),
                (ut = !1),
                i.shiftKey && (tt = Math.round(tt * 10) / 10),
                wt();
            },
            fr,
            sr
          ),
          o(
            or,
            function (n, t) {
              (oi = parseFloat(t / ki)),
                (ut = !1),
                h.showAlpha || (tt = 1),
                wt();
            },
            fr,
            sr
          ),
          o(
            wi,
            function (n, t, i) {
              var r, u;
              if (i.shiftKey) {
                if (!et) {
                  var f = si * bt,
                    e = rt - ei * rt,
                    o = Math.abs(n - f) > Math.abs(t - e);
                  et = o ? "x" : "y";
                }
              } else et = null;
              (r = !et || et === "x"),
                (u = !et || et === "y"),
                r && (si = parseFloat(n / bt)),
                u && (ei = parseFloat((rt - t) / rt)),
                (ut = !1),
                h.showAlpha || (tt = 1),
                wt();
            },
            fr,
            sr
          ),
          ui ? (lt(ui), pt(), (ni = tr || tinycolor(ui).format), ur(ui)) : pt(),
          ot && ir(),
          (i = f ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum"),
          fu.delegate(".sp-thumb-el", i, r),
          su.delegate(
            ".sp-thumb-el:nth-child(1)",
            i,
            {
              ignore: !0,
            },
            r
          );
      }
      function ou() {
        if (kt && n.localStorage) {
          try {
            var i = n.localStorage[kt].split(",#");
            i.length > 1 &&
              (delete n.localStorage[kt],
              t.each(i, function (n, t) {
                ur(t);
              }));
          } catch (r) {}
          try {
            it = n.localStorage[kt].split(";");
          } catch (r) {}
        }
      }
      function ur(i) {
        if (vu) {
          var r = tinycolor(i).toRgbString();
          if (!vi[r] && t.inArray(r, it) === -1)
            for (it.push(r); it.length > ku; ) it.shift();
          if (kt && n.localStorage)
            try {
              n.localStorage[kt] = it.join(";");
            } catch (u) {}
        }
      }
      function gu() {
        var i = [],
          n,
          t;
        if (h.showPalette)
          for (n = 0; n < it.length; n++)
            (t = tinycolor(it[n]).toRgbString()), vi[t] || i.push(it[n]);
        return i.reverse().slice(0, h.maxSelectionSize);
      }
      function gr() {
        var i = nt(),
          n = t.map(ci, function (n, t) {
            return s(n, i, "sp-palette-row sp-palette-row-" + t, h);
          });
        ou(),
          it &&
            n.push(s(gu(), i, "sp-palette-row sp-palette-row-selection", h)),
          fu.html(n.join(""));
      }
      function ar() {
        if (h.showInitial) {
          var t = gt,
            n = nt();
          su.html(s([t, n], n, "sp-palette-row-initial", h));
        }
      }
      function fr() {
        (rt <= 0 || bt <= 0 || ki <= 0) && dt(),
          a.addClass(ru),
          (et = null),
          k.trigger("dragstart.spectrum", [nt()]);
      }
      function sr() {
        a.removeClass(ru), k.trigger("dragstop.spectrum", [nt()]);
      }
      function gi() {
        var t = ft.val(),
          n;
        (t === null || t === "") && ct
          ? (lt(null), ht(!0))
          : ((n = tinycolor(t)),
            n.isValid() ? (lt(n), ht(!0)) : ft.addClass("sp-validation-error"));
      }
      function br() {
        fi ? st() : ir();
      }
      function ir() {
        var i = t.Event("beforeShow.spectrum");
        if (fi) {
          dt();
          return;
        }
        (k.trigger(i, [nt()]),
        hi.beforeShow(nt()) === !1 || i.isDefaultPrevented()) ||
          (b(),
          (fi = !0),
          t(bi).bind("click.spectrum", kr),
          t(n).bind("resize.spectrum", vr),
          yt.addClass("sp-active"),
          a.removeClass("sp-hidden"),
          dt(),
          pt(),
          (gt = nt()),
          ar(),
          hi.show(gt),
          k.trigger("show.spectrum", [gt]));
      }
      function kr(n) {
        (n && n.type == "click" && n.button == 2) || (pu ? ht(!0) : wr(), st());
      }
      function st() {
        fi &&
          !ot &&
          ((fi = !1),
          t(bi).unbind("click.spectrum", kr),
          t(n).unbind("resize.spectrum", vr),
          yt.removeClass("sp-active"),
          a.addClass("sp-hidden"),
          hi.hide(nt()),
          k.trigger("hide.spectrum", [nt()]));
      }
      function wr() {
        lt(gt, !0);
      }
      function lt(n, t) {
        if (tinycolor.equals(n, nt())) {
          pt();
          return;
        }
        var r, i;
        !n && ct
          ? (ut = !0)
          : ((ut = !1),
            (r = tinycolor(n)),
            (i = r.toHsv()),
            (oi = (i.h % 360) / 360),
            (si = i.s),
            (ei = i.v),
            (tt = i.a)),
          pt(),
          r && r.isValid() && !t && (ni = tr || r.getFormat());
      }
      function nt(n) {
        return ((n = n || {}), ct && ut)
          ? null
          : tinycolor.fromRatio(
              {
                h: oi,
                s: si,
                v: ei,
                a: Math.round(tt * 100) / 100,
              },
              {
                format: n.format || ni,
              }
            );
      }
      function du() {
        return !ft.hasClass("sp-validation-error");
      }
      function wt() {
        pt(), hi.move(nt()), k.trigger("move.spectrum", [nt()]);
      }
      function pt() {
        var s, n, t, o, u, c, e, r, i;
        ft.removeClass("sp-validation-error"),
          yr(),
          (s = tinycolor.fromRatio({
            h: oi,
            s: 1,
            v: 1,
          })),
          wi.css("background-color", s.toHexString()),
          (n = ni),
          tt < 1 &&
            !(tt === 0 && n === "name") &&
            (n === "hex" || n === "hex3" || n === "hex6" || n === "name") &&
            (n = "rgb"),
          (t = nt({
            format: n,
          })),
          (o = ""),
          vt.removeClass("sp-clear-display"),
          vt.css("background-color", "transparent"),
          !t && ct
            ? vt.addClass("sp-clear-display")
            : ((u = t.toHexString()),
              (c = t.toRgbString()),
              l || t.alpha === 1
                ? vt.css("background-color", c)
                : (vt.css("background-color", "transparent"),
                  vt.css("filter", t.toFilter())),
              h.showAlpha &&
                ((e = t.toRgb()),
                (e.a = 0),
                (r = tinycolor(e).toRgbString()),
                (i = "linear-gradient(left, " + r + ", " + u + ")"),
                f
                  ? ti.css(
                      "filter",
                      tinycolor(r).toFilter(
                        {
                          gradientType: 1,
                        },
                        u
                      )
                    )
                  : (ti.css("background", "-webkit-" + i),
                    ti.css("background", "-moz-" + i),
                    ti.css("background", "-ms-" + i),
                    ti.css(
                      "background",
                      "linear-gradient(to right, " + r + ", " + u + ")"
                    ))),
              (o = t.toString(n))),
          h.showInput && ft.val(o),
          h.showPalette && gr(),
          ar();
      }
      function yr() {
        var u = si,
          f = ei,
          t,
          n,
          i,
          r;
        ct && ut
          ? (li.hide(), di.hide(), pi.hide())
          : (li.show(),
            di.show(),
            pi.show(),
            (t = u * bt),
            (n = rt - f * rt),
            (t = Math.max(-at, Math.min(bt - at, t - at))),
            (n = Math.max(-at, Math.min(rt - at, n - at))),
            pi.css({
              top: n + "px",
              left: t + "px",
            }),
            (i = tt * rr),
            li.css({
              left: i - eu / 2 + "px",
            }),
            (r = oi * ki),
            di.css({
              top: r - tu + "px",
            }));
      }
      function ht(n) {
        var t = nt(),
          i = "",
          r = !tinycolor.equals(t, gt);
        t && ((i = t.toString(ni)), ur(t)),
          ai && k.val(i),
          n && r && (hi.change(t), k.trigger("change", [t]));
      }
      function dt() {
        (bt = wi.width()),
          (rt = wi.height()),
          (at = pi.height()),
          (bu = or.width()),
          (ki = or.height()),
          (tu = di.height()),
          (rr = nu.width()),
          (eu = li.width()),
          ot || (a.css("position", "absolute"), a.offset(g(a, ii))),
          yr(),
          h.showPalette && gr(),
          k.trigger("reflow.spectrum");
      }
      function lu() {
        k.show(),
          ii.unbind("click.spectrum touchstart.spectrum"),
          a.remove(),
          yt.remove(),
          (r[ri.id] = null);
      }
      function cu(n, r) {
        if (n === i) return t.extend({}, h);
        if (r === i) return h[n];
        (h[n] = r), hr();
      }
      function au() {
        (er = !1), k.attr("disabled", !1), ii.removeClass("sp-disabled");
      }
      function dr() {
        st(), (er = !0), k.attr("disabled", !0), ii.addClass("sp-disabled");
      }
      var h = w(e, u),
        ot = h.flat,
        vu = h.showSelectionPalette,
        kt = h.localStorageKey,
        pr = h.theme,
        hi = h.callbacks,
        vr = p(dt, 10),
        fi = !1,
        bt = 0,
        rt = 0,
        at = 0,
        ki = 0,
        bu = 0,
        rr = 0,
        eu = 0,
        tu = 0,
        oi = 0,
        si = 0,
        ei = 0,
        tt = 1,
        yi = [],
        ci = [],
        vi = {},
        it = h.selectionPalette.slice(0),
        ku = h.maxSelectionSize,
        ru = "sp-dragging",
        et = null,
        bi = u.ownerDocument,
        nf = bi.body,
        k = t(u),
        er = !1,
        a = t(y, bi).addClass(pr),
        hu = a.find(".sp-picker-container"),
        wi = a.find(".sp-color"),
        pi = a.find(".sp-dragger"),
        or = a.find(".sp-hue"),
        di = a.find(".sp-slider"),
        ti = a.find(".sp-alpha-inner"),
        nu = a.find(".sp-alpha"),
        li = a.find(".sp-alpha-handle"),
        ft = a.find(".sp-input"),
        fu = a.find(".sp-palette"),
        su = a.find(".sp-initial"),
        uu = a.find(".sp-cancel"),
        lr = a.find(".sp-clear"),
        iu = a.find(".sp-choose"),
        cr = a.find(".sp-palette-toggle"),
        ai = k.is("input"),
        yu = ai && c && k.attr("type") === "color",
        nr = ai && !ot,
        yt = nr
          ? t(d)
              .addClass(pr)
              .addClass(h.className)
              .addClass(h.replacerClassName)
          : t([]),
        ii = nr ? yt : k,
        vt = yt.find(".sp-preview-inner"),
        ui = h.color || (ai && k.val()),
        gt = !1,
        tr = h.preferredFormat,
        ni = tr,
        pu = !h.showButtons || h.clickoutFiresChange,
        ut = !ui,
        ct = h.allowEmpty && !yu,
        ri;
      return (
        wu(),
        (ri = {
          show: ir,
          hide: st,
          toggle: br,
          reflow: dt,
          option: cu,
          enable: au,
          disable: dr,
          set: function (n) {
            lt(n), ht();
          },
          get: nt,
          destroy: lu,
          container: a,
        }),
        (ri.id = r.push(ri) - 1),
        ri
      );
    }
    function g(n, i) {
      var c = 0,
        e = n.outerWidth(),
        o = n.outerHeight(),
        s = i.outerHeight(),
        u = n[0].ownerDocument,
        l = u.documentElement,
        f = l.clientWidth + t(u).scrollLeft(),
        h = l.clientHeight + t(u).scrollTop(),
        r = i.offset();
      return (
        (r.top += s),
        (r.left -= Math.min(
          r.left,
          r.left + e > f && f > e ? Math.abs(r.left + e - f) : 0
        )),
        (r.top -= Math.min(
          r.top,
          r.top + o > h && h > o ? Math.abs(o + s - c) : c
        )),
        r
      );
    }
    function e() {}
    function v(n) {
      n.stopPropagation();
    }
    function u(n, t) {
      var i = Array.prototype.slice,
        r = i.call(arguments, 2);
      return function () {
        return n.apply(t, r.concat(i.call(arguments)));
      };
    }
    function o(i, r, u, e) {
      function c(n) {
        n.stopPropagation && n.stopPropagation(),
          n.preventDefault && n.preventDefault(),
          (n.returnValue = !1);
      }
      function v(n) {
        if (s) {
          if (f && h.documentMode < 9 && !n.button) return a();
          var t = n.originalEvent.touches,
            o = t ? t[0].pageX : n.pageX,
            v = t ? t[0].pageY : n.pageY,
            u = Math.max(0, Math.min(o - l.left, p)),
            e = Math.max(0, Math.min(v - l.top, y));
          w && c(n), r.apply(i, [u, e, n]);
        }
      }
      function b(n) {
        var r = n.which ? n.which == 3 : n.button == 2;
        r ||
          s ||
          (u.apply(i, arguments) !== !1 &&
            ((s = !0),
            (y = t(i).height()),
            (p = t(i).width()),
            (l = t(i).offset()),
            t(h).bind(o),
            t(h.body).addClass("sp-dragging"),
            w || v(n),
            c(n)));
      }
      function a() {
        s &&
          (t(h).unbind(o),
          t(h.body).removeClass("sp-dragging"),
          e.apply(i, arguments)),
          (s = !1);
      }
      (r = r || function () {}),
        (u = u || function () {}),
        (e = e || function () {});
      var h = document,
        s = !1,
        l = {},
        y = 0,
        p = 0,
        w = "ontouchstart" in n,
        o = {};
      (o.selectstart = c),
        (o.dragstart = c),
        (o["touchmove mousemove"] = v),
        (o["touchend mouseup"] = a),
        t(i).bind("touchstart mousedown", b);
    }
    function p(n, t, i) {
      var r;
      return function () {
        var e = this,
          f = arguments,
          u = function () {
            (r = null), n.apply(e, f);
          };
        i && clearTimeout(r), (i || !r) && (r = setTimeout(u, t));
      };
    }
    var a = {
        beforeShow: e,
        move: e,
        change: e,
        show: e,
        hide: e,
        color: !1,
        flat: !1,
        showInput: !1,
        allowEmpty: !1,
        showButtons: !0,
        clickoutFiresChange: !1,
        showInitial: !1,
        showPalette: !1,
        showPaletteOnly: !1,
        hideAfterPaletteSelect: !1,
        togglePaletteOnly: !1,
        showSelectionPalette: !0,
        localStorageKey: !1,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: !1,
        className: "",
        containerClassName: "",
        replacerClassName: "",
        showAlpha: !1,
        theme: "sp-light",
        palette: [
          [
            "#ffffff",
            "#000000",
            "#ff0000",
            "#ff8000",
            "#ffff00",
            "#008000",
            "#0000ff",
            "#4b0082",
            "#9400d3",
          ],
        ],
        selectionPalette: [],
        disabled: !1,
      },
      r = [],
      f = !!/msie/i.exec(n.navigator.userAgent),
      l = (function () {
        function t(n, t) {
          return !!~("" + n).indexOf(t);
        }
        var i = document.createElement("div"),
          n = i.style;
        return (
          (n.cssText = "background-color:rgba(0,0,0,.5)"),
          t(n.backgroundColor, "rgba") || t(n.backgroundColor, "hsla")
        );
      })(),
      c = (function () {
        var n = t("<input type='color' value='!' />")[0];
        return n.type === "color" && n.value !== "!";
      })(),
      d = [
        "<div class='sp-replacer'>",
        "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
        "<div class='sp-dd'>&#9660;</div>",
        "</div>",
      ].join(""),
      y = (function () {
        var t = "",
          n;
        if (f) for (n = 1; n <= 6; n++) t += "<div class='sp-" + n + "'></div>";
        return [
          "<div class='sp-container sp-hidden'>",
          "<div class='sp-palette-container'>",
          "<div class='sp-palette sp-thumb sp-cf'></div>",
          "<div class='sp-palette-button-container sp-cf'>",
          "<button type='button' class='sp-palette-toggle'></button>",
          "</div>",
          "</div>",
          "<div class='sp-picker-container'>",
          "<div class='sp-top sp-cf'>",
          "<div class='sp-fill'></div>",
          "<div class='sp-top-inner'>",
          "<div class='sp-color'>",
          "<div class='sp-sat'>",
          "<div class='sp-val'>",
          "<div class='sp-dragger'></div>",
          "</div>",
          "</div>",
          "</div>",
          "<div class='sp-clear sp-clear-display'>",
          "</div>",
          "<div class='sp-hue'>",
          "<div class='sp-slider'></div>",
          t,
          "</div>",
          "</div>",
          "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
          "</div>",
          "<div class='sp-input-container sp-cf'>",
          "<input class='sp-input' type='text' spellcheck='false'  />",
          "</div>",
          "<div class='sp-initial sp-thumb sp-cf'></div>",
          "<div class='sp-button-container sp-cf'>",
          "<a class='sp-cancel' href='#'></a>",
          "<button type='button' class='sp-choose'></button>",
          "</div>",
          "</div>",
          "</div>",
        ].join("");
      })(),
      h = "spectrum.id";
    (t.fn.spectrum = function (n) {
      if (typeof n == "string") {
        var u = this,
          f = Array.prototype.slice.call(arguments, 1);
        return (
          this.each(function () {
            var i = r[t(this).data(h)],
              e;
            if (i) {
              if (((e = i[n]), !e))
                throw new Error("Spectrum: no such method: '" + n + "'");
              n == "get"
                ? (u = i.get())
                : n == "container"
                ? (u = i.container)
                : n == "option"
                ? (u = i.option.apply(i, f))
                : n == "destroy"
                ? (i.destroy(), t(this).removeData(h))
                : e.apply(i, f);
            }
          }),
          u
        );
      }
      return this.spectrum("destroy").each(function () {
        var r = t.extend({}, n, t(this).data()),
          i = k(this, r);
        t(this).data(h, i.id);
      });
    }),
      (t.fn.spectrum.load = !0),
      (t.fn.spectrum.loadOpts = {}),
      (t.fn.spectrum.draggable = o),
      (t.fn.spectrum.defaults = a),
      (t.spectrum = {}),
      (t.spectrum.localization = {}),
      (t.spectrum.palettes = {}),
      (t.fn.spectrum.processNativeColorInputs = function () {
        c ||
          t("input[type=color]").spectrum({
            preferredFormat: "hex6",
          });
      }),
      (function () {
        function yt(n) {
          var t = {
              r: 0,
              g: 0,
              b: 0,
            },
            f = 1,
            r = !1,
            i = !1;
          return (
            typeof n == "string" && (n = ut(n)),
            typeof n == "object" &&
              (n.hasOwnProperty("r") &&
              n.hasOwnProperty("g") &&
              n.hasOwnProperty("b")
                ? ((t = ht(n.r, n.g, n.b)),
                  (r = !0),
                  (i = String(n.r).substr(-1) === "%" ? "prgb" : "rgb"))
                : n.hasOwnProperty("h") &&
                  n.hasOwnProperty("s") &&
                  n.hasOwnProperty("v")
                ? ((n.s = c(n.s)),
                  (n.v = c(n.v)),
                  (t = lt(n.h, n.s, n.v)),
                  (r = !0),
                  (i = "hsv"))
                : n.hasOwnProperty("h") &&
                  n.hasOwnProperty("s") &&
                  n.hasOwnProperty("l") &&
                  ((n.s = c(n.s)),
                  (n.l = c(n.l)),
                  (t = st(n.h, n.s, n.l)),
                  (r = !0),
                  (i = "hsl")),
              n.hasOwnProperty("a") && (f = n.a)),
            (f = p(f)),
            {
              ok: r,
              format: n.format || i,
              r: e(255, u(t.r, 0)),
              g: e(255, u(t.g, 0)),
              b: e(255, u(t.b, 0)),
              a: f,
            }
          );
        }
        function ht(n, t, i) {
          return {
            r: r(n, 255) * 255,
            g: r(t, 255) * 255,
            b: r(i, 255) * 255,
          };
        }
        function b(n, t, i) {
          var o;
          (n = r(n, 255)), (t = r(t, 255)), (i = r(i, 255));
          var s = u(n, t, i),
            h = e(n, t, i),
            f,
            c,
            l = (s + h) / 2;
          if (s == h) f = c = 0;
          else {
            (o = s - h), (c = l > 0.5 ? o / (2 - s - h) : o / (s + h));
            switch (s) {
              case n:
                f = (t - i) / o + (t < i ? 6 : 0);
                break;
              case t:
                f = (i - n) / o + 2;
                break;
              case i:
                f = (n - t) / o + 4;
            }
            f /= 6;
          }
          return {
            h: f,
            s: c,
            l: l,
          };
        }
        function st(n, t, i) {
          function h(n, t, i) {
            return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
              ? n + (t - n) * 6 * i
              : i < 1 / 2
              ? t
              : i < 2 / 3
              ? n + (t - n) * (2 / 3 - i) * 6
              : n;
          }
          var e, o, s, u, f;
          return (
            (n = r(n, 360)),
            (t = r(t, 100)),
            (i = r(i, 100)),
            t === 0
              ? (e = o = s = i)
              : ((u = i < 0.5 ? i * (1 + t) : i + t - i * t),
                (f = 2 * i - u),
                (e = h(f, u, n + 1 / 3)),
                (o = h(f, u, n)),
                (s = h(f, u, n - 1 / 3))),
            {
              r: e * 255,
              g: o * 255,
              b: s * 255,
            }
          );
        }
        function k(n, t, i) {
          (n = r(n, 255)), (t = r(t, 255)), (i = r(i, 255));
          var o = u(n, t, i),
            h = e(n, t, i),
            f,
            c,
            l = o,
            s = o - h;
          if (((c = o === 0 ? 0 : s / o), o == h)) f = 0;
          else {
            switch (o) {
              case n:
                f = (t - i) / s + (t < i ? 6 : 0);
                break;
              case t:
                f = (i - n) / s + 2;
                break;
              case i:
                f = (n - t) / s + 4;
            }
            f /= 6;
          }
          return {
            h: f,
            s: c,
            v: l,
          };
        }
        function lt(n, t, i) {
          (n = r(n, 360) * 6), (t = r(t, 100)), (i = r(i, 100));
          var c = h.floor(n),
            s = n - c,
            u = i * (1 - t),
            f = i * (1 - s * t),
            o = i * (1 - (1 - s) * t),
            e = c % 6,
            v = [i, f, u, u, o, i][e],
            a = [o, i, i, f, u, u][e],
            l = [u, u, o, i, i, f][e];
          return {
            r: v * 255,
            g: a * 255,
            b: l * 255,
          };
        }
        function w(n, t, r, u) {
          var f = [
            s(i(n).toString(16)),
            s(i(t).toString(16)),
            s(i(r).toString(16)),
          ];
          return u &&
            f[0].charAt(0) == f[0].charAt(1) &&
            f[1].charAt(0) == f[1].charAt(1) &&
            f[2].charAt(0) == f[2].charAt(1)
            ? f[0].charAt(0) + f[1].charAt(0) + f[2].charAt(0)
            : f.join("");
        }
        function y(n, t, r, u) {
          var f = [
            s(it(u)),
            s(i(n).toString(16)),
            s(i(t).toString(16)),
            s(i(r).toString(16)),
          ];
          return f.join("");
        }
        function ct(n, i) {
          i = i === 0 ? 0 : i || 10;
          var r = t(n).toHsl();
          return (r.s -= i / 100), (r.s = a(r.s)), t(r);
        }
        function wt(n, i) {
          i = i === 0 ? 0 : i || 10;
          var r = t(n).toHsl();
          return (r.s += i / 100), (r.s = a(r.s)), t(r);
        }
        function ti(n) {
          return t(n).desaturate(100);
        }
        function ni(n, i) {
          i = i === 0 ? 0 : i || 10;
          var r = t(n).toHsl();
          return (r.l += i / 100), (r.l = a(r.l)), t(r);
        }
        function ri(n, r) {
          r = r === 0 ? 0 : r || 10;
          var f = t(n).toRgb();
          return (
            (f.r = u(0, e(255, f.r - i(255 * -(r / 100))))),
            (f.g = u(0, e(255, f.g - i(255 * -(r / 100))))),
            (f.b = u(0, e(255, f.b - i(255 * -(r / 100))))),
            t(f)
          );
        }
        function ii(n, i) {
          i = i === 0 ? 0 : i || 10;
          var r = t(n).toHsl();
          return (r.l -= i / 100), (r.l = a(r.l)), t(r);
        }
        function kt(n, r) {
          var f = t(n).toHsl(),
            u = (i(f.h) + r) % 360;
          return (f.h = u < 0 ? 360 + u : u), t(f);
        }
        function bt(n) {
          var i = t(n).toHsl();
          return (i.h = (i.h + 180) % 360), t(i);
        }
        function gt(n) {
          var i = t(n).toHsl(),
            r = i.h;
          return [
            t(n),
            t({
              h: (r + 120) % 360,
              s: i.s,
              l: i.l,
            }),
            t({
              h: (r + 240) % 360,
              s: i.s,
              l: i.l,
            }),
          ];
        }
        function dt(n) {
          var i = t(n).toHsl(),
            r = i.h;
          return [
            t(n),
            t({
              h: (r + 90) % 360,
              s: i.s,
              l: i.l,
            }),
            t({
              h: (r + 180) % 360,
              s: i.s,
              l: i.l,
            }),
            t({
              h: (r + 270) % 360,
              s: i.s,
              l: i.l,
            }),
          ];
        }
        function ot(n) {
          var i = t(n).toHsl(),
            r = i.h;
          return [
            t(n),
            t({
              h: (r + 72) % 360,
              s: i.s,
              l: i.l,
            }),
            t({
              h: (r + 216) % 360,
              s: i.s,
              l: i.l,
            }),
          ];
        }
        function g(n, i, r) {
          (i = i || 6), (r = r || 30);
          var u = t(n).toHsl(),
            e = 360 / r,
            f = [t(n)];
          for (u.h = (u.h - ((e * i) >> 1) + 720) % 360; --i; )
            (u.h = (u.h + e) % 360), f.push(t(u));
          return f;
        }
        function nt(n, i) {
          i = i || 6;
          for (
            var u = t(n).toHsv(), o = u.h, s = u.s, r = u.v, f = [], e = 1 / i;
            i--;

          )
            f.push(
              t({
                h: o,
                s: s,
                v: r,
              })
            ),
              (r = (r + e) % 1);
          return f;
        }
        function tt(n) {
          var i = {},
            t;
          for (t in n) n.hasOwnProperty(t) && (i[n[t]] = t);
          return i;
        }
        function p(n) {
          return (
            (n = parseFloat(n)), (isNaN(n) || n < 0 || n > 1) && (n = 1), n
          );
        }
        function r(n, t) {
          ft(n) && (n = "100%");
          var i = et(n);
          return ((n = e(t, u(0, parseFloat(n)))),
          i && (n = parseInt(n * t, 10) / 100),
          h.abs(n - t) < 0.000001)
            ? 1
            : (n % t) / parseFloat(t);
        }
        function a(n) {
          return e(1, u(0, n));
        }
        function f(n) {
          return parseInt(n, 16);
        }
        function ft(n) {
          return (
            typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1
          );
        }
        function et(n) {
          return typeof n == "string" && n.indexOf("%") != -1;
        }
        function s(n) {
          return n.length == 1 ? "0" + n : "" + n;
        }
        function c(n) {
          return n <= 1 && (n = n * 100 + "%"), n;
        }
        function it(n) {
          return Math.round(parseFloat(n) * 255).toString(16);
        }
        function rt(n) {
          return f(n) / 255;
        }
        function ut(n) {
          var i, t;
          if (
            ((n = n.replace(vt, "").replace(at, "").toLowerCase()),
            (i = !1),
            l[n])
          )
            (n = l[n]), (i = !0);
          else if (n == "transparent")
            return {
              r: 0,
              g: 0,
              b: 0,
              a: 0,
              format: "name",
            };
          return (t = o.rgb.exec(n))
            ? {
                r: t[1],
                g: t[2],
                b: t[3],
              }
            : (t = o.rgba.exec(n))
            ? {
                r: t[1],
                g: t[2],
                b: t[3],
                a: t[4],
              }
            : (t = o.hsl.exec(n))
            ? {
                h: t[1],
                s: t[2],
                l: t[3],
              }
            : (t = o.hsla.exec(n))
            ? {
                h: t[1],
                s: t[2],
                l: t[3],
                a: t[4],
              }
            : (t = o.hsv.exec(n))
            ? {
                h: t[1],
                s: t[2],
                v: t[3],
              }
            : (t = o.hex8.exec(n))
            ? {
                a: rt(t[1]),
                r: f(t[2]),
                g: f(t[3]),
                b: f(t[4]),
                format: i ? "name" : "hex8",
              }
            : (t = o.hex6.exec(n))
            ? {
                r: f(t[1]),
                g: f(t[2]),
                b: f(t[3]),
                format: i ? "name" : "hex",
              }
            : (t = o.hex3.exec(n))
            ? {
                r: f(t[1] + "" + t[1]),
                g: f(t[2] + "" + t[2]),
                b: f(t[3] + "" + t[3]),
                format: i ? "name" : "hex",
              }
            : !1;
        }
        var vt = /^[\s,#]+/,
          at = /\s+$/,
          pt = 0,
          h = Math,
          i = h.round,
          e = h.min,
          u = h.max,
          v = h.random,
          t = function u(n, t) {
            if (((n = n ? n : ""), (t = t || {}), n instanceof u)) return n;
            if (!(this instanceof u)) return new u(n, t);
            var r = yt(n);
            (this._r = r.r),
              (this._g = r.g),
              (this._b = r.b),
              (this._a = r.a),
              (this._roundA = i(100 * this._a) / 100),
              (this._format = t.format || r.format),
              (this._gradientType = t.gradientType),
              this._r < 1 && (this._r = i(this._r)),
              this._g < 1 && (this._g = i(this._g)),
              this._b < 1 && (this._b = i(this._b)),
              (this._ok = r.ok),
              (this._tc_id = pt++);
          },
          l,
          d,
          o;
        (t.prototype = {
          isDark: function () {
            return this.getBrightness() < 128;
          },
          isLight: function () {
            return !this.isDark();
          },
          isValid: function () {
            return this._ok;
          },
          getFormat: function () {
            return this._format;
          },
          getAlpha: function () {
            return this._a;
          },
          getBrightness: function () {
            var n = this.toRgb();
            return (n.r * 299 + n.g * 587 + n.b * 114) / 1000;
          },
          setAlpha: function (n) {
            return (
              (this._a = p(n)), (this._roundA = i(100 * this._a) / 100), this
            );
          },
          toHsv: function () {
            var n = k(this._r, this._g, this._b);
            return {
              h: n.h * 360,
              s: n.s,
              v: n.v,
              a: this._a,
            };
          },
          toHsvString: function () {
            var n = k(this._r, this._g, this._b),
              u = i(n.h * 360),
              r = i(n.s * 100),
              t = i(n.v * 100);
            return this._a == 1
              ? "hsv(" + u + ", " + r + "%, " + t + "%)"
              : "hsva(" + u + ", " + r + "%, " + t + "%, " + this._roundA + ")";
          },
          toHsl: function () {
            var n = b(this._r, this._g, this._b);
            return {
              h: n.h * 360,
              s: n.s,
              l: n.l,
              a: this._a,
            };
          },
          toHslString: function () {
            var n = b(this._r, this._g, this._b),
              u = i(n.h * 360),
              r = i(n.s * 100),
              t = i(n.l * 100);
            return this._a == 1
              ? "hsl(" + u + ", " + r + "%, " + t + "%)"
              : "hsla(" + u + ", " + r + "%, " + t + "%, " + this._roundA + ")";
          },
          toHex: function (n) {
            return w(this._r, this._g, this._b, n);
          },
          toHexString: function (n) {
            return "#" + this.toHex(n);
          },
          toHex8: function () {
            return y(this._r, this._g, this._b, this._a);
          },
          toHex8String: function () {
            return "#" + this.toHex8();
          },
          toRgb: function () {
            return {
              r: i(this._r),
              g: i(this._g),
              b: i(this._b),
              a: this._a,
            };
          },
          toRgbString: function () {
            return this._a == 1
              ? "rgb(" +
                  i(this._r) +
                  ", " +
                  i(this._g) +
                  ", " +
                  i(this._b) +
                  ")"
              : "rgba(" +
                  i(this._r) +
                  ", " +
                  i(this._g) +
                  ", " +
                  i(this._b) +
                  ", " +
                  this._roundA +
                  ")";
          },
          toPercentageRgb: function () {
            return {
              r: i(r(this._r, 255) * 100) + "%",
              g: i(r(this._g, 255) * 100) + "%",
              b: i(r(this._b, 255) * 100) + "%",
              a: this._a,
            };
          },
          toPercentageRgbString: function () {
            return this._a == 1
              ? "rgb(" +
                  i(r(this._r, 255) * 100) +
                  "%, " +
                  i(r(this._g, 255) * 100) +
                  "%, " +
                  i(r(this._b, 255) * 100) +
                  "%)"
              : "rgba(" +
                  i(r(this._r, 255) * 100) +
                  "%, " +
                  i(r(this._g, 255) * 100) +
                  "%, " +
                  i(r(this._b, 255) * 100) +
                  "%, " +
                  this._roundA +
                  ")";
          },
          toName: function () {
            return this._a === 0
              ? "transparent"
              : this._a < 1
              ? !1
              : d[w(this._r, this._g, this._b, !0)] || !1;
          },
          toFilter: function (n) {
            var u = "#" + y(this._r, this._g, this._b, this._a),
              r = u,
              f = this._gradientType ? "GradientType = 1, " : "",
              i;
            return (
              n && ((i = t(n)), (r = i.toHex8String())),
              "progid:DXImageTransform.Microsoft.gradient(" +
                f +
                "startColorstr=" +
                u +
                ",endColorstr=" +
                r +
                ")"
            );
          },
          toString: function (n) {
            var u = !!n;
            n = n || this._format;
            var t = !1,
              r = this._a < 1 && this._a >= 0,
              i =
                !u &&
                r &&
                (n === "hex" || n === "hex6" || n === "hex3" || n === "name");
            return i
              ? n === "name" && this._a === 0
                ? this.toName()
                : this.toRgbString()
              : (n === "rgb" && (t = this.toRgbString()),
                n === "prgb" && (t = this.toPercentageRgbString()),
                (n === "hex" || n === "hex6") && (t = this.toHexString()),
                n === "hex3" && (t = this.toHexString(!0)),
                n === "hex8" && (t = this.toHex8String()),
                n === "name" && (t = this.toName()),
                n === "hsl" && (t = this.toHslString()),
                n === "hsv" && (t = this.toHsvString()),
                t || this.toHexString());
          },
          _applyModification: function (n, t) {
            var i = n.apply(null, [this].concat([].slice.call(t)));
            return (
              (this._r = i._r),
              (this._g = i._g),
              (this._b = i._b),
              this.setAlpha(i._a),
              this
            );
          },
          lighten: function () {
            return this._applyModification(ni, arguments);
          },
          brighten: function () {
            return this._applyModification(ri, arguments);
          },
          darken: function () {
            return this._applyModification(ii, arguments);
          },
          desaturate: function () {
            return this._applyModification(ct, arguments);
          },
          saturate: function () {
            return this._applyModification(wt, arguments);
          },
          greyscale: function () {
            return this._applyModification(ti, arguments);
          },
          spin: function () {
            return this._applyModification(kt, arguments);
          },
          _applyCombination: function (n, t) {
            return n.apply(null, [this].concat([].slice.call(t)));
          },
          analogous: function () {
            return this._applyCombination(g, arguments);
          },
          complement: function () {
            return this._applyCombination(bt, arguments);
          },
          monochromatic: function () {
            return this._applyCombination(nt, arguments);
          },
          splitcomplement: function () {
            return this._applyCombination(ot, arguments);
          },
          triad: function () {
            return this._applyCombination(gt, arguments);
          },
          tetrad: function () {
            return this._applyCombination(dt, arguments);
          },
        }),
          (t.fromRatio = function (n, i) {
            var u, r;
            if (typeof n == "object") {
              u = {};
              for (r in n)
                n.hasOwnProperty(r) && (u[r] = r === "a" ? n[r] : c(n[r]));
              n = u;
            }
            return t(n, i);
          }),
          (t.equals = function (n, i) {
            return !n || !i ? !1 : t(n).toRgbString() == t(i).toRgbString();
          }),
          (t.random = function () {
            return t.fromRatio({
              r: v(),
              g: v(),
              b: v(),
            });
          }),
          (t.mix = function (n, i, r) {
            var o, l;
            r = r === 0 ? 0 : r || 50;
            var f = t(n).toRgb(),
              e = t(i).toRgb(),
              h = r / 100,
              s = h * 2 - 1,
              c = e.a - f.a,
              u;
            return (
              (u = s * c == -1 ? s : (s + c) / (1 + s * c)),
              (u = (u + 1) / 2),
              (o = 1 - u),
              (l = {
                r: e.r * u + f.r * o,
                g: e.g * u + f.g * o,
                b: e.b * u + f.b * o,
                a: e.a * h + f.a * (1 - h),
              }),
              t(l)
            );
          }),
          (t.readability = function (n, i) {
            var f = t(n),
              e = t(i),
              r = f.toRgb(),
              u = e.toRgb(),
              h = f.getBrightness(),
              s = e.getBrightness(),
              o =
                Math.max(r.r, u.r) -
                Math.min(r.r, u.r) +
                Math.max(r.g, u.g) -
                Math.min(r.g, u.g) +
                Math.max(r.b, u.b) -
                Math.min(r.b, u.b);
            return {
              brightness: Math.abs(h - s),
              color: o,
            };
          }),
          (t.isReadable = function (n, i) {
            var r = t.readability(n, i);
            return r.brightness > 125 && r.color > 500;
          }),
          (t.mostReadable = function (n, i) {
            for (var h = null, s = 0, e = !1, r = 0; r < i.length; r++) {
              var f = t.readability(n, i[r]),
                u = f.brightness > 125 && f.color > 500,
                o = 3 * (f.brightness / 125) + f.color / 500;
              ((u && !e) || (u && e && o > s) || (!u && !e && o > s)) &&
                ((e = u), (s = o), (h = t(i[r])));
            }
            return h;
          }),
          (l = t.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32",
          }),
          (d = t.hexNames = tt(l)),
          (o = (function () {
            var r = "[-\\+]?\\d+%?",
              u = "[-\\+]?\\d*\\.\\d+%?",
              n = "(?:" + u + ")|(?:" + r + ")",
              t =
                "[\\s|\\(]+(" +
                n +
                ")[,|\\s]+(" +
                n +
                ")[,|\\s]+(" +
                n +
                ")\\s*\\)?",
              i =
                "[\\s|\\(]+(" +
                n +
                ")[,|\\s]+(" +
                n +
                ")[,|\\s]+(" +
                n +
                ")[,|\\s]+(" +
                n +
                ")\\s*\\)?";
            return {
              rgb: new RegExp("rgb" + t),
              rgba: new RegExp("rgba" + i),
              hsl: new RegExp("hsl" + t),
              hsla: new RegExp("hsla" + i),
              hsv: new RegExp("hsv" + t),
              hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
              hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
              hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            };
          })()),
          (n.tinycolor = t);
      })(),
      t(function () {
        t.fn.spectrum.load && t.fn.spectrum.processNativeColorInputs();
      });
  })(window, jQuery),
  (function () {
    "use strict";
    function n(n) {
      function l(s, c) {
        var st,
          ht,
          p = s == window,
          l = c && c.message !== undefined ? c.message : undefined,
          nt,
          d,
          k,
          tt,
          g,
          w,
          b,
          it,
          ct,
          at,
          et;
        if (
          ((c = n.extend({}, n.blockUI.defaults, c || {})),
          !c.ignoreIfBlocked || !n(s).data("blockUI.isBlocked"))
        ) {
          if (
            ((c.overlayCSS = n.extend(
              {},
              n.blockUI.defaults.overlayCSS,
              c.overlayCSS || {}
            )),
            (st = n.extend({}, n.blockUI.defaults.css, c.css || {})),
            c.onOverlayClick && (c.overlayCSS.cursor = "pointer"),
            (ht = n.extend(
              {},
              n.blockUI.defaults.themedCSS,
              c.themedCSS || {}
            )),
            (l = l === undefined ? c.message : l),
            p &&
              t &&
              f(window, {
                fadeOut: 0,
              }),
            l &&
              typeof l != "string" &&
              (l.parentNode || l.jquery) &&
              ((nt = l.jquery ? l[0] : l),
              (d = {}),
              n(s).data("blockUI.history", d),
              (d.el = nt),
              (d.parent = nt.parentNode),
              (d.display = nt.style.display),
              (d.position = nt.style.position),
              d.parent && d.parent.removeChild(nt)),
            n(s).data("blockUI.onUnblock", c.onUnblock),
            (k = c.baseZ),
            (tt =
              e || c.forceIframe
                ? n(
                    '<iframe class="blockUI" style="z-index:' +
                      k++ +
                      ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' +
                      c.iframeSrc +
                      '"></iframe>'
                  )
                : n('<div class="blockUI" style="display:none"></div>')),
            (g = c.theme
              ? n(
                  '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' +
                    k++ +
                    ';display:none"></div>'
                )
              : n(
                  '<div class="blockUI blockOverlay" style="z-index:' +
                    k++ +
                    ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'
                )),
            c.theme && p
              ? ((b =
                  '<div class="blockUI ' +
                  c.blockMsgClass +
                  ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' +
                  (k + 10) +
                  ';display:none;position:fixed">'),
                c.title &&
                  (b +=
                    '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                    (c.title || "&nbsp;") +
                    "</div>"),
                (b +=
                  '<div class="ui-widget-content ui-dialog-content"></div>'),
                (b += "</div>"))
              : c.theme
              ? ((b =
                  '<div class="blockUI ' +
                  c.blockMsgClass +
                  ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' +
                  (k + 10) +
                  ';display:none;position:absolute">'),
                c.title &&
                  (b +=
                    '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                    (c.title || "&nbsp;") +
                    "</div>"),
                (b +=
                  '<div class="ui-widget-content ui-dialog-content"></div>'),
                (b += "</div>"))
              : (b = p
                  ? '<div class="blockUI ' +
                    c.blockMsgClass +
                    ' blockPage" style="z-index:' +
                    (k + 10) +
                    ';display:none;position:fixed"></div>'
                  : '<div class="blockUI ' +
                    c.blockMsgClass +
                    ' blockElement" style="z-index:' +
                    (k + 10) +
                    ';display:none;position:absolute"></div>'),
            (w = n(b)),
            l &&
              (c.theme
                ? (w.css(ht), w.addClass("ui-widget-content"))
                : w.css(st)),
            c.theme || g.css(c.overlayCSS),
            g.css("position", p ? "fixed" : "absolute"),
            (e || c.forceIframe) && tt.css("opacity", 0),
            (it = [tt, g, w]),
            (ct = p ? n("body") : n(s)),
            n.each(it, function () {
              this.appendTo(ct);
            }),
            c.theme &&
              c.draggable &&
              n.fn.draggable &&
              w.draggable({
                handle: ".ui-dialog-titlebar",
                cancel: "li",
              }),
            (at =
              y &&
              (!n.support.boxModel ||
                n("object,embed", p ? null : s).length > 0)),
            o || at)
          ) {
            if (
              (p &&
                c.allowBodyStretch &&
                n.support.boxModel &&
                n("html,body").css("height", "100%"),
              (o || !n.support.boxModel) && !p)
            )
              var lt = r(s, "borderTopWidth"),
                rt = r(s, "borderLeftWidth"),
                ut = lt ? "(0 - " + lt + ")" : 0,
                ft = rt ? "(0 - " + rt + ")" : 0;
            n.each(it, function (n, t) {
              var i = t[0].style,
                u,
                r;
              (i.position = "absolute"),
                n < 2
                  ? (p
                      ? i.setExpression(
                          "height",
                          "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" +
                            c.quirksmodeOffsetHack +
                            ') + "px"'
                        )
                      : i.setExpression(
                          "height",
                          'this.parentNode.offsetHeight + "px"'
                        ),
                    p
                      ? i.setExpression(
                          "width",
                          'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'
                        )
                      : i.setExpression(
                          "width",
                          'this.parentNode.offsetWidth + "px"'
                        ),
                    ft && i.setExpression("left", ft),
                    ut && i.setExpression("top", ut))
                  : c.centerY
                  ? (p &&
                      i.setExpression(
                        "top",
                        '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'
                      ),
                    (i.marginTop = 0))
                  : !c.centerY &&
                    p &&
                    ((u = c.css && c.css.top ? parseInt(c.css.top, 10) : 0),
                    (r =
                      "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " +
                      u +
                      ') + "px"'),
                    i.setExpression("top", r));
            });
          }
          if (
            (l &&
              (c.theme ? w.find(".ui-widget-content").append(l) : w.append(l),
              (l.jquery || l.nodeType) && n(l).show()),
            (e || c.forceIframe) && c.showOverlay && tt.show(),
            c.fadeIn)
          ) {
            var ot = c.onBlock ? c.onBlock : u,
              vt = c.showOverlay && !l ? ot : u,
              yt = l ? ot : u;
            c.showOverlay && g._fadeIn(c.fadeIn, vt),
              l && w._fadeIn(c.fadeIn, yt);
          } else
            c.showOverlay && g.show(), l && w.show(), c.onBlock && c.onBlock();
          a(1, s, c),
            p
              ? ((t = w[0]),
                (i = n(":input:enabled:visible", t)),
                c.focusInput && setTimeout(h, 20))
              : v(w[0], c.centerX, c.centerY),
            c.timeout &&
              ((et = setTimeout(function () {
                p ? n.unblockUI(c) : n(s).unblock(c);
              }, c.timeout)),
              n(s).data("blockUI.timeout", et));
        }
      }
      function f(r, u) {
        var h,
          s = r == window,
          e = n(r),
          l = e.data("blockUI.history"),
          o = e.data("blockUI.timeout"),
          f;
        o && (clearTimeout(o), e.removeData("blockUI.timeout")),
          (u = n.extend({}, n.blockUI.defaults, u || {})),
          a(0, r, u),
          u.onUnblock === null &&
            ((u.onUnblock = e.data("blockUI.onUnblock")),
            e.removeData("blockUI.onUnblock")),
          (f = s
            ? n("body").children().filter(".blockUI").add("body > .blockUI")
            : e.find(">.blockUI")),
          u.cursorReset &&
            (f.length > 1 && (f[1].style.cursor = u.cursorReset),
            f.length > 2 && (f[2].style.cursor = u.cursorReset)),
          s && (t = i = null),
          u.fadeOut
            ? ((h = f.length),
              f.fadeOut(u.fadeOut, function () {
                --h == 0 && c(f, l, u, r);
              }))
            : c(f, l, u, r);
      }
      function c(t, i, r, u) {
        var e = n(u);
        if (
          (t.each(function () {
            this.parentNode && this.parentNode.removeChild(this);
          }),
          i &&
            i.el &&
            ((i.el.style.display = i.display),
            (i.el.style.position = i.position),
            i.parent && i.parent.appendChild(i.el),
            e.removeData("blockUI.history")),
          e.data("blockUI.static") && e.css("position", "static"),
          typeof r.onUnblock == "function")
        )
          r.onUnblock(u, r);
        var f = n(document.body),
          o = f.width(),
          s = f[0].style.width;
        f.width(o - 1).width(o), (f[0].style.width = s);
      }
      function a(i, r, u) {
        var e = r == window,
          o = n(r),
          f;
        (i || ((!e || t) && (e || o.data("blockUI.isBlocked")))) &&
          (o.data("blockUI.isBlocked", i),
          e && u.bindEvents && (!i || u.showOverlay)) &&
          ((f =
            "mousedown mouseup keydown keypress keyup touchstart touchend touchmove"),
          i ? n(document).bind(f, u, s) : n(document).unbind(f, s));
      }
      function s(r) {
        var u, f;
        if (r.keyCode && r.keyCode == 9 && t && r.data.constrainTabKey) {
          var e = i,
            s = !r.shiftKey && r.target === e[e.length - 1],
            o = r.shiftKey && r.target === e[0];
          if (s || o)
            return (
              setTimeout(function () {
                h(o);
              }, 10),
              !1
            );
        }
        return ((u = r.data),
        (f = n(r.target)),
        f.hasClass("blockOverlay") && u.onOverlayClick && u.onOverlayClick(),
        f.parents("div." + u.blockMsgClass).length > 0)
          ? !0
          : f.parents().children().filter("div.blockUI").length === 0;
      }
      function h(n) {
        if (i) {
          var t = i[n === !0 ? i.length - 1 : 0];
          t && t.focus();
        }
      }
      function v(n, t, i) {
        var u = n.parentNode,
          o = n.style,
          e = (u.offsetWidth - n.offsetWidth) / 2 - r(u, "borderLeftWidth"),
          f = (u.offsetHeight - n.offsetHeight) / 2 - r(u, "borderTopWidth");
        t && (o.left = e > 0 ? e + "px" : "0"),
          i && (o.top = f > 0 ? f + "px" : "0");
      }
      function r(t, i) {
        return parseInt(n.css(t, i), 10) || 0;
      }
      var t, i;
      n.fn._fadeIn = n.fn.fadeIn;
      var u = n.noop || function () {},
        e = /MSIE/.test(navigator.userAgent),
        o =
          /MSIE 6.0/.test(navigator.userAgent) &&
          !/MSIE 8.0/.test(navigator.userAgent),
        p = document.documentMode || 0,
        y = n.isFunction(document.createElement("div").style.setExpression);
      (n.blockUI = function (n) {
        l(window, n);
      }),
        (n.unblockUI = function (n) {
          f(window, n);
        }),
        (n.growlUI = function (t, i, r, u) {
          var f = n('<div class="growlUI"></div>');
          t && f.append("<h1>" + t + "</h1>"),
            i && f.append("<h2>" + i + "</h2>"),
            r === undefined && (r = 3000),
            n.blockUI({
              message: f,
              fadeIn: 700,
              fadeOut: 1000,
              centerY: !1,
              timeout: r,
              showOverlay: !1,
              onUnblock: u,
              css: n.blockUI.defaults.growlCSS,
            });
        }),
        (n.fn.block = function (t) {
          if (this[0] === window) return n.blockUI(t), this;
          var i = n.extend({}, n.blockUI.defaults, t || {});
          return (
            this.each(function () {
              var t = n(this);
              (i.ignoreIfBlocked && t.data("blockUI.isBlocked")) ||
                t.unblock({
                  fadeOut: 0,
                });
            }),
            this.each(function () {
              n.css(this, "position") == "static" &&
                ((this.style.position = "relative"),
                n(this).data("blockUI.static", !0)),
                (this.style.zoom = 1),
                l(this, t);
            })
          );
        }),
        (n.fn.unblock = function (t) {
          return this[0] === window
            ? (n.unblockUI(t), this)
            : this.each(function () {
                f(this, t);
              });
        }),
        (n.blockUI.version = 2.59),
        (n.blockUI.defaults = {
          message: "<h1>Please wait...</h1>",
          title: null,
          draggable: !0,
          theme: !1,
          css: {
            padding: 0,
            margin: 0,
            width: "30%",
            top: "40%",
            left: "35%",
            textAlign: "center",
            color: "#000",
            border: "3px solid #aaa",
            backgroundColor: "#fff",
            cursor: "wait",
          },
          themedCSS: {
            width: "30%",
            top: "40%",
            left: "35%",
          },
          overlayCSS: {
            backgroundColor: "#000",
            opacity: 0.6,
            cursor: "wait",
          },
          cursorReset: "default",
          growlCSS: {
            width: "350px",
            top: "10px",
            left: "",
            right: "10px",
            border: "none",
            padding: "5px",
            opacity: 0.6,
            cursor: "default",
            color: "#fff",
            backgroundColor: "#000",
            "-webkit-border-radius": "10px",
            "-moz-border-radius": "10px",
            "border-radius": "10px",
          },
          iframeSrc: /^https/i.test(window.location.href || "")
            ? "javascript:false"
            : "about:blank",
          forceIframe: !1,
          baseZ: 1000,
          centerX: !0,
          centerY: !0,
          allowBodyStretch: !0,
          bindEvents: !0,
          constrainTabKey: !0,
          fadeIn: 200,
          fadeOut: 400,
          timeout: 0,
          showOverlay: !0,
          focusInput: !0,
          onBlock: null,
          onUnblock: null,
          onOverlayClick: null,
          quirksmodeOffsetHack: 4,
          blockMsgClass: "blockMsg",
          ignoreIfBlocked: !1,
        }),
        (t = null),
        (i = []);
    }
    typeof define == "function" && define.amd && define.amd.jQuery
      ? define(["jquery"], n)
      : n(jQuery);
  })(),
  (tb_pathToImage = "/resources/css/thickbox/loadingAnimation.gif"),
  $(document).ready(function () {
    tb_init("a.thickbox, area.thickbox, input.thickbox"),
      (imgLoader = new Image()),
      (imgLoader.src = tb_pathToImage);
  });
