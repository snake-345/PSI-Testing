(function() {
    BEM.declBlock('menu-icon', {
        toggleClose() {
            if (this.hasMod('close')) {
                this.unClose();
            } else {
                this.close();
            }
        },
        close() {
            this.setMod('close');
            this.findChildBlocksFirst('burger-icon').close();
        },
        unClose() {
            this.delMod('close');
            this.findChildBlocksFirst('burger-icon').unClose();
        },
    });
}());