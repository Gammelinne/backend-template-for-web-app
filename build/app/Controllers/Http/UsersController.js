"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const CreateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateUserValidator"));
const LoginUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/LoginUserValidator"));
class UsersController {
    async register({ request, response }) {
        try {
            const payload = await request.validate(CreateUserValidator_1.default);
            payload.password = await Hash_1.default.make(payload.password);
            await User_1.default.create({
                id: (0, uuid_1.v4)(),
                username: payload.username,
                email: payload.email,
                password: payload.password,
            });
            response.created({ message: 'User registered successfully' });
        }
        catch (error) {
            response.badRequest(error);
        }
    }
    async login({ request, response, auth }) {
        try {
            const payload = await request.validate(LoginUserValidator_1.default);
            await auth.use('api').revoke();
            const token = await auth.use('api').attempt(payload.email, payload.password);
            response.ok({ token: token.toJSON() });
        }
        catch (error) {
            response.badRequest(error);
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map