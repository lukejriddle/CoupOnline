const AssassinateAction = require('./AssassinateAction');
const BlockAssassinateAction = require('./BlockAssassinationAction');
const BlockForeignAidAction = require('./BlockForeignAidAction');
const BlockStealAction = require('./BlockStealAction');
const CoupAction = require('./CoupAction');
const ExchangeAction = require('./ExchangeAction');
const ForeignAidAction = require('./ForeignAidAction');
const IncomeAction = require('./IncomeAction');
const StealAction = require('./StealAction');
const TaxAction = require('./TaxAction');
const AllowAction = require('./AllowAction');

class ActionFactory {
    static create(value, player, targetOrCard){
        switch(value){
            case 1:
                return new IncomeAction(player);
            case 2:
                return new ForeignAidAction(player);
            case 3:
                return new TaxAction(player);
            case 4:
                return new CoupAction(player, targetOrCard);
            case 5:
                return new AssassinateAction(player, targetOrCard);
            case 6:
                return new ExchangeAction(player);
            case 7:
                return new StealAction(player, targetOrCard);
            case 8:
                return new BlockAssassinateAction(player, targetOrCard);
            case 9:
                return new BlockStealAction(player, targetOrCard);
            case 10:
                return new BlockForeignAidAction(player, targetOrCard);
            case 11:
                return new AllowAction(player, targetOrCard);
        }
    }
}

module.exports = ActionFactory