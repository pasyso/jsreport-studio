/**
 * Created by pasyso on 05.01.19.
 */
var moment = require("moment-timezone");

const FORM_ASSETS_PATH = '/opt/jsreport/assets/form_assets';
const FORM_ASSETS_URL = 'https://api.powervhc.com/v1/form_assets';
const IMAGES_PATH = '/opt/jsreport/assets/images';
const IMAGES_URL = 'https://api.powervhc.com/v1/images';


function assertUndefinedField(obj, field) {
    if (obj) {
        if (!obj[field]) {
            throw `Field '${field}' not defined in ${toPrettyString(obj)}`;
        }
    }
}

function assertNotFound(obj, ctx, id) {
    if (!obj)
        throw `Object with 'id' === '${id}' not defined in ${toPrettyString(ctx)}`;
}

function getMomentTimezone(tz) {
    let re = tz.match(/(GMT)(\+|\-)(\d+)/i);
    if (re) {
        let sign = re[2] == '+' ? '-' : '+';
        tz = 'Etc/GMT' + sign + re[3];
        return tz;
    }
    if (moment.tz.zone(tz)) return tz;
}

function withTimezone(timestamp, tz = 'GMT') {
    let dt = moment(timestamp);
    tz = getMomentTimezone(tz);
    if (tz) dt = dt.tz(tz);
    return dt;
}

function findById(ctx, id) {
    if (ctx) {
        if (ctx.id && ctx.id == id) {
            return ctx;
        } else {
            if (ctx.contents && Array.isArray(ctx.contents)) {
                for (var i = 0; i < ctx.contents.length; i++) {
                    var subctx = ctx.contents[i];
                    var result = findById(subctx, id);

                    if (result !== null) {
                        return result;
                    }
                }
                return null;
            } else {
                return null;
            }
        }
    } else {
        return null;
    }
}

function findQuestionById(ctx, id) {
    if (!ctx.questions) return findById(ctx, id);
    return ctx.questions[id];
}

function getQuestionAnswer(question, answerId) {
    if (!question || !question.answers) return undefined;

    for (var i = 0; i < question.answers.length; i++) {
        let a = question.answers[i];
        if (a.selected && a.id == answerId) return a;
    }
    return undefined;
}

function getFirstSelectedAnswer(question) {
    if (!question || !question.answers) return undefined;

    for (var i = 0; i < question.answers.length; i++) {
        if (question.answers[i].selected) return question.answers[i];
    }
    return undefined;
}

function getFirstAnswerById(ctx, id) {
    let q = findQuestionById(ctx, id);
    return getFirstSelectedAnswer(q);
}

function getFirstBooleanAnswer(question) {
    let answer = getFirstSelectedAnswer(question);
    if (!answer) return undefined;
    switch (answer.id) {
        case 'Yes':
            return true;
        case 'No':
            return false;
    }
    return undefined;
}

function getFirstBooleanAnswerById(ctx, id) {
    let q = findQuestionById(ctx, id);
    return getFirstBooleanAnswer(q);
}

function getQuestionStatus(question) {
    if (!question) return undefined;

    try {
        assertUndefinedField(question, 'answers');

        var answers = question.answers;

        if (!Array.isArray(answers))
            throw `Field 'answers' is not a list in ${toPrettyString(question)}`;

        // if (answers.length === 0)
        // throw `Field 'answers' is empty in ${toPrettyString(question)}`;

        let status = {};
        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            if (answer.selected && answer.status) {
                status[answer.status] = true;
            }
        }
        if (status.red) return 'red';
        if (status.amber) return 'amber';
        if (status.green) return 'green';
    } catch (e) {
    }
    return undefined;
}

/*helpers*/
function fullName(lastName, firstName, middleName) {
    firstName = (firstName || '').trim();
    middleName = (middleName || '').trim();
    lastName = (lastName || '').trim();

    var fullName = '';

    if (firstName !== '') {
        fullName += ' ' + firstName;

        if (middleName !== '')
            fullName += ' ' + middleName;
    }
    if (lastName !== '')
        fullName += ' ' + lastName;

    if (fullName !== '') {
        return fullName.trim();
    }

    return "";
}

function shortName(bp, category = undefined) {
    if (!category) category = bp.category;

    if (category == "person") {
        var fullName = '';
        if (bp.lastName !== '')
            fullName += ' ' + bp.lastName;
        if (bp.firstName && bp.firstName.length > 0) {
            fullName += ' ' + bp.firstName[0].toUpperCase() + '.';
            if (bp.middleName && bp.middleName.length > 0)
                fullName += bp.middleName[0].toUpperCase() + '.';
        }
        if (fullName !== '') return fullName;
        return "";
    } else if (category == "legal") {
        return bp.name;
    }
}

function getFormattedName(bp, category = undefined) {
    // assertUndefinedField(bp, 'category');
    if (!category) category = bp.category;
    if (category == "person") {
        return fullName(bp.lastName,
            bp.firstName,
            bp.middleName);
    } else if (category == "legal") {
        return bp.name;
    }

    throw `Unsupported category: ${toPrettyString(category)} in ${toPrettyString(bp)}`;
}

function getPhoneNumber(customer) {
    if (customer.mobilePhone) {
        return customer.mobilePhone;
    } else if (customer.landline) {
        return customer.landline;
    }
    return "";
}

function addBpExtraProperties(bp, category = undefined) {
    bp.fullName = getFormattedName(bp, category);
    bp.shortName = shortName(bp, category);
    bp.phoneNumber = getPhoneNumber(bp);
    return bp;
}

function getReferenceId(referenceObject) {
    return referenceObject.externalId ? referenceObject.externalId : referenceObject.id;
}

function getCustomer(ctx) {
    assertUndefinedField(ctx, 'customer');
    return addBpExtraProperties(ctx.customer)
}

function getCounterparty(ctx) {
    let ctpy;
    if (ctx.surveyObject && ctx.surveyObject.category == 'vehicle' && ctx.surveyObject.driver) {
        ctpy = addBpExtraProperties(ctx.surveyObject.driver, 'person')
    } else ctpy = getCustomer(ctx)
    return ctpy;
}

function getRequester(ctx) {
    assertUndefinedField(ctx, 'requester');
    return addBpExtraProperties(ctx.requester)
}

function toLocalTimezone(timestamp, ctx) {
    return withTimezone(timestamp, ctx.branch && ctx.branch.timezone ? ctx.branch.timezone : 'GMT')
}

function getPlannedStartDate(ctx) {
    assertUndefinedField(ctx, 'plannedStartTimestamp');
    return toLocalTimezone(ctx.plannedStartTimestamp, ctx).format('DD.MM.YYYY')
}

function getWarrantyEndDate(ctx) {
    assertUndefinedField(ctx, 'surveyObject');
    if (!ctx.surveyObject.warrantyEndDate) return '';
    return toLocalTimezone(ctx.surveyObject.warrantyEndDate, ctx).format('DD.MM.YYYY')
}

function getCurrentMileage(ctx) {
    let question = findQuestionById(ctx, 'currentMileage');
    let answer = getFirstSelectedAnswer(question);
    if (!answer) return undefined;
    return answer.valueFormatted ? answer.valueFormatted : answer.value;
}

function getFuelLevel(question) {
    if (!question) return undefined;
    const answer = question.singleAnswer;
    if (!answer || answer.id == 'NA') return undefined;
    const min = question.layout && question.layout.from ? question.layout.from : 0;
    const max = question.layout && question.layout.to ? question.layout.to : 100;
    let v;
    try {
        v = parseFloat(answer.value);
        if (v < min) v = min;
        else if (v > max) v = max;
    } catch (e) {
        v = min;
    }
    return {
        value: v,
        min: min,
        max: max
    };
}

function drawLiqbox(name, v, min, max) {
    if (min == null && v && v.min != null) min = v.min;
    if (max == null && v && v.max != null) max = v.max;
    if (typeof v === 'object') v = v.value;
    if (v) {
        if (v < min) v = min; else if (v > max) v = max;
    } else v = min;
    const liqLevel = (v - min) / (max - min) * 100;

    return `<div class="liqbox">
        <div class="fill" style="height: ${liqLevel}%;"></div>
        <div class="tick-group">
            <div class="tick-left"></div><div class="tick-right"></div>
            <div class="tick-left"></div><div class="tick-right"></div>
            <div class="tick-left"></div><div class="tick-right"></div>
        </div>
        <div class="liq-tick-text liq-max${max}">max</div>
        <div class="liq-tick-text liq-min${min}">min</div>
        <div class="liq-title">${name}</div>
    </div>`;
}

function defaultContext() {
    const uomMap = {
        [undefined]: {
            inch: '″',
            Cel: '°C',
            Fa: '°F'
        },
        ru: {
            hr: 'ч',
            pc: 'шт',
            mm: 'мм',
            m: 'м',
            km: 'км',
            mile: 'миль',
            mi: 'миль',
            l: 'л'
        },
        en: {
            mile: 'miles',
            mi: 'miles'
        },
        am: {
            km: 'կմ',
            mile: 'մղոն',
            mi: 'մղոն'
        }
    };
    return {
        locale: 'ru',
        formatUom(uom, locale = 'ru') {
            if (!uom) return '';
            if (uomMap[locale] && uomMap[locale][uom]) return uomMap[locale][uom];
            if (uomMap[undefined][uom]) return uomMap[undefined][uom];
            return uom;
        },
        getAnswerValueFormatted: function (question, answer) {
            if (!answer) return undefined;
            const levelIds = ['fuelLevel', 'engineOilLevel', 'coolantLevel', 'steeringFluidLevel',
                'stabilityControlFluidLevel', 'brakeFluidLevel'];

            if (levelIds.indexOf(question.id) > -1) return undefined;
            switch (question.answerCategory) {
                case 'textAndComment':
                    if (answer.status == 'green' && (answer.id == 'OK' || answer.id == 'none')) return undefined;
                    return answer.value;
                case 'length':
                    let uom = this.formatUom(answer.unitOfMeasurement, this.locale);
                    return Number(answer.value).toLocaleString(this.locale) + ' ' + uom;
                    // return answer.value + ' ' + uom;
                case 'imageMarkAndText':
                case 'text':
                case 'number':
                case 'timestamp':
                case 'date':
                case 'time':
                    return answer.value;
            }
            return undefined;
        },
        getQuestionsFlatList: function (map, contents) {
            if (!contents) return map;
            for (var i = 0; i < contents.length; i++) {
                let elem = contents[i];
                if (elem.category == 'section') this.getQuestionsFlatList(map, elem.contents);
                else if (elem.category == 'question' && elem.answers) {
                    elem.status = getQuestionStatus(elem);
                    let selected_answers = [];
                    // let selected_answerById = {};
                    let isNone = false;
                    for (var j = 0; j < elem.answers.length; j++) {
                        let answer = elem.answers[j];
                        if (answer.selected) {
                            answer.valueFormatted = this.getAnswerValueFormatted(elem, answer);
                            selected_answers.push(answer);
                            if (answer.id == 'none') isNone = true;
                            // selected_answerById[answer.id] = answer;
                        }
                    }
                    elem.answers = selected_answers;
                    if (selected_answers.length > 0) {
                        if (elem.multipleValueAnswer != true) {
                            elem.singleAnswer = selected_answers[0];
                        }
                        if (!(elem.singleAnswer && elem.singleAnswer.id == 'NA')) {
                            if (isNone) elem.isNone = true;
                            map[elem.id] = elem;
                        }
                    }
                }
            }
            return map;
        },
        getFuelLevel: function (question) {
            if (!question) return undefined;
            const answer = question.singleAnswer;
            if (!answer || answer.id == 'NA') return undefined;
            const min = question.layout && question.layout.from ? question.layout.from : 0;
            const max = question.layout && question.layout.to ? question.layout.to : 100;
            let v;
            try {
                v = parseFloat(answer.value);
                if (v < min) v = min;
                else if (v > max) v = max;
            } catch (e) {
                v = min;
            }
            return {
                value: v,
                min: min,
                max: max
            };
        },
        // getFluidLevel: function (question, min, max) {
        //     if (!question) return undefined;
        //     const answer = question.singleAnswer;
        //     if (!answer || answer.id == 'NA') return undefined;
        //     let v;
        //     try {
        //         v = parseFloat(answer.value);
        //         if (v < min) v = min;
        //         else if (v > max) v = max;
        //     } catch (e) {
        //         v = min;
        //     }
        //     return (v - min) / (max - min) * 100;
        // },
        // getLiquidLevels: function (questions) {
        //     return {
        //         fuelLevel: this.getFluidLevel(questions.fuelLevel, 0, 100),
        //         engineOilLevel: this.getFluidLevel(questions.engineOilLevel, -50, 150),
        //         coolantLevel: this.getFluidLevel(questions.coolantLevel, -50, 150),
        //         steeringFluidLevel: this.getFluidLevel(questions.steeringFluidLevel, -50, 150),
        //         stabilityControlFluidLevel: this.getFluidLevel(questions.stabilityControlFluidLevel, -50, 150),
        //         brakeFluidLevel: this.getFluidLevel(questions.brakeFluidLevel, -50, 150)
        //     }
        // },
        init: function (context) {
            if (!context.contextCommonPrepared) {
                context.isLocale = {
                    [context.branch ? context.branch.locale: undefined]: true
                };

                context.questions = this.getQuestionsFlatList({}, context.contents);
                // context.liquidLevels = this.getLiquidLevels(context.questions);

                /*addBpExtraProperties*/
                if (context.surveyObject && context.surveyObject.owner) addBpExtraProperties(context.surveyObject.owner);
                if (context.customer) addBpExtraProperties(context.customer);
                if (context.requester) addBpExtraProperties(context.requester);
                if (context.surveyor) addBpExtraProperties(context.surveyor);
                if (context.payer) addBpExtraProperties(context.payer);

                context.showPersonalSettings = context.questions.markSeatPosition || context.questions.radio_frequency
                    || context.questions.temperature_left || context.questions.temperature_right;

                context.referenceId = getReferenceId(context.referenceObject);
                context.counterparty = getCounterparty(context);
                context.customer = getCustomer(context);
                context.requester = getRequester(context);

                if (context.questions.customerSignature && context.questions.customerSignature.singleAnswer)
                    context.customerSignature = context.questions.customerSignature.singleAnswer.value;

                context.cache = {
                    timezone: context.branch && context.branch.timezone ? context.branch.timezone : 'GMT',
                    plannedStartDate: getPlannedStartDate(context),
                    warrantyEndDate: getWarrantyEndDate(context),
                    currentMileage: getCurrentMileage(context),
                    dirtyVehicleAccepted: getFirstBooleanAnswerById(context, 'dirtyVehicleAccepted'),
                };
                context.contextCommonPrepared = true;
            }
        }

    }
}

function summaryContext() {
    function hasSelectedVariant(pkg) {
        if (!pkg.variants) return false;
        for (var i = 0; i < pkg.variants.length; i++) {
            if (pkg.variants[i].selected) return true;
        }
        return false;
    }

    function pkgCollectTotals(pkg) {
        let totals = {};
        for (var i = 0; i < pkg.variants.length; i++) {
            let v = pkg.variants[i];
            if (v.selected) {
                let t = totals[v.customerApproved];
                if (!t) {
                    t = {
                        customerApproved: v.customerApproved,
                        priceExVat: 0,
                        priceIncVat: 0
                    };
                    totals[v.customerApproved] = t;
                }
                if (v.priceExVat) t.priceExVat += v.priceExVat;
                if (v.priceIncVat) t.priceIncVat += v.priceIncVat;
            }
        }
        return totals;
    }

    return {
        printQuestionEnabled: function (question) {
            return (question.printOn && question.printOn.indexOf('surveySummary') > -1);
        },
        getSummaryContentLines: function (context, contents, acc = [], level = 1) {
            if (!contents) return acc;

            for (var i = 0; i < contents.length; i++) {
                let elem = contents[i];
                if (elem.category == 'section') {
                    let len1 = acc.length;
                    acc.push({isSection: true, text: elem.text, category: elem.category, level: level});
                    this.getSummaryContentLines(context, elem.contents, acc, level + 1);
                    if (acc.length == len1 + 1) acc.pop();
                }
                else if (elem.category == 'question' && context.questions[elem.id] && this.printQuestionEnabled(elem)) {
                    let answers;
                    if (elem.answers && elem.answers.length > 0) {
                        answers = [];
                        for (var ai = 0; ai < elem.answers.length; ai++) {
                            let answer = elem.answers[ai];
                            let packages = [];
                            if (answer.packages) {
                                for (var pi = 0; pi < answer.packages.length; pi++) {
                                    let pkg = answer.packages[pi];
                                    pkg.selected = hasSelectedVariant(pkg);
                                    if (pkg.selected) {
                                        packages.push({
                                            description: pkg.description,
                                            currency: pkg.currency,
                                            totals: pkgCollectTotals(pkg)
                                        });
                                    }
                                }
                            }
                            if (packages.length == 0) packages = undefined;
                            answers.push({
                                status: answer.status,
                                valueFormatted: answer.valueFormatted,
                                packages: packages
                            });
                        }
                        acc.push({
                            text: elem.text,
                            category: elem.category,
                            level: level,
                            status: elem.status,
                            answers: answers
                        });
                    }
                }
            }
            return acc;
        },

        init: function (context) {
            if (!context.contextSummaryPrepared) {
                context.summaryContentLines = this.getSummaryContentLines(context, context.contents);
                context.contextSummaryPrepared = true;
            }
        }

    }
}

function damageReportContext() {
    return {
        init: function (context) {
            if (!context.damageReportPrepared) {
                context.cache.damageReport = getDamageReport(context);
                context.damageReportPrepared = true;
            }
        }
    }
}

function indicatorsContext() {

    function getGeneralIndicators() {
        const baseUrl = FORM_ASSETS_PATH + '/indicators';
        return [
            {id: 'checkEngineWarningLight', url: `${baseUrl}/check_engine`},
            {id: 'oilPressureLowWarningLight', url: `${baseUrl}/oil_pressure`},
            {id: 'coolantLevelLowWarningLight', url: `${baseUrl}/engine_overheating`},
            {id: 'glowPlugsWarningLight', url: `${baseUrl}/glow_plugs`},
            {id: 'batteryVoltageLowWarningLight', url: `${baseUrl}/low_battery_charge`},
            {id: 'criticalWarningLight', url: `${baseUrl}/warning`},
            {id: 'brakesFailureWarningLight', url: `${baseUrl}/brakes`},
            {id: 'absFaultWarningLight', url: `${baseUrl}/abs`},
            {id: 'dscFaultWarningLight', url: `${baseUrl}/dsc`},
            {id: 'srsFailureWarningLight', url: `${baseUrl}/airbag`},
            {id: 'parkingBrakeFailureWarningLight', url: `${baseUrl}/parking_brake`},
            {id: 'tyrePressureControlSystemWarningLight', url: `${baseUrl}/low_tyre_pressure`},
            {id: 'laneAssistWarningLight', url: `${baseUrl}/lane_assist`},
            {id: 'adaptiveLightningWarningLight', url: `${baseUrl}/adaptive_lighting`},
            {id: 'adaptiveCruiseControlWarningLight', url: `${baseUrl}/adaptive_cruise_control`},
        ];
    }

    function getToyotaIndicators() {
        const baseUrl = FORM_ASSETS_PATH + '/indicators_toyota';
        return [
            {id: 'checkEngineWarningLight', url: `${baseUrl}/1_check_engine`},
            {id: 'batteryVoltageLowWarningLight', url: `${baseUrl}/2_low_battery_charge`},
            {id: 'srsFailureWarningLight', url: `${baseUrl}/3_airbag`},
            {id: 'brakesFailureWarningLight', url: `${baseUrl}/4_brakes`},
            {id: 'absFaultWarningLight', url: `${baseUrl}/5_abs`},
            {id: 'oilPressureLowWarningLight', url: `${baseUrl}/6_oil_pressure`},
            {id: 'tyrePressureControlSystemWarningLight', url: `${baseUrl}/7_low_tyre_pressure`},
            {id: 'powerSteeringFaultWarningLight', url: `${baseUrl}/8_power_steering`},
            {id: 'ledLightningWarningLight', url: `${baseUrl}/9_led_lighting`},
            {id: 'adaptiveLightningWarningLight', url: `${baseUrl}/10_adaptive_lighting`},
            {id: 'washerFluidWarningLight', url: `${baseUrl}/11_windshield_washer_fluid`},
            {id: 'dscFaultWarningLight', url: `${baseUrl}/12_dsc`},
            {id: 'adaptiveCruiseControlWarningLight', url: `${baseUrl}/13_adaptive_cruise_control`},
            {id: 'pcsFaultWarningLight', url: `${baseUrl}/14_precrash_safety_system`},
        ];
    }

    return {
        /*indicators values 'general', 'toyota' or array of objects with id, url */
        indicators: 'general',
        init: function (context) {
            if (!context.indicators) {
                let indicators;
                if (Array.isArray(this.indicators)) indicators = this.indicators;
                else if (this.indicators == 'toyota')
                    indicators = getToyotaIndicators();
                else
                    indicators = getGeneralIndicators();

                for (var i = 0; i < indicators.length; i++) {
                    let ind = indicators[i];
                    ind.status = getQuestionStatus(context.questions[ind.id]);
                }

                context.indicators = indicators;
            }
        }
    };
}

module.exports = function () {
    return {
        FORM_ASSETS_PATH: FORM_ASSETS_PATH,
        FORM_ASSETS_URL: FORM_ASSETS_URL,
        IMAGES_PATH: IMAGES_PATH,
        IMAGES_URL: IMAGES_URL,

        printOptions: {
            printHeaderLogoDisabled: function(ctx) {
                return (ctx.printOptions && ctx.printOptions.print_header_logo_disabled == true);
            }
        },
        currency: {
            map: {
                ru: {
                    RUB: ['руб.'],
                    BYR: ['Бел.руб.'],
                    BYN: 'BYR'
                }
            },
            formatShort(isoCode, locale = 'ru') {
                if (!isoCode) return '';
                isoCode = isoCode.toUpperCase();
                if (this.map[locale] && this.map[locale][isoCode]) {
                    let t = this.map[locale][isoCode];
                    if (typeof t == 'string') t = this.map[locale][t];
                    return t;
                }
                return isoCode;
            }
        },
        withTimezone: withTimezone,
        findById: findById,
        findQuestionById: findQuestionById,
        getQuestionAnswer: getQuestionAnswer,
        getFirstSelectedAnswer: getFirstSelectedAnswer,
        getFirstAnswerById: getFirstAnswerById,
        getFirstBooleanAnswer: getFirstBooleanAnswer,
        getFirstBooleanAnswerById: getFirstBooleanAnswerById,
        getQuestionStatus: getQuestionStatus,
        drawLiqbox: drawLiqbox,
        drawQuestionLiqbox: function (name, question) {
            let v = getFuelLevel(question);
            if (v) return this.drawLiqbox(name, v);
        },
        drawStatus: function (status) {
            return `<div class="signholder"><span class="sign${status}"><div class="sign_circle"><div class="sign_group"><div class="sign_stem"></div></div><div class="sign_kick"></div></div></span></div>`;
        },

        defaultContext: defaultContext(),
        indicatorsContext: indicatorsContext(),
        damageReportContext: damageReportContext(),
        summaryContext: summaryContext()
    }
};


/*************************** PRIVATE *************************/

function getDamageReport(ctx) {
    function createMarks(damageReport) {
        function getImageMarks(answers) {
            if (!answers) return [];
            let damageMarks = [];
            for (var i = 0; i < answers.length; i++) {
                var answer = answers[i];
                if (answer.selected && answer.location) {
                    damageMarks.push({
                        markSymbol: answer.markSymbol,
                        x: answer.location.x,
                        y: 100 - answer.location.y,
                        description: answer.value
                    });
                }
            }
            return damageMarks;
        }

        function createDamageMarksCatalogue(damageMarks) {
            if (damageMarks.length == 0) return [];
            let selected = {};
            for (var i = 0; i < damageMarks.length; i++) {
                selected[damageMarks[i].markSymbol] = damageMarks[i].description;
            }
            let re = [];
            for (var s in selected) {
                re.push({markSymbol: s, description: selected[s]});
            }
            return re;
        }

        damageReport.imageUrl = `${IMAGES_PATH}/${damageReport.image}`;
        damageReport.damageMarks = getImageMarks(damageReport.answers);
        damageReport.damageMarksCatalogue = createDamageMarksCatalogue(damageReport.damageMarks);

    }

    // let damageReport = findQuestionById(ctx, 'damageReport');
    let damageReport = findById(ctx, 'damageReport');
    if (damageReport) createMarks(damageReport);
    return damageReport;
}
