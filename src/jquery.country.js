/*!
 * Copyright 2011, Oleksandr Goldobin.
 * Licensed under GPL version 2 license.
 */

(function($) {

var defaults = {
    province: "",
    provinceSelect: "select.province-select",
    provinceSelectHolder: ".province-select-holder",
    provinceInput: "input.province-text",
    provinceInputHolder: ".province-text-holder",
    showFn: function(e, fn) {
        e.show(fn);
    },
    hideFn: function(e, fn) {
        e.hide(fn);
    }
};

var countryProvinces = {};

$.country = {};

$.country.provinces = function(country, data) {
    countryProvinces[country] = data;
};

function clearSelect (s) {
    s.children().each(function() {
        var child = $(this);
        if (child.val().length > 0) {
            child.remove();
        }
    });
}

$.fn.country = function(opts) {
    var settings = $.extend({}, defaults, opts),
        show = settings["showFn"],
        hide = settings["hideFn"],
        provinceSelect = $(settings["provinceSelect"]),
        provinceSelectHolder = $(settings["provinceSelectHolder"]),
        provinceInput = $(settings["provinceInput"]),
        provinceInputHolder = $(settings["provinceInputHolder"]);

    function changeProvinceSet (country) {
        var provinces = countryProvinces[country];

        clearSelect(provinceSelect);
        provinceInput.val("");

        if ($.isArray(provinces)) {
            hide(provinceInputHolder);
            show(provinceSelectHolder);

            $.each(provinces, function(i, province) {
                $("<option>")
                .attr("value", province.id)
                .html(province.name)
                .appendTo(provinceSelect);
            });
        } else if (provinces === true) {
            hide(provinceSelectHolder);
            show(provinceInputHolder);
        } else {
            hide(provinceSelectHolder);
            hide(provinceInputHolder);
        }

        provinceInput.change();
        provinceSelect.change();
    }


    this.each(function() {
        var self = $(this);
        self.change(function() {
            changeProvinceSet(self.val());
        });
    });

    changeProvinceSet(this.val());
    provinceSelect.val(settings["province"]);
    provinceInput.val(settings["province"]);

    return this;
};

})(jQuery);