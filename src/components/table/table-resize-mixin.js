'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('@/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            resizeColumns: [],
            initTotalColumnsWidth: 0,
            hasContainerWidth: false,
            containerWidthCheckTimer: null
        };
    },


    methods: {
        getResizeColumns: function getResizeColumns() {

            var result = [];
            this.visiableColumns.forEach(function (item) {

                if (item.isResize) {
                    result.push({ width: item.width, field: item.field });
                }
            });

            this.resizeColumns = result;
        },
        initResizeColumns: function initResizeColumns() {

            this.initTotalColumnsWidth = this.totalColumnsWidth;
            this.getResizeColumns();
        },
        containerWidthCheck: function containerWidthCheck() {
            var _this = this;

            this.containerWidthCheckTimer = setTimeout(function (x) {

                var tableContainerWidth = _this.$el.clientWidth;

                if (tableContainerWidth - _this.internalWidth > 3) {

                    _this.tableResize();
                }
            });
        },
        tableResize: function tableResize() {
            var self = this,
                maxWidth = self.maxWidth,
                maxHeight = self.height && self.height > 0 ? self.height : this.getTotalColumnsHeight(),
                minWidth = self.minWidth,
                minHeight = self.minHeight,
                view = this.$el,
                viewOffset = _utils2.default.getViewportOffset(view),
                currentWidth = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().width : view.clientWidth,
                currentHeight = view.getBoundingClientRect !== 'undefined' ? view.getBoundingClientRect().height : view.clientHeight,
                right = window.document.documentElement.clientWidth - currentWidth - viewOffset.left,
                bottom = window.document.documentElement.clientHeight - currentHeight - viewOffset.top - 2;

            if (currentHeight > 0) {
                bottom -= self.verticalResizeOffset;
                if (currentHeight > minHeight || currentHeight < maxHeight) {
                    var currentHeight = currentHeight + bottom;
                    currentHeight = currentHeight > maxHeight ? maxHeight : currentHeight;
                    currentHeight = currentHeight < minHeight ? minHeight : currentHeight;
                    self.internalHeight = currentHeight;
                }
            }
            if (self.internalWidth && self.internalWidth > 0 && currentWidth > 0) {
                if (right <= 0 && currentWidth > minWidth || right >= 0 && currentWidth < maxWidth) {

                    currentWidth = currentWidth > maxWidth ? maxWidth : currentWidth;
                    currentWidth = currentWidth < minWidth ? minWidth : currentWidth;

                    self.internalWidth = currentWidth;
                    self.changeColumnsWidth(currentWidth);
                }
            }
        },
        changeColumnsWidth: function changeColumnsWidth(currentWidth) {
            var _this2 = this;

            var differ = currentWidth - this.totalColumnsWidth,
                initResizeWidths = this.initTotalColumnsWidth,
                rightViewBody = this.$el.querySelector('.v-table-rightview .v-table-body'),
                rightViewFooter = this.$el.querySelector('.v-table-rightview .v-table-footer');

            if (currentWidth <= initResizeWidths && !this.isTableEmpty) {

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'scroll';
                } else {

                    rightViewBody.style.overflowX = 'scroll';
                }

            } else {
                if (this.getTotalColumnsHeight() > this.internalHeight) {

                    differ -= this.scrollbarWidth;
                }

                if (this.hasTableFooter) {

                    rightViewFooter.style.overflowX = 'hidden';
                } else {

                    rightViewBody.style.overflowX = 'hidden';
                }

            }

            if (this.hasFrozenColumn) {

                differ -= 2;
            }

            if (currentWidth >= initResizeWidths || differ > 0) {

                var average = differ / this.resizeColumns.length;

                this.visiableColumns.map(function (item) {

                    if (item.isResize) {
                        item.width += average;
                    }

                    return item;
                });
            } else {

                this.columns.forEach(function (col, index) {

                    if (col.isResize) {

                        _this2.visiableColumns[index].width = col.width;
                    }
                });
            }

            this.containerWidthCheck();
        }
    },

    mounted: function mounted() {

        _utils2.default.bind(window, 'resize', this.tableResize);
    },
    beforeDestroy: function beforeDestroy() {

        _utils2.default.unbind(window, 'resize', this.tableResize);
        clearTimeout(this.containerWidthCheckTimer);
    }
};