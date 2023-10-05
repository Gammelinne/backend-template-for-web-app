"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class LoginUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [Validator_1.rules.email()]),
            password: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = LoginUserValidator;
//# sourceMappingURL=LoginUserValidator.js.map