"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@mikro-orm/core");
var product_entity_1 = require("./entities/product.entity");
var tag_entity_1 = require("./entities/tag.entity");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var orm, generator, products, tag, tag2, i, product, result, result2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, core_1.MikroORM.init()];
            case 1:
                orm = _a.sent();
                generator = orm.getSchemaGenerator();
                return [4 /*yield*/, generator.dropSchema()];
            case 2:
                _a.sent();
                return [4 /*yield*/, generator.updateSchema()];
            case 3:
                _a.sent();
                products = [];
                tag = orm.em.create(tag_entity_1.Tag, { slug: "slug0" });
                tag2 = orm.em.create(tag_entity_1.Tag, { slug: "slug2" });
                for (i = 0; i < 10; i++) {
                    product = orm.em.create(product_entity_1.Product, {
                        name: "product" + i,
                        tags: [tag, tag2]
                    });
                    products.push(product);
                }
                return [4 /*yield*/, orm.em.persist(tag).persist(tag2).persist(products).flush()];
            case 4:
                _a.sent();
                return [4 /*yield*/, orm.em.clear()];
            case 5:
                _a.sent();
                return [4 /*yield*/, orm.em.getRepository(product_entity_1.Product).find({ tags: { slug: ["slug0"] } }, ['tags'], {}, 10, 8)];
            case 6:
                result = _a.sent();
                console.log("---------If multiple product are found, there are tags:----------");
                console.log(result[0].tags);
                return [4 /*yield*/, orm.em.clear()];
            case 7:
                _a.sent();
                return [4 /*yield*/, orm.em.getRepository(product_entity_1.Product).find({ tags: { slug: ["slug0"] } }, ['tags'], {}, 10, 9)];
            case 8:
                result2 = _a.sent();
                console.log("---------If only one product is found, there has no tag:----------");
                console.log(result2[0].tags);
                return [2 /*return*/];
        }
    });
}); };
main();
//# sourceMappingURL=index.js.map