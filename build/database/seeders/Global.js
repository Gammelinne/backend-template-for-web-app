"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const UserFactory_1 = __importDefault(global[Symbol.for('ioc.use')]("Database/factories/UserFactory"));
const PostFactory_1 = __importDefault(global[Symbol.for('ioc.use')]("Database/factories/PostFactory"));
class default_1 extends Seeder_1.default {
    async run() {
        await UserFactory_1.default.createMany(10);
        await PostFactory_1.default.createMany(10);
    }
}
exports.default = default_1;
//# sourceMappingURL=Global.js.map