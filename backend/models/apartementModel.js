const Apartement = require('../schemas/apartementSchema');

exports.addApartement = (req, res) => {
  const { title, available, description, imgURL, period, unitType, area, floor, rent, rooms, size, city, street, zipcode, apply, includes, landLord, grades, content, status = true } = req.body;


  if (!title || !available || !description || !(imgURL && imgURL.length) || !period || !content || !unitType || !area || !floor || !rent || !rooms || !size || !city || !street || !zipcode || !landLord || !grades || !apply || !(includes && includes.length) || !status) {
    res.status(400).json({
      message: 'Please fill in all the required fields'
    })
    return;
  }

  Apartement.create({ title, available, description, imgURL, period, unitType, area, floor, rent, rooms, size, city, street, zipcode, landLord, apply, grades, includes, content, status })
    .then(() => {
      res.status(201).json({
        message: 'Apartement created successfully'
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong',
        err: err.message
      });
    });
}


exports.getApartements = (req, res) => {
  Apartement.find()
    .then(apartements => {
      res.status(200).json(apartements);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong',
        err: err.message
      });
    });
}

exports.getApartementById = (req, res) => {
  const apartementId = req.params.id;

  Apartement.findById(apartementId)
    .then(apartement => {
      if (!apartement) {
        return res.status(404).json({
          message: 'Apartement not found'
        });
      }
      res.status(200).json(apartement);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong',
        err: err.message
      });
    });
}

