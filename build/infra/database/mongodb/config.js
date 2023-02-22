"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function MongoDB() {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect('mongodb+srv://jr-study:veShK8iib15UMWhZ@cluster0.apdwqj8.mongodb.net/?retryWrites=true&w=majority', (err) => {
        if (err)
            console.log(err);
        else
            console.log("mongo is connected");
    });
}
exports.default = MongoDB;
