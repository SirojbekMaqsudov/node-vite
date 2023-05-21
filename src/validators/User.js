const Joi = require('joi')

const create = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32).required(),
    name: Joi.string().min(3).max(64).required()
})

const update = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(4).max(32),
    name: Joi.string().min(3).max(64)
})

module.exports = {
    UserValidate: (type) => {
        if (type && type === 'update') {
            return data => update.validate(data)
        }

        return data => create.validate(data)
    }
}