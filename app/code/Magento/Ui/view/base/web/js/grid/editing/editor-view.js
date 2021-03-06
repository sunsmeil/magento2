/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'Magento_Ui/js/lib/view/utils/async',
    'underscore',
    'uiRegistry',
    'uiClass'
], function (ko, $, _, registry, Class) {
    'use strict';

    return Class.extend({
        defaults: {
            rootSelector: '${ $.columnsProvider }:.admin__data-grid-wrap',
            tableSelector: '${ $.rootSelector } -> table',
            rowSelector: '${ $.tableSelector } tbody tr.data-row',
            headerButtonsTmpl:
                '<!-- ko template: headerButtonsTmpl --><!-- /ko -->',
            bulkTmpl:
                '<!-- ko scope: bulk -->' +
                    '<!-- ko template: getTemplate() --><!-- /ko -->' +
                '<!-- /ko -->',
            rowTmpl:
                '<!-- ko with: _editor -->' +
                    '<!-- ko scope: formRecordName($index(), true) -->' +
                        '<!-- ko template: rowTmpl --><!-- /ko -->' +
                    '<!-- /ko -->' +
                    '<!-- ko if: isActive($index(), true) && isSingleEditing() -->' +
                        '<!-- ko template: rowButtonsTmpl --><!-- /ko -->' +
                    '<!-- /ko -->' +
               '<!-- /ko -->'
        },

        /**
         * Initializes view component.
         *
         * @returns {View} Chainable.
         */
        initialize: function () {
            _.bindAll(
                this,
                'initRoot',
                'initTable',
                'initRow',
                'rowBindings',
                'tableBindings'
            );

            this._super();

            this.model = registry.get(this.model);

            $.async(this.rootSelector, this.initRoot);
            $.async(this.tableSelector, this.initTable);
            $.async(this.rowSelector, this.initRow);

            return this;
        },

        /**
         * Initializes columns root container.
         *
         * @param {HTMLElement} node
         * @returns {View} Chainable.
         */
        initRoot: function (node) {
            $(this.headerButtonsTmpl)
                .insertBefore(node)
                .applyBindings(this.model);

            return this;
        },

        /**
         * Initializes table element.
         *
         * @param {HTMLTableElement} table
         * @returns {View} Chainable.
         */
        initTable: function (table) {
            $(table).bindings(this.tableBindings);

            this.initBulk(table);

            return this;
        },

        /**
         * Initializes bulk editor element
         * for the provided table.
         *
         * @param {HTMLTableElement} table
         * @returns {View} Chainable.
         */
        initBulk: function (table) {
            $(this.bulkTmpl)
                .prependTo('tbody', table)
                .applyBindings(this.model);

            return this;
        },

        /**
         * Initializes table row.
         *
         * @param {HTMLTableRowElement} row
         * @returns {View} Chainable.
         */
        initRow: function (row) {
            $(row).extendCtx({
                    _editor: this.model
                }).bindings(this.rowBindings);

            $(this.rowTmpl)
                .insertBefore(row)
                .applyBindings(row);

            return this;
        },

        /**
         * Returns row bindings.
         *
         * @param {Object} ctx - Current context of a row.
         * @returns {Object}
         */
        rowBindings: function (ctx) {
            var model = this.model;

            return {
                visible: ko.computed(function () {
                    return !model.isActive(ctx.$index(), true);
                })
            };
        },

        /**
         * Returns table bindings.
         *
         * @returns {Object}
         */
        tableBindings: function () {
            var model = this.model;

            return {
                css: {
                    '_in-edit': ko.computed(function () {
                        return model.hasActive();
                    })
                }
            };
        }
    });
});
