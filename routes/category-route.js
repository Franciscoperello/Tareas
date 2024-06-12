const express = require("express");
const router = express.Router();
const { getCategories, addCategory } = require("../handlers/caregoryHandle");
  
router.get('/GetAllCategories', async (req, res) => {
    try {
      let category = await getCategories();
      res.send(category);
    } catch (error) {
      res.status(500).send('Error serching product');
    }
});

router.post('/AddCategory', async (req, res) => {
    try {
      await addCategory(req.body);
      res.send(req.body);
    } catch (error) {
      res.status(500).send('Error adding product');
    }
});

module.exports=router;