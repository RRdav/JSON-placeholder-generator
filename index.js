#!/usr/bin/env node
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var commander = require("commander");
var fs = require("fs");
var program = new commander.Command();
program.version('1.0.0');
program
    .command('generate')
    .description('Generate a placeholder JSON')
    .option('--products', 'Generate products placeholder')
    .option('--users', 'Generate users placeholder')
    .option('--posts', 'Generate posts placeholder')
    // Limit amount of data
    .option('--limit <number>', 'Limit the number of items in the placeholder', parseInt, 10)
    .action(function (options) {
    // Determine which placeholder to generate based on the options
    var APIurl = '';
    var selectedOption = '';
    var limit = options.limit || 10; // Default limit to 10 if not provided
    if (options.products) {
        console.log('Generating products placeholder...');
        APIurl = "https://dummyjson.com/products?limit=".concat(limit, "&select=id,title,price,description,sku");
        selectedOption = 'products';
    }
    else if (options.users) {
        console.log('Generating users placeholder...');
        APIurl = "https://dummyjson.com/users?limit=".concat(limit, "&select=id,firstName,lastName,age");
        selectedOption = 'users';
    }
    else if (options.posts) {
        console.log('Generating posts placeholder...');
        APIurl = "https://dummyjson.com/posts?limit=".concat(limit, "&select=id,title,body,userId");
        selectedOption = 'posts';
    }
    else {
        console.error('No valid option provided. Use --products, --users, or --posts.');
    }
    fetchData(APIurl);
    // Fetch data from API
    function fetchData(url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        fileName = "placeholder-".concat(selectedOption, "-").concat(Date.now(), ".json");
                        fs.writeFileSync(fileName, JSON.stringify(data, null, 1));
                        console.log("Placeholder JSON generated and saved as ".concat(fileName));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
});
program.parse(process.argv);
