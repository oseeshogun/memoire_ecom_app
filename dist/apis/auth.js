"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_hash_1 = __importDefault(require("password-hash"));
exports.default = (app, sequelize, User) => {
    app.post("/register/", (req, res) => {
        const { password, email } = req.body;
        const generatedPassword = password_hash_1.default.generate(password);
        const token = password_hash_1.default.generate(Date().toString());
        User.findOne({ where: { email } }).then((dbUser) => {
            if (dbUser !== null)
                return res.sendStatus(412);
            User.create({
                email,
                password: generatedPassword,
                createdAd: new Date(),
                token,
            })
                .then((user) => {
                return res.json(user.toJSON());
            })
                .catch((err) => {
                console.log(err);
                return res.sendStatus(500);
            });
        });
    });
    app.get("/users/", (req, res) => {
        User.findAll()
            .then((users) => {
            return res.json(users);
        })
            .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        });
    });
    app.post("/login/", (req, res) => {
        const { password, email } = req.body;
        User.findOne({ where: { email } })
            .then((user) => {
            if (user == null)
                return res.sendStatus(404);
            const dbPassword = user.getDataValue("password");
            const verified = password_hash_1.default.verify(password, dbPassword);
            if (verified) {
                const token = password_hash_1.default.generate(Date().toString());
                User.update({ token }, {
                    where: { email },
                });
                return res.json(Object.assign(Object.assign({}, user.toJSON()), { token }));
            }
            else {
                return res.sendStatus(401);
            }
        })
            .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        });
    });
    app.post("/update_user/", (req, res) => {
        const { email, name, prenom, address, phone } = req.body;
        User.findOne({ where: { email } })
            .then((user) => {
            if (user == null)
                return res.sendStatus(404);
            User.update({ name, prenom, phone, address }, {
                where: { email },
            });
            return res.json(Object.assign(Object.assign({}, user.toJSON()), { name, prenom, phone, address }));
        })
            .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        });
    });
};
//# sourceMappingURL=auth.js.map