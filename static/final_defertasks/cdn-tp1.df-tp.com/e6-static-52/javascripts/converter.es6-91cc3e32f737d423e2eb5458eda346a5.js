// import '../../../../../../../../assets/javascripts/jquery.es6.js';
// import '../../../../../../../../assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js';
// import '../../../../../../../../assets/javascripts/popover-enhancement.es6.js';
// import '../../../../../../../../assets/javascripts/global.es6.js';
// import '../base-converter.es6.js';
/**
 * Live Analytics Converter
 * @module LiveConverter
 */
// lint js_unique_name_placeholder disable
Moff.modules.create('LiveConverter', function() {
    'use strict';

    /**
     * @property {module:LiveConverter} _module - link to Live Converter class instance
     * @private
     */
    const _module = this;

    /**
     * @inheritDoc
     */
    this.converters = {
        FilterObject(filter) {
            const object = {};

            let propNames;

            Object.keys(filter || {}).forEach(field => {
                const value = filter[field];

                switch (field) {
                    case 'isNew':
                        if (Array.isArray(value)) {
                            if (value.length === 1) {
                                object.IsNew = parseInt(value[0], 10);
                            }
                        } else {
                            object.IsNew = parseInt(value, 10);
                        }

                        break;

                    case 'year':
                        propNames = ['YearFrom', 'YearTo'];

                        _module.getFilterRangeValues(value).forEach((filterValue, index) => {
                            if (filterValue !== null) {
                                object[propNames[index]] = filterValue;
                            }
                        });

                        break;

                    case 'make':
                    case 'model':
                    case 'trim':
                        object[Moff.utils.ucfirst(field)] = value;

                        break;

                    case 'bodyStyle':
                        object.StandardBody = value;

                        break;

                    case 'finalPrice':
                        propNames = ['PriceFrom', 'PriceTo'];

                        _module.getFilterRangeValues(value).forEach((filterValue, index) => {
                            if (filterValue !== null) {
                                object[propNames[index]] = filterValue;
                            }
                        });

                        break;
                }
            });

            return object;
        },
        FormObject(form) {
            return _module.filterByAllowedProps(form, ['Id', 'Title']);
        },
        LeadObject(lead) {
            return _module.filterByAllowedProps(lead, ['UUID', 'CustomerId']);
        },
        UIObject(ui, event) {
            switch (event) {
                case 'inventorySortButton':
                    return {
                        Name: 'Inventory Listing sort dropdown',
                        Direction: ui.currentState.split('|')[1] || '',
                        PreviousState: ui.prevState.split('|')[0],
                        NewState: ui.currentState.split('|')[0],
                        DefaultState: ui.defaultState.split('|')[0],
                    };

                case 'slideshowClick':
                    return _module.filterByAllowedProps(ui, [
                        'ImageAltTag',
                        'ImageSource',
                        'VideoSource',
                        'UrlPathName',
                        'slideIndex',
                    ]);
            }

            return undefined;
        },
        VehicleListArray(array) {
            return array;
        },
        VehicleObject(vehicle) {
            const vehicleObject = {};

            Object.keys(vehicle || {}).forEach(prop => {
                const value = vehicle[prop];

                switch (prop) {
                    case 'vuid':
                        vehicleObject.VUID = value;

                        break;

                    case 'isNew':
                        vehicleObject.IsNew = +value;

                        break;

                    case 'year':
                        vehicleObject.YearFrom = value;
                        vehicleObject.YearTo = value;

                        break;

                    case 'make':
                    case 'model':
                    case 'trim':
                        vehicleObject[Moff.utils.ucfirst(prop)] = value;

                        break;

                    case 'body':
                        vehicleObject.StandardBody = value;

                        break;

                    case 'finalPrice':
                        vehicleObject.PriceFrom = value;
                        vehicleObject.PriceTo = value;

                        break;
                }
            });

            return vehicleObject;
        },
        Keyword(data) {
            return data;
        },
        GoogleMapObject(data) {
            return data;
        },
    };
}, Moff.modules.getClass('BaseConverter').constructor);

Moff.modules.initClass('LiveConverter');