import { Express } from 'express';
import { Model, ModelCtor, Sequelize } from 'sequelize';
import hash from 'password-hash';

export default (
  app: Express,
  sequelize: Sequelize,
  User: ModelCtor<Model<any, any>>
) => {
  app.post('/register/', (req, res) => {
    const { password, email } = req.body;

    const generatedPassword = hash.generate(password);
    const token: string = hash.generate(Date().toString());

    User.findOne({ where: { email } }).then((dbUser) => {
      if (dbUser !== null) { return res.sendStatus(412); }
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

  app.get('/users/', (req, res) => {
    User.findAll()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(500);
      });
  });

  app.post('/login/', (req, res) => {
    const { password, email } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user == null) { return res.sendStatus(404); }
        const dbPassword: string = user.getDataValue('password');
        const verified: boolean = hash.verify(password, dbPassword);
        if (verified) {
          const token: string = hash.generate(Date().toString());
          User.update(
            { token },
            {
              where: { email },
            }
          );
          return res.json({ ...user.toJSON(), token });
        } else {
          return res.sendStatus(401);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(500);
      });
  });

  app.post('/update_user/', (req, res) => {
    const { email, name, prenom, address, phone } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user == null) { return res.sendStatus(404); }
        User.update(
          { name, prenom, phone, address },
          {
            where: { email },
          }
        );
        return res.json({
          ...user.toJSON(),
          ...{ name, prenom, phone, address },
        });
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(500);
      });
  });
};
