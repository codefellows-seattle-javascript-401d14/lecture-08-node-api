'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const Router = require('./lib/router.js');
const pokemonRouter = require('./router/pokemon-router.js');

let router = new Router();

pokemonRouter(router);


//returns function with req,res
const server = http.createServer(router.route());


server.listen(PORT, () => {
//   console.log(' .:XHHHHk.              db.   .;;.     dH  MX   0\n',
// 'oMMMMMMMMMMM       ~MM  dMMP :MMMMMR   MMM  MR      ~MRMN\n',
// 'QMMMMMb  "MMX       MMMMMMP !MX' ':M~   MMM MMM  .oo. XMMM MMM\n',
//   'MMMM.  )M> :X!Hk. MMMM   XMM.o"  .  MMMMMMM X?XMMM MMM>!MMP\n',
//    'MMMb.dM! XM M''?M MMMMMX.`MMMMMMMM~ MM MMM XM `" MX MMXXMM\n',
//   '  ~MMMMM~ XMM. .XM XM`"MMMb.~*?**~ .MMX M t MMbooMM XMMMMMP\n',
//     ' ?MMM>  YMMMMMM! MM   `?MMRb.    `"""  ' '!L"MMMMM XM IMMM\n',
//     '  MMMX   "MMMM"  MM       ~%:           !Mh.""" ''dMI IMMP\n',
//       'MMM.                  ' '                          IMX\n',
//        '~M!M                                             IMP\n',
  console.log('server is up! OVOXO');
});
