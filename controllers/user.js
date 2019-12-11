const OderSo = require('../models/oderSo');

exports.getWelcome = (req, res, next) => {
  res.render('user/welcome');
}

exports.getQuiz = (req, res, next) => {

  let allids = []
  OderSo.find()
    .then(result => {
      for (let x of result) {
        allids.push(x._id);
      }
      for (let i = allids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = allids[i]
        allids[i] = allids[j]
        allids[j] = temp
      }
      req.session.allids = allids;
      req.session.index = 0;
      return OderSo.findById(allids[0]);
       
    })
    .then(oderSo => {
        console.log(oderSo);
        req.session.index;
        res.render('user/quiz', {
          feedback: false,
          oderSo: oderSo,
          ergebnis: null,
          antwort: null
        });
    })
 
    .catch(err => {
      console.log(err);
    });
};

exports.getNext = (req, res, next) => {
     
    let allids = req.session.allids;
    let index = req.session.index;
    console.log(index);
    index++;
    req.session.index++;

    if (index < allids.length) {
    OderSo.findById(allids[index])
    .then(oderSo => {
        res.render('user/quiz', {
          feedback: false,
          oderSo: oderSo,
          ergebnis: null,
          antwort: null
        });
    })
  
 
    .catch(err => {
      console.log(err);
    });
  }
  else {
    res.render('user/finished');
  }
};


exports.postAntwort = (req, res, next) => {
  const id = req.body.id;
  const antwort = req.body.antwort.trim();

  OderSo.findById(id)
    .then(oderSo => {
      const spruch = oderSo.spruch;
      let ergebnis = false;
      let loesung = oderSo.loesung.trim();

      if (antwort === loesung) {
        ergebnis = true;
      }
      res.render('user/quiz', {
        feedback: true,
        oderSo: oderSo,
        ergebnis: ergebnis,
        antwort: antwort
      });

    })
    .catch(err => console.log(err));
}