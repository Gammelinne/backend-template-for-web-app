"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
exports.default = Factory_1.default.define(Post_1.default, async ({ faker }) => {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        content: faker.lorem.paragraphs(1),
        user_id: await User_1.default.query()
            .orderByRaw('RAND()')
            .firstOrFail()
            .then((user) => user.id),
    };
}).build();
//# sourceMappingURL=PostFactory.js.map