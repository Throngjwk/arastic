import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "arastic";
var name = "Arastic";
var description = "at limit at 1e150 tau.";
var authors = "Karen";
var version = 1;

var currency;
var c1, c2, c3, y1, y2, q1, q2;
var c1Exp, c2Exp;

var achievement1, achievement2;
var chapter1;

var init = () => {
    currency = theory.createCurrency();
    currency2 = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(5, Math.log2(10)));
        c2.getDescription = (_) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        c3.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c3.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // y1
    {
        let getDesc = (level) => "y_1=2^{" + level + "}";
        let getInfo = (level) => "y_1=" + getY1(level).toString(0);
        y1 = theory.createUpgrade(3, currency, new ExponentialCost(1e12, Math.log2(5)));
        y1.getDescription = (_) => Utils.getMath(getDesc(y1.level));
        y1.getInfo = (amount) => Utils.getMathTo(getInfo(y2.level), getInfo(y2.level + amount));
    }

    // y2
    {
        let getDesc = (level) => "y_2=3^{" + level + "}";
        let getInfo = (level) => "y_2=" + getY2(level).toString(0);
        y2 = theory.createUpgrade(4, currency, new ExponentialCost(1e19, Math.log2(10)));
        y2.getDescription = (_) => Utils.getMath(getDesc(y2.level));
        y2.getInfo = (amount) => Utils.getMathTo(getInfo(y2.level), getInfo(y2.level + amount));
    }

    // q1
    {
        let getDesc = (level) => "q_1=2^{" + level + "}";
        let getInfo = (level) => "q_1=" + getQ1(level).toString(0);
        q1 = theory.createUpgrade(5, currency2, new ExponentialCost(50, Math.log2(10)));
        q1.getDescription = (_) => Utils.getMath(getDesc(q1.level));
        q1.getInfo = (amount) => Utils.getMathTo(getInfo(q1.level), getInfo(q1.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=4^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ2(level).toString(0);
        q2 = theory.createUpgrade(6, currency2, new ExponentialCost(350, Math.log2(20)));
        q2.getDescription = (_) => Utils.getMath(getDesc(q2.level));
        q2.getInfo = (amount) => Utils.getMathTo(getInfo(q2.level), getInfo(q2.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 97104);
    theory.createBuyAllUpgrade(1, currency2, 1000);
    theory.createAutoBuyerUpgrade(2, currency, 1e20);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        c1Exp = theory.createMilestoneUpgrade(0, 3);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
        c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c2Exp = theory.createMilestoneUpgrade(1, 3);
        c2Exp.description = Localization.getUpgradeIncCustomExpDesc("c_2", "0.05");
        c2Exp.info = Localization.getUpgradeIncCustomExpInfo("c_2", "0.05");
        c2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Arastic", "start to theory", () => currency.value > 1);
    achievement2 = theory.createAchievement(1, "5 digits", "have this know", () => currency.value > 1e5);
    achievement3 = theory.createAchievement(2, "ten billion", "10^10 (or 10^^2)", () => currency.value > 1e10);
    achievement4 = theory.createAchievement(3, "to trillion", "have this know", () => currency.value > 1e12);
    achievement5 = theory.createAchievement(4, "to quadrillion", "have this know", () => currency.value > 1e15);
    achievement6 = theory.createAchievement(5, "|\u005C/|anderot", "now manderot this equal 1.25 quintillion", () => currency.value > 1.25e18);
    achievement7 = theory.createAchievement(6, "gg", "called sextillion.", () => currency.value > 1e21);
    achievement8 = theory.createAchievement(7, "Endgame", "Reach 10 septillion and finsh to " + name, () => currency.value > 1e25);
    achievement9 = theory.createAchievement(8, "fisrt", "while this?", () => currency2.value > 1);
    achievement10 = theory.createAchievement(9, "5", "reach", () => currency2.value > 5);
    achievement11 = theory.createAchievement(10, "ten = 10", "1e1", () => currency2.value > 10);
    achievement12 = theory.createAchievement(11, "hundred", "time long?", () => currency2.value > 100);
    achievement13 = theory.createAchievement(12, "thousand", "1K", () => currency2.value > 1e3);
    achievement14 = theory.createAchievement(13, "69420 my pewdiepie lol", "huh this currency two.", () => currency2.value > 69420);
    achievement15 = theory.createAchievement(14, "97104 numberblocks", "what lotta currency 2", () => currency2.value > 97104);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "My Preview Chapter", "aaaa \naaaaa \naaaa |\u005C|", () => c1.level > 0);

    updateAvailability();
}

var updateAvailability = () => {
    c2Exp.isAvailable = c1Exp.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency2 += BigNumber.from(0.02)
    currency.value += dt * bonus * getC1(c1.level) * getC2(c2.level) * getC3(c3.level);
}
                                   

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = c_1";

    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";

    result += "c_2";

    if (c2Exp.level == 1) result += "^{1.05}";
    if (c2Exp.level == 2) result += "^{1.1}";
    if (c2Exp.level == 3) result += "^{1.15}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.163) / BigNumber.from(2);
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.163}}{2}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 9, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.from(0.9 + 0.1 * level);
var getQ1 = (level) => BigNumber.TWO.pow(level);
var getQ2 = (level) => BigNumber.from(4).pow(level);
var getY1 = (level) => BigNumber.TWO.pow(level);
var getY2 = (level) => BigNumber.THREE.pow(level);
var getC1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC2Exponent = (level) => BigNumber.from(1 + 0.05 * level);

init();