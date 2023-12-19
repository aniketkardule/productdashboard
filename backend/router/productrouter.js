import express from 'express';
import { initializeDatabase, statistics, transections, barChart, pieChart, combineResults } from '../controller/product.js';

const router = express.Router();

router.get('/', initializeDatabase);
router.get('/statistics', statistics);
router.get('/transections', transections);
router.get('/barchart', barChart);
router.get('/piechart', pieChart);
router.get('/combineresults', combineResults);

export default router;
