(function (global, factory) {

    if (typeof (define) && (define.cmd || define.amd)) {
        define(factory);
    } else {

        global.Tab = factory();
    }

})(this, function () {


});