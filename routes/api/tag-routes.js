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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = await Tag.findByPk(req.params.id,{

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
  Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.productIds.length) {
        const tagIdArr = req.body.productIds.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id,
          };
        });
        return ProductTag.bulkCreate(tagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(tag);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ product_id }) => product_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.productIds
        .filter((product_id) => !productTagIds.includes(product_id))
        .map((product_id) => {
          return {
            tag_id: req.params.id,
            product_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  ProductTag.destroy({
    where: {
      tag_id: req.params.id,
    },
  })
    .then((deleteProduct) => {
      Tag.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((deletedProduct) => {
          res.json(deletedProduct);
        })
    })
    .catch((err) => res.json(err));
});

module.exports = router;
