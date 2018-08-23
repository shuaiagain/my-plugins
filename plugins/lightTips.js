(function (global, factory) {

    if (typeof (define) === 'function' && (define.cmd || define.amd)) {
        define(factory);
    } else {
        global.lightTip = factory();
    }

})(this, function () {

    var _tipClass = 'ui-lightip';
    var _prefixTips = _tipClass + '-';

    //jQuery 调用
    $.lightTip = (function () {

        var _create = function (message) {

            var elTips = $('<div class="' + _tipClass + '"></div>').attr({
                role: 'tooltip',
                tabindex: '0'
            });

            elTips.html('<i class="' + _prefixTips + '">&nbsp;</i><span class="' + _prefixTips + 'text">' + message + '</span>');
            $(document.body).append(elTips);

            var zIndex = elTips.css('z-index'), newZIndex = 0;
            $('body').children().each(function () {

                newZIndex = Math.max(zIndex, parseInt($(this).css('z-index')) || 0);
            });

            if (zIndex != newZIndex) {
                elTips.css('z-index', newZIndex);
            }

            elTips.css({
                left: '50%',
                top: '35%',
                marginLeft: elTips.outerWidth() * (-0.5)
            });

            $.lightTip.activeElement = document.activeElement;

            elTips.on('click', function () {
                _remove(elTips);
            });

            return elTips;
        };

        var _remove = function (elTips) {

            if (elTips) {
                elTips.remove();
            }

            if ($.lightTip.activeElement) {

                $.lightTip.activeElement.focus();
                $.lightTip.activeElement.blur();
            }
        };

        return {
            success: function (message, time) {

                var lightTips = _create(message).addClass(_prefixTips + 'success');
                setTimeout(function () {
                    lightTips.fadeOut(function () {
                        _remove(lightTip);
                    });
                }, time || 500);

                return lightTips;
            },
            error: function (message, time) {

                var lightTips = _create(message).addClass(_prefixTips + 'error');
                setTimeout(function () {
                    lightTips.fadeOut(function () {
                        _remove(lightTips);
                    });
                }, time || 500);

                return lightTips;
            }
        };
    })();

    var LightTip = function () {

        this.el = {};
        return this;
    }

    LightTip.prototype.success = function (message, time) {

        this.el.container = $.lightTip.success(message, time);
        return this;
    }

    LightTip.prototype.error = function (message, time) {

        this.el.container = $.lightTip.error(message, time);
        return this;
    }

    return lightTip;
});