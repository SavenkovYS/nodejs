const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61b7700398cebc2b45f4c197')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect('mongodb+srv://savenkov:Cfdtyrjd1993@cluster0.rrnoz.mongodb.net/shop?authSource=admin&replicaSet=atlas-8ms4bn-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
    .then(() => {
        User
            .findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Max',
                        email: 'test@mail.ru',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
        });
        app.listen(3000);
    })
    .catch(err => console.log(err));
