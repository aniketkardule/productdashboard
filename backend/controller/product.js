import Product from "../model/product.js";



const monthsObject = {
    january: '01',
    february: '02',
    march: '03',
    april: '04',
    may: '05',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12',
  };

const initializeDatabase = async (req, res) => {
    try {
        fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json').then((response) => { return response.json()}).then((data) => {
            const updatedData = data.map((obj) => {
                obj._id = parseInt(obj.id);
                obj.soldMonth = obj.dateOfSale.split('-')[1];
                return obj
            })
              Product.insertMany(updatedData).then(function () {
                res.send("Successfully saved defult items to DB");
              }).catch(function (err) {
                res.status(500).json({message: err });
              });
    })
        
    } catch (e) {
        res.json(500).json({message : e.message});
    }
}

const transections = async (req, res) => {
    try {
        const search = req.query.q;
        const month = req.query.month;
        const page = parseInt(req.query.page);
        const skip = (page - 1) * 10;
        const query = {
          $and : [ {soldMonth : monthsObject[month]},
            { $or: [
              { title: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } }, 
              {
                $expr: {
                  $regexMatch: {
                    input: { $toString: '$price' },
                    regex: search,
                    options: 'i',
                  },
                },
              },
            ] }
          ]
           
          };

          const results = await Product.find(query).skip(skip).limit(10);
          res.send(results);

    } catch (e) {
        res.json(500).json({message : e.message });
    }
}

const statistics = async (req, res) => {
    try {
        const month = req.query.month;

          const solditems = await Product.find({soldMonth: monthsObject[month]});
          var amount = 0;
          solditems.map((key) => {
            amount += key.price;
          })
          const notSoldItems = await Product.find({soldMonth: {$not: {$eq :monthsObject[month]}}});
          res.send({saleAmount: amount, numberOfSoldItems: solditems.length, notSoldItems: notSoldItems.length});
    } catch (e) {
        res.json(500).json({messahe: e.message});
    }
}

const barChart = async (req, res) => {
    try {
        const month = req.query.month;

        const result1 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$lt : 100 }}]});
        const result2 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 101, $lt : 200 }}]});
        const result3 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 201, $lt : 300 }}]});
        const result4= await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 301, $lt : 400 }}]});
        const result5 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 401, $lt : 500 }}]});
        const result6 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 501, $lt : 600 }}]});
        const result7 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 601, $lt : 700 }}]});
        const result8 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 701, $lt : 800 }}]});
        const result9 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 801, $lt : 900 }}]});
        const result10 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 901 }}]});

        res.send({
            first :result1,
            second: result2,
            third : result3,
            fourth : result4,
            fifth: result5,
            sixth : result6,
            seventh: result7,
            eight : result8,
            ninth : result9,
            tenth: result10

        });

    } catch (e) {
        res.status(500).json({ message : e.message });
    }
}

const pieChart = async (req, res) => {
    try {
        const month = req.query.month;
        const mensObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "men's clothing" }] });
        const womenObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "women's clothing" }] });
        const jeweleryObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "jewelery" }] });
        const electronicsObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "electronics" }] });

        res.send({catCounts : { mensClothing: mensObj, womensClothing: womenObj, electronics : jeweleryObj, jewelery: electronicsObj}})
    } catch (e) {
        res.status(500).json({ message : e.message });
    }
}

const combineResults = async (req, res) => {
    try {
        const month = req.query.month;
        var combinedResults = [];

        const solditems = await Product.find({soldMonth: monthsObject[month]});
          var amount = 0;
          solditems.map((key) => {
            amount += key.price;
          })
          const notSoldItems = await Product.countDocuments({soldMonth: {$not: {$eq :monthsObject[month]}}});

          combinedResults.push({statistics : { saleAmount: amount, numberOfSoldItems: solditems.length, notSoldItems: notSoldItems } });

        const result1 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$lt : 100 }}]});
        const result2 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 101, $lt : 200 }}]});
        const result3 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 201, $lt : 300 }}]});
        const result4= await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 301, $lt : 400 }}]});
        const result5 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 401, $lt : 500 }}]});
        const result6 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 501, $lt : 600 }}]});
        const result7 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 601, $lt : 700 }}]});
        const result8 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 701, $lt : 800 }}]});
        const result9 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 801, $lt : 900 }}]});
        const result10 = await Product.countDocuments({ $and : [ {soldMonth: monthsObject[month] }, {price: {$gt : 901 }}]});

        combinedResults.push({barChart :  {
            first :result1,
            second: result2,
            third : result3,
            fourth : result4,
            fifth: result5,
            sixth : result6,
            seventh: result7,
            eight : result8,
            ninth : result9,
            tenth: result10
        }  } );

        const mensObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "men's clothing" }] });
        const womenObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "women's clothing" }] });
        const jeweleryObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "jewelery" }] });
        const electronicsObj = await Product.countDocuments({ $and : [ { soldMonth : monthsObject[month] }, { category: "electronics" }] });

        combinedResults.push({catCounts : { mensClothing: mensObj, womensClothing: womenObj, electronics : jeweleryObj, jewelery: electronicsObj}})
    
        res.send(combinedResults);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


export { initializeDatabase, statistics, transections, barChart, pieChart, combineResults };