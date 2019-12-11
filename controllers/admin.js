const OderSo = require('../models/oderSo');

exports.getOderSos = (req, res, next) => {
  OderSo.find().then(oderSos => {
    res.render('admin/oderSos', {
      oderSos: oderSos
    });
  })
};

exports.getAddOderSo = (req, res, next) => {
  res.render('admin/addOderSo');

};

exports.postAddOderSo = (req, res, next) => {
  const spruch = req.body.spruch;
  const loesung = req.body.loesung;
  const comment = req.body.comment;
  const oderSo = new OderSo({
    spruch: spruch,
    loesung: loesung,
    comment: comment
  });
  oderSo
    .save()
    .then(() => {
      res.redirect('/admin/oderSos');
    }).catch((err) => {
      console.log(err);
    });
}

exports.delOderSo = (req, res, next) => {
  const oderSoId = req.body.oderSoId;
  OderSo.findByIdAndRemove(oderSoId)
    .then(result => {
      res.redirect('/admin/oderSos');
    })
    .catch(err => console.log(err));
};

exports.editOderSo = (req, res, next) => {
  const oderSoId = req.body.oderSoId;
  OderSo.findById(oderSoId).
  then(oderSo => {
      res.render('admin/editOderSo', {
        oderSo: oderSo
      });
    })
    .catch(err => console.log(err));
};

exports.updateOderSo = (req, res, next) => {
  const id = req.body.id;
  const spruch = req.body.spruch;
  const loesung = req.body.loesung;
  const comment = req.body.comment;

  OderSo.findById(id).
  then(oderSo => {
      oderSo.spruch = spruch;
      oderSo.loesung = loesung;
      oderSo.comment = comment;
      return oderSo.save();
    })
    .then(result => {
      res.redirect('/admin/oderSos');
    })
    .catch(err => console.log(err));
};

exports.admin = (req, res, next) => {
  res.redirect('/admin/oderSos')
}