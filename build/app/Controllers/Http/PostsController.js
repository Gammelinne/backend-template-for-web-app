"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
class PostsController {
    async index({ response }) {
        const posts = await Post_1.default.all();
        return response.json(posts);
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map