const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  
    
  const tagData = await Tag.findAll({

    // Make sure to include the products
    include: [{
      model: Product,
      required: false,
      as: 'products',
      // Pass in the Product attributes that you want to retrieve
      attributes: ['id', 'product_name','price','stock'],
      through: {
        // This block of code allows you to retrieve the properties of the join table
        model: ProductTag,
        as: 'product_tag',
      }
    }]
  });
  res.status(200).json(tagData);
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = await .findByPk(req.params.id,{

    // Make sure to include the products
    include: [{
      model: Product,
      required: false,
      as: 'products',
      // Pass in the Product attributes that you want to retrieve
      attributes: ['id', 'product_name','price','stock'],
      through: {
        // This block of code allows you to retrieve the properties of the join table
        model: ProductTag,
        as: 'product_tag',
      }
    }]
  });
  res.status(200).json(tagData);
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
