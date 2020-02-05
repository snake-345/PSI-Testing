(function() {
    'use strict';

    const SEL = {
        scope: 'body',
        block: '.js-bem',
    };

    class Block {
        constructor(name, $block) {
            this.name = name;
            this.$block = $block;
            this.mods = this._parseMods();

            this.setMod('inited');
        }

        hasMod(modName, modValue) {
            return this.$block.hasClass(this._buildClassName(modName, modValue));
        }

        setMod(modName, modValue) {
            const prevValue = this.mods.hasOwnProperty(modName) ? this.mods[modName] : undefined;

            if (!this._callModsHandlers('beforeSetMod', modName, modValue, prevValue)) {
                return;
            }

            this.$block.removeClass(this._buildClassName(modName, prevValue));
            this.$block.addClass(this._buildClassName(modName, modValue));
            this.mods[modName] = modValue;

            this._callModsHandlers('onSetMod', modName, modValue, prevValue);
        }

        delMod(modName) {
            const modValue = this.mods[modName];

            if (!this._callModsHandlers('beforeDelMod', modName, modValue)) {
                return;
            }

            this.$block.removeClass(this._buildClassName(modName, modValue));
            delete this.mods[modName];

            this._callModsHandlers('onDelMod', modName, modValue);
        }

        toggleMod(modName, modValue1, modValue2, condition) {
            /* eslint-disable no-param-reassign */
            if (typeof modValue1 === 'boolean') {
                condition = modValue1;
                modValue1 = undefined;
            }

            if (typeof modValue2 === 'boolean') {
                condition = modValue2;
                modValue2 = undefined;
            }
            /* eslint-enable no-param-reassign */

            if ((condition !== undefined && condition) ||
                (condition === undefined && !this.hasMod(modName, modValue1))) {
                this.setMod(modName, modValue1);
            } else if (modValue2) {
                this.setMod(modName, modValue2);
            } else {
                this.delMod(modName);
            }
        }

        findChildBlocksAll(blockName) {
            return BEM.findChildBlocksAll(this.$block, blockName);
        }

        findChildBlocksFirst(blockName) {
            return BEM.findChildBlocksFirst(this.$block, blockName);
        }

        _parseMods() {
            const mods = {};
            const {
                classList
            } = this.$block[0];

            for (let i = 0; i < classList.length; i++) {
                const className = classList[i];
                const [blockName, modName, modValue] = className.split('_');

                if (blockName !== this.name || !modName) {
                    continue;
                }

                mods[modName] = modValue;
            }

            return mods;
        }

        _callModsHandlers(methodName, modName, modValue, prevValue) {
            let isPreventSet = false;

            if (typeof this[methodName] === 'function') {
                isPreventSet = isPreventSet || this[methodName](modName, modValue, prevValue) === false;
            }

            if (typeof this[`${methodName}${modName}`] === 'function') {
                isPreventSet = isPreventSet || this[`${methodName}${modName}`](modValue, prevValue) === false;
            }

            if (typeof this[`${methodName}${modName}${modValue}`] === 'function') {
                isPreventSet = isPreventSet || this[`${methodName}${modName}${modValue}`](prevValue) === false;
            }

            return !isPreventSet;
        }

        _buildClassName(modName, modValue) {
            let className = `${this.name}_${modName}`;

            if (modValue !== undefined) {
                className += `_${modValue}`;
            }

            return className;
        }

        _buildSelector(modName, modValue) {
            return `.${this._buildClassName(modName, modValue)}`;
        }
    }

    class BEMClass {
        constructor() {
            this.blocks = {};
        }

        declBlock(name, methods = {}) {
            const convertedMethods = $.extend({}, methods);

            this.blocks[name] = class extends Block {
                constructor($block) {
                    super(name, $block);
                }
            };

            delete convertedMethods.beforeSetMod;
            delete convertedMethods.onSetMod;
            $.extend(convertedMethods, this.convertModHandlersToMethods(methods));

            Object.keys(convertedMethods).forEach(method => this.blocks[name].prototype[method] = convertedMethods[method]);

            this.initBlocks([name]);
        }

        initBlocks(blockNames = [], $scope = $(SEL.scope)) {
            blockNames.forEach(blockName => {
                $scope.find(`.${blockName}${SEL.block}`).each((index, element) => {
                    $(element).data('block-instance', new this.blocks[blockName]($(element)));
                });
            });
        }

        convertModHandlersToMethods(methods) {
            const res = {};

            if (methods.beforeSetMod) {
                $.extend(res, _convertModHandlersToMethods(methods, 'beforeSetMod', 'beforeDelMod'));
            }

            if (methods.onSetMod) {
                $.extend(res, _convertModHandlersToMethods(methods, 'onSetMod', 'onDelMod'));
            }

            return res;
        }

        findChildBlocksAll($scope, blockName) {
            return $scope.find(`.${blockName}${SEL.block}`).data('block-instance');
        }

        findChildBlocksFirst($scope, blockName) {
            return $scope.find(`.${blockName}${SEL.block}:first`).data('block-instance');
        }
    }

    function _convertModHandlersToMethods(methods, setMethodName, delMethodName) {
        const res = {};

        Object.keys(methods[setMethodName]).forEach(modName => {
            let methodName = setMethodName;

            if (modName === '') {
                res[delMethodName] = methods[setMethodName][modName];

                return;
            }

            if (modName !== '*') {
                methodName += modName;
            }

            if (typeof methods[setMethodName][modName] === 'function') {
                res[methodName] = methods[setMethodName][modName];
            }

            if (typeof methods[setMethodName][modName] === 'object') {
                Object.keys(methods[setMethodName][modName]).forEach(modValue => {
                    let methodNameWithValue = methodName;

                    if (modValue === '') {
                        res[`${delMethodName}${modName}`] = methods[setMethodName][modName][modValue];

                        return;
                    }

                    if (modValue !== '*' && modValue !== 'true') {
                        methodNameWithValue += modValue;
                    }

                    if (typeof methods[setMethodName][modName][modValue] === 'function') {
                        res[methodNameWithValue] = methods[setMethodName][modName][modValue];
                    }
                });
            }
        });

        return res;
    }

    window.BEM = new BEMClass();
}());