(function (global, factory) {

    if (typeof (define) === 'function' && (define.cmd || define.amd)) {
        define(factory);
    } else {
        global.Placeholder = factory();
    }
})(this, function () {

    var PLACEHOLDER = 'placeholder';

    $.fn[PLACEHOLDER] = function () {

        return $(this).each(function () {

            var placeholder = $(this).data(PLACEHOLDER);
            if (placeholder) {
                placeholder.visiblity();
            } else {
                new Placeholder($(this));
            }
        });
    };

    var Placeholder = function (el) {

        //IE10+不处理
        if (typeof (history.pushState) === 'function') return this;

        //默认所有的占位元素
        if (!el) {

            el = $('[' + PLACEHOLDER + ']').placeholder();
            return this;
        }

        var self = this;
        this.el = {};
        this.el.target = el;

        var attribute = el.attr(PLACEHOLDER);
        var id = el.attr('id');

        if (!attribute || el.data(PLACEHOLDER)) return this;
        if (!id) {

            id = PLACEHOLDER + (Math.random() + ' ').replace('.', '');
            el.attr('id', id);
        }

        var elePlaceholder = $('<label class="ui-' + PLACEHOLDER + '" for="' + id + '" >' + attribute + '</label>').hide();

        var isHide = el.is(':visible') == false;
        if (!isHide) {

            if (el.css('display') != 'block') {
                elePlaceholder.insertAfter(el);
            } else {
                $('<div aria-hidden="true"></div>').append(elePlaceholder).insertAfter(el);
            }


            if (window.addEventListener) {

                el.on('input', function () {

                    self.visiblity();
                });
            }
            else {

                el.get(0).attachEvent('onpropertychange', function (event) {

                    if (event && event.propertyName == 'value') {
                        self.visiblity();
                    }
                });
            }

            el.data(PLACEHOLDER, self);
            this.el.placeholder = elePlaceholder;

            this.visiblity();
        } else {

            $(document.body).click(function () {

                if (el.is(':visible') && !el.data(PLACEHOLDER)) {
                    self = new PlaceHolder(el);
                }

                //实时同步文本框的显隐状态
                if (el.data(PLACEHOLDER)) {
                    self.visiblity();
                }

                // 遇到DOM载入后fadeIn效果，导致初始化时候，元素还是隐藏的，加个定时器看看
                setTimeout(function () {
                    self.visibility();
                }, 200);
            });
        }
    };

    Placeholder.prototype.position = function () {

        var target = this.el.target;
        var label = this.el.placeholder;

        var mt = parseInt(target.css('marginTop')) || 0,
            mb = parseInt(target.css('marginBottom')) || 0,
            ml = parseInt(target.css('marginLeft')) || 0,
            mr = parseInt(target.css('marginRight')) || 0,
            width = target.width(),
            outerWidth = target.outerWidth(),
            outerHeight = target.outerHeight();

        if (label.parent().attr('aria-hidden')) {

            label.css({
                width: width,
                marginLeft: ml,
                marginTop: (outerHeight + mb) * (-1)
            });
        } else {

            label.css({
                width: width,
                marginLeft: (outerWidth + mr) * (-1),
                marginTop: mt
            });
        }

        return this;
    }

    Placeholder.prototype.visiblity = function () {

        var target = this.el.target;
        if (target.is(':visible') == false || $.trim(target.val())) {
            this.hide();
        } else {
            this.show();
        }

        return this;
    }

    Placeholder.prototype.show = function () {

        if (this.el.placeholder) {
            this.el.placeholder.html(this.el.target.attr(PLACEHOLDER)).show();

            this.position();
        }
        return this;
    }

    Placeholder.prototype.hide = function () {

        if (this.el.placeholder) this.el.placeholder.hide();
        return this;
    }

    return Placeholder;
});