"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/register', 'UsersController.register');
Route_1.default.post('/login', 'UsersController.login');
Route_1.default.get('/posts', 'PostsController.index').middleware('auth');
//# sourceMappingURL=routes.js.map