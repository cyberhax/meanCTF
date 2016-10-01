/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _thing = require('../api/thing/thing.model');

var _thing2 = _interopRequireDefault(_thing);

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _question = require('../api/question/question.model');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ip = '10.62.108.248:3000';

_question2.default.find({}).remove().then(function () {
  _question2.default.create({
    name: 'Easy',
    info: 'presentation/d/19fE3Edv7EHNQsiGxc2k2_uo8950Xa7U0sxAJpYs0reQ/',
    hint: 'Google laa',
    point: 100,
    answer: 'qweasdzxcnbvhgfytr'
  }, {
    name: 'medium',
    info: 'Agreement with people ' + ip + '/public/setup.exe',
    hint: 'Cer try test',
    point: 100,
    answer: 'SEM_susah_giler'
  }, {
    name: 'hard',
    info: 'Open the link ' + ip + '/public/muffin.txt',
    hint: 'Use calculator',
    point: 100,
    answer: 'nak muffin'
  }, {
    name: 'hard',
    info: 'I found this pic at my friend laptop.I think he involve in some secret organization.Can you decrypt it for me. ' + ip + '/public/laaa.txt',
    hint: 'Use calculator',
    point: 100,
    answer: 'royalechulan'
  }, {
    name: 'hard',
    info: 'I tried to decrypt this code and my friend laugh at me. ' + ip + '/public/chall5.png',
    hint: 'Use eye brain',
    point: 100,
    answer: 'dontbemadifyoutrytodecodethebraile'
  }, {
    name: 'hard',
    info: 'la la la la laaaaaa. ' + ip + '/public/dadadadadam.txt',
    hint: 'dodododot',
    point: 100,
    answer: 'morses'
  }, {
    name: 'hard',
    info: 'I found this secret message inside my father laptop.Can you decode it for me? ' + ip + '/public/crypto.txt',
    hint: 'zaman dulu tau laa',
    point: 100,
    answer: 'akulapar'
  }, {
    name: 'hard',
    info: 'Forensic style. ' + ip + '/public/makan',
    hint: '(whuT is this file type?)',
    point: 150,
    answer: 'reversing_test'
  }, {
    name: 'hard',
    info: 'download ' + ip + '/public/kelas.class',
    hint: '(whuT is this file type?)',
    point: 200,
    answer: 'not-to-secure'
  }, {
    name: 'hard',
    info: 'There is a robots want to hide the flag in this website ' + ip + '/public/lala',
    hint: 'robot',
    point: 150,
    answer: 'beep-beeeeeep'
  }, {
    name: 'hard',
    info: 'what is the flag? ' + ip + '/public/encode',
    hint: '',
    point: 100,
    answer: 'utp{jjen}'
  }, {
    name: 'Bonus',
    info: 'what is the flag? ' + ip + '/public/qr.png',
    hint: '',
    point: 150,
    answer: '1b2ce8da9fcc7b0b2820b040f31b0d2e'
  });
});

_thing2.default.find({}).remove().then(function () {
  _thing2.default.create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, ' + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, ' + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
  });
});

_user2.default.find({}).remove().then(function () {
  _user2.default.create({
    provider: 'local',
    name: 'khursani',
    email: 'khursani8@gmail.com',
    password: '1261995s',
    point: 0,
    question: []
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }).then(function () {
    // console.log('finished populating users');
  });
});
//# sourceMappingURL=seed.js.map
