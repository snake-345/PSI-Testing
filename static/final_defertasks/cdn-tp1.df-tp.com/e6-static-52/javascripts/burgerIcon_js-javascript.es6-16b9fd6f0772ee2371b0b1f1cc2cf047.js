(function() {
    BEM.declBlock('burger-icon', {
        toggleClose() {
            if (this.hasMod('close')) {
                this.unClose();
            } else {
                this.close();
            }
        },
        close() {
            this.setMod('close');
        },
        unClose() {
            this.delMod('close');
        },
    });
}());